"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnalysisCategoryCard } from "./AnalysisCategoryCard";
import { AnalysisCategory } from "@/data/analysisConstants";

interface AnalysisResultsScreenProps {
  photoUrl: string;
  onComplete: () => void;
  filteredCategories: AnalysisCategory[];
  heartedTreatments: Set<string>;
  onToggleHeart: (treatmentId: string) => void;
}

export function AnalysisResultsScreen({
  photoUrl,
  onComplete,
  filteredCategories,
  heartedTreatments,
  onToggleHeart,
}: AnalysisResultsScreenProps) {
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
            <AnalysisCategoryCard
              key={category.id}
              category={category}
              index={index}
              heartedTreatments={heartedTreatments}
              onToggleHeart={onToggleHeart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
