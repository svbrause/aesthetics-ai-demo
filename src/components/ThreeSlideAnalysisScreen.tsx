"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Target,
  Sparkles,
  Shield,
  ChevronLeft,
  ChevronRight,
  Info,
  Star,
} from "lucide-react";

interface ThreeSlideAnalysisScreenProps {
  photoUrl: string;
  selectedPatient: "sydney" | "chelsea" | null;
  onMoreInfo: (category: string) => void;
  onViewJourney: () => void;
}

interface AnalysisCategory {
  id: string;
  title: string;
  description: string;
  overallScore: number;
  icon: React.ReactNode;
  color: string;
  details: {
    title: string;
    score: number;
    description: string;
  }[];
}

const getAnalysisCategories = (
  patient: "sydney" | "chelsea" | null
): AnalysisCategory[] => {
  if (patient === "sydney") {
    return [
      {
        id: "facial-structure",
        title: "Facial Structure",
        description: "Structural harmony and volume analysis",
        overallScore: 78,
        icon: <Target className="w-8 h-8" />,
        color: "blue",
        details: [
          {
            title: "Mid Cheek Flattening",
            score: 72,
            description:
              "2.8mm anterior malar fat pad descent requiring restoration",
          },
          {
            title: "Temporal Hollow",
            score: 68,
            description:
              "3.2mm volume loss in temporal region affecting facial contour",
          },
          {
            title: "Under Eye Hollow",
            score: 75,
            description: "Grade 2 severity requiring structural support",
          },
        ],
      },
      {
        id: "skin-quality",
        title: "Skin Quality",
        description: "Texture, tone, and aging pattern assessment",
        overallScore: 82,
        icon: <Sparkles className="w-8 h-8" />,
        color: "purple",
        details: [
          {
            title: "Dark Spots",
            score: 78,
            description:
              "22% pigmentation irregularities requiring targeted treatment",
          },
          {
            title: "Red Spots",
            score: 82,
            description: "18% vascular concerns identified for treatment",
          },
          {
            title: "Whiteheads",
            score: 85,
            description: "Minor comedonal acne present, easily treatable",
          },
        ],
      },
      {
        id: "preventative-care",
        title: "Preventative Care",
        description: "Proactive maintenance and long-term strategy",
        overallScore: 75,
        icon: <Shield className="w-8 h-8" />,
        color: "green",
        details: [
          {
            title: "Collagen Density",
            score: 72,
            description:
              "72% of age-matched controls - excellent for prevention",
          },
          {
            title: "Elastin Integrity",
            score: 69,
            description:
              "Good elastin preservation for preventive intervention",
          },
          {
            title: "Early Intervention",
            score: 78,
            description: "Ideal candidate for preventive treatment protocols",
          },
        ],
      },
    ];
  } else if (patient === "chelsea") {
    return [
      {
        id: "facial-structure",
        title: "Facial Structure",
        description: "Advanced structural aging analysis",
        overallScore: 62,
        icon: <Target className="w-8 h-8" />,
        color: "purple",
        details: [
          {
            title: "Jowls",
            score: 45,
            description: "Grade 3 severity requiring comprehensive correction",
          },
          {
            title: "Ill-Defined Jawline",
            score: 50,
            description: "35% volume loss requiring structural support",
          },
          {
            title: "Excess Submental Fullness",
            score: 55,
            description: "Grade 2-3 severity affecting neck contour",
          },
        ],
      },
      {
        id: "skin-quality",
        title: "Skin Quality",
        description: "Advanced skin damage assessment",
        overallScore: 68,
        icon: <Sparkles className="w-8 h-8" />,
        color: "blue",
        details: [
          {
            title: "Dark Spots",
            score: 62,
            description:
              "38% pigmentation irregularities requiring aggressive treatment",
          },
          {
            title: "Red Spots",
            score: 75,
            description: "25% vascular concerns identified",
          },
          {
            title: "Excess Upper Eyelid Skin",
            score: 58,
            description: "Grade 2-3 severity affecting eye area",
          },
        ],
      },
      {
        id: "preventative-care",
        title: "Preventative Care",
        description: "Immediate intervention strategy",
        overallScore: 55,
        icon: <Shield className="w-8 h-8" />,
        color: "green",
        details: [
          {
            title: "Collagen Density",
            score: 48,
            description:
              "48% of age-matched controls - requires immediate intervention",
          },
          {
            title: "Elastin Integrity",
            score: 42,
            description: "42% preservation - aggressive treatment needed",
          },
          {
            title: "Cellular Turnover",
            score: 45,
            description:
              "32% slower than optimal - comprehensive protocol required",
          },
        ],
      },
    ];
  }

  // Default fallback
  return [
    {
      id: "facial-structure",
      title: "Facial Structure",
      description: "Structural harmony and symmetry analysis",
      overallScore: 78,
      icon: <Target className="w-8 h-8" />,
      color: "blue",
      details: [
        {
          title: "Facial Balance",
          score: 75,
          description: "Overall facial harmony and symmetry analysis",
        },
      ],
    },
    {
      id: "skin-quality",
      title: "Skin Quality",
      description: "Texture, tone, and aging pattern assessment",
      overallScore: 85,
      icon: <Sparkles className="w-8 h-8" />,
      color: "purple",
      details: [
        {
          title: "Skin Health",
          score: 80,
          description: "Overall skin quality and health assessment",
        },
      ],
    },
    {
      id: "preventative-care",
      title: "Preventative Care",
      description: "Proactive maintenance and long-term strategy",
      overallScore: 72,
      icon: <Shield className="w-8 h-8" />,
      color: "green",
      details: [
        {
          title: "Prevention Strategy",
          score: 70,
          description: "Long-term aesthetic preservation planning",
        },
      ],
    },
  ];
};

export function ThreeSlideAnalysisScreen({
  photoUrl,
  selectedPatient,
  onMoreInfo,
  onViewJourney,
}: ThreeSlideAnalysisScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const analysisCategories = getAnalysisCategories(selectedPatient);
  const currentCategory = analysisCategories[currentSlide];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          gradient: "from-blue-600 to-blue-800",
          bg: "bg-blue-600/20",
          border: "border-blue-500/50",
          text: "text-blue-400",
        };
      case "purple":
        return {
          gradient: "from-purple-600 to-purple-800",
          bg: "bg-purple-600/20",
          border: "border-purple-500/50",
          text: "text-purple-400",
        };
      case "green":
        return {
          gradient: "from-green-600 to-green-800",
          bg: "bg-green-600/20",
          border: "border-green-500/50",
          text: "text-green-400",
        };
      default:
        return {
          gradient: "from-blue-600 to-blue-800",
          bg: "bg-blue-600/20",
          border: "border-blue-500/50",
          text: "text-blue-400",
        };
    }
  };

  const colorClasses = getColorClasses(currentCategory.color);

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      Math.min(analysisCategories.length - 1, prev + 1)
    );
  };

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col"
      style={{
        height: "calc(var(--actual-vh, 100vh))",
        minHeight: "calc(var(--actual-vh, 100vh))",
        maxHeight: "calc(var(--actual-vh, 100vh))",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 border-b border-gray-800"
      >
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12">
            <img
              src={photoUrl}
              alt="User photo"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white mb-0.5">
              Your Analysis Results
            </h1>
            <p className="text-gray-400 text-xs">
              AI-powered aesthetic insights
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">78%</div>
              <div className="text-xs text-gray-400">Overall Score</div>
            </div>
            <Button
              onClick={() => onMoreInfo(currentCategory.id)}
              variant="secondary"
              size="sm"
            >
              <Info className="w-4 h-4 mr-1" />
              More Details
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Paginated Slideshow */}
      <div className="flex-1 flex flex-col">
        {/* Slide Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Category Icon and Title */}
                <div className="mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${colorClasses.gradient} mb-4`}
                  >
                    <div className="text-white">{currentCategory.icon}</div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {currentCategory.title}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {currentCategory.description}
                  </p>
                </div>

                {/* Sub-components with Gradient Bars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {currentCategory.details.map((detail, index) => (
                    <motion.div
                      key={detail.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-gray-800/30 border border-gray-700"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-white">
                          {detail.title}
                        </h3>
                        <div className="text-lg font-bold text-white">
                          {detail.score}%
                        </div>
                      </div>

                      {/* Animated Gradient Bar */}
                      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${detail.score}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            delay: index * 0.2,
                          }}
                        />
                      </div>

                      <p className="text-xs text-gray-300">
                        {detail.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className="disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {currentSlide + 1} of {analysisCategories.length}
              </span>
              <div className="flex gap-2">
                {analysisCategories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? `bg-gradient-to-r ${colorClasses.gradient} w-8`
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={currentSlide === analysisCategories.length - 1}
              className="disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Build Journey Button */}
          <Button
            onClick={onViewJourney}
            size="lg"
            className={`w-full bg-gradient-to-r ${colorClasses.gradient} hover:opacity-90`}
          >
            Build Your Journey
            <Star className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
