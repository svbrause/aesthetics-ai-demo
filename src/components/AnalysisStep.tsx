"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { AnalysisStep as AnalysisStepType } from "@/data/analysisConstants";

interface AnalysisStepProps {
  step: AnalysisStepType;
  index: number;
  currentStep: number;
}

export function AnalysisStep({ step, index, currentStep }: AnalysisStepProps) {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;

  return (
    <motion.div
      className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-blue-600/20 border border-blue-500/50"
          : isCompleted
          ? "bg-green-600/20 border border-green-500/50"
          : "bg-gray-800/50 border border-gray-700"
      }`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex-shrink-0 mr-3">
        {isCompleted ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : isActive ? (
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
  );
}
