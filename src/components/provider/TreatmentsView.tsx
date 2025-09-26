"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CustomSelect } from "@/components/ui/CustomSelect";
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
} from "lucide-react";
import { Treatment, AnalysisArea } from "@/types/patientTypes";
import { getBestPhotoForTreatment } from "@/data/photoMappings";

interface TreatmentsViewProps {
  treatments: Treatment[];
  analysisAreas: AnalysisArea[];
  addedToPlan: Set<string>;
  shortlist: any[];
  onAddToTreatmentPlan: (treatment: Treatment) => void;
  onRemoveFromShortlist?: (findingName: string) => void;
  onClearFilters: () => void;
  onViewAllAreas?: () => void;
  showFiltersOnly?: boolean;
  showContentOnly?: boolean;
}

export function TreatmentsView({
  treatments,
  analysisAreas,
  addedToPlan,
  shortlist,
  onAddToTreatmentPlan,
  onRemoveFromShortlist,
  onClearFilters,
  onViewAllAreas,
  showFiltersOnly = false,
  showContentOnly = false,
}: TreatmentsViewProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [modality, setModality] = useState("");
  const [shortlistFilter, setShortlistFilter] = useState("shortlisted");
  const [expandedTreatments, setExpandedTreatments] = useState<Set<number>>(
    new Set()
  );
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const filteredTreatments = treatments
    .filter((treatment) => {
      if (selectedArea && treatment.area !== selectedArea) return false;
      if (selectedGoal && treatment.goal !== selectedGoal) return false;
      if (modality && treatment.category !== modality) return false;
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
        const servesShortlistedFinding = treatment.serves.some((servesItem) =>
          shortlist.some((shortlistItem) => shortlistItem.name === servesItem)
        );
        if (!servesShortlistedFinding) return false;
      }
      if (shortlistFilter === "not-shortlisted") {
        const servesShortlistedFinding = treatment.serves.some((servesItem) =>
          shortlist.some((shortlistItem) => shortlistItem.name === servesItem)
        );
        if (servesShortlistedFinding) return false;
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
            <h3 className="text-sm font-medium text-gray-400">
              Filter by Shortlist Status
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShortlistFilter("")}
              className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                shortlistFilter === ""
                  ? "bg-pink-500/25 text-white border-pink-400/40 shadow-md backdrop-blur-md"
                  : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
              }`}
            >
              <span className="text-sm">All Treatments</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setShortlistFilter(
                  shortlistFilter === "shortlisted" ? "" : "shortlisted"
                )
              }
              className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                shortlistFilter === "shortlisted"
                  ? "bg-pink-500/25 text-white border-pink-400/40 shadow-md backdrop-blur-md"
                  : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
              }`}
            >
              <span className="text-sm">For Shortlisted Findings</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setShortlistFilter(
                  shortlistFilter === "not-shortlisted" ? "" : "not-shortlisted"
                )
              }
              className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                shortlistFilter === "not-shortlisted"
                  ? "bg-pink-500/25 text-white border-pink-400/40 shadow-md backdrop-blur-md"
                  : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
              }`}
            >
              <span className="text-sm">Not for Shortlisted Findings</span>
            </Button>
          </div>
        </div>

        {/* Modality Navigation - Separate from filters */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">
              Filter by Modality
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* All Modalities Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setModality("")}
              className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                modality === ""
                  ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                  : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
              }`}
            >
              <span className="text-sm">All Modalities</span>
            </Button>

            {modalities.map((mod) => (
              <Button
                key={mod}
                variant="ghost"
                size="sm"
                onClick={() => setModality(modality === mod ? "" : mod)}
                className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                  modality === mod
                    ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                    : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
                }`}
              >
                <span className="text-sm">{mod}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Treatment Filters & Sort
            </h3>
            <div className="flex items-center space-x-2">
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
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
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

  // If showing only content, return just the treatment cards
  if (showContentOnly) {
    return (
      <div className="space-y-6">
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

              return (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700/50 hover:border-purple-600/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 group">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Treatment Images - Larger Size */}
                      <div className="lg:col-span-1">
                        {treatment.beforeAfter &&
                        treatment.beforeAfter.length > 0 ? (
                          <div className="space-y-4">
                            {/* Before/After Images */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative rounded-xl overflow-hidden bg-gray-700/30 h-36">
                                <img
                                  src={treatment.beforeAfter[0].before}
                                  alt={`${treatment.name} before`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2">
                                  <div className="bg-red-500/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Before
                                  </div>
                                </div>
                              </div>
                              <div className="relative rounded-xl overflow-hidden bg-gray-700/30 h-36">
                                <img
                                  src={treatment.beforeAfter[0].after}
                                  alt={`${treatment.name} after`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2">
                                  <div className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    After
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Treatment Result Image */}
                            <div className="relative rounded-xl overflow-hidden bg-gray-700/30 h-40">
                              <img
                                src={treatment.image}
                                alt={`${treatment.name} result`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 left-3">
                                <div className="bg-blue-500/80 text-white text-sm px-3 py-1 rounded-full font-medium">
                                  Treatment Result
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative rounded-xl overflow-hidden bg-gray-700/30 h-80">
                            <img
                              src={treatment.image}
                              alt={`${treatment.name} result`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <div className="bg-blue-500/80 text-white text-sm px-3 py-1 rounded-full font-medium">
                                Treatment Result
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Treatment Content - 2/3 Width */}
                      <div className="lg:col-span-2 flex flex-col justify-between">
                        {/* Treatment Header */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-2xl font-bold text-white">
                              {treatment.name}
                            </h4>
                            {isShortlisted && (
                              <div className="flex items-center text-pink-400 text-sm bg-pink-500/20 px-3 py-1 rounded-full">
                                <Star className="w-4 h-4 mr-2" />
                                Shortlisted
                              </div>
                            )}
                          </div>
                          <p className="text-gray-300 text-base mb-4 line-clamp-2">
                            {treatment.description}
                          </p>

                          {/* Treatment Details - Moved to right column below description */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-2" />
                              <div className="text-sm text-gray-400">Price</div>
                              <div className="text-lg font-bold text-white">
                                ${treatment.price}
                              </div>
                            </div>
                            <div className="text-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <Clock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                              <div className="text-sm text-gray-400">
                                Duration
                              </div>
                              <div className="text-lg font-bold text-white">
                                {treatment.duration}
                              </div>
                            </div>
                            <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                              <Bed className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                              <div className="text-sm text-gray-400">
                                Downtime
                              </div>
                              <div className="text-lg font-bold text-white">
                                {treatment.downtime}
                              </div>
                            </div>
                            <div className="text-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                              <Activity className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                              <div className="text-sm text-gray-400">
                                Invasiveness
                              </div>
                              <div className="text-lg font-bold text-white">
                                {treatment.invasiveness}
                              </div>
                            </div>
                          </div>

                          {/* Shortlisted Findings */}
                          {shortlistedFindings.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm font-semibold text-purple-300 mb-2">
                                Addresses These Shortlisted Findings:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {shortlistedFindings.map((finding, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-purple-500/30 text-purple-200 text-sm rounded-full border border-purple-400/50"
                                  >
                                    {finding.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Treatment Areas */}
                          <div className="flex flex-wrap gap-2">
                            {treatment.serves.map((issue, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-400/30"
                              >
                                {issue}
                              </span>
                            ))}
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
                                    <span className="text-green-400 mr-2">
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
                    <div className="flex justify-between items-center pt-4 border-t border-purple-700/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTreatmentExpansion(treatment.id)}
                        className="text-purple-300 hover:text-white hover:bg-purple-500/20"
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
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25"
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
          <Card className="p-8 bg-gray-800/50 border-gray-700 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No treatments found
                </h3>
                <p className="text-gray-400 mb-4">
                  No treatments match your current filters. Try adjusting your
                  search criteria.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="ghost"
                    onClick={handleClearFilters}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 px-6 py-2"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onViewAllAreas}
                    className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white px-6 py-2"
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
      {/* Shortlist Filter - Most Prominent */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-400">
            Treatment Filter
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShortlistFilter("")}
            className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
              shortlistFilter === ""
                ? "bg-pink-500/25 text-white border-pink-400/40 shadow-md backdrop-blur-md"
                : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
            }`}
          >
            <span className="text-sm">All Treatments</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setShortlistFilter(
                shortlistFilter === "shortlisted" ? "" : "shortlisted"
              )
            }
            className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
              shortlistFilter === "shortlisted"
                ? "bg-pink-500/25 text-white border-pink-400/40 shadow-md backdrop-blur-md"
                : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
            }`}
          >
            <span className="text-sm">Relevant to Shortlist</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setShortlistFilter(
                shortlistFilter === "not-shortlisted" ? "" : "not-shortlisted"
              )
            }
            className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
              shortlistFilter === "not-shortlisted"
                ? "bg-pink-500/25 text-white border-pink-400/40 shadow-md backdrop-blur-md"
                : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
            }`}
          >
            <span className="text-sm">Not Relevant to Shortlist</span>
          </Button>
        </div>
      </div>

      {/* Shortlist Management */}
      {shortlist.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">
              Current Shortlist ({shortlist.length} findings)
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {shortlist.map((finding, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-pink-500/10 border border-pink-400/30 rounded-lg text-sm text-pink-300"
              >
                <span>{finding.name}</span>
                <span className="text-xs text-pink-400">
                  ({finding.severity})
                </span>
                {onRemoveFromShortlist && (
                  <button
                    onClick={() => onRemoveFromShortlist(finding.name)}
                    className="ml-1 p-1 hover:bg-pink-500/20 rounded-full transition-colors"
                    title="Remove from shortlist"
                  >
                    <X className="w-3 h-3 text-pink-400 hover:text-pink-300" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modality Navigation - Separate from filters */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-400">
            Filter by Modality
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* All Modalities Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setModality("")}
            className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
              modality === ""
                ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
            }`}
          >
            <span className="text-sm">All Modalities</span>
          </Button>

          {modalities.map((mod) => (
            <Button
              key={mod}
              variant="ghost"
              size="sm"
              onClick={() => setModality(modality === mod ? "" : mod)}
              className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                modality === mod
                  ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                  : "bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500/70 hover:shadow-md"
              }`}
            >
              <span className="text-sm">{mod}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Treatment Filters & Sort
          </h3>
          <div className="flex items-center space-x-2">
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
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
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

      {/* Treatment Cards */}
      {filteredTreatments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTreatments.map((treatment, index) => {
            const isExpanded = expandedTreatments.has(treatment.id);
            const isShortlisted = shortlist.some((item) =>
              treatment.serves.some((servesItem) => servesItem === item.name)
            );

            return (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700/50 hover:border-purple-600/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 group">
                  {/* Layout with Large Image on Left */}
                  <div className="flex items-start gap-6 mb-4">
                    {/* Left side - Large Treatment image */}
                    <div className="w-64 h-64 flex-shrink-0">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-700/30">
                        <img
                          src={
                            getBestPhotoForTreatment(
                              treatment.name,
                              treatment.serves
                            ) || treatment.image
                          }
                          alt={`${treatment.name} result`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback to original image if mapped photo fails to load
                            const target = e.target as HTMLImageElement;
                            if (target.src !== treatment.image) {
                              target.src = treatment.image;
                            }
                          }}
                        />
                        <div className="absolute top-2 left-2">
                          <div className="bg-purple-500/60 text-white/80 text-xs px-2 py-1 rounded-full font-normal">
                            Result
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Treatment info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">
                          {treatment.name}
                        </h4>
                        {isShortlisted && (
                          <div className="flex items-center text-purple-400 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Shortlisted
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {treatment.description}
                      </p>

                      {/* Treatment Details - Moved to right column below description */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
                          <div className="text-xs text-gray-400">Price</div>
                          <div className="text-sm font-bold text-white">
                            ${treatment.price}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                          <div className="text-xs text-gray-400">Duration</div>
                          <div className="text-sm font-bold text-white">
                            {treatment.duration}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <Bed className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                          <div className="text-xs text-gray-400">Downtime</div>
                          <div className="text-sm font-bold text-white">
                            {treatment.downtime}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <Activity className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                          <div className="text-xs text-gray-400">
                            Invasiveness
                          </div>
                          <div className="text-sm font-bold text-white">
                            {treatment.invasiveness}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {treatment.serves.map((issue, idx) => {
                          const isShortlistedIssue = shortlist.some(
                            (item) => item.name === issue
                          );
                          return (
                            <span
                              key={idx}
                              className={`px-2 py-1 text-xs rounded-full ${
                                isShortlistedIssue
                                  ? "bg-purple-500/30 text-purple-300 border border-purple-400/50"
                                  : "bg-purple-500/20 text-purple-400"
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

                  {/* Category Badge - Moved to bottom */}
                  <div className="flex justify-end">
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                      {treatment.category}
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
                                  <span className="text-green-400 mr-2">•</span>
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

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-purple-700/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTreatmentExpansion(treatment.id)}
                      className="text-purple-300 hover:text-white hover:bg-purple-500/20"
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
                      onClick={() => onAddToTreatmentPlan(treatment)}
                      disabled={addedToPlan.has(treatment.id.toString())}
                      className={`transition-all duration-300 ${
                        addedToPlan.has(treatment.id.toString())
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25"
                      }`}
                    >
                      {addedToPlan.has(treatment.id.toString()) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Added to Plan
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
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
        <Card className="p-8 bg-gray-800/50 border-gray-700 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No treatments found
              </h3>
              <p className="text-gray-400 mb-4">
                No treatments match your current filters. Try adjusting your
                search criteria.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 px-6 py-2"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
                <Button
                  variant="ghost"
                  onClick={onViewAllAreas}
                  className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white px-6 py-2"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All Areas
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
