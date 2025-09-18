"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Star,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ValueScreenProps {
  onRestart: () => void;
}

export function ValueScreen({ onRestart }: ValueScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "patient-experience",
      title: "Enhanced Patient Experience",
      icon: <Star className="w-8 h-8" />,
      color: "blue",
      content: [
        {
          icon: <Star className="w-6 h-6" />,
          title: "Luxury First Impression",
          description:
            "Sophisticated interface builds immediate trust and establishes premium positioning",
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Personalized Clinical Validation",
          description:
            "89% of patients report higher confidence in treatment decisions with AI-powered analysis",
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "Clear Treatment Roadmap",
          description:
            "Eliminates uncertainty with evidence-based protocols and personalized treatment planning",
        },
      ],
    },
    {
      id: "roi-impact",
      title: "Practice ROI Impact",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "green",
      content: [
        {
          label: "Patient Conversion Rate",
          before: "52%",
          after: "78%",
          improvement: "+50%",
        },
        {
          label: "Consultation Efficiency",
          before: "45 min",
          after: "30 min",
          improvement: "+33%",
        },
        {
          label: "Average Treatment Value",
          before: "$2,200",
          after: "$3,400",
          improvement: "+55%",
        },
        {
          label: "Treatment Package Adoption",
          before: "23%",
          after: "67%",
          improvement: "+191%",
        },
      ],
    },
    {
      id: "clinical-efficiency",
      title: "Clinical Efficiency Metrics",
      icon: <Clock className="w-8 h-8" />,
      color: "purple",
      content: [
        {
          icon: <Users className="w-6 h-6" />,
          title: "75% Patient Conversion Rate",
          description: "vs. 52% industry average",
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: "33% Consultation Time Reduction",
          description: "45 minutes → 30 minutes",
        },
        {
          icon: <DollarSign className="w-6 h-6" />,
          title: "55% Increase in Treatment Value",
          description: "$2,200 → $3,400 average",
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "67% Treatment Package Adoption",
          description: "vs. 23% baseline",
        },
      ],
    },
    {
      id: "revenue-impact",
      title: "Revenue Impact",
      icon: <DollarSign className="w-8 h-8" />,
      color: "green",
      content: [
        { value: "$250K+", label: "Annual Revenue Growth", color: "green" },
        { value: "5-8 months", label: "ROI Timeline", color: "blue" },
        { value: "68-78%", label: "Profit Margin", color: "purple" },
        { value: "3.3", label: "Referral Network Effect", color: "orange" },
      ],
    },
  ];

  const currentSlideData = slides[currentSlide];

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          gradient: "from-blue-600 to-blue-800",
          bg: "bg-blue-600/20",
          border: "border-blue-500/50",
          text: "text-blue-400",
        };
      case "green":
        return {
          gradient: "from-green-600 to-green-800",
          bg: "bg-green-600/20",
          border: "border-green-500/50",
          text: "text-green-400",
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

  const colorClasses = getColorClasses(currentSlideData.color);

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden"
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
        className="p-4 text-center border-b border-gray-800"
      >
        <h2 className="text-xl font-bold mb-1 bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300">
          The Aesthetics AI Advantage
        </h2>
        <p className="text-gray-400 text-xs">
          Transforming patient experience and practice growth
        </p>
      </motion.div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-4"
          >
            <Card className="h-full p-4">
              {/* Slide Header - Compact */}
              <div className="text-center mb-4">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses.gradient} mb-2`}
                >
                  <div className="text-white text-lg">
                    {currentSlideData.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {currentSlideData.title}
                </h3>
              </div>

              {/* Slide Content */}
              <div className="flex-1">
                {currentSlideData.id === "patient-experience" && (
                  <div className="space-y-3">
                    {currentSlideData.content.map(
                      (benefit: any, index: number) => (
                        <motion.div
                          key={benefit.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                            {benefit.icon}
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">
                              {benefit.title}
                            </h4>
                            <p className="text-gray-300 text-xs leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                )}

                {currentSlideData.id === "roi-impact" && (
                  <div className="space-y-3">
                    <div className="text-center mb-3">
                      <h4 className="text-base font-semibold text-white mb-1">
                        Projected ROI Impact
                      </h4>
                      <p className="text-gray-400 text-xs">
                        Based on industry benchmarks and client data
                      </p>
                    </div>

                    <div className="space-y-2">
                      {currentSlideData.content.map(
                        (metric: any, index: number) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                          >
                            <span className="text-gray-300 text-xs">
                              {metric.label}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 text-xs">
                                {metric.before}
                              </span>
                              <ArrowRight className="w-3 h-3 text-blue-400" />
                              <span className="text-green-400 font-semibold text-sm">
                                {metric.after}
                              </span>
                              <span className="text-green-400 text-xs font-medium">
                                {metric.improvement}
                              </span>
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-4 text-center mt-4">
                      <div className="text-gray-400 text-xs mb-1">
                        Estimated Annual Revenue Increase
                      </div>
                      <div className="text-xl font-bold text-green-400 mb-1">
                        $150,000 - $300,000
                      </div>
                      <div className="flex items-center justify-center gap-1 text-green-300 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>ROI achieved within 6-12 months</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlideData.id === "clinical-efficiency" && (
                  <div className="space-y-3">
                    {currentSlideData.content.map(
                      (metric: any, index: number) => (
                        <motion.div
                          key={metric.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0">
                            {metric.icon}
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">
                              {metric.title}
                            </h4>
                            <p className="text-gray-300 text-xs leading-relaxed">
                              {metric.description}
                            </p>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                )}

                {currentSlideData.id === "revenue-impact" && (
                  <div className="grid grid-cols-2 gap-4">
                    {currentSlideData.content.map(
                      (stat: any, index: number) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className={`p-4 text-center rounded-xl bg-gradient-to-br ${
                            getColorClasses(stat.color).bg
                          } ${getColorClasses(stat.color).border} border`}
                        >
                          <div
                            className={`text-2xl font-bold ${
                              getColorClasses(stat.color).text
                            } mb-1`}
                          >
                            {stat.value}
                          </div>
                          <div className="text-gray-300 text-xs">
                            {stat.label}
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 border-t border-gray-800"
        >
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
                {currentSlide + 1} of {slides.length}
              </span>
              <div className="flex gap-2">
                {slides.map((_, index) => (
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
              disabled={currentSlide === slides.length - 1}
              className="disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRestart}
              size="lg"
              className={`bg-gradient-to-r ${colorClasses.gradient} hover:opacity-90`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Run Another Demo
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-gray-600 hover:border-gray-500"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
