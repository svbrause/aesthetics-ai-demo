import { useState, useEffect, useCallback } from "react";
import { Finding } from "@/types/patientTypes";

interface SeverityMapping {
  id: string;
  patientId: string;
  issueId: string;
  issueName: string;
  airtableSeverityScore: number;
  airtableSeverityLevel: string;
  uiSeverityScore?: number;
  uiSeverityLevel?: string;
  scalingFactor: number;
  notes?: string;
  dateCreated: string;
  dateModified: string;
}

interface UseSeverityMappingsProps {
  patientId: string;
}

interface SeverityScalingConfig {
  // Airtable severity levels to UI severity levels mapping
  severityLevelMapping: Record<string, string>;
  // Score scaling configuration
  scoreScaling: {
    airtableRange: { min: number; max: number };
    uiRange: { min: number; max: number };
    scalingMethod: "linear" | "logarithmic" | "custom";
  };
}

export function useSeverityMappings({ patientId }: UseSeverityMappingsProps) {
  const [severityMappings, setSeverityMappings] = useState<SeverityMapping[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default severity scaling configuration
  const defaultScalingConfig: SeverityScalingConfig = {
    severityLevelMapping: {
      minimal: "mild",
      mild: "mild",
      moderate: "moderate",
      severe: "severe",
      critical: "severe",
    },
    scoreScaling: {
      airtableRange: { min: 0, max: 100 },
      uiRange: { min: 60, max: 95 }, // UI uses 60-95 range (like grades)
      scalingMethod: "linear",
    },
  };

  // Load severity mappings from Airtable
  const loadSeverityMappings = useCallback(async () => {
    if (!patientId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/severity-mappings?patientId=${patientId}`
      );

      if (!response.ok) {
        // If API key is not configured, just return empty data instead of throwing error
        if (response.status === 500) {
          const errorData = await response.json();
          if (
            errorData.error &&
            errorData.error.includes("Airtable API key not configured")
          ) {
            console.log(
              "Airtable API key not configured, using empty severity mappings"
            );
            setSeverityMappings([]);
            setError(null);
            return;
          }
        }
        throw new Error(`Failed to load severity mappings: ${response.status}`);
      }

      const data = await response.json();
      setSeverityMappings(data.records || []);
    } catch (err) {
      console.error("Error loading severity mappings:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load severity mappings"
      );
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  // Load mappings on mount
  useEffect(() => {
    loadSeverityMappings();
  }, [loadSeverityMappings]);

  // Scale severity score from Airtable to UI
  const scaleSeverityScore = useCallback(
    (
      airtableScore: number,
      scalingFactor: number = 1.0,
      config: SeverityScalingConfig = defaultScalingConfig
    ): number => {
      const { airtableRange, uiRange, scalingMethod } = config.scoreScaling;

      // Normalize the Airtable score to 0-1 range
      const normalizedScore = Math.max(
        0,
        Math.min(
          1,
          (airtableScore - airtableRange.min) /
            (airtableRange.max - airtableRange.min)
        )
      );

      let scaledScore: number;

      switch (scalingMethod) {
        case "logarithmic":
          // Logarithmic scaling (useful for confidence scores)
          scaledScore = Math.log(normalizedScore * 9 + 1) / Math.log(10);
          break;
        case "custom":
          // Custom scaling with factor
          scaledScore = normalizedScore * scalingFactor;
          break;
        case "linear":
        default:
          // Linear scaling
          scaledScore = normalizedScore;
          break;
      }

      // Apply scaling factor
      scaledScore *= scalingFactor;

      // Map to UI range
      const finalScore =
        uiRange.min + scaledScore * (uiRange.max - uiRange.min);

      // Clamp to UI range
      return Math.max(
        uiRange.min,
        Math.min(uiRange.max, Math.round(finalScore))
      );
    },
    []
  );

  // Scale severity level from Airtable to UI
  const scaleSeverityLevel = useCallback(
    (
      airtableLevel: string,
      config: SeverityScalingConfig = defaultScalingConfig
    ): string => {
      return (
        config.severityLevelMapping[airtableLevel.toLowerCase()] || "moderate"
      );
    },
    []
  );

  // Get scaled finding with severity mapping applied
  const getScaledFinding = useCallback(
    (finding: Finding, mapping?: SeverityMapping): Finding => {
      if (!mapping) {
        // No mapping found, return original finding
        return finding;
      }

      const scaledScore = scaleSeverityScore(
        mapping.airtableSeverityScore,
        mapping.scalingFactor
      );

      const scaledLevel = scaleSeverityLevel(mapping.airtableSeverityLevel);

      return {
        ...finding,
        score: scaledScore,
        severity: scaledLevel as "mild" | "moderate" | "severe",
      };
    },
    [scaleSeverityScore, scaleSeverityLevel]
  );

  // Get severity mapping for a specific finding
  const getSeverityMapping = useCallback(
    (findingName: string, issueId?: string): SeverityMapping | undefined => {
      return severityMappings.find(
        (mapping) =>
          mapping.issueName === findingName ||
          (issueId && mapping.issueId === issueId)
      );
    },
    [severityMappings]
  );

  // Create or update severity mapping
  const createOrUpdateSeverityMapping = useCallback(
    async (
      finding: Finding,
      airtableSeverityScore: number,
      airtableSeverityLevel: string,
      scalingFactor: number = 1.0,
      notes?: string
    ) => {
      try {
        setLoading(true);
        setError(null);

        const existingMapping = getSeverityMapping(finding.name, finding.area);

        if (existingMapping) {
          // Update existing mapping
          const response = await fetch(
            `/api/severity-mappings?recordId=${existingMapping.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fields: {
                  "Issue Name": finding.name,
                  "Severity Score": airtableSeverityScore,
                  "Severity Level": airtableSeverityLevel,
                  "Scaling Factor": scalingFactor,
                  Notes: notes || existingMapping.notes,
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to update severity mapping: ${response.status}`
            );
          }

          // Update local state
          setSeverityMappings((prev) =>
            prev.map((mapping) =>
              mapping.id === existingMapping.id
                ? {
                    ...mapping,
                    airtableSeverityScore,
                    airtableSeverityLevel,
                    scalingFactor,
                    notes: notes || mapping.notes,
                  }
                : mapping
            )
          );
        } else {
          // Create new mapping
          const response = await fetch("/api/severity-mappings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patientId,
              issueId: finding.area || finding.name,
              issueName: finding.name,
              airtableSeverityScore,
              airtableSeverityLevel,
              scalingFactor,
              notes: notes || "",
            }),
          });

          if (!response.ok) {
            throw new Error(
              `Failed to create severity mapping: ${response.status}`
            );
          }

          const data = await response.json();

          // Add to local state
          const newMapping: SeverityMapping = {
            id: data.id,
            patientId,
            issueId: finding.area || finding.name,
            issueName: finding.name,
            airtableSeverityScore,
            airtableSeverityLevel,
            scalingFactor,
            notes: notes || "",
            dateCreated: new Date().toISOString(),
            dateModified: new Date().toISOString(),
          };

          setSeverityMappings((prev) => [...prev, newMapping]);
        }

        console.log("Severity mapping saved:", finding.name);
      } catch (err) {
        console.error("Error saving severity mapping:", err);
        setError(
          err instanceof Error ? err.message : "Failed to save severity mapping"
        );
      } finally {
        setLoading(false);
      }
    },
    [patientId, getSeverityMapping]
  );

  // Delete severity mapping
  const deleteSeverityMapping = useCallback(async (mappingId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/severity-mappings?recordId=${mappingId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete severity mapping: ${response.status}`
        );
      }

      // Remove from local state
      setSeverityMappings((prev) =>
        prev.filter((mapping) => mapping.id !== mappingId)
      );

      console.log("Severity mapping deleted:", mappingId);
    } catch (err) {
      console.error("Error deleting severity mapping:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete severity mapping"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh mappings
  const refreshSeverityMappings = useCallback(() => {
    loadSeverityMappings();
  }, [loadSeverityMappings]);

  return {
    severityMappings,
    loading,
    error,
    scaleSeverityScore,
    scaleSeverityLevel,
    getScaledFinding,
    getSeverityMapping,
    createOrUpdateSeverityMapping,
    deleteSeverityMapping,
    refreshSeverityMappings,
  };
}
