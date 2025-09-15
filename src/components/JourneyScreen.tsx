"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UserAnswers, JourneyStep } from "@/types";
import {
  Target,
  Syringe,
  Sparkles,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface JourneyScreenProps {
  userAnswers: UserAnswers;
  onViewValue: () => void;
}

type JourneyType = "good" | "better" | "best";

interface JourneyOption {
  id: JourneyType;
  title: string;
  description: string;
  color: string;
  shortTerm: JourneyStep;
  mediumTerm: JourneyStep;
  longTerm: JourneyStep;
  totalInvestment: string;
  expectedResults: string;
}

export function JourneyScreen({
  userAnswers,
  onViewValue,
}: JourneyScreenProps) {
  const [selectedJourney, setSelectedJourney] = useState<JourneyType>("better");
  const [journeyOptions, setJourneyOptions] = useState<JourneyOption[]>([]);

  useEffect(() => {
    const options = generateJourneyOptions(userAnswers);
    setJourneyOptions(options);
  }, [userAnswers]);

  const generateJourneyOptions = (answers: UserAnswers): JourneyOption[] => {
    const { focusArea, goal, journeyStage } = answers;

    return [
      {
        id: "good",
        title: "Good Journey",
        description: "Foundation & Assessment Phase",
        color: "gray",
        shortTerm: {
          id: "foundation",
          title: "Today: Clinical Foundation",
          subtitle: "Comprehensive Assessment & Skincare",
          description:
            "Detailed skin analysis, personalized medical-grade skincare protocol (Tretinoin 0.025%, Vitamin C 20%, Niacinamide, SPF 50+), baseline photography, and 60-minute consultation with treatment planning.",
          icon: <Target className="w-6 h-6" />,
          tags: ["Assessment", "Skincare", "Consultation"],
          pricing: "$500-800",
        },
        mediumTerm: {
          id: "preventive",
          title: "3-6 Months: Preventive Care",
          subtitle: "Early Intervention Protocol",
          description:
            "Botox treatment (20 units: forehead, glabella), Hyaluronic acid filler (1.2ml temporal hollow, 0.8ml under-eye), chemical peels (monthly), and clinical monitoring.",
          icon: <Syringe className="w-6 h-6" />,
          tags: ["Botox", "Fillers", "Prevention"],
          pricing: "$1,400-2,000",
        },
        longTerm: {
          id: "maintenance",
          title: "6-12 Months: Maintenance",
          subtitle: "Results Preservation",
          description:
            "Maintenance Botox (20 units), microneedling with PRP (quarterly), LED light therapy (weekly), and establishment of long-term aesthetic preservation strategy.",
          icon: <Sparkles className="w-6 h-6" />,
          tags: ["Maintenance", "Refinement", "Strategy"],
          pricing: "$1,500-2,000",
        },
        totalInvestment: "$1,850-2,650",
        expectedResults: "18-25% improvement in overall facial harmony",
      },
      {
        id: "better",
        title: "Better Journey",
        description: "Comprehensive Enhancement Phase",
        color: "blue",
        shortTerm: {
          id: "comprehensive",
          title: "Today: Full Treatment Protocol",
          subtitle: "Complete Clinical Assessment",
          description:
            "Comprehensive assessment with full treatment protocol, medical-grade skincare (Tretinoin 0.05%, Vitamin C 25%, Growth factors), Botox treatment (20 units: forehead, glabella, crow's feet), and detailed treatment planning.",
          icon: <Target className="w-6 h-6" />,
          tags: ["Full Protocol", "Botox", "Assessment"],
          pricing: "$1,200-1,800",
        },
        mediumTerm: {
          id: "enhancement",
          title: "3-6 Months: Volume Enhancement",
          subtitle: "Multi-Area Restoration",
          description:
            "Hyaluronic acid fillers: temporal + under-eye restoration (2.0ml), mid-cheek enhancement (1.5ml), prejowl sulcus correction (1.0ml), chemical peels (bi-weekly), and microneedling with PRP (monthly).",
          icon: <Syringe className="w-6 h-6" />,
          tags: ["Volume", "Fillers", "Restoration"],
          pricing: "$2,200-3,200",
        },
        longTerm: {
          id: "optimization",
          title: "6-12 Months: Results Optimization",
          subtitle: "Advanced Treatments & Refinement",
          description:
            "Maintenance Botox (20 units), laser resurfacing (quarterly), advanced chemical peels, LED light therapy (weekly), and results optimization with long-term planning.",
          icon: <Sparkles className="w-6 h-6" />,
          tags: ["Advanced", "Optimization", "Planning"],
          pricing: "$1,800-2,800",
        },
        totalInvestment: "$3,500-5,200",
        expectedResults: "30-40% improvement in facial volume and definition",
      },
      {
        id: "best",
        title: "Best Journey",
        description: "Complete Transformation Phase",
        color: "purple",
        shortTerm: {
          id: "transformation",
          title: "Today: Complete Assessment",
          subtitle: "Comprehensive Treatment Protocol",
          description:
            "Comprehensive assessment with full treatment protocol, advanced skincare (Tretinoin 0.05%, Vitamin C 25%, Growth factors, Peptides), Botox treatment (40 units: forehead, glabella, crow's feet, bunny lines), and detailed multi-phase planning.",
          icon: <Target className="w-6 h-6" />,
          tags: ["Complete", "Advanced", "Multi-phase"],
          pricing: "$2,000-3,000",
        },
        mediumTerm: {
          id: "advanced",
          title: "3-6 Months: Advanced Restoration",
          subtitle: "Multi-Area Volume Enhancement",
          description:
            "Hyaluronic acid fillers (6.0ml total: jawline definition, mid-cheek, prejowl sulcus, nasolabial folds), thread lifting (jawline and midface), laser resurfacing (quarterly), and comprehensive facial restoration.",
          icon: <Syringe className="w-6 h-6" />,
          tags: ["Advanced", "Thread Lifting", "Laser"],
          pricing: "$5,500-7,500",
        },
        longTerm: {
          id: "refinement",
          title: "6-12 Months: Refinement & Long-term Strategy",
          subtitle: "Complete Optimization",
          description:
            "Maintenance Botox (40 units), advanced laser treatments, microneedling with PRP (monthly), LED light therapy (weekly), advanced skin rejuvenation, and comprehensive long-term aesthetic strategy.",
          icon: <Sparkles className="w-6 h-6" />,
          tags: ["Refinement", "Rejuvenation", "Strategy"],
          pricing: "$3,000-4,500",
        },
        totalInvestment: "$5,200-8,100",
        expectedResults: "45-55% improvement in overall facial aesthetics",
      },
    ];
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "gray":
        return {
          gradient: "from-gray-600 to-gray-800",
          bg: "bg-gray-600/20",
          border: "border-gray-500/50",
          text: "text-gray-400",
        };
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
      default:
        return {
          gradient: "from-blue-600 to-blue-800",
          bg: "bg-blue-600/20",
          border: "border-blue-500/50",
          text: "text-blue-400",
        };
    }
  };

  const currentJourney = journeyOptions.find((j) => j.id === selectedJourney);

  if (!currentJourney) return null;

  const colorClasses = getColorClasses(currentJourney.color);

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden"
      style={{
        height: "100dvh",
        minHeight: "100dvh",
        maxHeight: "100dvh",
      }}
    >
      {/* Fixed Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-4 pb-2"
      >
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Your Personalized Roadmap
        </h2>
        <p className="text-gray-400 text-sm mb-3">
          Choose your journey level and explore the timeline
        </p>

        {/* Journey Type Selector */}
        <div className="flex justify-center space-x-2 mb-4">
          {journeyOptions.map((option) => {
            const isSelected = selectedJourney === option.id;
            const optionColorClasses = getColorClasses(option.color);

            return (
              <button
                key={option.id}
                onClick={() => setSelectedJourney(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? `${optionColorClasses.bg} ${optionColorClasses.border} border-2 text-white`
                    : "bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                {option.title}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Journey Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <Card
          className={`p-4 ${colorClasses.bg} ${colorClasses.border} border`}
        >
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-1">
              {currentJourney.title}
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {currentJourney.description}
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div>
                <div className={`font-bold ${colorClasses.text}`}>
                  {currentJourney.totalInvestment}
                </div>
                <div className="text-gray-400 text-xs">Total Investment</div>
              </div>
              <div>
                <div className={`font-bold ${colorClasses.text}`}>
                  {currentJourney.expectedResults}
                </div>
                <div className="text-gray-400 text-xs">Expected Results</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Scrollable Timeline */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-4">
          {[
            {
              step: currentJourney.shortTerm,
              period: "Short Term",
              icon: <Clock className="w-5 h-5" />,
            },
            {
              step: currentJourney.mediumTerm,
              period: "Medium Term",
              icon: <Calendar className="w-5 h-5" />,
            },
            {
              step: currentJourney.longTerm,
              period: "Long Term",
              icon: <TrendingUp className="w-5 h-5" />,
            },
          ].map(({ step, period, icon }, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline connector */}
              {index < 2 && (
                <div
                  className={`absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b ${colorClasses.gradient}`}
                />
              )}

              <div className="flex items-start space-x-3">
                {/* Timeline dot */}
                <div
                  className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${colorClasses.gradient} rounded-full flex items-center justify-center text-white shadow-lg`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Card className="p-4 bg-gray-800/50 border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-bold text-white">
                            {step.title}
                          </h3>
                          <div
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}
                          >
                            {period}
                          </div>
                        </div>
                        <p
                          className={`font-medium text-sm mb-2 ${colorClasses.text}`}
                        >
                          {step.subtitle}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-green-400 mb-1">
                          {step.pricing}
                        </div>
                        <div className="text-xs text-gray-400">Investment</div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fixed Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-4 pt-2"
      >
        <Button
          onClick={onViewValue}
          size="lg"
          className={`w-full bg-gradient-to-r ${colorClasses.gradient} hover:opacity-90`}
        >
          See the Business Value
          <DollarSign className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
