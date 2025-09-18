"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  X,
  Target,
  Sparkles,
  Shield,
  Download,
  Share,
  Edit,
  RotateCcw,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface AreaAnalysisPopupProps {
  area: string;
  patient: any;
  onClose: () => void;
}

export function AreaAnalysisPopup({
  area,
  patient,
  onClose,
}: AreaAnalysisPopupProps) {
  const [currentView, setCurrentView] = useState("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const areaData = {
    "facial-structure": {
      title: "Facial Structure Analysis",
      description:
        "Comprehensive analysis of facial structure, symmetry, and volume distribution",
      icon: <Target className="w-8 h-8" />,
      color: "blue",
      overallScore: 78,
      details: [
        {
          name: "Mid Cheek Flattening",
          score: 72,
          severity: "moderate",
          description: "Anterior malar fat pad descent requiring restoration",
          recommendations: [
            "Juvederm Voluma 1-2ml per side",
            "Consider fat grafting for long-term results",
            "Follow-up in 6 months",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
        {
          name: "Temporal Hollow",
          score: 68,
          severity: "moderate",
          description:
            "Volume loss in temporal region affecting facial contour",
          recommendations: [
            "Temporal filler placement",
            "Consider Sculptra for collagen stimulation",
            "Monitor for 3 months",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
        {
          name: "Under Eye Hollow",
          score: 75,
          severity: "mild",
          description: "Grade 2 severity requiring structural support",
          recommendations: [
            "Tear trough filler 0.5-1ml per side",
            "Consider lower blepharoplasty consultation",
            "Gentle massage post-treatment",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
      ],
    },
    "skin-quality": {
      title: "Skin Quality Assessment",
      description:
        "Detailed analysis of skin texture, tone, and aging patterns",
      icon: <Sparkles className="w-8 h-8" />,
      color: "purple",
      overallScore: 82,
      details: [
        {
          name: "Dark Spots",
          score: 78,
          severity: "mild",
          description:
            "Pigmentation irregularities requiring targeted treatment",
          recommendations: [
            "Hydroquinone 4% cream",
            "Chemical peel series",
            "Daily SPF 50+",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
        {
          name: "Red Spots",
          score: 82,
          severity: "mild",
          description: "Vascular concerns identified for treatment",
          recommendations: [
            "IPL treatment series",
            "Topical azelaic acid",
            "Avoid triggers",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
        {
          name: "Whiteheads",
          score: 85,
          severity: "minimal",
          description: "Minor comedonal acne present, easily treatable",
          recommendations: [
            "Salicylic acid cleanser",
            "Retinoid treatment",
            "Professional extraction",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
      ],
    },
    "preventative-care": {
      title: "Preventive Care Planning",
      description: "Long-term aesthetic preservation and intervention strategy",
      icon: <Shield className="w-8 h-8" />,
      color: "green",
      overallScore: 75,
      details: [
        {
          name: "Collagen Density",
          score: 72,
          severity: "good",
          description:
            "Excellent for prevention compared to age-matched controls",
          recommendations: [
            "Microneedling series",
            "Collagen supplements",
            "Retinoid maintenance",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
        {
          name: "Elastin Integrity",
          score: 69,
          severity: "good",
          description: "Good elastin preservation for preventive intervention",
          recommendations: [
            "Antioxidant serum",
            "Sun protection",
            "Regular facials",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
        {
          name: "Early Intervention",
          score: 78,
          severity: "excellent",
          description: "Ideal candidate for preventive treatment protocols",
          recommendations: [
            "Botox prevention",
            "Filler maintenance",
            "Lifestyle optimization",
          ],
          beforeAfter: {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
          },
        },
      ],
    },
  };

  const currentArea =
    areaData[area as keyof typeof areaData] || areaData["facial-structure"];
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
  const currentDetail = currentArea.details[currentDetailIndex];

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
          gradient: "from-gray-600 to-gray-800",
          bg: "bg-gray-600/20",
          border: "border-gray-500/50",
          text: "text-gray-400",
        };
    }
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
      case "good":
        return "text-green-400 bg-green-500/20 border-green-500/50";
      case "excellent":
        return "text-green-400 bg-green-500/20 border-green-500/50";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50";
    }
  };

  const colorClasses = getColorClasses(currentArea.color);

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const handlePreviousDetail = () => {
    setCurrentDetailIndex(Math.max(0, currentDetailIndex - 1));
  };

  const handleNextDetail = () => {
    setCurrentDetailIndex(
      Math.min(currentArea.details.length - 1, currentDetailIndex + 1)
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.5,
          }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses.gradient}`}
                >
                  <div className="text-white">{currentArea.icon}</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {currentArea.title}
                  </h2>
                  <p className="text-gray-400">{currentArea.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleReanalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <RotateCcw className="w-4 h-4" />
                  )}
                </Button>
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <Share className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Patient Info */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={patient?.frontImage || "/Sydney Adams Front.png"}
                    alt="Patient front view"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={patient?.sideImage || "/Sydney Adams Side.png"}
                    alt="Patient side view"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {patient?.name || "Patient"}
                </h3>
                <p className="text-sm text-gray-400">
                  Overall Score: {currentArea.overallScore}%
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Analysis Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Analysis Details
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handlePreviousDetail}
                      disabled={currentDetailIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-400">
                      {currentDetailIndex + 1} of {currentArea.details.length}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleNextDetail}
                      disabled={
                        currentDetailIndex === currentArea.details.length - 1
                      }
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Card
                  className={`p-4 ${colorClasses.bg} ${colorClasses.border} border`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">
                      {currentDetail.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs border ${getSeverityColor(
                          currentDetail.severity
                        )}`}
                      >
                        {currentDetail.severity}
                      </span>
                      <span
                        className={`text-xl font-bold ${colorClasses.text}`}
                      >
                        {currentDetail.score}%
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {currentDetail.description}
                  </p>

                  {/* Enhanced Animated Progress Bar */}
                  <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${colorClasses.gradient} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${currentDetail.score}%` }}
                      transition={{
                        duration: 2,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute top-0 left-0 w-2 h-full bg-white/40 rounded-full"
                      animate={{ x: [0, `${currentDetail.score}%`] }}
                      transition={{
                        duration: 2,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                    />
                  </div>

                  {/* Animated Recommendations */}
                  <div>
                    <h5 className="font-semibold text-white mb-2">
                      Recommendations
                    </h5>
                    <ul className="space-y-2">
                      {currentDetail.recommendations.map((rec, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.5,
                          }}
                          className="flex items-start space-x-2 text-sm text-gray-300 p-2 rounded-lg hover:bg-gray-700/30 transition-colors"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: index * 0.1 + 0.2,
                              type: "spring",
                              stiffness: 200,
                            }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          </motion.div>
                          <span>{rec}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>

              {/* Visual Analysis */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Visual Analysis
                </h3>

                {/* Before/After Comparison */}
                <Card className="p-4 bg-gray-800/50 border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Before</h4>
                      <div className="relative w-full h-32 rounded-lg overflow-hidden">
                        <img
                          src={currentDetail.beforeAfter.before}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 border border-red-500/50 rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">After</h4>
                      <div className="relative w-full h-32 rounded-lg overflow-hidden">
                        <img
                          src={currentDetail.beforeAfter.after}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 border border-green-500/50 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Treatment Timeline */}
                <Card className="p-4 bg-gray-800/50 border-gray-700">
                  <h4 className="font-semibold text-white mb-3">
                    Treatment Timeline
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          Immediate (0-2 weeks)
                        </p>
                        <p className="text-xs text-gray-400">
                          Initial treatment and recovery
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          Short-term (2-6 months)
                        </p>
                        <p className="text-xs text-gray-400">
                          Follow-up and maintenance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          Long-term (6+ months)
                        </p>
                        <p className="text-xs text-gray-400">
                          Ongoing care and monitoring
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="secondary">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Analysis
                </Button>
                <Button variant="secondary">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Follow-up
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button className={`bg-gradient-to-r ${colorClasses.gradient}`}>
                  Save Analysis
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
