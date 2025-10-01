"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Loader2, Brain, Camera, Sparkles } from "lucide-react";

interface AnalysisLoadingScreenProps {
  frontPhoto?: File | null;
  sidePhoto?: File | null;
  onCancel?: () => void;
}

export function AnalysisLoadingScreen({
  frontPhoto,
  sidePhoto,
  onCancel,
}: AnalysisLoadingScreenProps) {
  const [frontPhotoUrl, setFrontPhotoUrl] = React.useState<string | null>(null);
  const [sidePhotoUrl, setSidePhotoUrl] = React.useState<string | null>(null);

  // Generate photo URLs
  React.useEffect(() => {
    if (frontPhoto) {
      const url = URL.createObjectURL(frontPhoto);
      setFrontPhotoUrl(url);
    }
    if (sidePhoto) {
      const url = URL.createObjectURL(sidePhoto);
      setSidePhotoUrl(url);
    }

    return () => {
      if (frontPhotoUrl) URL.revokeObjectURL(frontPhotoUrl);
      if (sidePhotoUrl) URL.revokeObjectURL(sidePhotoUrl);
    };
  }, [frontPhoto, sidePhoto, frontPhotoUrl, sidePhotoUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Card className="p-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-4"
            >
              AI Analysis in Progress
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-lg"
            >
              Our AI is analyzing your photos to identify aesthetic concerns
            </motion.p>
          </div>

          {/* Photo Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Front Photo */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Front Photo
              </h3>
              <div className="relative">
                {frontPhotoUrl ? (
                  <img
                    src={frontPhotoUrl}
                    alt="Front preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-8 h-8 text-blue-400" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Side Photo */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Side Photo
              </h3>
              <div className="relative">
                {sidePhotoUrl ? (
                  <img
                    src={sidePhotoUrl}
                    alt="Side preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-8 h-8 text-blue-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Analysis Steps
            </h3>
            <div className="space-y-3">
              {[
                "Processing image data...",
                "Running AI facial analysis...",
                "Identifying aesthetic concerns...",
                "Calculating severity scores...",
                "Generating recommendations...",
              ].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                  <span className="text-gray-300">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Analysis Progress</span>
              <span>Please wait...</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Cancel Button */}
          {onCancel && (
            <div className="text-center">
              <button
                onClick={onCancel}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel Analysis
              </button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

