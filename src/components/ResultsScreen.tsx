"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Bone,
  Sparkles,
  Scale,
  User,
  Star,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AnalysisResult } from "@/types";

interface ResultsScreenProps {
  photoUrl: string;
  onViewJourney: () => void;
}

interface ComplaintPage {
  id: string;
  title: string;
  icon: React.ReactNode;
  overallScore: number;
  description: string;
  details: AnalysisResult[];
  color: string;
}

const complaintPages: ComplaintPage[] = [
  {
    id: "facial-structure",
    title: "Facial Structure",
    icon: <Scale className="w-8 h-8" />,
    overallScore: 78,
    description: "Overall facial harmony and symmetry analysis",
    color: "blue",
    details: [
      {
        id: "brow-asymmetry",
        title: "Brow Asymmetry",
        category: "Upper Face",
        score: 65,
        description:
          "Subtle asymmetry in brow positioning affects overall facial balance and can be addressed with strategic treatments.",
        reasoning:
          "Analysis shows mild asymmetry in brow height and arch positioning that impacts overall facial harmony.",
        annotation: () => `
          <path d="M100 120 Q200 100 300 120" stroke="#3b82f6" stroke-width="3" fill="none" opacity="0.8">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="2s" fill="freeze"/>
          </path>
        `,
      },
      {
        id: "mid-cheek-flattening",
        title: "Mid-Cheek Volume",
        category: "Mid Face",
        score: 60,
        description:
          "Gradual loss of youthful volume in the cheek area contributes to a tired appearance and can be enhanced with targeted treatments.",
        reasoning:
          "Topographical analysis shows flattening of the anterior malar fat pads, consistent with age-related volume loss patterns.",
        annotation: () => `
          <ellipse cx="200" cy="250" rx="60" ry="40" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.7">
            <animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite"/>
          </ellipse>
        `,
      },
    ],
  },
  {
    id: "skin-quality",
    title: "Skin Quality",
    icon: <Sparkles className="w-8 h-8" />,
    overallScore: 85,
    description: "Skin texture, tone, and aging pattern assessment",
    color: "purple",
    details: [
      {
        id: "expression-lines",
        title: "Dynamic Expression Lines",
        category: "Expression Lines",
        score: 70,
        description:
          "Early-stage dynamic lines that appear with facial expressions can be effectively addressed with preventive treatments.",
        reasoning:
          "Analysis of muscle contraction patterns indicates mild to moderate dynamic activity in key expression areas.",
        annotation: () => `
          <path d="M150 180 Q200 200 250 180" stroke="#10b981" stroke-width="3" fill="none" opacity="0.8">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="2s" fill="freeze"/>
          </path>
        `,
      },
    ],
  },
  {
    id: "preventative-care",
    title: "Preventative Care",
    icon: <Shield className="w-8 h-8" />,
    overallScore: 72,
    description: "Proactive maintenance and long-term strategy",
    color: "green",
    details: [
      {
        id: "early-intervention",
        title: "Early Intervention Strategy",
        category: "Preventive Planning",
        score: 75,
        description:
          "Develop a personalized prevention plan to maintain your current results and slow the aging process.",
        reasoning:
          "Based on your current skin condition and lifestyle factors, we can create a targeted prevention strategy.",
        annotation: () => `
          <circle cx="200" cy="200" r="40" fill="none" stroke="#10b981" stroke-width="2" opacity="0.7">
            <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite"/>
          </circle>
        `,
      },
    ],
  },
];

export function ResultsScreen({ photoUrl, onViewJourney }: ResultsScreenProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [userName, setUserName] = useState("Sarah"); // Mock user name

  const currentPage = complaintPages[currentPageIndex];

  const handlePrevious = () => {
    setCurrentPageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) =>
      Math.min(complaintPages.length - 1, prev + 1)
    );
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
      case "purple":
        return {
          gradient: "from-purple-600 to-purple-800",
          bg: "bg-purple-600/20",
          border: "border-purple-500/50",
          text: "text-purple-400",
        };
      case "pink":
        return {
          gradient: "from-pink-600 to-pink-800",
          bg: "bg-pink-600/20",
          border: "border-pink-500/50",
          text: "text-pink-400",
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

  const colorClasses = getColorClasses(currentPage.color);

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden"
      style={{
        height: "100dvh",
        minHeight: "100dvh",
        maxHeight: "100dvh",
      }}
    >
      {/* Personalized Header - Ultra Compact */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-3 border-b border-gray-800"
      >
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <img
              src={photoUrl}
              alt="User photo"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
            <div className="absolute inset-0 rounded-full border border-blue-400 animate-pulse" />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">
              {userName}'s Analysis
            </h1>
            <p className="text-gray-400 text-xs">AI-powered insights</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-white">
              {currentPage.overallScore}%
            </div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - One Page at a Time */}
      <div className="flex-1 flex flex-col">
        {/* Page Header - Ultra Compact */}
        <motion.div
          key={currentPageIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-3 text-center"
        >
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses.gradient} mb-2`}
          >
            <div className="text-white text-lg">{currentPage.icon}</div>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            {currentPage.title}
          </h2>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            {currentPage.description}
          </p>
        </motion.div>

        {/* Analysis Details - Ultra Compact */}
        <motion.div
          key={`details-${currentPageIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 px-3 pb-3"
        >
          <div className="space-y-3">
            {currentPage.details.map((detail, index) => (
              <motion.div
                key={detail.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-3 rounded-lg border ${colorClasses.bg} ${colorClasses.border}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">
                      {detail.title}
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    <div className={`text-lg font-bold ${colorClasses.text}`}>
                      {detail.score}%
                    </div>
                    <div className="text-xs text-gray-400">Score</div>
                  </div>
                </div>

                {/* Simplified Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${colorClasses.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${detail.score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation - Ultra Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-3 border-t border-gray-800"
        >
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentPageIndex === 0}
              className="disabled:opacity-50 text-xs px-3 py-1"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Prev
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {currentPageIndex + 1}/{complaintPages.length}
              </span>
              <div className="flex gap-1">
                {complaintPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPageIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentPageIndex
                        ? `bg-gradient-to-r ${colorClasses.gradient} w-6`
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={currentPageIndex === complaintPages.length - 1}
              className="disabled:opacity-50 text-xs px-3 py-1"
            >
              Next
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          {/* View Journey Button */}
          <Button
            onClick={onViewJourney}
            size="sm"
            className={`w-full bg-gradient-to-r ${colorClasses.gradient} hover:opacity-90 text-sm py-2`}
          >
            Build Your Journey
            <Star className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
