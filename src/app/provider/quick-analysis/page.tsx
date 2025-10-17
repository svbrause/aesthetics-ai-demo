"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Check,
  Camera,
  RotateCcw,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createImageFromFile, formatFileSize } from "@/lib/utils";
import { AnalysisLoadingScreen } from "@/components/AnalysisLoadingScreen";

export default function QuickAnalysisPage() {
  const router = useRouter();
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [sidePhoto, setSidePhoto] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [sidePreview, setSidePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("Camille Fassett");

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

  const startQuickAnalysis = async () => {
    if (!frontPhoto || !sidePhoto) {
      alert("Please upload both front and side photos.");
      return;
    }

    setIsAnalyzing(true);
    try {
      // Convert files to base64
      const frontBase64 = await fileToBase64(frontPhoto);
      const sideBase64 = await fileToBase64(sidePhoto);

      // Call the quick patient creation API
      const response = await fetch("/api/quick-patient-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          airtableRecordId: "reczCwQAwWPWCr7Uj", // Camille's Airtable ID
          frontPhotoBase64: frontBase64,
          sidePhotoBase64: sideBase64,
          patientName: patientName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create patient record");
      }

      const result = await response.json();

      if (result.success) {
        // Redirect to the patient detail page with the new patient ID
        router.push(`/provider/patient/${result.patient.id}`);
      } else {
        throw new Error(result.error || "Failed to create patient record");
      }
    } catch (error) {
      console.error("Quick analysis error:", error);
      alert(
        `Analysis failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    router.push("/provider");
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-4"
            >
              <Zap className="w-8 h-8 text-blue-400 mr-3" />
              <h1 className="text-4xl font-bold text-white">
                Quick Patient Analysis
              </h1>
            </motion.div>
            <p className="text-gray-300 text-lg mb-4">
              Rapidly create patient records with AI analysis
            </p>

            {/* Patient Name Input */}
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter patient name"
              />
            </div>
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
              onClick={handleBack}
              disabled={isAnalyzing}
              className="px-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button
              onClick={startQuickAnalysis}
              disabled={!canAnalyze}
              className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Patient Record...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Analysis & Create Patient
                </>
              )}
            </Button>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="w-5 h-5 text-blue-400 mt-0.5" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-300">
                  What happens next?
                </h4>
                <p className="text-sm text-gray-300 mt-1">
                  This will fetch Camille Fassett's data from Airtable, run AI
                  analysis on her photos, create a new patient record (ID:
                  1005), and redirect you to the full patient interface with
                  analysis results and treatment recommendations.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
