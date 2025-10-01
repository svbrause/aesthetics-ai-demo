"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Brain, Target, Sparkles, ArrowRight } from "lucide-react";

interface AnalysisTransitionScreenProps {
  onContinue: () => void;
}

export function AnalysisTransitionScreen({
  onContinue,
}: AnalysisTransitionScreenProps) {
  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-4"
      style={{
        height: "calc(var(--actual-vh, 100vh))",
        minHeight: "calc(var(--actual-vh, 100vh))",
        maxHeight: "calc(var(--actual-vh, 100vh))",
      }}
    >
      {/* Main Content */}
      <div className="text-center max-w-2xl mx-auto">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300"
        >
          Creating Your Personalized Analysis
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-300 mb-8 leading-relaxed"
        >
          We've analyzed your photo and questionnaire responses to create a
          comprehensive aesthetic assessment tailored specifically to your goals
          and concerns.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Facial Structure</h3>
            <p className="text-sm text-gray-400">
              Harmony and symmetry analysis
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Skin Quality</h3>
            <p className="text-sm text-gray-400">
              Texture and aging assessment
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Preventative Care</h3>
            <p className="text-sm text-gray-400">Long-term strategy planning</p>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3"
          >
            View Your Analysis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
