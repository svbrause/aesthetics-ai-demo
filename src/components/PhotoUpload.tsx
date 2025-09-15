"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createImageFromFile, formatFileSize } from "@/lib/utils";

interface PhotoUploadProps {
  onPhotoSelect: (photoUrl: string) => void;
  onNext: () => void;
}

export function PhotoUpload({ onPhotoSelect, onNext }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setIsUploading(true);
    try {
      const url = await createImageFromFile(file);
      setSelectedFile(file);
      setPreviewUrl(url);
      onPhotoSelect(url);
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4"
      style={{ 
        height: "calc(var(--actual-vh, 100vh))",
        minHeight: "calc(var(--actual-vh, 100vh))",
        maxHeight: "calc(var(--actual-vh, 100vh))"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let's Start with Your Photo
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Upload a clear, front-facing photo for your personalized analysis
            </p>
          </motion.div>

          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
              dragActive
                ? "border-blue-500 bg-blue-500/10 scale-105"
                : "border-gray-600 hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />

            <AnimatePresence mode="wait">
              {previewUrl ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {selectedFile && (
                    <div className="mt-4 text-sm text-gray-400">
                      {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={isUploading ? { rotate: 360 } : {}}
                    transition={{
                      duration: 1,
                      repeat: isUploading ? Infinity : 0,
                    }}
                    className="mb-6"
                  >
                    {isUploading ? (
                      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-16 h-16 text-gray-400" />
                    )}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isUploading ? "Processing..." : "Drop your photo here"}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    or click to browse your files
                  </p>
                  <p className="text-sm text-gray-500">
                    For best results, use even lighting and look straight ahead
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button
                onClick={onNext}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Check className="w-5 h-5 mr-2" />
                Continue to Analysis
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
