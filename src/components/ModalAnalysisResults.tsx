"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProcessedAnalysis } from "@/lib/modalService";
import { DebugModalResponse } from "@/components/DebugModalResponse";
import {
  getScoreColor,
  getScoreBgColor,
  getAllAreas,
} from "@/lib/issueMapping";
import { getFindingImage, getFallbackFindingImage } from "@/lib/findingImages";
import {
  Target,
  Sparkles,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Activity,
  Save,
  Edit,
  Check,
  X,
} from "lucide-react";

interface ModalAnalysisResultsProps {
  analysis: ProcessedAnalysis;
  frontPhoto?: File | null;
  sidePhoto?: File | null;
  rawModalResponse?: any;
  modalError?: string;
  onBack: () => void;
  onViewDetails: (area: string) => void;
  onSaveDraft?: (patientName: string, analysis: ProcessedAnalysis) => void;
}

export function ModalAnalysisResults({
  analysis,
  frontPhoto,
  sidePhoto,
  rawModalResponse,
  modalError,
  onBack,
  onViewDetails,
  onSaveDraft,
}: ModalAnalysisResultsProps) {
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  const [showAllIssues, setShowAllIssues] = useState(false);
  const [isDraft, setIsDraft] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [tempPatientName, setTempPatientName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Function to get appropriate image for each issue
  const getIssueImage = (issueName: string, area: string) => {
    return getFindingImage(issueName);
  };

  // Create photo URLs from uploaded files
  const [frontPhotoUrl, setFrontPhotoUrl] = useState<string | null>(null);
  const [sidePhotoUrl, setSidePhotoUrl] = useState<string | null>(null);

  // Generate photo URLs when component mounts
  React.useEffect(() => {
    if (frontPhoto) {
      const url = URL.createObjectURL(frontPhoto);
      setFrontPhotoUrl(url);
    }
    if (sidePhoto) {
      const url = URL.createObjectURL(sidePhoto);
      setSidePhotoUrl(url);
    }

    // Cleanup URLs when component unmounts
    return () => {
      if (frontPhotoUrl) URL.revokeObjectURL(frontPhotoUrl);
      if (sidePhotoUrl) URL.revokeObjectURL(sidePhotoUrl);
    };
  }, [frontPhoto, sidePhoto, frontPhotoUrl, sidePhotoUrl]);

  // Patient photos for carousel - use uploaded photos if available
  const patientPhotos = React.useMemo(() => {
    const photos = [];

    if (frontPhotoUrl) {
      photos.push({
        src: frontPhotoUrl,
        label: "Front View",
        timestamp: new Date().toLocaleDateString(),
      });
    }

    if (sidePhotoUrl) {
      photos.push({
        src: sidePhotoUrl,
        label: "Side View",
        timestamp: new Date().toLocaleDateString(),
      });
    }

    // Fallback to mock photos if no uploaded photos
    if (photos.length === 0) {
      photos.push(
        {
          src: "/Sydney Adams Front.png",
          label: "Reference Front",
          timestamp: "2024-01-15",
        },
        {
          src: "/Sydney Adams Side.png",
          label: "Reference Side",
          timestamp: "2024-01-15",
        }
      );
    }

    return photos;
  }, [frontPhotoUrl, sidePhotoUrl]);

  // Get all unique areas from the analysis
  const areas = getAllAreas();

  // Helper function to apply logarithmic scaling to confidence scores
  const applyLogarithmicScaling = (confidence: number): number => {
    // Convert confidence (0-100) to a more distributed range (65-85)
    // Using logarithmic scaling with better distribution
    const normalized = confidence / 100; // Normalize to 0-1
    const logScaled = Math.pow(normalized, 0.7); // Apply power scaling for better distribution
    const scaled = logScaled * 20 + 65; // Scale to 65-85 range
    return Math.round(Math.min(100, Math.max(60, scaled)));
  };

  // Calculate area scores (average of all issues in each area with logarithmic scaling)
  const areaScores = areas.reduce((acc, area) => {
    const areaIssues = analysis.issues.filter((issue) => issue.area === area);
    if (areaIssues.length > 0) {
      const averageConfidence =
        areaIssues.reduce((sum, issue) => sum + issue.confidence, 0) /
        areaIssues.length;
      acc[area] = applyLogarithmicScaling(averageConfidence);
    } else {
      acc[area] = 100; // Perfect score if no issues
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate overall score with logarithmic scaling
  const overallScore = React.useMemo(() => {
    if (analysis.issues.length === 0) return 100;
    const averageConfidence =
      analysis.issues.reduce((sum, issue) => sum + issue.confidence, 0) /
      analysis.issues.length;
    return applyLogarithmicScaling(averageConfidence);
  }, [analysis.issues]);

  // Filter issues based on toggle and selected area
  const filteredIssues = React.useMemo(() => {
    let issues = analysis.issues;

    // Filter by probability threshold if not showing all
    if (!showAllIssues) {
      issues = issues.filter((issue) => {
        // Convert score back to probability to check threshold
        const probability = (95 - issue.confidence) / 35;
        return probability > 0.5;
      });
    }

    // Filter by selected area
    if (selectedArea !== "all") {
      issues = issues.filter((issue) => issue.area === selectedArea);
    }

    return issues;
  }, [analysis.issues, showAllIssues, selectedArea]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "text-yellow-400";
      case "moderate":
        return "text-orange-400";
      case "severe":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-yellow-400/20";
      case "moderate":
        return "bg-orange-400/20";
      case "severe":
        return "bg-red-400/20";
      default:
        return "bg-gray-400/20";
    }
  };

  const handleEditName = () => {
    setTempPatientName(patientName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setPatientName(tempPatientName);
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempPatientName(patientName);
    setIsEditingName(false);
  };

  const handleSaveDraft = async () => {
    if (!patientName.trim()) {
      alert("Please enter a patient name before saving the draft.");
      return;
    }

    setIsSaving(true);
    try {
      if (onSaveDraft) {
        await onSaveDraft(patientName.trim(), analysis);
        setIsDraft(false);
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-md transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                Analysis completed: {new Date().toLocaleDateString()}
              </div>
              {(rawModalResponse || modalError) && (
                <Button
                  onClick={() => setShowDebug(true)}
                  variant="secondary"
                  size="sm"
                  className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                >
                  Debug API Response
                </Button>
              )}
            </div>
          </div>

          {/* Draft Status and Patient Name */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold text-white">
                  AI Analysis Results
                </h1>
                {isDraft && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-300 text-sm font-medium">
                      Draft
                    </span>
                  </div>
                )}
              </div>

              {/* Patient Name Input */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Patient Name:</span>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempPatientName}
                      onChange={(e) => setTempPatientName(e.target.value)}
                      className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter patient name"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={handleSaveName}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md border border-green-500 hover:shadow-lg transition-all duration-200"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCancelEdit}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md border border-red-500 hover:shadow-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      {patientName || "Unnamed Patient"}
                    </span>
                    <Button
                      size="sm"
                      onClick={handleEditName}
                      className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-3 py-1 rounded-md border border-gray-600 hover:shadow-lg transition-all duration-200"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-300 text-lg">
              Comprehensive facial analysis with {analysis.issues.length}{" "}
              findings identified
            </p>
          </div>

          {/* Save Draft Button */}
          {isDraft && onSaveDraft && (
            <div className="flex justify-end mb-6">
              <Button
                onClick={handleSaveDraft}
                disabled={isSaving || !patientName.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Patient Photos */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Patient Photos
              </h3>

              {/* Photo Carousel */}
              <div className="relative">
                <div className="relative h-64 bg-gray-700/30 rounded-lg overflow-hidden">
                  <img
                    src={patientPhotos[currentPhotoIndex].src}
                    alt={patientPhotos[currentPhotoIndex].label}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70"
                    onClick={() =>
                      setCurrentPhotoIndex((prev) =>
                        prev > 0 ? prev - 1 : patientPhotos.length - 1
                      )
                    }
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70"
                    onClick={() =>
                      setCurrentPhotoIndex((prev) =>
                        prev < patientPhotos.length - 1 ? prev + 1 : 0
                      )
                    }
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-300">
                    {patientPhotos[currentPhotoIndex].label}
                  </p>
                  <p className="text-xs text-gray-500">
                    {patientPhotos[currentPhotoIndex].timestamp}
                  </p>
                </div>
              </div>

              {/* Photo Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {patientPhotos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentPhotoIndex
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    }`}
                    onClick={() => setCurrentPhotoIndex(index)}
                  />
                ))}
              </div>
            </Card>

            {/* Overall Score */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Overall Analysis
              </h3>
              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent ${
                    overallScore >= 85
                      ? "from-green-400 to-green-500"
                      : overallScore >= 75
                      ? "from-green-300 to-green-400"
                      : overallScore >= 65
                      ? "from-yellow-400 to-yellow-500"
                      : overallScore >= 55
                      ? "from-orange-400 to-orange-500"
                      : "from-red-400 to-red-500"
                  }`}
                >
                  {overallScore}
                </div>
                <p className="text-gray-300">Overall Score</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <motion.div
                    className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${
                      overallScore >= 85
                        ? "from-green-400 to-green-500"
                        : overallScore >= 75
                        ? "from-green-300 to-green-400"
                        : overallScore >= 65
                        ? "from-yellow-400 to-yellow-500"
                        : overallScore >= 55
                        ? "from-orange-400 to-orange-500"
                        : "from-red-400 to-red-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${overallScore}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Toggle and Area Filter */}
            <Card className="p-4 bg-gray-800/50 border-gray-700">
              {/* Toggle for showing all issues vs high probability only */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-300">Show:</span>
                  <button
                    onClick={() => setShowAllIssues(false)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      !showAllIssues
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Recommended to Address First
                  </button>
                  <button
                    onClick={() => setShowAllIssues(true)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      showAllIssues
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    All Concerns
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  {filteredIssues.length} issues shown
                </div>
              </div>

              {/* Area Filter with Scores */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedArea("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedArea === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  All Areas ({filteredIssues.length})
                </button>
                {areas.map((area) => {
                  const areaScore = areaScores[area];
                  const getGradientBg = (score: number) => {
                    if (score >= 85)
                      return "bg-gradient-to-r from-green-500 to-green-600";
                    if (score >= 75)
                      return "bg-gradient-to-r from-green-400 to-green-500";
                    if (score >= 65)
                      return "bg-gradient-to-r from-yellow-500 to-yellow-600";
                    if (score >= 55)
                      return "bg-gradient-to-r from-orange-500 to-orange-600";
                    return "bg-gradient-to-r from-red-500 to-red-600";
                  };

                  return (
                    <button
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedArea === area
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{area}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getGradientBg(
                            areaScore
                          )}`}
                        >
                          {areaScore}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Issues List - Grouped by area with images */}
            <div className="space-y-6 h-[calc(100vh-400px)] overflow-y-auto pr-2">
              {(() => {
                // Group issues by area
                const groupedIssues = filteredIssues.reduce((acc, issue) => {
                  if (!acc[issue.area]) {
                    acc[issue.area] = [];
                  }
                  acc[issue.area].push(issue);
                  return acc;
                }, {} as Record<string, typeof filteredIssues>);

                return Object.entries(groupedIssues).map(
                  ([area, issues], areaIndex) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: areaIndex * 0.1 }}
                    >
                      <Card className="p-6 bg-gray-800/50 border-gray-700">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <span className="mr-2">{area}</span>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${getScoreBgColor(
                              areaScores[area]
                            )} ${getScoreColor(areaScores[area])}`}
                          >
                            {areaScores[area]}
                          </span>
                        </h3>

                        <div className="space-y-4">
                          {issues.map((issue, issueIndex) => {
                            const scaledConfidence = applyLogarithmicScaling(
                              issue.confidence
                            );
                            return (
                              <motion.div
                                key={issue.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: issueIndex * 0.1 }}
                                className="p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700/50 hover:border-blue-600/70 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 group rounded-lg"
                              >
                                {/* Full Width Layout with Left/Right Columns */}
                                <div className="flex items-start gap-6">
                                  {/* Left Column - Visual Example (Half Width) */}
                                  <div className="w-1/2">
                                    <div className="relative h-64">
                                      <img
                                        src={getIssueImage(
                                          issue.name,
                                          issue.area
                                        )}
                                        alt={`${issue.name} example`}
                                        className="w-full h-full object-cover rounded-2xl border border-gray-600/50"
                                        onError={(e) => {
                                          // Fallback to fallback image if finding image fails to load
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.src =
                                            getFallbackFindingImage();
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Right Column - Content (Half Width) */}
                                  <div className="w-1/2 h-64 flex flex-col justify-between">
                                    {/* Title and Description */}
                                    <div className="mb-4">
                                      <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                                          {issue.name}
                                        </h4>
                                      </div>
                                      <p className="text-gray-300 text-sm line-clamp-3">
                                        {issue.description}
                                      </p>
                                    </div>

                                    {/* Score */}
                                    <div className="flex items-center space-x-3 mb-3">
                                      <div
                                        className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                                          scaledConfidence >= 95
                                            ? "from-green-500 to-emerald-500"
                                            : scaledConfidence >= 85
                                            ? "from-green-400 to-green-500"
                                            : scaledConfidence >= 75
                                            ? "from-lime-400 to-green-400"
                                            : scaledConfidence >= 65
                                            ? "from-yellow-400 to-lime-400"
                                            : scaledConfidence >= 55
                                            ? "from-orange-400 to-yellow-400"
                                            : scaledConfidence >= 45
                                            ? "from-red-400 to-orange-400"
                                            : "from-red-500 to-red-400"
                                        }`}
                                      >
                                        {scaledConfidence}%
                                      </div>
                                    </div>

                                    {/* Score Bar */}
                                    <div className="mb-3">
                                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Significant</span>
                                        <span>Subtle</span>
                                      </div>
                                      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                          className={`absolute inset-0 bg-gradient-to-r ${
                                            scaledConfidence >= 95
                                              ? "from-green-500 to-emerald-500"
                                              : scaledConfidence >= 85
                                              ? "from-green-400 to-green-500"
                                              : scaledConfidence >= 75
                                              ? "from-lime-400 to-green-400"
                                              : scaledConfidence >= 65
                                              ? "from-yellow-400 to-lime-400"
                                              : scaledConfidence >= 55
                                              ? "from-orange-400 to-yellow-400"
                                              : scaledConfidence >= 45
                                              ? "from-red-400 to-orange-400"
                                              : "from-red-500 to-red-400"
                                          } rounded-full`}
                                          initial={{ width: 0 }}
                                          animate={{
                                            width: `${scaledConfidence}%`,
                                          }}
                                          transition={{
                                            duration: 1.5,
                                            delay: 0.5,
                                          }}
                                        />
                                      </div>
                                    </div>

                                    {/* Causes Info */}
                                    <div className="mb-3">
                                      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg">
                                        <p className="text-sm text-gray-300">
                                          <span className="font-semibold text-blue-400">
                                            Common Causes:
                                          </span>{" "}
                                          {(issue as any).causes
                                            ? (issue as any).causes.join(", ")
                                            : "Age-related changes, sun exposure, genetics, lifestyle factors"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </Card>
                    </motion.div>
                  )
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Debug Modal */}
      {showDebug && (
        <DebugModalResponse
          response={rawModalResponse}
          error={modalError}
          onClose={() => setShowDebug(false)}
        />
      )}
    </div>
  );
}
