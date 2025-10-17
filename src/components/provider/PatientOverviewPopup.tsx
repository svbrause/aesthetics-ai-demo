"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Heart,
  Zap,
  Shield,
  Target,
  Eye,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Patient } from "@/types/patientTypes";
import { analysisAreas } from "@/data/analysisData";

interface PatientOverviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

interface CategoryScore {
  name: string;
  score: number;
  color: string;
  icon: React.ReactNode;
  subcategories?: Record<string, number>;
}

interface AreaSummary {
  area: string;
  pros: string[];
  cons: string[];
  overallScore: number;
}

interface SpiderChartData {
  category: string;
  value: number;
  color: string;
}

// Spider Chart Component - Rebuilt from scratch
const SpiderChart = ({
  data,
  size = 160,
}: {
  data: SpiderChartData[];
  size?: number;
}) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;
  const numPoints = data.length;
  const angleStep = (2 * Math.PI) / numPoints;

  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle),
    };
  };

  const points = data.map((item, index) => getPoint(index, item.value));
  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map((percent) => (
          <circle
            key={percent}
            cx={centerX}
            cy={centerY}
            r={(percent / 100) * radius}
            fill="none"
            stroke="rgba(75, 85, 99, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Category lines */}
        {data.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const endX = centerX + radius * Math.cos(angle);
          const endY = centerY + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="rgba(75, 85, 99, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data area */}
        <path
          d={`${pathData} Z`}
          fill="rgba(59, 130, 246, 0.15)"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={data[index].color}
            stroke="white"
            strokeWidth="1.5"
          />
        ))}

        {/* Category labels - positioned outside the chart area */}
        {data.map((item, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const labelRadius = radius + 20;
          const labelX = centerX + labelRadius * Math.cos(angle);
          const labelY = centerY + labelRadius * Math.sin(angle);

          // Determine text anchor based on angle
          let textAnchor: "start" | "middle" | "end" = "middle";
          if (angle < -Math.PI / 3 || angle > Math.PI / 3) {
            textAnchor = "end";
          } else if (angle > -Math.PI / 3 && angle < Math.PI / 3) {
            textAnchor = "start";
          }

          return (
            <text
              key={index}
              x={labelX}
              y={labelY}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-300"
              style={{
                fontSize: "9px",
                textShadow: "0 0 3px rgba(0,0,0,0.7)",
              }}
            >
              {item.category}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export function PatientOverviewPopup({
  isOpen,
  onClose,
  patient,
}: PatientOverviewPopupProps) {
  const [showAreasPrompt, setShowAreasPrompt] = useState(false);

  // Calculate overall skin age score
  const calculateSkinAgeScore = () => {
    if (!patient.findings || patient.findings.length === 0) return 0;

    const findingsWithScores = patient.findings.filter(
      (f) => typeof f === "object" && f.score
    );
    if (findingsWithScores.length === 0) return 0;

    const totalScore = findingsWithScores.reduce(
      (sum, finding) => sum + (finding.score || 0),
      0
    );
    return Math.round(totalScore / findingsWithScores.length);
  };

  // Calculate category scores with subcategories for spider charts
  const calculateCategoryScores = (): CategoryScore[] => {
    const skinHealthSubcategories = {
      Wrinkles: [
        "Forehead Wrinkles",
        "Under Eye Wrinkles",
        "Crow's Feet Wrinkles",
        "Glabella Wrinkles",
        "Perioral Wrinkles",
        "Neck Lines",
      ],
      Pigmentation: ["Dark Spots", "Red Spots"],
      Texture: [
        "Whiteheads",
        "Blackheads",
        "Scars",
        "Fine Lines",
        "Skin Texture",
      ],
    };

    const volumeLossSubcategories = {
      "Eye Area": [
        "Temporal Hollow",
        "Under Eye Hollow",
        "Upper Eye Hollow",
        "Lower Eyelid Bags",
      ],
      "Cheek Area": ["Mid Cheek Flattening"],
      "Lower Face": [
        "Lip Volume Loss",
        "Prejowl Sulcus",
        "Retruded Chin",
        "Jowls",
        "Ill-Defined Jawline",
      ],
      "Neck Area": ["Excess/Submental Fullness"],
    };

    const proportionsSubcategories = {
      "Brow & Eyes": ["Brow Asymmetry"],
      Nose: [
        "Crooked Nose",
        "Dorsal Hump",
        "Over-Projected",
        "Over-Rotated",
        "Nasal Bone - Too Wide",
        "Nostril Base - Too Wide",
        "Nasal Tip Too Wide",
      ],
      Lips: [
        "Thin Lips",
        "Asymmetric Lips",
        "Long Philtral Column",
        "Lacking Philtral Column",
        "Dry Lips",
      ],
      Jaw: ["Masseter Hypertrophy"],
    };

    const calculateSubcategoryScores = (
      subcategories: Record<string, string[]>
    ) => {
      const scores: Record<string, number> = {};
      Object.entries(subcategories).forEach(([name, findings]) => {
        const relevantFindings = patient.findings.filter(
          (f) => typeof f === "object" && findings.includes(f.name)
        );
        if (relevantFindings.length === 0) {
          scores[name] = 0;
        } else {
          const totalScore = relevantFindings.reduce(
            (sum, finding) => sum + (finding.score || 0),
            0
          );
          scores[name] = Math.round(totalScore / relevantFindings.length);
        }
      });
      return scores;
    };

    const skinHealthScores = calculateSubcategoryScores(
      skinHealthSubcategories
    );
    const volumeLossScores = calculateSubcategoryScores(
      volumeLossSubcategories
    );
    const proportionsScores = calculateSubcategoryScores(
      proportionsSubcategories
    );

    return [
      {
        name: "Skin Health",
        score: Math.round(
          Object.values(skinHealthScores).reduce((a, b) => a + b, 0) /
            Object.values(skinHealthScores).length
        ),
        color: "gray",
        icon: <Shield className="w-5 h-5" />,
        subcategories: skinHealthScores,
      },
      {
        name: "Volume Loss",
        score: Math.round(
          Object.values(volumeLossScores).reduce((a, b) => a + b, 0) /
            Object.values(volumeLossScores).length
        ),
        color: "gray",
        icon: <Activity className="w-5 h-5" />,
        subcategories: volumeLossScores,
      },
      {
        name: "Proportions",
        score: Math.round(
          Object.values(proportionsScores).reduce((a, b) => a + b, 0) /
            Object.values(proportionsScores).length
        ),
        color: "gray",
        icon: <Target className="w-5 h-5" />,
        subcategories: proportionsScores,
      },
    ];
  };

  // Get favorited areas and their summaries with comprehensive analysis
  const getFavoritedAreas = (): AreaSummary[] => {
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

    // If no areas found, show all areas that have findings
    if (interestedAreas.size === 0) {
      analysisAreas.forEach((area) => {
        const hasFindings = patient.findings.some((f: any) => {
          const findingName = typeof f === "string" ? f : f.name;
          return area.findings.some((af) => af.name === findingName);
        });
        if (hasFindings) {
          interestedAreas.add(area.id);
        }
      });
    }

    return Array.from(interestedAreas)
      .map((areaId) => {
        const area = analysisAreas.find((a) => a.id === areaId);
        if (!area) return null;

        const areaFindings = patient.findings.filter((f) => {
          const findingName = typeof f === "string" ? f : f.name;
          return area.findings.some((af) => af.name === findingName);
        });

        const findingsWithScores = areaFindings.filter(
          (f) => typeof f === "object" && f.score
        );
        const overallScore =
          findingsWithScores.length > 0
            ? Math.round(
                findingsWithScores.reduce((sum, f) => sum + (f.score || 0), 0) /
                  findingsWithScores.length
              )
            : 0;

        // Enhanced pros and cons analysis
        const allFindings = findingsWithScores.sort(
          (a, b) => (b.score || 0) - (a.score || 0)
        );

        // Pros: Best performing findings (top 3, or all if less than 3)
        const pros = allFindings
          .filter((f) => (f.score || 0) >= 75) // Good scores
          .slice(0, 3)
          .map((f) => f.name);

        // If no pros found, show the best performing ones
        if (pros.length === 0 && allFindings.length > 0) {
          pros.push(...allFindings.slice(0, 2).map((f) => f.name));
        }

        // Cons: Areas needing attention (worst performing)
        const cons = allFindings
          .filter((f) => (f.score || 0) < 70) // Areas needing attention
          .slice(0, 3)
          .map((f) => f.name);

        // If no cons found but we have findings, show the worst ones
        if (cons.length === 0 && allFindings.length > 0) {
          cons.push(...allFindings.slice(-2).map((f) => f.name));
        }

        // If still no pros/cons, create generic ones based on area
        if (pros.length === 0 && cons.length === 0) {
          pros.push("No specific findings detected");
          cons.push("Complete analysis recommended");
        }

        return {
          area: area.name,
          pros: pros.length > 0 ? pros : ["Analysis pending"],
          cons: cons.length > 0 ? cons : ["No concerns identified"],
          overallScore,
        };
      })
      .filter(Boolean) as AreaSummary[];
  };

  const skinAgeScore = calculateSkinAgeScore();
  const categoryScores = calculateCategoryScores();
  const favoritedAreas = getFavoritedAreas();

  // Check if patient has areas of interest
  useEffect(() => {
    if (favoritedAreas.length === 0) {
      setShowAreasPrompt(true);
    } else {
      setShowAreasPrompt(false);
    }
  }, [favoritedAreas.length]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#367588]";
    if (score >= 60) return "text-[#2c5f6b]";
    return "text-[#4a8a9a]";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-[#367588]/20 border-[#367588]/30";
    if (score >= 60) return "bg-[#367588]/20 border-[#367588]/30";
    return "bg-[#367588]/20 border-[#367588]/30";
  };

  const getCategoryColor = (color: string, score: number) => {
    // Medspa theme for all categories
    return {
      text: "text-[#367588]",
      bg: "bg-[#e6f3f7]",
      border: "border-[#367588]/20",
      progress: "bg-[#367588]",
    };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl border border-gray-200 w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gray-50 border-b border-gray-200">
            <div className="relative flex items-center justify-between p-6">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-gray-900">
                  Patient Overview
                </h2>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="font-medium">{patient.name}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>Age {patient.age}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">
                    {(patient as any).scanDate || "Dec 15, 2024"}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-6 space-y-8">
              {/* Overall Score Section */}
              <div className="relative overflow-hidden">
                <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Overall Skin Age Score
                      </h3>
                      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#367588] to-transparent mx-auto" />
                    </div>

                    {/* Main Content - Horizontal Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Left Column - Score Circle */}
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="relative inline-flex items-center justify-center">
                            {/* Outer glow ring */}
                            <div
                              className={`absolute inset-0 rounded-full blur-xl ${getScoreBgColor(
                                skinAgeScore
                              )
                                .replace("border-", "bg-")
                                .replace("/30", "/20")}`}
                            />

                            {/* Circular Progress Ring */}
                            <svg
                              className="w-48 h-48 transform -rotate-90"
                              viewBox="0 0 100 100"
                            >
                              {/* Background circle */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#e6f3f7"
                                strokeWidth="6"
                                fill="none"
                              />
                              {/* Progress circle */}
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#367588"
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${skinAgeScore * 2.51}, 251`}
                                initial={{ strokeDasharray: "0, 251" }}
                                animate={{
                                  strokeDasharray: `${
                                    skinAgeScore * 2.51
                                  }, 251`,
                                }}
                                transition={{
                                  duration: 1.5,
                                  ease: "easeOut",
                                  delay: 0.5,
                                }}
                              />
                            </svg>

                            {/* Main score circle - centered content */}
                            <div className="absolute inset-0 flex items-center justify-center w-48 h-48">
                              <div className="text-center">
                                <motion.span
                                  className={`text-6xl font-black ${getScoreColor(
                                    skinAgeScore
                                  )} drop-shadow-lg`}
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                    delay: 1,
                                  }}
                                >
                                  {skinAgeScore}
                                </motion.span>
                                <div className="text-sm text-gray-500 font-medium mt-1">
                                  / 100
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Description and Details */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-900">
                              {skinAgeScore >= 80
                                ? "Excellent skin health"
                                : skinAgeScore >= 60
                                ? "Good skin health"
                                : "Areas for improvement"}
                            </p>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-400 via-lime-400 to-emerald-400 rounded-full" />
                          </div>

                          <p className="text-gray-600 text-base leading-relaxed">
                            {skinAgeScore >= 80
                              ? "Your skin shows excellent health with minimal signs of aging. Continue your current skincare routine and regular treatments to maintain this level."
                              : skinAgeScore >= 60
                              ? "Your skin is in good condition with some areas that could benefit from targeted treatments. Focus on the areas highlighted below for optimal results."
                              : "Your skin shows several areas that would benefit from professional treatment. Consider a comprehensive treatment plan to address the key concerns identified."}
                          </p>
                        </div>

                        {/* Patient Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            className="bg-white rounded-xl p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                          >
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">
                                {patient.age}
                              </div>
                              <div className="text-xs text-gray-500 font-medium">
                                Age
                              </div>
                            </div>
                          </motion.div>
                          <motion.div
                            className="bg-white rounded-xl p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.6 }}
                          >
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">
                                {patient.findings.length}
                              </div>
                              <div className="text-xs text-gray-500 font-medium">
                                Findings
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Scan Date */}
                        <div className="text-center">
                          <div className="text-sm text-gray-500">
                            Last scan:{" "}
                            <span className="text-gray-700 font-medium">
                              {(patient as any).scanDate || "Dec 15, 2024"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Scores Section */}
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Category Breakdown
                  </h3>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {categoryScores.map((category, index) => {
                    const colors = getCategoryColor(
                      category.color,
                      category.score
                    );
                    const subcategoryData = category.subcategories
                      ? Object.entries(category.subcategories).map(
                          ([name, score]) => ({
                            category: name,
                            value: score,
                            color: colors.progress
                              .replace("bg-", "")
                              .replace("-500", "-400"),
                          })
                        )
                      : [];

                    const gradientColors = [
                      "from-[#367588]/20 to-[#2c5f6b]/20",
                      "from-[#4a8a9a]/20 to-[#367588]/20",
                      "from-[#2c5f6b]/20 to-[#1a4a52]/20",
                    ];

                    return (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index]} rounded-2xl`}
                        />
                        <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
                                  <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                    {category.icon}
                                  </div>
                                </div>
                                <span className="font-semibold text-gray-900 text-lg">
                                  {category.name}
                                </span>
                              </div>
                              <div className="text-right">
                                <span
                                  className={`text-3xl font-black ${colors.text} drop-shadow-lg`}
                                >
                                  {category.score}
                                </span>
                                <div className="text-xs text-gray-500 font-medium">
                                  / 100
                                </div>
                              </div>
                            </div>

                            {/* Individual Spider Chart */}
                            {subcategoryData.length > 0 && (
                              <div className="flex justify-center py-2">
                                <div className="w-48 h-48 flex items-center justify-center">
                                  <SpiderChart
                                    data={subcategoryData}
                                    size={160}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Enhanced Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>0</span>
                                <span className="font-medium">Score</span>
                                <span>100</span>
                              </div>
                              <div className="relative w-full bg-[#e6f3f7] rounded-full h-3 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#e6f3f7] to-[#d1e7f0] rounded-full" />
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${category.score}%` }}
                                  transition={{
                                    delay: 0.5 + index * 0.1,
                                    duration: 0.8,
                                    ease: "easeOut",
                                  }}
                                  className={`h-full rounded-full ${colors.progress} shadow-lg`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Areas of Interest Section */}
              {showAreasPrompt ? (
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-2xl" />
                  <div className="relative bg-white rounded-2xl p-8 border border-yellow-200">
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-100 rounded-full blur-2xl" />
                        <AlertCircle className="relative w-20 h-20 text-yellow-500 mx-auto" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-gray-900">
                          No Areas of Interest Selected
                        </h3>
                        <p className="text-gray-600 text-lg max-w-md mx-auto">
                          This patient hasn't selected their areas of interest
                          yet. Please complete the analysis to see personalized
                          insights.
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          console.log("Navigate to analysis");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Complete Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Areas of Interest
                    </h3>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoritedAreas.map((area, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl" />
                        <div className="relative bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-gray-900 text-base group-hover:text-[#367588] transition-colors duration-300">
                                {area.area}
                              </h4>
                              <div className="text-right">
                                <span
                                  className={`text-2xl font-black ${getScoreColor(
                                    area.overallScore
                                  )} drop-shadow-lg`}
                                >
                                  {area.overallScore}
                                </span>
                                <div className="text-xs text-gray-500 font-medium">
                                  / 100
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Pros - Left Column */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <div className="p-1 bg-[#367588]/20 rounded-lg">
                                    <CheckCircle className="w-3 h-3 text-[#367588]" />
                                  </div>
                                  <span className="text-sm font-semibold text-[#367588]">
                                    Strengths
                                  </span>
                                </div>
                                <ul className="space-y-1.5">
                                  {area.pros
                                    .slice(0, 3)
                                    .map((pro, proIndex) => (
                                      <li
                                        key={proIndex}
                                        className="text-sm text-gray-600 flex items-start space-x-2 group-hover:text-gray-700 transition-colors duration-300"
                                      >
                                        <div className="w-1.5 h-1.5 bg-[#367588] rounded-full flex-shrink-0 mt-2" />
                                        <span className="leading-relaxed">
                                          {pro}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>

                              {/* Cons - Right Column */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <div className="p-1 bg-[#367588]/20 rounded-lg">
                                    <TrendingDown className="w-3 h-3 text-[#367588]" />
                                  </div>
                                  <span className="text-sm font-semibold text-[#367588]">
                                    Areas for Improvement
                                  </span>
                                </div>
                                <ul className="space-y-1.5">
                                  {area.cons
                                    .slice(0, 3)
                                    .map((con, conIndex) => (
                                      <li
                                        key={conIndex}
                                        className="text-sm text-gray-600 flex items-start space-x-2 group-hover:text-gray-700 transition-colors duration-300"
                                      >
                                        <div className="w-1.5 h-1.5 bg-[#367588] rounded-full flex-shrink-0 mt-2" />
                                        <span className="leading-relaxed">
                                          {con}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
