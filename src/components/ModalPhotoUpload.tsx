"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Check, Camera, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createImageFromFile, formatFileSize } from "@/lib/utils";
import { analyzePhotos, AnalysisResult } from "@/lib/modalService";
import { AnalysisLoadingScreen } from "@/components/AnalysisLoadingScreen";

interface ModalPhotoUploadProps {
  onAnalysisComplete: (
    result: AnalysisResult,
    frontPhoto: File,
    sidePhoto: File
  ) => Promise<void>;
  onBack: () => void;
}

export function ModalPhotoUpload({
  onAnalysisComplete,
  onBack,
}: ModalPhotoUploadProps) {
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [sidePhoto, setSidePhoto] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [sidePreview, setSidePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState<string | null>(null);

  const handleDrag = useCallback(
    (e: React.DragEvent, photoType: "front" | "side") => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(photoType);
      } else if (e.type === "dragleave") {
        setDragActive(null);
      }
    },
    []
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent, photoType: "front" | "side") => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(null);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        await handleFile(e.dataTransfer.files[0], photoType);
      }
    },
    []
  );

  const handleFile = async (file: File, photoType: "front" | "side") => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    try {
      const url = await createImageFromFile(file);
      if (photoType === "front") {
        setFrontPhoto(file);
        setFrontPreview(url);
      } else {
        setSidePhoto(file);
        setSidePreview(url);
      }
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const handleFileInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    photoType: "front" | "side"
  ) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0], photoType);
    }
  };

  const removeFile = (photoType: "front" | "side") => {
    if (photoType === "front") {
      setFrontPhoto(null);
      setFrontPreview(null);
    } else {
      setSidePhoto(null);
      setSidePreview(null);
    }
  };

  const startAnalysis = async () => {
    if (!frontPhoto || !sidePhoto) {
      alert("Please upload both front and side photos.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzePhotos(frontPhoto, sidePhoto);
      await onAnalysisComplete(result, frontPhoto, sidePhoto);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = frontPhoto && sidePhoto && !isAnalyzing;

  // Show loading screen during analysis
  if (isAnalyzing) {
    return (
      <AnalysisLoadingScreen
        frontPhoto={frontPhoto}
        sidePhoto={sidePhoto}
        onCancel={() => setIsAnalyzing(false)}
      />
    );
  }

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
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              AI Photo Analysis
            </motion.h1>
            <p className="text-gray-300 text-lg">
              Upload front and side photos for comprehensive AI analysis
            </p>
          </div>

          {/* Photo Upload Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Front Photo */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Front Photo
              </h3>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                  dragActive === "front"
                    ? "border-blue-500 bg-blue-500/10 scale-105"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                onDragEnter={(e) => handleDrag(e, "front")}
                onDragLeave={(e) => handleDrag(e, "front")}
                onDragOver={(e) => handleDrag(e, "front")}
                onDrop={(e) => handleDrop(e, "front")}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e, "front")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isAnalyzing}
                />

                <AnimatePresence mode="wait">
                  {frontPreview ? (
                    <motion.div
                      key="front-preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <img
                        src={frontPreview}
                        alt="Front preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile("front")}
                        disabled={isAnalyzing}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {frontPhoto && (
                        <div className="mt-2 text-sm text-gray-400">
                          {frontPhoto.name} ({formatFileSize(frontPhoto.size)})
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="front-upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">
                        Drop front photo here
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Side Photo */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                Side Photo
              </h3>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                  dragActive === "side"
                    ? "border-blue-500 bg-blue-500/10 scale-105"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                onDragEnter={(e) => handleDrag(e, "side")}
                onDragLeave={(e) => handleDrag(e, "side")}
                onDragOver={(e) => handleDrag(e, "side")}
                onDrop={(e) => handleDrop(e, "side")}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e, "side")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isAnalyzing}
                />

                <AnimatePresence mode="wait">
                  {sidePreview ? (
                    <motion.div
                      key="side-preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <img
                        src={sidePreview}
                        alt="Side preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile("side")}
                        disabled={isAnalyzing}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {sidePhoto && (
                        <div className="mt-2 text-sm text-gray-400">
                          {sidePhoto.name} ({formatFileSize(sidePhoto.size)})
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="side-upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Drop side photo here</p>
                      <p className="text-sm text-gray-500">
                        or click to browse
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              disabled={isAnalyzing}
              className="px-8"
            >
              Back
            </Button>
            <Button
              onClick={startAnalysis}
              disabled={!canAnalyze}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
