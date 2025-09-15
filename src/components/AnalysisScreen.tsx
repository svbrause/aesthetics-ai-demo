"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Circle,
  Loader2,
  Target,
  MapPin,
  Brain,
  Eye,
  Sparkles,
  Shield,
  ChevronRight,
  Heart,
  Syringe,
  Droplets,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";

interface AnalysisScreenProps {
  photoUrl: string;
  onComplete: () => void;
  onViewJourney: () => void;
  showResults?: boolean;
  selectedCategory?: string;
}

interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  icon: React.ReactNode;
}

interface AnalysisCategory {
  id: string;
  title: string;
  description: string;
  score: number;
  icon: React.ReactNode;
  issues: string[];
  suggestedTreatments: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    priceRange: string;
  }[];
}

const analysisSteps: AnalysisStep[] = [
  {
    id: "background",
    title: "Background Removal",
    description: "Isolating facial features for precise analysis",
    duration: 2000,
    icon: <Target className="w-4 h-4" />,
  },
  {
    id: "landmarks",
    title: "Facial Mapping",
    description: "Identifying key landmarks and symmetry points",
    duration: 2500,
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: "analysis",
    title: "AI Analysis",
    description: "Processing 50+ aesthetic parameters",
    duration: 3000,
    icon: <Brain className="w-4 h-4" />,
  },
];

const progressMessages = [
  "Processing image and removing background...",
  "Identifying facial landmarks and symmetry points...",
  "Analyzing skin texture and tone variations...",
  "Detecting dynamic expression lines...",
  "Assessing volume and contour changes...",
  "Evaluating facial proportions and asymmetry...",
  "Analyzing photoaging and pigmentation patterns...",
  "Detecting skin concerns and texture issues...",
  "Generating personalized clinical insights...",
  "Analysis complete! Building your comprehensive profile...",
];

// Demo patient data mapping
const getPatientAnalysis = (patientName: string) => {
  const patientData: Record<string, { findings: string[] }> = {
    "Sydney Adams": {
      findings: ["Forehead Wrinkles", "Dark Spots", "Nasolabial Folds", "Marionette Lines", "Red Spots", "Whiteheads", "Temporal Hollow", "Under Eye Hollow", "Upper Eye Hollow", "Lower Eyelid Sag", "Mid Cheek Flattening", "Crooked Nose", "Dorsal Hump", "Dry Lips", "Excess/Submental Fullness", "Prejowl Sulcus", "Retruded Chin", "Masseter Hypertrophy"]
    },
    "Chelsea Perry": {
      findings: ["Under Eye Wrinkles", "Bunny Lines", "Neck Lines", "Dark Spots", "Red Spots", "Nasolabial Folds", "Marionette Lines", "Temporal Hollow", "Brow Asymmetry", "Excess Upper Eyelid Skin", "Under Eye Hollow", "Negative Canthal Tilt", "Cheekbone - Not Prominent", "Over-Projected", "Over-Rotated", "Nasal Bone - Too Wide", "Nostril Base - Too Wide", "Nasal Tip Too Wide", "Thin Lips", "Long Philtral Column", "Dry Lips", "Retruded Chin", "Jowls", "Ill-Defined Jawline", "Prejowl Sulcus", "Excess/Submental Fullness", "Obtuse Cervicomental Angle"]
    }
  };
  
  return patientData[patientName] || { findings: [] };
};

const analysisCategories: AnalysisCategory[] = [
  {
    id: "facial-structure",
    title: "Facial Structure Analysis",
    description: "Comprehensive anatomical assessment and symmetry evaluation",
    score: 78,
    icon: <Target className="w-5 h-5" />,
    issues: [
      "Mid Cheek Flattening (moderate volume loss)",
      "Temporal Hollow (visible volume loss)",
      "Under Eye Hollow (Grade 2 severity)",
      "Nasolabial Folds (Grade 1-2 severity)",
      "Prejowl Sulcus (volume loss requiring structural support)",
      "Brow Asymmetry (mild asymmetry in height and arch positioning)",
    ],
    suggestedTreatments: [
      {
        id: "hyaluronic-fillers",
        name: "Hyaluronic Acid Fillers",
        description:
          "Temporal hollow restoration, under-eye correction, mid-cheek enhancement",
        icon: <Syringe className="w-4 h-4" />,
        priceRange: "$1,400-2,500",
      },
      {
        id: "thread-lift",
        name: "Thread Lifting",
        description:
          "Jawline and midface lifting for skin laxity and contour improvement",
        icon: <Zap className="w-4 h-4" />,
        priceRange: "$2,500-4,000",
      },
      {
        id: "botox-structure",
        name: "Botox for Structure",
        description:
          "Masseter muscle treatment for jawline definition and facial contouring",
        icon: <Droplets className="w-4 h-4" />,
        priceRange: "$600-1,200",
      },
    ],
  },
  {
    id: "skin-quality",
    title: "Skin Quality Assessment",
    description:
      "Advanced skin analysis with VISIA imaging and clinical evaluation",
    score: 85,
    icon: <Sparkles className="w-5 h-5" />,
    issues: [
      "Photoaging (visible sun damage and aging signs)",
      "Dark Spots (pigmentation irregularities)",
      "Red Spots (vascular concerns identified)",
      "Dynamic Expression Lines (mild to moderate activity)",
      "Skin Texture (roughness and unevenness)",
      "Whiteheads (minor comedonal acne present)",
    ],
    suggestedTreatments: [
      {
        id: "medical-skincare",
        name: "Medical-Grade Skincare Protocol",
        description:
          "Tretinoin, Vitamin C, Niacinamide, SPF 50+, Hyaluronic Acid",
        icon: <Droplets className="w-4 h-4" />,
        priceRange: "$450-650",
      },
      {
        id: "botox-skin",
        name: "Botox Treatment",
        description:
          "Forehead, glabella, crow's feet to prevent dynamic lines",
        icon: <Syringe className="w-4 h-4" />,
        priceRange: "$400-800",
      },
      {
        id: "chemical-peels",
        name: "Chemical Peels",
        description:
          "Monthly treatments for dark spots, texture improvement, and skin renewal",
        icon: <Sparkles className="w-4 h-4" />,
        priceRange: "$300-600",
      },
      {
        id: "microneedling-prp",
        name: "Microneedling with PRP",
        description:
          "Quarterly treatments to stimulate collagen and improve skin quality",
        icon: <Zap className="w-4 h-4" />,
        priceRange: "$600-1,200",
      },
    ],
  },
  {
    id: "preventative-care",
    title: "Preventative Care Strategy",
    description:
      "Evidence-based preventive protocols and long-term maintenance planning",
    score: 72,
    icon: <Shield className="w-5 h-5" />,
    issues: [
      "Early Intervention Opportunity (ideal candidate for preventive protocols)",
      "Lifestyle Factor Integration (professional appearance requirements)",
      "Long-term Aesthetic Preservation Strategy",
      "Skincare Foundation Assessment (current regimen evaluation)",
      "Sun Protection Habits (SPF usage and sun exposure patterns)",
      "Preventive Treatment Readiness (willingness for maintenance)",
    ],
    suggestedTreatments: [
      {
        id: "comprehensive-assessment",
        name: "Comprehensive Clinical Assessment",
        description:
          "60-minute consultation with VISIA imaging, baseline photography, and treatment planning",
        icon: <Target className="w-4 h-4" />,
        priceRange: "$500-800",
      },
      {
        id: "preventive-protocol",
        name: "Preventive Treatment Protocol",
        description:
          "Early intervention with Botox, targeted fillers, and medical skincare",
        icon: <Shield className="w-4 h-4" />,
        priceRange: "$1,400-2,000",
      },
      {
        id: "maintenance-planning",
        name: "Long-term Maintenance Planning",
        description:
          "Annual strategy development and ongoing treatment optimization",
        icon: <Heart className="w-4 h-4" />,
        priceRange: "$300-500",
      },
    ],
  },
];

export function AnalysisScreen({
  photoUrl,
  onComplete,
  onViewJourney,
  showResults = false,
  selectedCategory,
}: AnalysisScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(progressMessages[0]);
  const [isComplete, setIsComplete] = useState(false);
  const [heartedTreatments, setHeartedTreatments] = useState<Set<string>>(
    new Set()
  );

  // Filter categories based on selectedCategory prop
  const filteredCategories = selectedCategory
    ? analysisCategories.filter((cat) => cat.id === selectedCategory)
    : analysisCategories;

  const toggleHeart = (treatmentId: string) => {
    setHeartedTreatments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(treatmentId)) {
        newSet.delete(treatmentId);
      } else {
        newSet.add(treatmentId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (showResults) {
      setIsComplete(true);
      setProgress(100);
      return;
    }

    let stepIndex = 0;
    let messageIndex = 0;
    const totalSteps = analysisSteps.length;
    const totalMessages = progressMessages.length;

    const runAnalysis = () => {
      const step = analysisSteps[stepIndex];
      if (!step) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
        return;
      }

      setCurrentStep(stepIndex);

      // Update progress message
      const messageInterval = setInterval(() => {
        if (messageIndex < totalMessages - 1) {
          messageIndex++;
          setCurrentMessage(progressMessages[messageIndex]);
        }
      }, step.duration / 3);

      // Update progress bar
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (step.duration / 100);
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(messageInterval);
        clearInterval(progressInterval);
        stepIndex++;
        runAnalysis();
      }, step.duration);
    };

    runAnalysis();
  }, [showResults, onComplete]);

  if (!showResults) {
    return (
      <div
        className="bg-black flex flex-col p-4 h-screen overflow-hidden"
        style={{
          height: "100vh",
          minHeight: "100vh",
          maxHeight: "100vh",
        }}
      >
        {/* Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Analyzing Features
          </h2>
        </motion.div>

        {/* Photo Display - Much Smaller */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-3"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.img
              src={photoUrl}
              alt="Analysis in progress"
              className="w-full h-full rounded-full object-cover shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* Simple Analysis Indicator */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>
        </motion.div>

        {/* Progress Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900/50 rounded-lg p-3 mb-4"
        >
          <div className="mb-2">
            <Progress value={progress} className="h-1 mb-2" />
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-400 font-medium text-xs text-center"
            >
              {currentMessage}
            </motion.p>
          </div>
        </motion.div>

        {/* Analysis Steps - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-2 flex-1"
        >
          {analysisSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                index === currentStep
                  ? "bg-blue-600/20 border border-blue-500/50"
                  : index < currentStep
                  ? "bg-green-600/20 border border-green-500/50"
                  : "bg-gray-800/50 border border-gray-700"
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 mr-3">
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : index === currentStep ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm mb-0.5">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>

              <div className="text-blue-400">{step.icon}</div>
            </motion.div>
          ))}
        </motion.div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-green-600/20 border border-green-500/50 rounded-lg text-center"
          >
            <CheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-green-400 font-medium text-xs">
              Analysis Complete! Building your profile...
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div
      className="bg-black flex flex-col h-screen overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      {/* Header - Optimized for Vertical Space */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 border-b border-gray-800"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <img
                src={photoUrl}
                alt="User photo"
                className="w-full h-full rounded-full object-cover shadow-lg"
              />
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                {filteredCategories[0]?.title || "Analysis Results"}
              </h1>
              <p className="text-gray-400 text-xs">Detailed assessment</p>
            </div>
          </div>
          <Button onClick={onComplete} variant="secondary" size="sm">
            Back to Overview
          </Button>
        </div>
      </motion.div>

      {/* Analysis Results - Optimized Layout */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-4">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-700"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400">{category.icon}</div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated Gradient Lines for Issues */}
              <div className="space-y-3 mb-4">
                {category.issues.slice(0, 4).map((issue, issueIndex) => (
                  <motion.div
                    key={issue}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + issueIndex * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">
                        {issue}
                      </h4>
                      <div className="text-xs text-gray-400">
                        {Math.floor(Math.random() * 40) + 60}%
                      </div>
                    </div>
                    {/* Animated Gradient Line */}
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.floor(Math.random() * 40) + 60}%`,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1 + issueIndex * 0.2,
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          delay: index * 0.1 + issueIndex * 0.2,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Suggested Treatments - Compact */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Suggested Treatments
                </h4>
                {category.suggestedTreatments.map(
                  (treatment, treatmentIndex) => (
                    <motion.div
                      key={treatment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1 + treatmentIndex * 0.1 + 0.3,
                      }}
                      className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg border border-gray-700/50"
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="text-blue-400">{treatment.icon}</div>
                        <div className="flex-1">
                          <h5 className="text-xs font-medium text-white">
                            {treatment.name}
                          </h5>
                          <p className="text-xs text-green-400 font-medium">
                            {treatment.priceRange}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleHeart(treatment.id)}
                        className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                      >
                        <Heart
                          className={`w-3 h-3 ${
                            heartedTreatments.has(treatment.id)
                              ? "text-red-400 fill-current"
                              : "text-gray-400 hover:text-red-400"
                          }`}
                        />
                      </button>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
