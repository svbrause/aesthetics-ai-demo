"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { PhotoExpandPopup } from "@/components/ui/PhotoExpandPopup";
import {
  Filter,
  Sliders,
  DollarSign,
  Clock,
  Bed,
  Activity,
  Plus,
  CheckCircle,
  Search,
  X,
  Eye,
  ChevronDown,
  Info,
  AlertTriangle,
  Star,
  Settings,
  ArrowUpDown,
  Bug,
  Download,
} from "lucide-react";
import { AnalysisArea } from "@/types/patientTypes";

// Treatment interface defined locally to match actual data structure
interface Treatment {
  id: number;
  name: string;
  category: string;
  area: string;
  goal: string;
  price: number;
  duration: string;
  downtime: string;
  invasiveness: "Minimal" | "Moderate" | "High";
  description: string;
  image: string;
  beforeAfter?: Array<{
    before: string;
    after: string;
    label: string;
  }>;
  benefits: string[];
  risks: string[];
  serves: string[];
  isHearted?: boolean;
}
import { getBestPhotoForTreatment } from "@/data/photoMappings";
import { useTreatmentPhotos } from "@/hooks/useTreatmentPhotos";
import { SquareImage } from "@/components/ui/SquareImage";

interface TreatmentsViewProps {
  treatments: Treatment[];
  analysisAreas: AnalysisArea[];
  addedToPlan: Set<string>;
  shortlist: any[];
  patient: any;
  onAddToTreatmentPlan: (treatment: Treatment) => void;
  onRemoveFromShortlist?: (findingName: string) => void;
  onClearFilters: () => void;
  onViewAllAreas?: () => void;
  showFiltersOnly?: boolean;
  showContentOnly?: boolean;
  selectedShortlistItems?: Set<string>;
}

export function TreatmentsView({
  treatments,
  analysisAreas,
  addedToPlan,
  shortlist,
  patient,
  onAddToTreatmentPlan,
  onRemoveFromShortlist,
  onClearFilters,
  onViewAllAreas,
  showFiltersOnly = false,
  showContentOnly = false,
  selectedShortlistItems = new Set(),
}: TreatmentsViewProps) {
  // Get photos from Airtable
  const {
    getTreatmentPhoto,
    getTreatmentPhotoMetadata,
    loading: photosLoading,
    error: photosError,
  } = useTreatmentPhotos(treatments);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [modality, setModality] = useState("");
  const [shortlistFilter, setShortlistFilter] = useState("");

  // Debug logging
  console.log(
    "TreatmentsView render - modality:",
    modality,
    "shortlistFilter:",
    shortlistFilter,
    "shortlist length:",
    shortlist.length,
    "shortlist items:",
    shortlist.map((item) => ({ name: item.name, id: item.id })),
    "selectedShortlistItems:",
    selectedShortlistItems
  );
  const [expandedTreatments, setExpandedTreatments] = useState<Set<number>>(
    new Set()
  );
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [expandedPhoto, setExpandedPhoto] = useState<{
    src: string;
    alt: string;
    treatment: string;
    issue?: string;
  } | null>(null);

  const [showPhotoGallery, setShowPhotoGallery] = useState(false);

  const treatmentGoals = [
    "Volume Restoration",
    "Wrinkle Reduction",
    "Skin Rejuvenation",
    "Contour Enhancement",
    "Hydration Improvement",
    "Pigmentation Correction",
  ];

  const modalities = [
    "Injectable Fillers",
    "Botox & Neurotoxins",
    "Laser Treatments",
    "Chemical Peels",
    "Microneedling",
    "RF Treatments",
    "Skincare",
    "Surgical",
  ];

  // Get patient's finding names for treatment filtering
  const patientFindingNames = patient.findings.map((finding: any) =>
    typeof finding === "string" ? finding : finding.name
  );

  // Reset shortlist filter if there are no shortlisted items
  if (shortlistFilter === "shortlisted" && shortlist.length === 0) {
    setShortlistFilter("");
  }

  const filteredTreatments = treatments
    .filter((treatment) => {
      // Apply modality filter first
      if (modality && treatment.category !== modality) {
        return false;
      }

      // Apply area filter
      if (selectedArea && treatment.area !== selectedArea) {
        return false;
      }

      // Apply goal filter
      if (selectedGoal && treatment.goal !== selectedGoal) {
        return false;
      }

      // Only show treatments that serve the patient's actual findings (moved to end)
      // But make this filter optional when a modality is selected to allow proper filtering
      if (!modality) {
        const servesPatientFinding = treatment.serves.some((servesItem) =>
          patientFindingNames.includes(servesItem)
        );
        if (!servesPatientFinding) {
          return false;
        }
      }
      if (priceRange) {
        const price = treatment.price;
        if (priceRange === "under-500" && price >= 500) return false;
        if (priceRange === "500-1000" && (price < 500 || price > 1000))
          return false;
        if (priceRange === "1000-2000" && (price < 1000 || price > 2000))
          return false;
        if (priceRange === "over-2000" && price <= 2000) return false;
      }
      // Shortlist filter - check if treatment serves any shortlisted findings
      if (shortlistFilter === "shortlisted") {
        // Get shortlisted finding names
        const shortlistedFindingNames = shortlist
          .map((item) => item.name)
          .filter((name) => name);

        console.log(`Shortlist filter active for treatment: ${treatment.name}`);
        console.log(`Shortlisted findings:`, shortlistedFindingNames);
        console.log(`Treatment serves:`, treatment.serves);

        // Check if treatment serves any shortlisted finding
        const servesShortlistedFinding = treatment.serves.some((servesItem) =>
          shortlistedFindingNames.includes(servesItem)
        );

        console.log(`Serves shortlisted finding: ${servesShortlistedFinding}`);

        if (!servesShortlistedFinding) {
          console.log(`Filtering out treatment: ${treatment.name}`);
          return false;
        }
      }
      // If shortlistFilter is empty string, show all treatments (no additional filtering)

      // Filter by selected shortlist items - if any are selected, only show treatments that serve those specific findings
      if (selectedShortlistItems.size > 0) {
        const servesSelectedFinding = treatment.serves.some((servesItem) =>
          selectedShortlistItems.has(servesItem)
        );
        if (!servesSelectedFinding) return false;
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "duration":
          // Extract numeric values from duration strings for comparison
          const getDurationValue = (duration: string) => {
            const match = duration.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          comparison =
            getDurationValue(a.duration) - getDurationValue(b.duration);
          break;
        case "downtime":
          const downtimeOrder: { [key: string]: number } = {
            None: 0,
            Minimal: 1,
            "1-2 days": 2,
            "3-7 days": 3,
            "1-2 weeks": 4,
          };
          comparison =
            (downtimeOrder[a.downtime] || 0) - (downtimeOrder[b.downtime] || 0);
          break;
        case "invasiveness":
          const invasivenessOrder: { [key: string]: number } = {
            Minimal: 0,
            Low: 1,
            Moderate: 2,
            High: 3,
          };
          comparison =
            (invasivenessOrder[a.invasiveness] || 0) -
            (invasivenessOrder[b.invasiveness] || 0);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "area":
          comparison = a.area.localeCompare(b.area);
          break;
        case "goal":
          comparison = a.goal.localeCompare(b.goal);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      // Apply sort order (asc/desc)
      return sortOrder === "desc" ? -comparison : comparison;
    });

  const handleClearFilters = () => {
    setSelectedArea("");
    setSelectedGoal("");
    setPriceRange("");
    setModality("");
    setShortlistFilter("");
    setSortBy("name");
    setSortOrder("asc");
    setShowSort(false);
    onClearFilters();
  };

  const toggleTreatmentExpansion = (treatmentId: number) => {
    setExpandedTreatments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(treatmentId)) {
        newSet.delete(treatmentId);
      } else {
        newSet.add(treatmentId);
      }
      return newSet;
    });
  };

  // If showing only filters, return just the filter section
  if (showFiltersOnly) {
    return (
      <div className="space-y-4">
        {/* Shortlist Filter - Most Prominent */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Show:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShortlistFilter("")}
              className={`px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                shortlistFilter === ""
                  ? "bg-medspa-primary text-white border border-medspa-primary"
                  : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              <span className="text-sm">All</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShortlistFilter("shortlisted")}
              className={`px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                shortlistFilter === "shortlisted"
                  ? "bg-medspa-primary text-white border border-medspa-primary"
                  : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              <span className="text-sm">For Shortlist</span>
            </Button>
          </div>
        </div>

        {/* Modality Navigation - Separate from filters */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Modality:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* All Modalities Button */}
            <button
              onClick={() => {
                console.log(
                  "All modality button clicked, setting modality to empty string"
                );
                setModality("");
              }}
              className="px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0"
              style={{
                backgroundColor: "#367588",
                color: "white",
                borderColor: "#367588",
              }}
            >
              <span className="text-sm">All</span>
            </button>

            {modalities.map((mod) => (
              <Button
                key={mod}
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log("Setting modality to:", mod);
                  setModality(mod);
                }}
                className={`px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                  modality === mod
                    ? "bg-medspa-primary text-white border border-medspa-primary"
                    : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:text-gray-900"
                }`}
                style={{
                  backgroundColor: modality === mod ? "#367588" : undefined,
                  color: modality === mod ? "white" : undefined,
                  borderColor: modality === mod ? "#367588" : undefined,
                }}
              >
                <span className="text-sm">{mod}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-white border-gray-300 relative z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Treatment Filters & Sort
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSort(!showSort)}
                className={`text-gray-600 hover:text-gray-900 ${
                  showSort ? "bg-orange-500/20 text-orange-600" : ""
                }`}
              >
                <Sliders className="w-4 h-4 mr-1" />
                Sort
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`text-gray-600 hover:text-gray-900 ${
                  showFilters ? "bg-orange-500/20 text-orange-600" : ""
                }`}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Area</label>
                <CustomSelect
                  options={[
                    { value: "", label: "All Areas" },
                    ...analysisAreas.map((area) => ({
                      value: area.id,
                      label: area.name,
                    })),
                  ]}
                  value={selectedArea}
                  onChange={setSelectedArea}
                  placeholder="All Areas"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Goal</label>
                <CustomSelect
                  options={[
                    { value: "", label: "All Goals" },
                    ...treatmentGoals.map((goal) => ({
                      value: goal,
                      label: goal,
                    })),
                  ]}
                  value={selectedGoal}
                  onChange={setSelectedGoal}
                  placeholder="All Goals"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Price Range
                </label>
                <CustomSelect
                  options={[
                    { value: "", label: "Any Price" },
                    { value: "under-500", label: "Under $500" },
                    { value: "500-1000", label: "$500 - $1,000" },
                    { value: "1000-2000", label: "$1,000 - $2,000" },
                    { value: "over-2000", label: "Over $2,000" },
                  ]}
                  value={priceRange}
                  onChange={setPriceRange}
                  placeholder="Any Price"
                />
              </div>
            </motion.div>
          )}

          {/* Sort Section */}
          {showSort && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Sort Treatments
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Sort By
                  </label>
                  <CustomSelect
                    options={[
                      { value: "name", label: "Name" },
                      { value: "price", label: "Price" },
                      { value: "duration", label: "Duration" },
                      { value: "downtime", label: "Downtime" },
                      { value: "invasiveness", label: "Invasiveness" },
                      { value: "category", label: "Category" },
                      { value: "area", label: "Area" },
                      { value: "goal", label: "Goal" },
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
                      { value: "asc", label: "Ascending (A-Z, Low to High)" },
                      { value: "desc", label: "Descending (Z-A, High to Low)" },
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

  // Always show treatments to avoid rendering issues
  if (true) {
    return (
      <div className="space-y-6">
        {/* Filter Section */}
        <Card className="p-4 bg-medspa-bg-secondary border-medspa-primary/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-medspa-text-primary">
                Treatment Filters
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                    showFilters
                      ? "bg-medspa-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSort(!showSort)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                    showSort
                      ? "bg-medspa-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Sliders className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-medspa-text-secondary">
                    Show:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      console.log(
                        "Setting shortlistFilter to empty string (All)"
                      );
                      setShortlistFilter("");
                    }}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                      shortlistFilter === ""
                        ? "bg-medspa-primary text-white border border-medspa-primary shadow-sm"
                        : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      console.log("Setting shortlistFilter to shortlisted");
                      setShortlistFilter("shortlisted");
                    }}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 font-medium text-sm ${
                      shortlistFilter === "shortlisted"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      For Shortlist
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-medspa-text-secondary">
                    Modality:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setModality("")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === ""
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setModality("Injectable Fillers")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "Injectable Fillers"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Injectable Fillers
                  </button>
                  <button
                    onClick={() => setModality("Botox & Neurotoxins")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "Botox & Neurotoxins"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Botox & Neurotoxins
                  </button>
                  <button
                    onClick={() => setModality("Laser Treatments")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "Laser Treatments"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Laser Treatments
                  </button>
                  <button
                    onClick={() => setModality("Chemical Peels")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "Chemical Peels"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Chemical Peels
                  </button>
                  <button
                    onClick={() => setModality("Microneedling")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "Microneedling"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Microneedling
                  </button>
                  <button
                    onClick={() => setModality("RF Treatments")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "RF Treatments"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    RF Treatments
                  </button>
                  <button
                    onClick={() => setModality("Skincare")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "Skincare"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Skincare
                  </button>
                  <button
                    onClick={() => setModality("Surgical")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      modality === "Surgical"
                        ? "bg-medspa-primary text-white border border-medspa-primary"
                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Surgical
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Section */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treatment Goal
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Goals" },
                        ...treatmentGoals.map((goal) => ({
                          value: goal,
                          label: goal,
                        })),
                      ]}
                      value={selectedGoal}
                      onChange={setSelectedGoal}
                      placeholder="Select goal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Prices" },
                        { value: "0-500", label: "$0 - $500" },
                        { value: "500-1000", label: "$500 - $1,000" },
                        { value: "1000-2000", label: "$1,000 - $2,000" },
                        { value: "2000+", label: "$2,000+" },
                      ]}
                      value={priceRange}
                      onChange={setPriceRange}
                      placeholder="Select range"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treatment Area
                    </label>
                    <CustomSelect
                      options={[
                        { value: "", label: "All Areas" },
                        ...analysisAreas.map((area) => ({
                          value: area.id,
                          label: area.name,
                        })),
                      ]}
                      value={selectedArea}
                      onChange={setSelectedArea}
                      placeholder="Select area"
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
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <CustomSelect
                      options={[
                        { value: "name", label: "Name" },
                        { value: "price", label: "Price" },
                        { value: "duration", label: "Duration" },
                        { value: "downtime", label: "Downtime" },
                      ]}
                      value={sortBy}
                      onChange={setSortBy}
                      placeholder="Select sort option"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <CustomSelect
                      options={[
                        { value: "asc", label: "Ascending" },
                        { value: "desc", label: "Descending" },
                      ]}
                      value={sortOrder}
                      onChange={setSortOrder}
                      placeholder="Select order"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </Card>

        {/* Treatment Cards - Full Row Layout */}
        {filteredTreatments.length > 0 ? (
          <div className="space-y-6">
            {filteredTreatments.map((treatment, index) => {
              const isExpanded = expandedTreatments.has(treatment.id);
              const isShortlisted = shortlist.some((item) =>
                treatment.serves.some((servesItem) => servesItem === item.name)
              );
              const shortlistedFindings = shortlist.filter((item) =>
                treatment.serves.some((servesItem) => servesItem === item.name)
              );
              const photoMetadata = getTreatmentPhotoMetadata(
                treatment.id.toString()
              );

              return (
                <motion.div
                  key={`${treatment.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white border-gray-300 hover:border-medspa-primary/50 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-medspa-primary/20 group">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Treatment Images - Responsive Size */}
                      <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                        {treatment.beforeAfter &&
                        treatment.beforeAfter.length > 0 ? (
                          <div className="space-y-4">
                            {/* Before/After Images */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative">
                                <SquareImage
                                  src={treatment.beforeAfter[0].before}
                                  alt={`${treatment.name} before`}
                                  size="h-20 sm:h-24"
                                />
                                <div className="absolute top-2 left-2">
                                  <div className="bg-red-500/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Before
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    if (
                                      treatment.beforeAfter &&
                                      treatment.beforeAfter[0]
                                    ) {
                                      setExpandedPhoto({
                                        src: treatment.beforeAfter[0].before,
                                        alt: `${treatment.beforeAfter[0].label} - Before`,
                                        treatment: treatment.name,
                                        issue: treatment.beforeAfter[0].label,
                                      });
                                    }
                                  }}
                                  className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                                >
                                  <Eye className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="relative">
                                <SquareImage
                                  src={treatment.beforeAfter[0].after}
                                  alt={`${treatment.name} after`}
                                  size="h-20 sm:h-24"
                                />
                                <div className="absolute top-2 left-2">
                                  <div className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    After
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    if (
                                      treatment.beforeAfter &&
                                      treatment.beforeAfter[0]
                                    ) {
                                      setExpandedPhoto({
                                        src: treatment.beforeAfter[0].after,
                                        alt: `${treatment.beforeAfter[0].label} - After`,
                                        treatment: treatment.name,
                                        issue: treatment.beforeAfter[0].label,
                                      });
                                    }
                                  }}
                                  className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                                >
                                  <Eye className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            {/* Treatment Result Image */}
                            <div className="relative">
                              <SquareImage
                                src={getTreatmentPhoto(
                                  treatment.id.toString(),
                                  treatment.image
                                )}
                                alt={`${treatment.name} result`}
                                size="h-20 sm:h-24"
                                onError={(e) => {
                                  // Fallback to original image if Airtable photo fails to load
                                  const target = e.target as HTMLImageElement;
                                  if (target.src !== treatment.image) {
                                    target.src = treatment.image;
                                  }
                                }}
                              />
                              {/* Expand button overlay */}
                              <button
                                onClick={() => {
                                  setExpandedPhoto({
                                    src: getTreatmentPhoto(
                                      treatment.id.toString(),
                                      treatment.image
                                    ),
                                    alt: treatment.name,
                                    treatment: treatment.name,
                                  });
                                }}
                                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Treatment image - Responsive sizing */
                          <div className="relative rounded-xl overflow-hidden bg-gray-100 w-full max-w-sm mx-auto">
                            <div className="aspect-square w-full">
                              <img
                                src={getTreatmentPhoto(
                                  treatment.id.toString(),
                                  treatment.image
                                )}
                                alt={`${treatment.name} result`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  // Fallback to original image if Airtable photo fails to load
                                  const target = e.target as HTMLImageElement;
                                  if (target.src !== treatment.image) {
                                    target.src = treatment.image;
                                  }
                                }}
                              />
                            </div>
                            {/* Expand button overlay */}
                            <button
                              onClick={() => {
                                setExpandedPhoto({
                                  src: getTreatmentPhoto(
                                    treatment.id.toString(),
                                    treatment.image
                                  ),
                                  alt: treatment.name,
                                  treatment: treatment.name,
                                });
                              }}
                              className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Treatment Content - 2/3 Width */}
                      <div className="lg:col-span-2 flex flex-col justify-between min-w-0">
                        {/* Treatment Header */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-2xl font-bold text-gray-900">
                              {treatment.name}
                            </h4>
                            <div className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-300">
                              {treatment.category}
                            </div>
                          </div>

                          {/* Photo Debugging Information */}
                          {showDebugInfo && (
                            <div className="mb-4 p-3 bg-medspa-accent-24 border border-medspa-primary/30 rounded-lg">
                              <div className="text-medspa-text-primary text-sm font-medium mb-2">
                                🔍 Photo Debug Info:
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-medspa-text-secondary">
                                    Photo Name:
                                  </span>
                                  <div className="text-medspa-text-primary font-mono">
                                    {photoMetadata.name || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-medspa-text-secondary">
                                    Photo Treatment:
                                  </span>
                                  <div className="text-medspa-text-primary font-mono">
                                    {photoMetadata.treatment || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-medspa-text-secondary">
                                    Photo Issues:
                                  </span>
                                  <div className="text-medspa-text-primary font-mono">
                                    {photoMetadata.issues?.join(", ") || "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-medspa-text-secondary">
                                    Story Title:
                                  </span>
                                  <div className="text-medspa-text-primary font-mono truncate">
                                    {photoMetadata.storyTitle || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <p className="text-medspa-text-secondary text-base mb-4 line-clamp-2">
                            {treatment.description}
                          </p>

                          {/* Treatment Details and Issues - Responsive layout */}
                          <div className="flex flex-col lg:flex-row gap-6 mb-4">
                            {/* Basic Info - Responsive width */}
                            <div className="grid grid-cols-2 gap-3 w-full lg:w-56 flex-shrink-0">
                              <div className="text-center p-3 bg-white border border-medspa-primary/30 rounded-lg">
                                <DollarSign className="w-4 h-4 text-medspa-primary mx-auto mb-2" />
                                <div className="text-sm text-gray-600">
                                  Price
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  ${treatment.price}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-white border border-medspa-primary/30 rounded-lg">
                                <Clock className="w-4 h-4 text-medspa-primary mx-auto mb-2" />
                                <div className="text-sm text-gray-600">
                                  Duration
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  {treatment.duration}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-white border border-medspa-primary/30 rounded-lg">
                                <Bed className="w-4 h-4 text-medspa-primary mx-auto mb-2" />
                                <div className="text-sm text-gray-600">
                                  Downtime
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  {treatment.downtime}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-white border border-medspa-primary/30 rounded-lg">
                                <Activity className="w-4 h-4 text-medspa-primary mx-auto mb-2" />
                                <div className="text-sm text-gray-600">
                                  Invasiveness
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  {treatment.invasiveness}
                                </div>
                              </div>
                            </div>

                            {/* Relevant Issues - To the right */}
                            <div className="flex-1">
                              {/* Shortlisted Findings */}
                              {shortlistedFindings.length > 0 && (
                                <div className="mb-3">
                                  <h5 className="text-sm font-semibold text-gray-900 mb-2">
                                    Addresses These Shortlisted Findings:
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {shortlistedFindings.map((finding, idx) => (
                                      <span
                                        key={idx}
                                        className="px-3 py-1 text-white text-sm rounded-full border"
                                        style={{
                                          backgroundColor: "#367588",
                                          borderColor: "#367588",
                                        }}
                                      >
                                        {finding.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Treatment Areas */}
                              <div>
                                <div className="text-sm text-medspa-text-secondary mb-2">
                                  Relevant Issues:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {treatment.serves
                                    .filter((issue) =>
                                      patientFindingNames.includes(issue)
                                    )
                                    .map((issue, idx) => {
                                      const isShortlistedIssue = shortlist.some(
                                        (item) => item.name === issue
                                      );
                                      return (
                                        <span
                                          key={idx}
                                          className={`px-3 py-1 text-sm rounded-full ${
                                            isShortlistedIssue
                                              ? "bg-medspa-primary text-white border border-medspa-primary"
                                              : "medspa-light-bg medspa-light-text medspa-light-border"
                                          }`}
                                        >
                                          {isShortlistedIssue && (
                                            <Star className="w-3 h-3 inline mr-1" />
                                          )}
                                          {issue}
                                        </span>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 mt-4"
                        >
                          {/* Benefits and Risks */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-semibold text-white mb-2 text-sm flex items-center">
                                <Info className="w-4 h-4 mr-1" />
                                Benefits
                              </h5>
                              <div className="space-y-1">
                                {treatment.benefits.map((benefit, idx) => (
                                  <div
                                    key={idx}
                                    className="text-sm text-gray-300 flex items-start"
                                  >
                                    <span className="text-yellow-400 mr-2">
                                      •
                                    </span>
                                    {benefit}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-semibold text-white mb-2 text-sm flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Risks
                              </h5>
                              <div className="space-y-1">
                                {treatment.risks.map((risk, idx) => (
                                  <div
                                    key={idx}
                                    className="text-sm text-gray-300 flex items-start"
                                  >
                                    <span className="text-orange-400 mr-2">
                                      •
                                    </span>
                                    {risk}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons - Full Width */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-600/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTreatmentExpansion(treatment.id)}
                        className="text-gray-300 hover:text-white hover:bg-gray-500/20"
                      >
                        {isExpanded ? "Show Less" : "Learn More"}
                        <ChevronDown
                          className={`w-4 h-4 ml-1 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </Button>

                      <Button
                        size="lg"
                        onClick={() => onAddToTreatmentPlan(treatment)}
                        disabled={addedToPlan.has(treatment.id.toString())}
                        className={`px-8 py-3 transition-all duration-300 ${
                          addedToPlan.has(treatment.id.toString())
                            ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 hover:from-gray-600 hover:to-gray-500 border border-gray-500"
                        }`}
                      >
                        {addedToPlan.has(treatment.id.toString()) ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Added to Plan
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            Add to Treatment Plan
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 bg-medspa-bg-secondary border-medspa-primary/30 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-medspa-accent-24 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-medspa-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No treatments found
                </h3>
                <p className="text-medspa-text-secondary mb-4">
                  No treatments match your current filters. Try adjusting your
                  search criteria.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="ghost"
                    onClick={handleClearFilters}
                    className="bg-medspa-primary text-white hover:bg-medspa-primary/90 border border-medspa-primary px-6 py-2"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onViewAllAreas}
                    className="bg-medspa-bg-secondary text-medspa-text-primary hover:bg-medspa-accent-24 border border-medspa-primary/30 px-6 py-2"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View All Areas
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  return (
    <motion.div
      key="treatments"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Treatment Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Treatment Filters
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`text-gray-400 hover:text-gray-200 p-2 ${
                showFilters ? "bg-orange-500/20 text-orange-400" : ""
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
                showSort ? "bg-orange-500/20 text-orange-400" : ""
              }`}
              title="Toggle Sort"
            >
              <Sliders className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDebugInfo(!showDebugInfo)}
              className={`text-gray-400 hover:text-gray-200 p-2 ${
                showDebugInfo ? "bg-yellow-500/20 text-yellow-400" : ""
              }`}
              title="Toggle Debug Info"
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Treatment Filter Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">Show:</span>
            <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
              <button
                onClick={() => {
                  console.log("Setting shortlistFilter to empty string (All)");
                  setShortlistFilter("");
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                  shortlistFilter === ""
                    ? "bg-medspa-primary text-white border border-medspa-primary shadow-sm"
                    : "text-gray-300 bg-gray-700/50 border border-gray-600 hover:text-white hover:bg-gray-600/70"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  console.log("Setting shortlistFilter to shortlisted");
                  setShortlistFilter("shortlisted");
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 font-medium text-sm ${
                  shortlistFilter === "shortlisted"
                    ? "bg-medspa-primary text-white border border-medspa-primary"
                    : "text-gray-300 bg-gray-700/50 border border-gray-600 hover:text-white hover:bg-gray-600/70"
                }`}
              >
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  For Shortlist
                </span>
              </button>
            </div>
          </div>

          {/* Modality Filter Chips */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">Modality:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setModality("")}
                className={`px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                  modality === ""
                    ? "bg-medspa-primary text-white border border-medspa-primary"
                    : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                All
              </Button>
              {modalities.map((mod) => (
                <Button
                  key={mod}
                  variant="ghost"
                  size="sm"
                  onClick={() => setModality(mod)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                    modality === mod
                      ? "bg-medspa-primary text-white border border-medspa-primary"
                      : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {mod}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Content */}
      {(showFilters || showSort) && (
        <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50 mb-4">
          {/* Header with Clear Button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Treatment Filters & Sort
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Area</label>
                <CustomSelect
                  options={[
                    { value: "", label: "All Areas" },
                    ...analysisAreas.map((area) => ({
                      value: area.id,
                      label: area.name,
                    })),
                  ]}
                  value={selectedArea}
                  onChange={setSelectedArea}
                  placeholder="All Areas"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Goal</label>
                <CustomSelect
                  options={[
                    { value: "", label: "All Goals" },
                    ...treatmentGoals.map((goal) => ({
                      value: goal,
                      label: goal,
                    })),
                  ]}
                  value={selectedGoal}
                  onChange={setSelectedGoal}
                  placeholder="All Goals"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Price Range
                </label>
                <CustomSelect
                  options={[
                    { value: "", label: "Any Price" },
                    { value: "under-500", label: "Under $500" },
                    { value: "500-1000", label: "$500 - $1,000" },
                    { value: "1000-2000", label: "$1,000 - $2,000" },
                    { value: "over-2000", label: "Over $2,000" },
                  ]}
                  value={priceRange}
                  onChange={setPriceRange}
                  placeholder="Any Price"
                />
              </div>
            </motion.div>
          )}

          {/* Sort Section */}
          {showSort && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Sort Treatments
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Sort By
                  </label>
                  <CustomSelect
                    options={[
                      { value: "name", label: "Name" },
                      { value: "price", label: "Price" },
                      { value: "duration", label: "Duration" },
                      { value: "downtime", label: "Downtime" },
                      { value: "invasiveness", label: "Invasiveness" },
                      { value: "category", label: "Category" },
                      { value: "area", label: "Area" },
                      { value: "goal", label: "Goal" },
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
                      { value: "asc", label: "Ascending (A-Z, Low to High)" },
                      { value: "desc", label: "Descending (Z-A, High to Low)" },
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
      {/* Photo Expand Modal */}
      {expandedPhoto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setExpandedPhoto(null)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
              width: "100%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {expandedPhoto?.treatment || "Treatment Image"}
                </h3>
                {expandedPhoto?.issue && (
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {expandedPhoto?.issue}
                  </p>
                )}
              </div>
              <button
                onClick={() => setExpandedPhoto(null)}
                style={{
                  color: "#9ca3af",
                  padding: "8px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.color = "#6b7280";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image */}
            <div style={{ padding: "24px" }}>
              <img
                src={expandedPhoto?.src || ""}
                alt={expandedPhoto?.alt || "Treatment image"}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-image.jpg";
                }}
              />
            </div>

            {/* Footer with actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                borderTop: "1px solid #e5e7eb",
                backgroundColor: "#f9fafb",
                borderRadius: "0 0 8px 8px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                Click outside the image or press the X button to close
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => {
                    if (expandedPhoto) {
                      const link = document.createElement("a");
                      link.href = expandedPhoto.src;
                      link.download = `${expandedPhoto.treatment}-${expandedPhoto.alt}.jpg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setExpandedPhoto(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#e5e7eb",
                    color: "#374151",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
