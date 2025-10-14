"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ChevronDown,
  Star,
  CheckCircle,
  Filter,
  Sliders,
  X,
  Plus,
} from "lucide-react";
import { AnalysisArea, Finding } from "@/types/patientTypes";
import { getFindingImage, getFallbackFindingImage } from "@/lib/findingImages";
import { DynamicImage } from "@/components/ui/DynamicImage";

interface AnalysisViewProps {
  analysisAreas: AnalysisArea[];
  patient: any;
  shortlist: any[];
  onAddToShortlist: (finding: Finding) => void;
  onAddToTreatmentPlan?: (treatment: any) => void;
  addedToPlan?: Set<string>;
  showFiltersOnly?: boolean;
  showContentOnly?: boolean;
  selectedShortlistItems?: Set<string>;
  severityMappings?: any[];
  getScaledFinding?: (finding: Finding, mapping?: any) => Finding;
  getSeverityMapping?: (findingName: string, issueId?: string) => any;
  createOrUpdateSeverityMapping?: (
    finding: Finding,
    airtableScore: number,
    airtableLevel: string,
    scalingFactor?: number,
    notes?: string
  ) => Promise<void>;
  severityLoading?: boolean;
  severityError?: string | null;
}

export function AnalysisView({
  analysisAreas,
  patient,
  shortlist,
  onAddToShortlist,
  onAddToTreatmentPlan,
  addedToPlan = new Set(),
  showFiltersOnly = false,
  showContentOnly = false,
  selectedShortlistItems = new Set(),
  severityMappings = [],
  getScaledFinding,
  getSeverityMapping,
  createOrUpdateSeverityMapping,
  severityLoading = false,
  severityError = null,
}: AnalysisViewProps) {
  const { hipaaMode } = useTheme();
  const [selectedArea, setSelectedArea] = useState("");
  const [showAllAnalysisAreas, setShowAllAnalysisAreas] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [severityFilter, setSeverityFilter] = useState("");
  const [scoreRangeFilter, setScoreRangeFilter] = useState("");
  const [shortlistFilter, setShortlistFilter] = useState("");
  const [ageGroupFilter, setAgeGroupFilter] = useState("");
  const [commonalityFilter, setCommonalityFilter] = useState("");
  const [treatmentCountFilter, setTreatmentCountFilter] = useState("");
  const [sortBy, setSortBy] = useState("score-desc");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedTreatments, setExpandedTreatments] = useState<Set<string>>(
    new Set()
  );
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [currentVisibleArea, setCurrentVisibleArea] = useState<string>("");
  const areaRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Intersection Observer for sticky area title
  useEffect(() => {
    // Only set up observer when an area is selected (not "All Areas")
    if (!selectedArea) {
      setCurrentVisibleArea("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible and closest to the top
        let bestEntry: IntersectionObserverEntry | null = null;
        let bestScore = 0;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Calculate a score based on intersection ratio and position
            // Higher intersection ratio and closer to top = better score
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            const distanceFromTop = Math.abs(rect.top);

            // More generous scoring - prioritize areas that are more visible
            // and closer to the top of the viewport
            const positionScore = Math.max(
              0,
              1 - distanceFromTop / (viewportHeight * 0.6)
            );
            const visibilityScore = entry.intersectionRatio * positionScore;

            if (visibilityScore > bestScore) {
              bestScore = visibilityScore;
              bestEntry = entry;
            }
          }
        }

        if (bestEntry) {
          const target = bestEntry.target as HTMLElement;
          const areaId = target.getAttribute("data-area-id");
          if (areaId && areaId !== currentVisibleArea) {
            // More sensitive threshold for better responsiveness
            if (bestScore > 0.05 || bestEntry.intersectionRatio > 0.2) {
              setCurrentVisibleArea(areaId);
            }
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -70% 0px", // Trigger when area is in the top 30% of viewport
      }
    );

    // Observe all area elements
    Object.values(areaRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [selectedArea, currentVisibleArea, areaRefs.current]);

  // Get interested areas based on patient areasOfInterest or findings
  const getInterestedAreas = () => {
    // First priority: use patient's areasOfInterest if available
    if (patient.areasOfInterest && patient.areasOfInterest.length > 0) {
      return patient.areasOfInterest;
    }

    // If areasOfInterest exists but is empty, respect that choice (no areas of interest)
    if (patient.areasOfInterest && patient.areasOfInterest.length === 0) {
      return [];
    }

    // Fallback: derive from findings only if areasOfInterest is undefined/null
    const interestedAreas = new Set<string>();
    patient.findings.forEach((finding: any) => {
      const findingName = typeof finding === "string" ? finding : finding.name;
      const area = analysisAreas.find((area) =>
        area.findings.some((f) => f.name === findingName)
      );
      if (area) {
        interestedAreas.add(area.id);
      }
    });
    return Array.from(interestedAreas);
  };

  const allInterestedAreas = getInterestedAreas();

  // Calculate area scores based on findings
  const calculateAreaScore = (area: any) => {
    const patientFindingNames = patient.findings.map((finding: any) =>
      typeof finding === "string" ? finding : finding.name
    );

    const areaFindings = area.findings.filter((finding: any) =>
      patientFindingNames.includes(finding.name)
    );

    if (areaFindings.length === 0) return 100; // Perfect score if no issues

    // Use patient's actual finding scores if available, otherwise use area finding scores
    const totalScore = areaFindings.reduce((sum: number, finding: any) => {
      const patientFinding = patient.findings.find(
        (pf: any) => (typeof pf === "string" ? pf : pf.name) === finding.name
      );
      const score =
        patientFinding && typeof patientFinding === "object"
          ? patientFinding.score
          : finding.score;
      return sum + score;
    }, 0);

    const averageScore = totalScore / areaFindings.length;
    return Math.round(averageScore);
  };

  // Filter analysis areas to only show findings that are in the patient's data
  const getFilteredAnalysisAreas = () => {
    const patientFindingNames = patient.findings.map((finding: any) =>
      typeof finding === "string" ? finding : finding.name
    );

    return analysisAreas
      .map((area) => ({
        ...area,
        findings: area.findings.filter((finding) =>
          patientFindingNames.includes(finding.name)
        ),
      }))
      .filter((area) => {
        // Show areas that have findings OR are in patient's areas of interest
        return area.findings.length > 0 || allInterestedAreas.includes(area.id);
      });
  };

  const filteredAnalysisAreas = getFilteredAnalysisAreas();

  // Show all areas that have findings
  const interestedAreas = allInterestedAreas;

  const getScoreColorClasses = (score: number) => {
    // Create a gradient from orange (low scores) to green (high scores)
    // More vibrant colors for better visibility in both light and dark modes
    if (score >= 90)
      return "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500";
    if (score >= 80)
      return "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500";
    if (score >= 70)
      return "from-yellow-500 to-green-500 dark:from-yellow-400 dark:to-green-400";
    if (score >= 60)
      return "from-yellow-600 to-yellow-500 dark:from-yellow-500 dark:to-yellow-400";
    if (score >= 50)
      return "from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-yellow-400";
    if (score >= 40)
      return "from-orange-600 to-orange-500 dark:from-orange-500 dark:to-orange-400";
    return "from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minimal":
        return "text-green-400 bg-green-500/20 border-green-500/50";
      case "mild":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50";
      case "moderate":
        return "text-orange-400 bg-orange-500/20 border-orange-500/50";
      case "severe":
        return "text-red-400 bg-red-500/20 border-red-500/50";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50";
    }
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  // Check if a finding is hidden
  const isFindingHidden = (findingName: string) => {
    return patient.hiddenFindings?.includes(findingName) || false;
  };

  // Filter and sort findings
  const getFilteredAndSortedFindings = (area: any) => {
    const { detectedFindings, findingsWithoutConcern } =
      getSeparatedFindings(area);
    return { detectedFindings, findingsWithoutConcern };
  };

  const getSeparatedFindings = (area: any) => {
    // Get patient's actual findings for this area
    const patientFindingNames = patient.findings.map((finding: any) =>
      typeof finding === "string" ? finding : finding.name
    );

    // Filter area findings to only include patient's findings
    const patientFindings = area.findings.filter((finding: any) =>
      patientFindingNames.includes(finding.name)
    );

    // Merge patient's actual data with area findings data
    const mergedFindings = patientFindings.map((areaFinding: any) => {
      const patientFinding = patient.findings.find(
        (pf: any) =>
          (typeof pf === "string" ? pf : pf.name) === areaFinding.name
      );

      // Use patient's actual severity and score if available
      if (patientFinding && typeof patientFinding === "object") {
        return {
          ...areaFinding,
          severity: patientFinding.severity,
          score: patientFinding.score,
        };
      }

      return areaFinding;
    });

    let findings = mergedFindings.filter((finding: any) => {
      // Severity filter
      if (severityFilter && finding.severity !== severityFilter) return false;

      // Score range filter
      if (scoreRangeFilter) {
        const score = finding.score;
        if (scoreRangeFilter === "high" && score < 80) return false;
        if (scoreRangeFilter === "medium" && (score < 60 || score >= 80))
          return false;
        if (scoreRangeFilter === "low" && score >= 60) return false;
      }

      // Shortlist filter
      if (
        shortlistFilter === "shortlisted" &&
        !shortlist.some((item) => item.name === finding.name)
      )
        return false;
      if (
        shortlistFilter === "not-shortlisted" &&
        shortlist.some((item) => item.name === finding.name)
      )
        return false;

      // Filter by selected shortlist items - if any are selected, only show those specific findings
      if (selectedShortlistItems.size > 0) {
        if (!selectedShortlistItems.has(finding.name)) return false;
      }

      // Age group filter
      if (ageGroupFilter && finding.ageGroup !== ageGroupFilter) return false;

      // Commonality filter
      if (commonalityFilter) {
        const commonality = finding.commonality;
        if (commonalityFilter === "high" && commonality < 70) return false;
        if (
          commonalityFilter === "medium" &&
          (commonality < 40 || commonality >= 70)
        )
          return false;
        if (commonalityFilter === "low" && commonality >= 40) return false;
      }

      // Treatment count filter
      if (treatmentCountFilter) {
        const treatmentCount = finding.treatments.length;
        if (treatmentCountFilter === "many" && treatmentCount < 5) return false;
        if (
          treatmentCountFilter === "some" &&
          (treatmentCount < 2 || treatmentCount >= 5)
        )
          return false;
        if (treatmentCountFilter === "few" && treatmentCount >= 2) return false;
      }

      return true;
    });

    // Separate findings into detected (score < 100) and without concern (score = 100)
    const detectedFindings = findings.filter(
      (finding: any) => finding.score < 100
    );
    const findingsWithoutConcern = findings.filter(
      (finding: any) => finding.score === 100
    );

    // Sort detected findings
    detectedFindings.sort((a: any, b: any) => {
      let comparison = 0;

      switch (sortBy) {
        case "score":
          comparison = a.score - b.score;
          break;
        case "severity":
          const severityOrder: { [key: string]: number } = {
            severe: 3,
            moderate: 2,
            mild: 1,
            minimal: 0,
          };
          comparison =
            (severityOrder[a.severity] || 0) - (severityOrder[b.severity] || 0);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "commonality":
          comparison = a.commonality - b.commonality;
          break;
        case "age-group":
          comparison = a.ageGroup.localeCompare(b.ageGroup);
          break;
        case "treatment-count":
          comparison = a.treatments.length - b.treatments.length;
          break;
        case "causes-count":
          comparison = a.causes.length - b.causes.length;
          break;
        case "symptoms-count":
          comparison = a.symptoms.length - b.symptoms.length;
          break;
        default:
          comparison = a.score - b.score;
      }

      // Apply sort order (asc/desc)
      return sortOrder === "desc" ? -comparison : comparison;
    });

    // Sort findings without concern alphabetically
    findingsWithoutConcern.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );

    return { detectedFindings, findingsWithoutConcern };
  };

  const clearFilters = () => {
    setSeverityFilter("");
    setScoreRangeFilter("");
    setShortlistFilter("");
    setAgeGroupFilter("");
    setCommonalityFilter("");
    setTreatmentCountFilter("");
    setSortBy("score");
    setSortOrder("desc");
    setShowFilters(false);
    setShowSort(false);
  };

  const toggleTreatmentExpansion = (treatmentName: string) => {
    setExpandedTreatments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(treatmentName)) {
        newSet.delete(treatmentName);
      } else {
        newSet.add(treatmentName);
      }
      return newSet;
    });
  };

  const handleAddTreatmentToPlan = (treatmentName: string) => {
    if (onAddToTreatmentPlan) {
      // Create a mock treatment object for the treatment plan
      const treatment = {
        id: treatmentName.toLowerCase().replace(/\s+/g, "-"),
        name: treatmentName,
        notes: `Treatment for ${treatmentName}`,
        areas: [selectedArea || "General"],
        quantity: "1",
        unit: "session",
        price: "500-1000",
        duration: "3-6 months",
        downtime: "Minimal",
        invasiveness: "Minimal",
      };
      onAddToTreatmentPlan(treatment);
    }
  };

  // If showing only filters, return just the filter section
  if (showFiltersOnly) {
    return (
      <div className="space-y-4">
        {/* Combined Filter Controls and Area Navigation */}
        <div className="mb-4">
          <div className="flex items-start mb-3">
            {/* Left Side - Filters and Sort (Narrow) */}
            <div className="flex flex-col space-y-2 w-32 flex-shrink-0">
              <h3 className="text-sm font-medium text-gray-400">
                Filters and Sort
              </h3>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`text-gray-400 hover:text-gray-200 p-2 ${
                    showFilters ? "bg-cyan-500/20 text-cyan-400" : ""
                  }`}
                  title="Toggle Filters"
                >
                  <Filter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSort(!showSort)}
                  className={`text-gray-400 hover:text-gray-200 p-2 ${
                    showSort ? "bg-cyan-500/20 text-cyan-400" : ""
                  }`}
                  title="Toggle Sort"
                >
                  <Sliders className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="h-6 w-px bg-gray-600 mx-4 mt-6"></div>

            {/* Right Side - Filter by Area (Wider) */}
            <div className="flex flex-col space-y-2 flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium text-gray-400">
                  Filter by Area
                </h3>
                {!showAllAnalysisAreas ? (
                  <button
                    type="button"
                    onClick={() => setShowAllAnalysisAreas(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View All Areas
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAllAnalysisAreas(false)}
                    className="text-xs text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    ← Back to Interested Areas
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {/* All Areas Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedArea("")}
                  className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                    selectedArea === ""
                      ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                      : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
                  }`}
                >
                  <span className="text-sm">All Areas</span>
                </Button>

                {(showAllAnalysisAreas || interestedAreas.length === 0
                  ? filteredAnalysisAreas
                  : filteredAnalysisAreas.filter((area) =>
                      interestedAreas.includes(area.id)
                    )
                )
                  .sort((a, b) => calculateAreaScore(a) - calculateAreaScore(b))
                  .map((area) => (
                    <Button
                      key={area.id}
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setSelectedArea(selectedArea === area.id ? "" : area.id)
                      }
                      className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                        selectedArea === area.id
                          ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                          : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
                      }`}
                    >
                      <span className="text-sm">{area.name}</span>
                      <span
                        className={`ml-2 text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getScoreColorClasses(
                          calculateAreaScore(area)
                        )} text-white border border-transparent`}
                      >
                        {calculateAreaScore(area)}
                      </span>
                      {!showAllAnalysisAreas &&
                        interestedAreas.includes(area.id) && (
                          <span className="ml-1 text-xs text-pink-400">★</span>
                        )}
                    </Button>
                  ))}
              </div>
              {!showAllAnalysisAreas && interestedAreas.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    Showing {interestedAreas.length} areas of interest (marked
                    with ★)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter and Sort Content */}
        {(showFilters || showSort) && (
          <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50 mb-4">
            {/* Filters Section */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Filter Findings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Severity
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Severities" },
                        { value: "mild", label: "Mild" },
                        { value: "moderate", label: "Moderate" },
                        { value: "severe", label: "Severe" },
                      ]}
                      value={severityFilter}
                      onChange={setSeverityFilter}
                      placeholder="All Severities"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Rating Range
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Ratings" },
                        { value: "high", label: "High (80-100)" },
                        { value: "medium", label: "Medium (60-79)" },
                        { value: "low", label: "Low (0-59)" },
                      ]}
                      value={scoreRangeFilter}
                      onChange={setScoreRangeFilter}
                      placeholder="All Ratings"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Shortlist Status
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Findings" },
                        { value: "shortlisted", label: "Shortlisted" },
                        { value: "not-shortlisted", label: "Not Shortlisted" },
                      ]}
                      value={shortlistFilter}
                      onChange={setShortlistFilter}
                      placeholder="All Findings"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Age Group
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Age Groups" },
                        { value: "20-30", label: "20-30 years" },
                        { value: "30-40", label: "30-40 years" },
                        { value: "40-50", label: "40-50 years" },
                        { value: "50-60", label: "50-60 years" },
                        { value: "60+", label: "60+ years" },
                      ]}
                      value={ageGroupFilter}
                      onChange={setAgeGroupFilter}
                      placeholder="All Age Groups"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Commonality
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Commonality" },
                        { value: "high", label: "High (70%+)" },
                        { value: "medium", label: "Medium (40-69%)" },
                        { value: "low", label: "Low (<40%)" },
                      ]}
                      value={commonalityFilter}
                      onChange={setCommonalityFilter}
                      placeholder="All Commonality"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Treatment Options
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Treatment Counts" },
                        { value: "many", label: "Many (5+ options)" },
                        { value: "some", label: "Some (2-4 options)" },
                        { value: "few", label: "Few (1-2 options)" },
                      ]}
                      value={treatmentCountFilter}
                      onChange={setTreatmentCountFilter}
                      placeholder="All Treatment Counts"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Sort Section */}
            {showSort && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Sort Findings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Sort By
                    </label>
                    <CustomSelect
                      options={[
                        { value: "score", label: "Rating" },
                        { value: "severity", label: "Severity" },
                        { value: "name", label: "Name" },
                        { value: "commonality", label: "Commonality" },
                        { value: "age-group", label: "Age Group" },
                        { value: "treatment-count", label: "Treatment Count" },
                        { value: "causes-count", label: "Causes Count" },
                        { value: "symptoms-count", label: "Symptoms Count" },
                      ]}
                      value={sortBy}
                      onChange={setSortBy}
                      placeholder="Sort By"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Sort Order
                    </label>
                    <CustomSelect
                      options={[
                        { value: "desc", label: "Descending (High to Low)" },
                        { value: "asc", label: "Ascending (Low to High)" },
                      ]}
                      value={sortOrder}
                      onChange={setSortOrder}
                      placeholder="Sort Order"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        )}
      </div>
    );
  }

  // If showing only content, return just the findings cards
  if (showContentOnly) {
    return (
      <motion.div className="space-y-6">
        {/* Sticky Area Title */}
        {currentVisibleArea && (
          <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 py-3 mb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {
                  analysisAreas.find((area) => area.id === currentVisibleArea)
                    ?.name
                }{" "}
                Findings
              </h2>
              <div className="flex items-center space-x-2">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getScoreColorClasses(
                    calculateAreaScore(
                      analysisAreas.find(
                        (area) => area.id === currentVisibleArea
                      ) || analysisAreas[0]
                    )
                  )} text-white border border-transparent`}
                >
                  {calculateAreaScore(
                    analysisAreas.find(
                      (area) => area.id === currentVisibleArea
                    ) || analysisAreas[0]
                  )}
                  /100
                </div>
                <div className="text-sm text-gray-400">
                  {calculateAreaScore(
                    analysisAreas.find(
                      (area) => area.id === currentVisibleArea
                    ) || analysisAreas[0]
                  ) >= 80
                    ? "Strong"
                    : calculateAreaScore(
                        analysisAreas.find(
                          (area) => area.id === currentVisibleArea
                        ) || analysisAreas[0]
                      ) >= 60
                    ? "Good"
                    : "Needs Work"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Findings Cards - Only show selected area or all if none selected */}
        <div className="space-y-6">
          {filteredAnalysisAreas
            .filter((area) => {
              // Filter by selected area
              if (selectedArea && area.id !== selectedArea) return false;

              // If shortlist items are selected, only show areas that have matching findings
              if (selectedShortlistItems.size > 0) {
                const hasMatchingFindings = area.findings.some((finding: any) =>
                  selectedShortlistItems.has(finding.name)
                );
                return hasMatchingFindings;
              }

              return true;
            })
            .map((area) => {
              const { detectedFindings, findingsWithoutConcern } =
                getFilteredAndSortedFindings(area);
              const shortlistedCount = detectedFindings.filter((finding: any) =>
                shortlist.some((item) => item.name === finding.name)
              ).length;

              return (
                <div
                  key={area.id}
                  className="space-y-4"
                  ref={(el) => {
                    areaRefs.current[area.id] = el;
                  }}
                  data-area-id={area.id}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-white">
                        {area.name} Findings
                      </h3>
                      {detectedFindings.length > 0 && (
                        <Button
                          size="sm"
                          onClick={() => {
                            detectedFindings.forEach((finding: any) => {
                              if (
                                !shortlist.some(
                                  (item) => item.name === finding.name
                                )
                              ) {
                                onAddToShortlist(finding);
                              }
                            });
                          }}
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                        >
                          <Star className="w-4 h-4 mr-1" />
                          Add All
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getScoreColorClasses(
                          calculateAreaScore(area)
                        )} text-white border border-transparent`}
                      >
                        {calculateAreaScore(area)}/100
                      </div>
                      <div className="text-sm text-gray-400">
                        {calculateAreaScore(area) >= 80
                          ? "Strong"
                          : calculateAreaScore(area) >= 60
                          ? "Good"
                          : "Needs Work"}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    {/* Detected Findings */}
                    {detectedFindings.map((finding: any, index: number) => {
                      const cardId = `${area.id}-${finding.name}`;
                      const isExpanded = expandedCards.has(cardId);

                      return (
                        <div key={index}>
                          <Card className="p-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/50 hover:border-blue-600/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 group">
                            {/* Compact Header with Left/Right Layout */}
                            <div className="flex items-start gap-4 mb-3">
                              {/* Left Column - Visual Example (Dynamic Width) */}
                              <div
                                className={`${
                                  isExpanded ? "w-64" : "w-48"
                                } flex-shrink-0 transition-all duration-300`}
                              >
                                <DynamicImage
                                  src={getFindingImage(finding.name)}
                                  alt={`${finding.name} example`}
                                  className="rounded border border-gray-600/50"
                                  maxHeight={isExpanded ? "24rem" : "10rem"}
                                  minHeight="6rem"
                                  isExpanded={isExpanded}
                                  forceSquare={false}
                                  onError={(e) => {
                                    // Fallback to beforeAfter image if available, otherwise use fallback
                                    const target = e.target as HTMLImageElement;
                                    if (
                                      finding.beforeAfter &&
                                      finding.beforeAfter.length > 0
                                    ) {
                                      target.src =
                                        finding.beforeAfter[0].before;
                                    } else {
                                      target.src = getFallbackFindingImage();
                                    }
                                  }}
                                />
                              </div>

                              {/* Right Column - Content (Dynamic Width) */}
                              <div
                                className={`${
                                  isExpanded ? "flex-1" : "flex-1"
                                } flex flex-col transition-all duration-300 max-w-2xl`}
                              >
                                {/* Title and Description */}
                                <div className="mb-4">
                                  <h4
                                    className={`text-lg font-semibold text-white mb-2 ${
                                      hipaaMode ? "hipaa-masked" : ""
                                    }`}
                                  >
                                    {hipaaMode
                                      ? "***MASKED FINDING***"
                                      : finding.name}
                                  </h4>
                                  <p
                                    className={`text-gray-300 text-sm line-clamp-3 ${
                                      hipaaMode ? "hipaa-masked" : ""
                                    }`}
                                  >
                                    {hipaaMode
                                      ? "***Sensitive medical information has been masked for HIPAA compliance***"
                                      : finding.description}
                                  </p>
                                </div>

                                {/* Score and Severity */}
                                <div className="flex items-center space-x-3 mb-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(
                                      finding.severity
                                    )} ${hipaaMode ? "hipaa-masked" : ""}`}
                                  >
                                    {hipaaMode ? "***" : finding.severity}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <div
                                      className={`text-xl font-bold bg-gradient-to-r ${getScoreColorClasses(
                                        Math.round(finding.score)
                                      )} bg-clip-text text-transparent ${
                                        hipaaMode ? "hipaa-masked" : ""
                                      }`}
                                    >
                                      {hipaaMode
                                        ? "***"
                                        : `${Math.round(finding.score)}%`}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      Rating
                                    </div>
                                  </div>
                                </div>

                                {/* Score Bar */}
                                <div className="mb-3">
                                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                      className={`absolute inset-0 bg-gradient-to-r ${getScoreColorClasses(
                                        Math.round(finding.score)
                                      )} rounded-full`}
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${Math.round(finding.score)}%`,
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        delay: 0.5,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Expandable Content - Full Width */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{
                                    opacity: 1,
                                    height: "auto",
                                  }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-4 mt-4"
                                >
                                  {/* Causes and Symptoms */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="font-semibold text-white mb-2 text-sm">
                                        Common Causes
                                      </h5>
                                      <div className="flex flex-wrap gap-1">
                                        {finding.causes.map(
                                          (cause: any, idx: number) => (
                                            <span
                                              key={idx}
                                              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                            >
                                              {cause}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-white mb-2 text-sm">
                                        Symptoms
                                      </h5>
                                      <div className="flex flex-wrap gap-1">
                                        {finding.symptoms.map(
                                          (symptom: any, idx: number) => (
                                            <span
                                              key={idx}
                                              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                            >
                                              {symptom}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Treatment Options */}
                                  <div>
                                    <h5 className="font-semibold text-white mb-2 text-sm">
                                      Available Treatments
                                    </h5>
                                    <div className="space-y-2">
                                      {finding.treatments.map(
                                        (treatment: any, idx: number) => {
                                          const isExpanded =
                                            expandedTreatments.has(treatment);
                                          const isInPlan = addedToPlan.has(
                                            treatment
                                              .toLowerCase()
                                              .replace(/\s+/g, "-")
                                          );

                                          return (
                                            <div
                                              key={idx}
                                              className="p-3 rounded-lg border transition-all duration-200 bg-gray-700/30 border-gray-600/50 hover:border-gray-500/70"
                                            >
                                              <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                  <span className="text-sm text-white font-medium">
                                                    {treatment}
                                                  </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      toggleTreatmentExpansion(
                                                        treatment
                                                      );
                                                    }}
                                                    className="text-gray-400 hover:text-white p-1"
                                                  >
                                                    <ChevronDown
                                                      className={`w-4 h-4 transition-transform ${
                                                        isExpanded
                                                          ? "rotate-180"
                                                          : ""
                                                      }`}
                                                    />
                                                  </Button>
                                                  {onAddToTreatmentPlan && (
                                                    <Button
                                                      size="sm"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddTreatmentToPlan(
                                                          treatment
                                                        );
                                                      }}
                                                      disabled={isInPlan}
                                                      className={`text-xs ${
                                                        isInPlan
                                                          ? "bg-green-600/20 text-green-400 cursor-not-allowed"
                                                          : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                                                      }`}
                                                    >
                                                      {isInPlan ? (
                                                        <>
                                                          <CheckCircle className="w-3 h-3 mr-1" />
                                                          Added
                                                        </>
                                                      ) : (
                                                        <>
                                                          <Plus className="w-3 h-3 mr-1" />
                                                          Add to Plan
                                                        </>
                                                      )}
                                                    </Button>
                                                  )}
                                                </div>
                                              </div>

                                              {/* Expanded Treatment Details */}
                                              {isExpanded && (
                                                <motion.div
                                                  initial={{
                                                    opacity: 0,
                                                    height: 0,
                                                  }}
                                                  animate={{
                                                    opacity: 1,
                                                    height: "auto",
                                                  }}
                                                  exit={{
                                                    opacity: 0,
                                                    height: 0,
                                                  }}
                                                  className="mt-3 pt-3 border-t border-gray-600/50"
                                                >
                                                  <div className="text-sm text-gray-300 space-y-2">
                                                    <p>
                                                      <span className="font-medium text-white">
                                                        Description:
                                                      </span>{" "}
                                                      This treatment option can
                                                      help address the specific
                                                      concerns identified in
                                                      this area.
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                                      <div>
                                                        <span className="text-gray-400">
                                                          Duration:
                                                        </span>{" "}
                                                        3-6 months
                                                      </div>
                                                      <div>
                                                        <span className="text-gray-400">
                                                          Downtime:
                                                        </span>{" "}
                                                        Minimal
                                                      </div>
                                                      <div>
                                                        <span className="text-gray-400">
                                                          Price Range:
                                                        </span>{" "}
                                                        $500-1000
                                                      </div>
                                                      <div>
                                                        <span className="text-gray-400">
                                                          Invasiveness:
                                                        </span>{" "}
                                                        Low
                                                      </div>
                                                    </div>
                                                  </div>
                                                </motion.div>
                                              )}
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleCardExpansion(cardId)}
                                className="text-gray-400 hover:text-white self-start"
                              >
                                {isExpanded ? "Show Less" : "Learn More"}
                                <ChevronDown
                                  className={`w-4 h-4 ml-1 transition-transform ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </Button>

                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => onAddToShortlist(finding)}
                                  disabled={shortlist.some(
                                    (item) => item.name === finding.name
                                  )}
                                  className={`transition-all duration-300 ${
                                    shortlist.some(
                                      (item) => item.name === finding.name
                                    )
                                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-not-allowed"
                                      : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                                  }`}
                                >
                                  {shortlist.some(
                                    (item) => item.name === finding.name
                                  ) ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      <span className="hidden sm:inline">
                                        Added to Shortlist
                                      </span>
                                      <span className="sm:hidden">Added</span>
                                    </>
                                  ) : (
                                    <>
                                      <Star className="w-4 h-4 mr-1" />
                                      <span className="hidden sm:inline">
                                        Add to Shortlist
                                      </span>
                                      <span className="sm:hidden">Add</span>
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </div>
                      );
                    })}

                    {/* Findings Without Concern - Collapsible Section */}
                    {findingsWithoutConcern.length > 0 && (
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            const sectionId = `${area.id}-without-concern`;
                            setExpandedCards((prev) => {
                              const newSet = new Set(prev);
                              if (newSet.has(sectionId)) {
                                newSet.delete(sectionId);
                              } else {
                                newSet.add(sectionId);
                              }
                              return newSet;
                            });
                          }}
                          className="flex items-center justify-between w-full p-3 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform ${
                                expandedCards.has(`${area.id}-without-concern`)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                            <h4 className="text-sm font-medium text-gray-300">
                              Findings Without Concern (
                              {findingsWithoutConcern.length})
                            </h4>
                          </div>
                        </button>

                        {expandedCards.has(`${area.id}-without-concern`) && (
                          <div className="mt-3 grid grid-cols-1 gap-3">
                            {findingsWithoutConcern.map(
                              (finding: any, index: number) => (
                                <div
                                  key={index}
                                  className="p-3 bg-gray-800/20 rounded-lg border border-gray-700/30"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                      <span className="text-sm text-gray-300">
                                        {finding.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-gray-500">
                                        Not present
                                      </span>
                                      <div
                                        className={`text-xl font-bold bg-gradient-to-r ${getScoreColorClasses(
                                          100
                                        )} bg-clip-text text-transparent`}
                                      >
                                        100%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="analysis"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        {/* Analysis Filters Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Analysis Filters
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`text-gray-400 hover:text-gray-200 p-2 ${
                  showFilters ? "bg-cyan-500/20 text-cyan-400" : ""
                }`}
                title="Toggle Advanced Filters"
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSort(!showSort)}
                className={`text-gray-400 hover:text-gray-200 p-2 ${
                  showSort ? "bg-cyan-500/20 text-cyan-400" : ""
                }`}
                title="Toggle Sort"
              >
                <Sliders className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Area Filter */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-sm font-medium text-gray-300">
                  Filter by Area
                </h4>
                {!showAllAnalysisAreas ? (
                  <button
                    type="button"
                    onClick={() => setShowAllAnalysisAreas(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View All Areas
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAllAnalysisAreas(false)}
                    className="text-xs text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    ← Back to Interested Areas
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {/* All Areas Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedArea("")}
                  className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                    selectedArea === ""
                      ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                      : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
                  }`}
                >
                  <span className="text-sm">All Areas</span>
                </Button>

                {(showAllAnalysisAreas || interestedAreas.length === 0
                  ? filteredAnalysisAreas
                  : filteredAnalysisAreas.filter((area) =>
                      interestedAreas.includes(area.id)
                    )
                )
                  .sort((a, b) => calculateAreaScore(a) - calculateAreaScore(b))
                  .map((area) => (
                    <Button
                      key={area.id}
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setSelectedArea(selectedArea === area.id ? "" : area.id)
                      }
                      className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                        selectedArea === area.id
                          ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                          : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
                      }`}
                    >
                      <span className="text-sm">{area.name}</span>
                      <span
                        className={`ml-2 text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getScoreColorClasses(
                          calculateAreaScore(area)
                        )} text-white border border-transparent`}
                      >
                        {calculateAreaScore(area)}
                      </span>
                      {!showAllAnalysisAreas &&
                        interestedAreas.includes(area.id) && (
                          <span className="ml-1 text-xs text-pink-400">★</span>
                        )}
                    </Button>
                  ))}
              </div>
              {!showAllAnalysisAreas && interestedAreas.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    Showing {interestedAreas.length} areas of interest (marked
                    with ★)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter and Sort Content */}
        {(showFilters || showSort) && (
          <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50 mb-4">
            {/* Filters Section */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Filter Findings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Severity
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Severities" },
                        { value: "mild", label: "Mild" },
                        { value: "moderate", label: "Moderate" },
                        { value: "severe", label: "Severe" },
                      ]}
                      value={severityFilter}
                      onChange={setSeverityFilter}
                      placeholder="All Severities"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Rating Range
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Ratings" },
                        { value: "high", label: "High (80-100)" },
                        { value: "medium", label: "Medium (60-79)" },
                        { value: "low", label: "Low (0-59)" },
                      ]}
                      value={scoreRangeFilter}
                      onChange={setScoreRangeFilter}
                      placeholder="All Ratings"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Shortlist Status
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Findings" },
                        { value: "shortlisted", label: "Shortlisted" },
                        { value: "not-shortlisted", label: "Not Shortlisted" },
                      ]}
                      value={shortlistFilter}
                      onChange={setShortlistFilter}
                      placeholder="All Findings"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Age Group
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Age Groups" },
                        { value: "20-30", label: "20-30 years" },
                        { value: "30-40", label: "30-40 years" },
                        { value: "40-50", label: "40-50 years" },
                        { value: "50-60", label: "50-60 years" },
                        { value: "60+", label: "60+ years" },
                      ]}
                      value={ageGroupFilter}
                      onChange={setAgeGroupFilter}
                      placeholder="All Age Groups"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Commonality
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Commonality" },
                        { value: "high", label: "High (70%+)" },
                        { value: "medium", label: "Medium (40-69%)" },
                        { value: "low", label: "Low (<40%)" },
                      ]}
                      value={commonalityFilter}
                      onChange={setCommonalityFilter}
                      placeholder="All Commonality"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Treatment Options
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Treatment Counts" },
                        { value: "many", label: "Many (5+ options)" },
                        { value: "some", label: "Some (2-4 options)" },
                        { value: "few", label: "Few (1-2 options)" },
                      ]}
                      value={treatmentCountFilter}
                      onChange={setTreatmentCountFilter}
                      placeholder="All Treatment Counts"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Sort Section */}
            {showSort && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Sort Findings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Sort By
                    </label>
                    <CustomSelect
                      options={[
                        { value: "score", label: "Rating" },
                        { value: "severity", label: "Severity" },
                        { value: "name", label: "Name" },
                        { value: "commonality", label: "Commonality" },
                        { value: "age-group", label: "Age Group" },
                        { value: "treatment-count", label: "Treatment Count" },
                        { value: "causes-count", label: "Causes Count" },
                        { value: "symptoms-count", label: "Symptoms Count" },
                      ]}
                      value={sortBy}
                      onChange={setSortBy}
                      placeholder="Sort By"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Sort Order
                    </label>
                    <CustomSelect
                      options={[
                        { value: "desc", label: "Descending (High to Low)" },
                        { value: "asc", label: "Ascending (Low to High)" },
                      ]}
                      value={sortOrder}
                      onChange={setSortOrder}
                      placeholder="Sort Order"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        )}

        {/* Sticky Area Title - Only show when an area is selected and visible */}
        {currentVisibleArea && selectedArea && (
          <motion.div
            key={currentVisibleArea}
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/60 py-6 mb-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.h2
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {
                      analysisAreas.find(
                        (area) => area.id === currentVisibleArea
                      )?.name
                    }{" "}
                    Findings
                  </motion.h2>
                </div>
                {(() => {
                  const currentArea = analysisAreas.find(
                    (area) => area.id === currentVisibleArea
                  );
                  if (currentArea) {
                    const { detectedFindings } =
                      getFilteredAndSortedFindings(currentArea);
                    return detectedFindings.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          onClick={() => {
                            detectedFindings.forEach((finding: any) => {
                              if (
                                !shortlist.some(
                                  (item) => item.name === finding.name
                                )
                              ) {
                                onAddToShortlist(finding);
                              }
                            });
                          }}
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Star className="w-4 h-4 mr-1" />
                          </motion.div>
                          Add All
                        </Button>
                      </motion.div>
                    ) : null;
                  }
                  return null;
                })()}
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getScoreColorClasses(
                    calculateAreaScore(
                      analysisAreas.find(
                        (area) => area.id === currentVisibleArea
                      ) || analysisAreas[0]
                    )
                  )} text-white border border-transparent`}
                >
                  {calculateAreaScore(
                    analysisAreas.find(
                      (area) => area.id === currentVisibleArea
                    ) || analysisAreas[0]
                  )}
                  /100
                </div>
                <div className="text-sm text-gray-400">
                  {calculateAreaScore(
                    analysisAreas.find(
                      (area) => area.id === currentVisibleArea
                    ) || analysisAreas[0]
                  ) >= 80
                    ? "Strong"
                    : calculateAreaScore(
                        analysisAreas.find(
                          (area) => area.id === currentVisibleArea
                        ) || analysisAreas[0]
                      ) >= 60
                    ? "Good"
                    : "Needs Work"}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Findings Cards - Only show selected area or all if none selected */}
        <div className="space-y-6">
          {filteredAnalysisAreas
            .filter((area) => {
              // Filter by selected area
              if (selectedArea && area.id !== selectedArea) return false;

              // If shortlist items are selected, only show areas that have matching findings
              if (selectedShortlistItems.size > 0) {
                const hasMatchingFindings = area.findings.some((finding: any) =>
                  selectedShortlistItems.has(finding.name)
                );
                return hasMatchingFindings;
              }

              return true;
            })
            .map((area, areaIndex) => {
              const { detectedFindings, findingsWithoutConcern } =
                getFilteredAndSortedFindings(area);
              const shortlistedCount = detectedFindings.filter((finding: any) =>
                shortlist.some((item) => item.name === finding.name)
              ).length;
              const averageCommonality =
                detectedFindings.length > 0
                  ? Math.round(
                      detectedFindings.reduce(
                        (sum: number, finding: any) =>
                          sum + finding.commonality,
                        0
                      ) / detectedFindings.length
                    )
                  : 0;

              return (
                <div key={area.id} className="space-y-2">
                  {/* Section Heading - Only visible when area is selected or no filter is applied */}
                  <div
                    className={`sticky top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/60 py-4 mb-4 shadow-lg ${
                      currentVisibleArea === area.id
                        ? "hidden"
                        : selectedArea && selectedArea !== area.id
                        ? "hidden"
                        : "opacity-100"
                    } transition-all duration-300`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: areaIndex * 0.1 }}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>
                          <h2 className="text-3xl font-bold text-white">
                            {area.name} Findings
                          </h2>
                        </div>
                        {detectedFindings.length > 0 && (
                          <Button
                            size="sm"
                            onClick={() => {
                              detectedFindings.forEach((finding: any) => {
                                if (
                                  !shortlist.some(
                                    (item) => item.name === finding.name
                                  )
                                ) {
                                  onAddToShortlist(finding);
                                }
                              });
                            }}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Add All
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getScoreColorClasses(
                            calculateAreaScore(area)
                          )} text-white border border-transparent`}
                        >
                          {calculateAreaScore(area)}/100
                        </div>
                        <div className="text-sm text-gray-400">
                          {calculateAreaScore(area) >= 80
                            ? "Strong"
                            : calculateAreaScore(area) >= 60
                            ? "Good"
                            : "Needs Work"}
                        </div>
                        <div className="text-sm text-gray-400">
                          {shortlistedCount}/{detectedFindings.length}{" "}
                          shortlisted
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Findings Cards */}
                  <div
                    className="space-y-2"
                    ref={(el) => {
                      areaRefs.current[area.id] = el;
                    }}
                    data-area-id={area.id}
                  >
                    <div className="grid grid-cols-1 gap-6">
                      {detectedFindings.map((finding: any, index: number) => {
                        const cardId = `${area.id}-${finding.name}`;
                        const isExpanded = expandedCards.has(cardId);
                        const isHidden = isFindingHidden(finding.name);

                        // Apply severity scaling if available
                        const severityMapping = getSeverityMapping?.(
                          finding.name,
                          finding.area
                        );
                        const scaledFinding = getScaledFinding
                          ? getScaledFinding(finding, severityMapping)
                          : finding;

                        return (
                          <div key={index}>
                            <Card
                              className={`p-3 transition-all duration-300 backdrop-blur-sm group ${
                                isHidden
                                  ? "bg-gradient-to-r from-gray-800/20 to-gray-900/20 border-gray-600/30 opacity-50"
                                  : "bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/50 hover:border-blue-600/70 hover:shadow-xl hover:shadow-blue-500/20"
                              }`}
                            >
                              {/* Compact Header with Left/Right Layout */}
                              <div className="flex items-start gap-4 mb-3">
                                {/* Left Column - Visual Example (Dynamic Width) */}
                                <div
                                  className={`${
                                    isExpanded ? "w-64" : "w-48"
                                  } flex-shrink-0 transition-all duration-300`}
                                >
                                  <DynamicImage
                                    src={getFindingImage(finding.name)}
                                    alt={`${finding.name} example`}
                                    className="rounded border border-gray-600/50"
                                    maxHeight={isExpanded ? "24rem" : "10rem"}
                                    minHeight="6rem"
                                    isExpanded={isExpanded}
                                    forceSquare={false}
                                    onError={(e) => {
                                      // Fallback to beforeAfter image if available, otherwise use fallback
                                      const target =
                                        e.target as HTMLImageElement;
                                      if (
                                        finding.beforeAfter &&
                                        finding.beforeAfter.length > 0
                                      ) {
                                        target.src =
                                          finding.beforeAfter[0].before;
                                      } else {
                                        target.src = getFallbackFindingImage();
                                      }
                                    }}
                                  />
                                </div>

                                {/* Right Column - Content (Dynamic Width) */}
                                <div
                                  className={`${
                                    isExpanded ? "flex-1" : "flex-1"
                                  } flex flex-col transition-all duration-300`}
                                >
                                  {/* Title and Description */}
                                  <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h4
                                        className={`text-lg font-semibold ${
                                          isHidden
                                            ? "text-gray-400"
                                            : "text-white"
                                        } ${hipaaMode ? "hipaa-masked" : ""}`}
                                      >
                                        {hipaaMode
                                          ? "***MASKED FINDING***"
                                          : finding.name}
                                      </h4>
                                      {isHidden && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-gray-500 text-gray-400">
                                          Hidden
                                        </span>
                                      )}
                                    </div>
                                    <p
                                      className={`text-sm line-clamp-3 ${
                                        isHidden
                                          ? "text-gray-500"
                                          : "text-gray-300"
                                      } ${hipaaMode ? "hipaa-masked" : ""}`}
                                    >
                                      {hipaaMode
                                        ? "***Sensitive medical information has been masked for HIPAA compliance***"
                                        : finding.description}
                                    </p>
                                  </div>

                                  {/* Score and Severity */}
                                  <div className="flex items-center space-x-3 mb-3">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs border ${
                                        isHidden
                                          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                          : getSeverityColor(
                                              scaledFinding.severity
                                            )
                                      } ${hipaaMode ? "hipaa-masked" : ""}`}
                                    >
                                      {hipaaMode
                                        ? "***"
                                        : scaledFinding.severity}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                      <div
                                        className={`text-xl font-bold ${
                                          isHidden
                                            ? "text-gray-400"
                                            : `bg-gradient-to-r ${getScoreColorClasses(
                                                scaledFinding.score
                                              )} bg-clip-text text-transparent`
                                        } ${hipaaMode ? "hipaa-masked" : ""}`}
                                      >
                                        {hipaaMode
                                          ? "***"
                                          : `${scaledFinding.score}%`}
                                      </div>
                                      <div
                                        className={`text-xs ${
                                          isHidden
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        Rating
                                      </div>
                                    </div>
                                  </div>

                                  {/* Score Bar */}
                                  <div className="mb-3">
                                    <div
                                      className={`relative h-2 rounded-full overflow-hidden ${
                                        isHidden ? "bg-gray-600" : "bg-gray-700"
                                      }`}
                                    >
                                      <motion.div
                                        className={`absolute inset-0 rounded-full ${
                                          isHidden
                                            ? "bg-gray-500"
                                            : `bg-gradient-to-r ${getScoreColorClasses(
                                                scaledFinding.score
                                              )}`
                                        }`}
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${scaledFinding.score}%`,
                                        }}
                                        transition={{
                                          duration: 1.5,
                                          delay: 0.5,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Expandable Content - Full Width */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{
                                      opacity: 1,
                                      height: "auto",
                                    }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4 mt-4"
                                  >
                                    {/* Causes and Symptoms */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <h5 className="font-semibold text-white mb-2 text-sm">
                                          Common Causes
                                        </h5>
                                        <div className="flex flex-wrap gap-1">
                                          {finding.causes.map(
                                            (cause: any, idx: number) => (
                                              <span
                                                key={idx}
                                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                              >
                                                {cause}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                      <div>
                                        <h5 className="font-semibold text-white mb-2 text-sm">
                                          Symptoms
                                        </h5>
                                        <div className="flex flex-wrap gap-1">
                                          {finding.symptoms.map(
                                            (symptom: any, idx: number) => (
                                              <span
                                                key={idx}
                                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                              >
                                                {symptom}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Treatment Options */}
                                    <div>
                                      <h5 className="font-semibold text-white mb-2 text-sm">
                                        Available Treatments
                                      </h5>
                                      <div className="space-y-2">
                                        {finding.treatments.map(
                                          (treatment: any, idx: number) => {
                                            const isExpanded =
                                              expandedTreatments.has(treatment);
                                            const isInPlan = addedToPlan.has(
                                              treatment
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")
                                            );

                                            return (
                                              <div
                                                key={idx}
                                                className="p-3 rounded-lg border transition-all duration-200 bg-gray-700/30 border-gray-600/50 hover:border-gray-500/70"
                                              >
                                                <div className="flex items-center justify-between">
                                                  <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-white font-medium">
                                                      {treatment}
                                                    </span>
                                                  </div>
                                                  <div className="flex items-center space-x-2">
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleTreatmentExpansion(
                                                          treatment
                                                        );
                                                      }}
                                                      className="text-gray-400 hover:text-white p-1"
                                                    >
                                                      <ChevronDown
                                                        className={`w-4 h-4 transition-transform ${
                                                          isExpanded
                                                            ? "rotate-180"
                                                            : ""
                                                        }`}
                                                      />
                                                    </Button>
                                                    {onAddToTreatmentPlan && (
                                                      <Button
                                                        size="sm"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleAddTreatmentToPlan(
                                                            treatment
                                                          );
                                                        }}
                                                        disabled={isInPlan}
                                                        className={`text-xs ${
                                                          isInPlan
                                                            ? "bg-green-600/20 text-green-400 cursor-not-allowed"
                                                            : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                                                        }`}
                                                      >
                                                        {isInPlan ? (
                                                          <>
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            Added
                                                          </>
                                                        ) : (
                                                          <>
                                                            <Plus className="w-3 h-3 mr-1" />
                                                            Add to Plan
                                                          </>
                                                        )}
                                                      </Button>
                                                    )}
                                                  </div>
                                                </div>

                                                {/* Expanded Treatment Details */}
                                                {isExpanded && (
                                                  <motion.div
                                                    initial={{
                                                      opacity: 0,
                                                      height: 0,
                                                    }}
                                                    animate={{
                                                      opacity: 1,
                                                      height: "auto",
                                                    }}
                                                    exit={{
                                                      opacity: 0,
                                                      height: 0,
                                                    }}
                                                    className="mt-3 pt-3 border-t border-gray-600/50"
                                                  >
                                                    <div className="text-sm text-gray-300 space-y-2">
                                                      <p>
                                                        <span className="font-medium text-white">
                                                          Description:
                                                        </span>{" "}
                                                        This treatment option
                                                        can help address the
                                                        specific concerns
                                                        identified in this area.
                                                      </p>
                                                      <div className="grid grid-cols-2 gap-4 text-xs">
                                                        <div>
                                                          <span className="text-gray-400">
                                                            Duration:
                                                          </span>{" "}
                                                          3-6 months
                                                        </div>
                                                        <div>
                                                          <span className="text-gray-400">
                                                            Downtime:
                                                          </span>{" "}
                                                          Minimal
                                                        </div>
                                                        <div>
                                                          <span className="text-gray-400">
                                                            Price Range:
                                                          </span>{" "}
                                                          $500-1000
                                                        </div>
                                                        <div>
                                                          <span className="text-gray-400">
                                                            Invasiveness:
                                                          </span>{" "}
                                                          Low
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleCardExpansion(cardId)}
                                  className="text-gray-400 hover:text-white self-start"
                                >
                                  {isExpanded ? "Show Less" : "Learn More"}
                                  <ChevronDown
                                    className={`w-4 h-4 ml-1 transition-transform ${
                                      isExpanded ? "rotate-180" : ""
                                    }`}
                                  />
                                </Button>

                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    onClick={() => onAddToShortlist(finding)}
                                    disabled={shortlist.some(
                                      (item) => item.name === finding.name
                                    )}
                                    className={`transition-all duration-300 ${
                                      shortlist.some(
                                        (item) => item.name === finding.name
                                      )
                                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-not-allowed"
                                        : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                                    }`}
                                  >
                                    {shortlist.some(
                                      (item) => item.name === finding.name
                                    ) ? (
                                      <>
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        <span className="hidden sm:inline">
                                          Added to Shortlist
                                        </span>
                                        <span className="sm:hidden">Added</span>
                                      </>
                                    ) : (
                                      <>
                                        <Star className="w-4 h-4 mr-1" />
                                        <span className="hidden sm:inline">
                                          Add to Shortlist
                                        </span>
                                        <span className="sm:hidden">Add</span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </div>
                        );
                      })}

                      {/* Findings Without Concern - Collapsible Section */}
                      {findingsWithoutConcern.length > 0 && (
                        <div className="mt-6">
                          <button
                            onClick={() => {
                              const sectionId = `${area.id}-without-concern`;
                              setExpandedCards((prev) => {
                                const newSet = new Set(prev);
                                if (newSet.has(sectionId)) {
                                  newSet.delete(sectionId);
                                } else {
                                  newSet.add(sectionId);
                                }
                                return newSet;
                              });
                            }}
                            className="flex items-center justify-between w-full p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <ChevronDown
                                className={`w-4 h-4 text-gray-400 transition-transform ${
                                  expandedCards.has(
                                    `${area.id}-without-concern`
                                  )
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                              <h4 className="text-sm font-medium text-gray-300">
                                Findings Without Concern (
                                {findingsWithoutConcern.length})
                              </h4>
                            </div>
                          </button>

                          {expandedCards.has(`${area.id}-without-concern`) && (
                            <div className="mt-4 grid grid-cols-1 gap-3">
                              {findingsWithoutConcern.map(
                                (finding: any, index: number) => (
                                  <div
                                    key={index}
                                    className="p-4 bg-gray-800/20 rounded-lg border border-gray-700/30"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-300">
                                          {finding.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500">
                                          Not present
                                        </span>
                                        <div
                                          className={`text-xl font-bold bg-gradient-to-r ${getScoreColorClasses(
                                            100
                                          )} bg-clip-text text-transparent`}
                                        >
                                          100%
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
