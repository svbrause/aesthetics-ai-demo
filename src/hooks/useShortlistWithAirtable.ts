import { useState, useEffect, useCallback } from "react";
import { Finding } from "@/types/patientTypes";

interface InterestItem {
  id: string;
  name: string;
  severity?: string;
  score?: number;
  area?: string;
  notes?: string;
  dateAdded?: string;
  status?: string;
  airtableRecordId?: string;
}

interface UseShortlistWithAirtableProps {
  patientId: string;
  initialShortlist?: InterestItem[];
}

export function useShortlistWithAirtable({
  patientId,
  initialShortlist = [],
}: UseShortlistWithAirtableProps) {
  const [shortlist, setShortlist] = useState<InterestItem[]>(initialShortlist);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadShortlistFromAirtable = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/interest-items?patientId=${patientId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to load shortlist: ${response.status}`);
      }

      const data = await response.json();

      // Transform Airtable records to shortlist format
      const interestItems: InterestItem[] = data.records.map((record: any) => ({
        id: record.id,
        name: record.fields["Finding Name"] || "",
        severity: record.fields["Severity"] || "moderate",
        score: record.fields["Score"] || 0,
        area: record.fields["Area"] || "General",
        notes: record.fields["Notes"] || "",
        dateAdded: record.fields["Date Added"] || new Date().toISOString(),
        status: record.fields["Status"] || "Active",
        airtableRecordId: record.id,
      }));

      // Only update shortlist if we have items from Airtable, otherwise preserve initial data
      if (interestItems.length > 0) {
        setShortlist(interestItems);
      }
    } catch (err) {
      console.error("Error loading shortlist from Airtable:", err);
      setError(err instanceof Error ? err.message : "Failed to load shortlist");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  // Load shortlist from Airtable on mount
  useEffect(() => {
    if (patientId) {
      loadShortlistFromAirtable();
    }
  }, [patientId, loadShortlistFromAirtable]);

  const addToShortlist = useCallback(
    async (finding: Finding | InterestItem) => {
      try {
        setLoading(true);
        setError(null);

        // Check if already in shortlist
        if (shortlist.some((item) => item.name === finding.name)) {
          console.log("Finding already in shortlist:", finding.name);
          return;
        }

        // Add to Airtable
        const response = await fetch("/api/interest-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            findingName: finding.name,
            severity: finding.severity || "moderate",
            score: finding.score || 0,
            area: finding.area || "General",
            notes: "",
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add to shortlist: ${response.status}`);
        }

        const data = await response.json();

        // Add to local state
        const newItem: InterestItem = {
          id: data.id,
          name: finding.name,
          severity: finding.severity || "moderate",
          score: finding.score || 0,
          area: finding.area || "General",
          notes: "",
          dateAdded: new Date().toISOString(),
          status: "Active",
          airtableRecordId: data.id,
        };

        setShortlist((prev) => [...prev, newItem]);

        console.log("Added to shortlist:", finding.name);
      } catch (err) {
        console.error("Error adding to shortlist:", err);
        setError(
          err instanceof Error ? err.message : "Failed to add to shortlist"
        );
      } finally {
        setLoading(false);
      }
    },
    [patientId, shortlist]
  );

  const removeFromShortlist = useCallback(
    async (findingName: string) => {
      try {
        setLoading(true);
        setError(null);

        const itemToRemove = shortlist.find(
          (item) => item.name === findingName
        );

        if (!itemToRemove) {
          console.log("Item not found in shortlist:", findingName);
          return;
        }

        // Remove from Airtable if it has a record ID
        if (itemToRemove.airtableRecordId) {
          const response = await fetch(
            `/api/interest-items?recordId=${itemToRemove.airtableRecordId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to remove from shortlist: ${response.status}`
            );
          }
        }

        // Remove from local state (always do this regardless of Airtable success)
        setShortlist((prev) =>
          prev.filter((item) => item.name !== findingName)
        );

        console.log("Removed from shortlist:", findingName);
      } catch (err) {
        console.error("Error removing from shortlist:", err);
        // Still remove from local state even if Airtable fails
        setShortlist((prev) =>
          prev.filter((item) => item.name !== findingName)
        );
        setError(
          err instanceof Error ? err.message : "Failed to remove from shortlist"
        );
      } finally {
        setLoading(false);
      }
    },
    [shortlist]
  );

  const clearShortlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Remove all items from Airtable
      const deletePromises = shortlist
        .filter((item) => item.airtableRecordId)
        .map((item) =>
          fetch(`/api/interest-items?recordId=${item.airtableRecordId}`, {
            method: "DELETE",
          })
        );

      await Promise.all(deletePromises);

      // Clear local state
      setShortlist([]);

      console.log("Cleared shortlist");
    } catch (err) {
      console.error("Error clearing shortlist:", err);
      setError(
        err instanceof Error ? err.message : "Failed to clear shortlist"
      );
    } finally {
      setLoading(false);
    }
  }, [shortlist]);

  const updateShortlistItem = useCallback(
    async (findingName: string, updates: Partial<InterestItem>) => {
      try {
        setLoading(true);
        setError(null);

        const itemToUpdate = shortlist.find(
          (item) => item.name === findingName
        );

        if (!itemToUpdate) {
          console.log("Item not found in shortlist:", findingName);
          return;
        }

        // Update in Airtable if it has a record ID
        if (itemToUpdate.airtableRecordId) {
          const response = await fetch(
            `/api/interest-items/${itemToUpdate.airtableRecordId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fields: {
                  "Finding Name": updates.name || itemToUpdate.name,
                  Severity: updates.severity || itemToUpdate.severity,
                  Score: updates.score || itemToUpdate.score,
                  Area: updates.area || itemToUpdate.area,
                  Notes: updates.notes || itemToUpdate.notes,
                  Status: updates.status || itemToUpdate.status,
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to update shortlist item: ${response.status}`
            );
          }
        }

        // Update local state
        setShortlist((prev) =>
          prev.map((item) =>
            item.name === findingName ? { ...item, ...updates } : item
          )
        );

        console.log("Updated shortlist item:", findingName);
      } catch (err) {
        console.error("Error updating shortlist item:", err);
        setError(
          err instanceof Error ? err.message : "Failed to update shortlist item"
        );
      } finally {
        setLoading(false);
      }
    },
    [shortlist]
  );

  return {
    shortlist,
    loading,
    error,
    addToShortlist,
    removeFromShortlist,
    clearShortlist,
    updateShortlistItem,
    refreshShortlist: loadShortlistFromAirtable,
  };
}
