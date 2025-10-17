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
  Search,
  X,
  Plus,
  Eye,
  EyeOff,
  Smile,
  Frown,
  Zap,
  Circle,
  Square,
  Triangle,
  Heart,
  Activity,
  AlertTriangle,
  Target,
  Droplets,
  Sun,
  Moon,
  Shield,
  Flame,
  Wind,
  Waves,
  Mountain,
  Sparkles,
  Scissors,
  Layers,
  LineChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus as PlusIcon,
  X as XIcon,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  Clock,
  Calendar,
  MapPin,
  Navigation,
  Compass,
  Focus,
  Camera,
  Image,
  Palette,
  Brush,
  Wrench,
  Settings,
  Hammer,
  Wrench as WrenchIcon,
  Cog,
  Zap as ZapIcon,
  Star as StarIcon,
  Diamond,
  Gem,
  Crown,
  Award,
  Medal,
  Trophy,
  Gift,
  Box,
  Package,
  Container,
  Briefcase,
  Folder,
  File,
  Clipboard,
  List,
  Grid,
  Layout,
  Frame,
} from "lucide-react";
import { AnalysisArea, Finding } from "@/types/patientTypes";
import { getFindingImage, getFallbackFindingImage } from "@/lib/findingImages";
import { DynamicImage } from "@/components/ui/DynamicImage";
import {
  SeverityScale,
  SeverityScaleCompact,
  SeverityText,
} from "@/components/ui/SeverityScale";

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
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [shortlistFilter, setShortlistFilter] = useState("");
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

  // Get interested areas based on patient findings
  const getInterestedAreas = () => {
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
      .filter((area) => area.findings.length > 0);
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
        return "text-green-400 bg-gray-400/20 border-green-500/50";
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

  // Icon mapping for aesthetic findings
  const getFindingIcon = (findingName: string) => {
    const name = findingName.toLowerCase();

    // Eye-related findings
    if (
      name.includes("eye") ||
      name.includes("eyelid") ||
      name.includes("under eye")
    ) {
      return Eye;
    }

    // Forehead and brow
    if (
      name.includes("forehead") ||
      name.includes("brow") ||
      name.includes("glabella")
    ) {
      return Activity;
    }

    // Cheek and face structure
    if (
      name.includes("cheek") ||
      name.includes("mid cheek") ||
      name.includes("hollow")
    ) {
      return Heart;
    }

    // Nose
    if (
      name.includes("nose") ||
      name.includes("dorsal") ||
      name.includes("crooked")
    ) {
      return Triangle;
    }

    // Lips and mouth
    if (
      name.includes("lip") ||
      name.includes("mouth") ||
      name.includes("philtrum")
    ) {
      return Smile;
    }

    // Chin and jaw
    if (
      name.includes("chin") ||
      name.includes("jaw") ||
      name.includes("prejowl") ||
      name.includes("submental")
    ) {
      return Square;
    }

    // Skin texture and spots
    if (
      name.includes("spot") ||
      name.includes("pigment") ||
      name.includes("dark") ||
      name.includes("red")
    ) {
      return Circle;
    }

    // Wrinkles and lines
    if (
      name.includes("wrinkle") ||
      name.includes("line") ||
      name.includes("fold") ||
      name.includes("sulcus")
    ) {
      return Waves;
    }

    // Volume and fullness
    if (
      name.includes("volume") ||
      name.includes("fullness") ||
      name.includes("flattening")
    ) {
      return Layers;
    }

    // Skin issues
    if (
      name.includes("whitehead") ||
      name.includes("acne") ||
      name.includes("blemish")
    ) {
      return AlertCircle;
    }

    // Dryness and texture
    if (
      name.includes("dry") ||
      name.includes("texture") ||
      name.includes("rough")
    ) {
      return Droplets;
    }

    // Masseter and muscle
    if (
      name.includes("masseter") ||
      name.includes("muscle") ||
      name.includes("hypertrophy")
    ) {
      return Target;
    }

    // Temporal area (specific case)
    if (name.includes("temporal")) {
      return Compass;
    }

    // Retruded or structural issues
    if (name.includes("retruded") || name.includes("structural")) {
      return Navigation;
    }

    // Default fallback
    return AlertTriangle;
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
    setShortlistFilter("");
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
                  className={`text-gray-600 hover:text-gray-900 p-2 ${
                    showFilters ? "text-orange-600" : ""
                  }`}
                  style={{
                    backgroundColor: showFilters ? "#F3F4F6" : "#F3F4F6",
                    borderColor: "#E5E7EB",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                  title="Toggle Advanced Filters"
                >
                  <Filter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSort(!showSort)}
                  className={`text-gray-600 hover:text-gray-900 p-2 ${
                    showSort ? "text-orange-600" : ""
                  }`}
                  style={{
                    backgroundColor: showSort ? "#F3F4F6" : "#F3F4F6",
                    borderColor: "#E5E7EB",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                  title="Toggle Sort"
                >
                  <Sliders className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(!showSearch)}
                  className={`text-gray-600 hover:text-gray-900 p-2 ${
                    showSearch ? "text-orange-600" : ""
                  }`}
                  style={{
                    backgroundColor: showSearch ? "#F3F4F6" : "#F3F4F6",
                    borderColor: "#E5E7EB",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                  title="Toggle Search"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="h-6 w-px bg-gray-500 mx-4 mt-6"></div>

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
                    className="text-xs text-gray-300 hover:text-gray-200 transition-colors"
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
                      ? "bg-medspa-primary text-white border-medspa-primary shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-gray-300 hover:border-gray-400 hover:shadow-md"
                  }`}
                >
                  <span className="text-sm">All Areas</span>
                </Button>

                {(showAllAnalysisAreas
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
                          ? "bg-medspa-primary text-white border-medspa-primary shadow-sm"
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-gray-300 hover:border-gray-400 hover:shadow-md"
                      }`}
                    >
                      <span className="text-sm">{area.name}</span>
                      {!showAllAnalysisAreas &&
                        interestedAreas.includes(area.id) && (
                          <span
                            className={`ml-1 text-xs ${
                              selectedArea === area.id
                                ? "text-white"
                                : "text-medspa-primary"
                            }`}
                          >
                            ★
                          </span>
                        )}
                    </Button>
                  ))}
              </div>
              {!showAllAnalysisAreas && (
                <p className="text-xs text-gray-500 mt-2">
                  Showing {interestedAreas.length} areas of interest (marked
                  with ★)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Filter, Sort, and Search Content */}
        {(showFilters || showSort || showSearch) && (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
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
                    <label className="text-sm text-gray-700 mb-2 block">
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
                    <label className="text-sm text-gray-700 mb-2 block">
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
                    <label className="text-sm text-gray-700 mb-2 block">
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

            {/* Search Section */}
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Search Findings
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                      Search Query
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search findings by name, description, or area..."
                        className="w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  {searchQuery && (
                    <div className="text-sm text-gray-400">
                      Searching for:{" "}
                      <span className="text-white font-medium">
                        "{searchQuery}"
                      </span>
                    </div>
                  )}
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
          <div
            className="sticky top-0 z-40 bg-medspa-bg-secondary backdrop-blur-md border-b border-gray-700/50 py-3 mb-3"
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-medspa-text-primary">
                {
                  analysisAreas.find((area) => area.id === currentVisibleArea)
                    ?.name
                }{" "}
                Findings
              </h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <SeverityText
                    score={calculateAreaScore(
                      analysisAreas.find(
                        (area) => area.id === currentVisibleArea
                      ) || analysisAreas[0]
                    )}
                    className="text-sm font-medium"
                  />
                  <SeverityScaleCompact
                    score={calculateAreaScore(
                      analysisAreas.find(
                        (area) => area.id === currentVisibleArea
                      ) || analysisAreas[0]
                    )}
                    className="w-12"
                  />
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
                      <h3 className="text-sm font-medium text-white">
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
                          className="medspa-btn-primary"
                          style={{
                            backgroundColor: "#367588",
                            color: "white",
                            borderColor: "#367588",
                          }}
                        >
                          <Star className="w-4 h-4 mr-1" />
                          Add All
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <SeverityText
                          score={calculateAreaScore(area)}
                          className="text-sm font-medium"
                        />
                        <SeverityScaleCompact
                          score={calculateAreaScore(area)}
                          className="w-12"
                        />
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
                          <Card className="p-3 bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-gray-500/20 group">
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

                                {/* Severity Scale */}
                                <div className="mb-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <SeverityText
                                      score={finding.score}
                                      className="text-sm font-medium"
                                    />
                                    <span className="text-xs text-gray-400">
                                      Severity Level
                                    </span>
                                  </div>
                                  <SeverityScale
                                    score={finding.score}
                                    size="sm"
                                    showLabels={true}
                                  />
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
                                              className="p-3 rounded-lg border transition-all duration-200 bg-gray-800/40 border-gray-600/50 hover:border-gray-500/70"
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
                                                          ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                                                          : "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 hover:from-gray-600 hover:to-gray-500 border border-gray-500"
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
                                      ? "medspa-btn-primary opacity-50 cursor-not-allowed"
                                      : "medspa-btn-primary"
                                  }`}
                                  style={{
                                    backgroundColor: "#367588",
                                    color: "white",
                                    borderColor: "#367588",
                                  }}
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
                                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                      <span className="text-sm text-gray-300">
                                        {finding.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-gray-500">
                                        Not present
                                      </span>
                                      <div className="text-xl font-bold text-green-400">
                                        Not Present
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
                  showFilters ? "bg-gray-700/50 text-gray-200" : ""
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
                  showSort ? "bg-gray-700/50 text-gray-200" : ""
                }`}
                title="Toggle Sort"
              >
                <Sliders className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
                className={`text-gray-400 hover:text-gray-200 p-2 ${
                  showSearch ? "bg-gray-700/50 text-gray-200" : ""
                }`}
                title="Toggle Search"
              >
                <Search className="w-4 h-4" />
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
                    className="text-xs text-gray-300 hover:text-gray-200 transition-colors"
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
                      ? "bg-medspa-primary text-white border-medspa-primary shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-gray-300 hover:border-gray-400 hover:shadow-md"
                  }`}
                >
                  <span className="text-sm">All Areas</span>
                </Button>

                {(showAllAnalysisAreas
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
                          ? "bg-medspa-primary text-white border-medspa-primary shadow-sm"
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-gray-300 hover:border-gray-400 hover:shadow-md"
                      }`}
                    >
                      <span className="text-sm">{area.name}</span>
                      {!showAllAnalysisAreas &&
                        interestedAreas.includes(area.id) && (
                          <span
                            className={`ml-1 text-xs ${
                              selectedArea === area.id
                                ? "text-white"
                                : "text-medspa-primary"
                            }`}
                          >
                            ★
                          </span>
                        )}
                    </Button>
                  ))}
              </div>
              {!showAllAnalysisAreas && (
                <p className="text-xs text-gray-500 mt-2">
                  Showing {interestedAreas.length} areas of interest (marked
                  with ★)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Filter, Sort, and Search Content */}
        {(showFilters || showSort || showSearch) && (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
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
                    <label className="text-sm text-gray-700 mb-2 block">
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
                    <label className="text-sm text-gray-700 mb-2 block">
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
                    <label className="text-sm text-gray-700 mb-2 block">
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

            {/* Search Section */}
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Search Findings
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                      Search Query
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search findings by name, description, or area..."
                        className="w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  {searchQuery && (
                    <div className="text-sm text-gray-400">
                      Searching for:{" "}
                      <span className="text-white font-medium">
                        "{searchQuery}"
                      </span>
                    </div>
                  )}
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
            className="sticky top-0 z-50 bg-medspa-bg-secondary backdrop-blur-xl border-b border-gray-700/60 py-6 mb-4 shadow-2xl"
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-1 h-8 bg-gradient-to-b from-gray-800 to-gray-700 rounded-full gold-theme-area-heading"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.h2
                    className="text-3xl font-bold text-medspa-text-primary"
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
                          className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 hover:from-gray-600 hover:to-gray-500 border border-gray-500"
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
                <div className="flex items-center space-x-2">
                  <SeverityText
                    score={calculateAreaScore(
                      analysisAreas.find(
                        (area) => area.id === currentVisibleArea
                      ) || analysisAreas[0]
                    )}
                    className="text-sm font-medium"
                  />
                  <SeverityScaleCompact
                    score={calculateAreaScore(
                      analysisAreas.find(
                        (area) => area.id === currentVisibleArea
                      ) || analysisAreas[0]
                    )}
                    className="w-12"
                  />
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
                    className={`sticky top-0 z-40 bg-white backdrop-blur-xl py-4 mb-4 shadow-lg ${
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
                          <div className="w-1 h-6 bg-gradient-to-b from-gray-800 to-gray-700 rounded-full"></div>
                          <h2 className="text-lg font-semibold text-gray-900">
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
                            className="bg-medspa-primary text-white hover:bg-medspa-primary/90 border border-medspa-primary"
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Add All
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="px-3 py-1 rounded-full text-sm font-medium bg-white text-medspa-primary border border-medspa-primary mr-4">
                          <SeverityText
                            score={calculateAreaScore(area)}
                            className="text-sm font-medium"
                          />
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
                                  ? "bg-gray-100 opacity-50"
                                  : "bg-white hover:shadow-xl hover:shadow-gray-200/20"
                              }`}
                            >
                              {/* Compact Two-Column Layout */}
                              <div className="flex items-center gap-4">
                                {/* Left Column - Icon, Issue Name and Description */}
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                  {/* Icon */}
                                  <div className="flex-shrink-0 mt-0.5">
                                    {(() => {
                                      const IconComponent = getFindingIcon(
                                        finding.name
                                      );
                                      return (
                                        <div
                                          className={`p-2 rounded-lg ${
                                            isHidden
                                              ? "bg-gray-600/20 text-gray-500"
                                              : "bg-medspa-primary/10 text-medspa-primary border border-medspa-primary/30"
                                          }`}
                                        >
                                          <IconComponent className="w-4 h-4" />
                                        </div>
                                      );
                                    })()}
                                  </div>

                                  {/* Text Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4
                                        className={`text-base font-semibold truncate ${
                                          isHidden
                                            ? "text-gray-400"
                                            : "text-gray-900"
                                        } ${hipaaMode ? "hipaa-masked" : ""}`}
                                      >
                                        {hipaaMode
                                          ? "***MASKED FINDING***"
                                          : finding.name}
                                      </h4>
                                      {isHidden && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-gray-500 text-gray-400 flex-shrink-0">
                                          Hidden
                                        </span>
                                      )}
                                    </div>
                                    <p
                                      className={`text-sm line-clamp-2 ${
                                        isHidden
                                          ? "text-gray-500"
                                          : "text-gray-600"
                                      } ${hipaaMode ? "hipaa-masked" : ""}`}
                                    >
                                      {hipaaMode
                                        ? "***Sensitive medical information has been masked for HIPAA compliance***"
                                        : finding.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Right Column - Severity Bar */}
                                <div className="flex-shrink-0 w-48">
                                  <div
                                    className={`${
                                      isHidden ? "text-gray-400" : ""
                                    } ${hipaaMode ? "hipaa-masked" : ""}`}
                                  >
                                    {hipaaMode ? (
                                      "***"
                                    ) : (
                                      <SeverityScale
                                        score={scaledFinding.score}
                                        size="sm"
                                        showLabels={false}
                                        className="w-full"
                                      />
                                    )}
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
                                    {/* Example Photo - Only shown when expanded */}
                                    <div className="w-full max-w-md mx-auto">
                                      <DynamicImage
                                        src={getFindingImage(finding.name)}
                                        alt={`${finding.name} example`}
                                        className="rounded border border-gray-600/50"
                                        maxHeight="20rem"
                                        minHeight="8rem"
                                        isExpanded={true}
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
                                            target.src =
                                              getFallbackFindingImage();
                                          }
                                        }}
                                      />
                                    </div>
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
                                                className="p-3 rounded-lg border transition-all duration-200 bg-gray-800/40 border-gray-600/50 hover:border-gray-500/70"
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
                                                            ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                                                            : "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 hover:from-gray-600 hover:to-gray-500 border border-gray-500"
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

                              {/* Action Buttons - Compact Layout */}
                              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-600/30">
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
                                      ? "medspa-btn-primary opacity-50 cursor-not-allowed"
                                      : "medspa-btn-primary"
                                  }`}
                                  style={{
                                    backgroundColor: "#367588",
                                    color: "white",
                                    borderColor: "#367588",
                                  }}
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
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                        <span className="text-sm text-gray-300">
                                          {finding.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500">
                                          Not present
                                        </span>
                                        <div className="text-xl font-bold text-green-400">
                                          Not Present
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
