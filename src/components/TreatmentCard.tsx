"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { AnalysisCategory } from "@/data/analysisConstants";

interface TreatmentCardProps {
  treatment: AnalysisCategory["suggestedTreatments"][0];
  isHearted: boolean;
  onToggleHeart: (treatmentId: string) => void;
  delay?: number;
}

export function TreatmentCard({
  treatment,
  isHearted,
  onToggleHeart,
  delay = 0,
}: TreatmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between p-2 bg-gray-800/20 rounded-lg border border-gray-700/50"
    >
      <div className="flex items-center space-x-2 flex-1">
        <div className="text-blue-400">{treatment.icon}</div>
        <div className="flex-1">
          <h5 className="text-xs font-medium text-white">{treatment.name}</h5>
          <p className="text-xs text-green-400 font-medium">
            {treatment.priceRange}
          </p>
        </div>
      </div>
      <button
        onClick={() => onToggleHeart(treatment.id)}
        className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
      >
        <Heart
          className={`w-3 h-3 ${
            isHearted
              ? "text-red-400 fill-current"
              : "text-gray-400 hover:text-red-400"
          }`}
        />
      </button>
    </motion.div>
  );
}
