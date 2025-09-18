"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ChevronDown,
  Heart,
  CheckCircle,
  Filter,
  Sliders,
  X,
  Plus,
} from "lucide-react";
import { AnalysisArea, Finding } from "@/types/patientTypes";
import { getFindingImage, getFallbackFindingImage } from "@/lib/findingImages";

interface AnalysisViewProps {
  analysisAreas: AnalysisArea[];
  patient: any;
  shortlist: any[];
  onAddToShortlist: (finding: Finding) => void;
  onAddToTreatmentPlan?: (treatment: any) => void;
  addedToPlan?: Set<string>;
  showFiltersOnly?: boolean;
  showContentOnly?: boolean;
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
  const [selectedFindings, setSelectedFindings] = useState<Set<string>>(
    new Set()
  );
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Get interested areas based on patient findings
  const getInterestedAreas = () => {
    const interestedAreas = new Set<string>();
    patient.findings.forEach((finding: string) => {
      const area = analysisAreas.find((area) =>
        area.findings.some((f) => f.name === finding)
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
    const areaFindings = area.findings.filter((finding: any) =>
      patient.findings.includes(finding.name)
    );

    if (areaFindings.length === 0) return 100; // Perfect score if no issues

    const totalScore = areaFindings.reduce(
      (sum: number, finding: any) => sum + finding.score,
      0
    );
    const averageScore = totalScore / areaFindings.length;
    return Math.round(averageScore);
  };

  // Show only top 3 areas by score by default
  const interestedAreas = analysisAreas
    .filter((area) => allInterestedAreas.includes(area.id))
    .sort((a, b) => calculateAreaScore(b) - calculateAreaScore(a))
    .slice(0, 3)
    .map((area) => area.id);

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

  // Filter and sort findings
  const getFilteredAndSortedFindings = (area: any) => {
    let findings = area.findings.filter((finding: any) => {
      // Area filter
      if (selectedArea && area.id !== selectedArea) return false;

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

    // Sort findings
    findings.sort((a: any, b: any) => {
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

    return findings;
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

  const toggleFindingSelection = (findingName: string) => {
    setSelectedFindings((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(findingName)) {
        newSet.delete(findingName);
      } else {
        newSet.add(findingName);
      }
      return newSet;
    });
  };

  const selectAllFindings = (findings: any[]) => {
    const allFindingNames = findings.map((f) => f.name);
    setSelectedFindings(new Set(allFindingNames));
  };

  const clearSelection = () => {
    setSelectedFindings(new Set());
  };

  const bulkAddToShortlist = () => {
    selectedFindings.forEach((findingName) => {
      const finding = analysisAreas
        .flatMap((area) => area.findings)
        .find((f) => f.name === findingName);
      if (finding) {
        onAddToShortlist(finding);
      }
    });
    clearSelection();
  };

  // If showing only filters, return just the filter section
  if (showFiltersOnly) {
    return (
      <div className="space-y-4">
        {/* Area Navigation - Lower Level Selectors */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
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

            {(showAllAnalysisAreas
              ? analysisAreas
              : analysisAreas.filter((area) =>
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
          {!showAllAnalysisAreas && (
            <p className="text-xs text-gray-500 mt-2">
              Showing {interestedAreas.length} areas of interest (marked with ★)
            </p>
          )}
        </div>

        {/* Filters and Sort Section */}
        <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Analysis Filters & Sort
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`text-gray-400 hover:text-white ${
                  showFilters ? "bg-cyan-500/20 text-cyan-400" : ""
                }`}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSort(!showSort)}
                className={`text-gray-400 hover:text-white ${
                  showSort ? "bg-cyan-500/20 text-cyan-400" : ""
                }`}
              >
                <Sliders className="w-4 h-4 mr-1" />
                Sort
              </Button>
            </div>
          </div>

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
      </div>
    );
  }

  // If showing only content, return just the findings cards
  if (showContentOnly) {
    return (
      <div className="space-y-6">
        {/* Findings Cards - Only show selected area or all if none selected */}
        <div className="space-y-6">
          {analysisAreas
            .filter((area) => !selectedArea || area.id === selectedArea)
            .map((area) => {
              const filteredFindings = getFilteredAndSortedFindings(area);
              const shortlistedCount = filteredFindings.filter((finding: any) =>
                shortlist.some((item) => item.name === finding.name)
              ).length;

              return (
                <div key={area.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {area.name} Findings
                    </h3>
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

                  {/* Quick Stats - Compressed */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-2xl font-bold text-white">
                        {filteredFindings.length}
                      </div>
                      <div className="text-xs text-gray-400">
                        Total Findings
                      </div>
                    </div>
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-2xl font-bold text-pink-400">
                        {shortlistedCount}
                      </div>
                      <div className="text-xs text-gray-400">Shortlisted</div>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  {filteredFindings.length > 0 && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-700/20 rounded-lg border border-gray-600/30">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => selectAllFindings(filteredFindings)}
                          className="text-gray-400 hover:text-white"
                        >
                          Select All
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearSelection}
                          className="text-gray-400 hover:text-white"
                        >
                          Clear Selection
                        </Button>
                        <span className="text-sm text-gray-400">
                          {selectedFindings.size} selected
                        </span>
                      </div>
                      {selectedFindings.size > 0 && (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={bulkAddToShortlist}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            Add Selected to Shortlist
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4">
                    {filteredFindings.map((finding: any, index: number) => {
                      const cardId = `${area.id}-${finding.name}`;
                      const isExpanded = expandedCards.has(cardId);
                      const isSelected = selectedFindings.has(finding.name);

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className={`p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/50 hover:border-blue-600/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 group ${
                              isSelected
                                ? "ring-2 ring-blue-500/50 bg-blue-500/10"
                                : ""
                            }`}
                          >
                            {/* Compact Header with Left/Right Layout */}
                            <div className="flex items-start gap-4 mb-3">
                              {/* Selection Checkbox */}
                              <div className="flex items-center pt-2">
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                                    isSelected
                                      ? "bg-blue-500 border-blue-500"
                                      : "border-gray-400 hover:border-gray-300"
                                  }`}
                                  onClick={() =>
                                    toggleFindingSelection(finding.name)
                                  }
                                >
                                  {isSelected && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>

                              {/* Left Column - Visual Example (Half Width) */}
                              <div className="w-1/2">
                                <div className="relative h-64">
                                  <img
                                    src={getFindingImage(finding.name)}
                                    alt={`${finding.name} example`}
                                    className="w-full h-full object-contain rounded border border-gray-600/50"
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
                              </div>

                              {/* Right Column - Content (Half Width) */}
                              <div className="w-1/2 h-64 flex flex-col justify-between">
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
                                        finding.score
                                      )} bg-clip-text text-transparent ${
                                        hipaaMode ? "hipaa-masked" : ""
                                      }`}
                                    >
                                      {hipaaMode ? "***" : `${finding.score}%`}
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
                                        finding.score
                                      )} rounded-full`}
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${finding.score}%`,
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        delay: 0.5,
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* Combined Commonality and Educational Info */}
                                <div className="mb-3">
                                  <div className="p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg">
                                    <p className="text-sm text-gray-300">
                                      <span className="font-semibold text-blue-400">
                                        {finding.commonality}%
                                      </span>{" "}
                                      of people in your age group (
                                      {finding.ageGroup}) experience this.{" "}
                                      {finding.educational
                                        .split(". ")
                                        .slice(1)
                                        .join(". ")}
                                    </p>
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
                            <div className="flex items-center justify-between mt-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleCardExpansion(cardId)}
                                className="text-gray-400 hover:text-white"
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
                                      Added to Shortlist
                                    </>
                                  ) : (
                                    <>
                                      <Heart className="w-4 h-4 mr-1" />
                                      Add to Shortlist
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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
        className="space-y-6"
      >
        {/* Area Navigation - Lower Level Selectors */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
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

            {(showAllAnalysisAreas
              ? analysisAreas
              : analysisAreas.filter((area) =>
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
          {!showAllAnalysisAreas && (
            <p className="text-xs text-gray-500 mt-2">
              Showing {interestedAreas.length} areas of interest (marked with ★)
            </p>
          )}
        </div>

        {/* Filters and Sort Section */}
        <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Analysis Filters & Sort
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`text-gray-400 hover:text-white ${
                  showFilters ? "bg-cyan-500/20 text-cyan-400" : ""
                }`}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSort(!showSort)}
                className={`text-gray-400 hover:text-white ${
                  showSort ? "bg-cyan-500/20 text-cyan-400" : ""
                }`}
              >
                <Sliders className="w-4 h-4 mr-1" />
                Sort
              </Button>
            </div>
          </div>

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

        {/* Findings Cards - Only show selected area or all if none selected */}
        <div className="space-y-6">
          {analysisAreas
            .filter((area) => !selectedArea || area.id === selectedArea)
            .map((area) => {
              const filteredFindings = getFilteredAndSortedFindings(area);
              const shortlistedCount = filteredFindings.filter((finding: any) =>
                shortlist.some((item) => item.name === finding.name)
              ).length;
              const averageCommonality =
                filteredFindings.length > 0
                  ? Math.round(
                      filteredFindings.reduce(
                        (sum: number, finding: any) =>
                          sum + finding.commonality,
                        0
                      ) / filteredFindings.length
                    )
                  : 0;

              return (
                <div key={area.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {area.name} Findings
                    </h3>
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

                  {/* Quick Stats - Compressed */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-2xl font-bold text-white">
                        {filteredFindings.length}
                      </div>
                      <div className="text-xs text-gray-400">
                        Total Findings
                      </div>
                    </div>
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-2xl font-bold text-pink-400">
                        {shortlistedCount}
                      </div>
                      <div className="text-xs text-gray-400">Shortlisted</div>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  {filteredFindings.length > 0 && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-700/20 rounded-lg border border-gray-600/30">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => selectAllFindings(filteredFindings)}
                          className="text-gray-400 hover:text-white"
                        >
                          Select All
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearSelection}
                          className="text-gray-400 hover:text-white"
                        >
                          Clear Selection
                        </Button>
                        <span className="text-sm text-gray-400">
                          {selectedFindings.size} selected
                        </span>
                      </div>
                      {selectedFindings.size > 0 && (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={bulkAddToShortlist}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            Add Selected to Shortlist
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4">
                    {filteredFindings.map((finding: any, index: number) => {
                      const cardId = `${area.id}-${finding.name}`;
                      const isExpanded = expandedCards.has(cardId);
                      const isSelected = selectedFindings.has(finding.name);

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className={`p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/50 hover:border-blue-600/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 group ${
                              isSelected
                                ? "ring-2 ring-blue-500/50 bg-blue-500/10"
                                : ""
                            }`}
                          >
                            {/* Compact Header with Left/Right Layout */}
                            <div className="flex items-start gap-4 mb-3">
                              {/* Selection Checkbox */}
                              <div className="flex items-center pt-2">
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                                    isSelected
                                      ? "bg-blue-500 border-blue-500"
                                      : "border-gray-400 hover:border-gray-300"
                                  }`}
                                  onClick={() =>
                                    toggleFindingSelection(finding.name)
                                  }
                                >
                                  {isSelected && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>

                              {/* Left Column - Visual Example (Half Width) */}
                              <div className="w-1/2">
                                <div className="relative h-64">
                                  <img
                                    src={getFindingImage(finding.name)}
                                    alt={`${finding.name} example`}
                                    className="w-full h-full object-contain rounded border border-gray-600/50"
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
                              </div>

                              {/* Right Column - Content (Half Width) */}
                              <div className="w-1/2 h-64 flex flex-col justify-between">
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
                                        finding.score
                                      )} bg-clip-text text-transparent ${
                                        hipaaMode ? "hipaa-masked" : ""
                                      }`}
                                    >
                                      {hipaaMode ? "***" : `${finding.score}%`}
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
                                        finding.score
                                      )} rounded-full`}
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${finding.score}%`,
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        delay: 0.5,
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* Combined Commonality and Educational Info */}
                                <div className="mb-3">
                                  <div className="p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg">
                                    <p className="text-sm text-gray-300">
                                      <span className="font-semibold text-blue-400">
                                        {finding.commonality}%
                                      </span>{" "}
                                      of people in your age group (
                                      {finding.ageGroup}) experience this.{" "}
                                      {finding.educational
                                        .split(". ")
                                        .slice(1)
                                        .join(". ")}
                                    </p>
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
                            <div className="flex items-center justify-between mt-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleCardExpansion(cardId)}
                                className="text-gray-400 hover:text-white"
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
                                      Added to Shortlist
                                    </>
                                  ) : (
                                    <>
                                      <Heart className="w-4 h-4 mr-1" />
                                      Add to Shortlist
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
