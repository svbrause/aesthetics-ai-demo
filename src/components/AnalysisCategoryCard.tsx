"use client";

import { motion } from "framer-motion";
import { AnalysisCategory } from "@/data/analysisConstants";
import { TreatmentCard } from "./TreatmentCard";

interface AnalysisCategoryCardProps {
  category: AnalysisCategory;
  index: number;
  heartedTreatments: Set<string>;
  onToggleHeart: (treatmentId: string) => void;
}

export function AnalysisCategoryCard({
  category,
  index,
  heartedTreatments,
  onToggleHeart,
}: AnalysisCategoryCardProps) {
  return (
    <motion.div
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
            <h3 className="font-bold text-white text-lg">{category.title}</h3>
            <p className="text-sm text-gray-400">{category.description}</p>
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
              <h4 className="text-sm font-medium text-white">{issue}</h4>
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
        {category.suggestedTreatments.map((treatment, treatmentIndex) => (
          <TreatmentCard
            key={treatment.id}
            treatment={treatment}
            isHearted={heartedTreatments.has(treatment.id)}
            onToggleHeart={onToggleHeart}
            delay={index * 0.1 + treatmentIndex * 0.1 + 0.3}
          />
        ))}
      </div>
    </motion.div>
  );
}
