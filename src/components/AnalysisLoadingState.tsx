"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/Progress";
import { AnalysisStep } from "./AnalysisStep";
import { analysisSteps, progressMessages } from "@/data/analysisConstants";

interface AnalysisLoadingStateProps {
  photoUrl: string;
  currentStep: number;
  progress: number;
  currentMessage: string;
  isComplete: boolean;
}

export function AnalysisLoadingState({
  photoUrl,
  currentStep,
  progress,
  currentMessage,
  isComplete,
}: AnalysisLoadingStateProps) {
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
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300">
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
          <AnalysisStep
            key={step.id}
            step={step}
            index={index}
            currentStep={currentStep}
          />
        ))}
      </motion.div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-green-600/20 border border-green-500/50 rounded-lg text-center"
        >
          <div className="w-4 h-4 text-green-400 mx-auto mb-1">✓</div>
          <p className="text-green-400 font-medium text-xs">
            Analysis Complete! Building your profile...
          </p>
        </motion.div>
      )}
    </div>
  );
}
