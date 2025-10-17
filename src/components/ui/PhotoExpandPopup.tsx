"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2 } from "lucide-react";
import { Button } from "./Button";

interface PhotoExpandPopupProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  treatment: string;
  issue?: string;
}

export function PhotoExpandPopup({
  isOpen,
  onClose,
  src,
  alt,
  treatment,
  issue,
}: PhotoExpandPopupProps) {
  console.log(
    "PhotoExpandPopup render - isOpen:",
    isOpen,
    "src:",
    src,
    "alt:",
    alt
  );

  if (!isOpen) {
    console.log("PhotoExpandPopup: not open, returning null");
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-4xl max-h-[90vh] w-full mx-4 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 z-10 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              onClick={() => {
                // Download functionality
                const link = document.createElement("a");
                link.href = src;
                link.download = `${treatment}-${alt}.jpg`;
                link.click();
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              onClick={() => {
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: `${treatment} - ${alt}`,
                    text: `Check out this ${treatment} result`,
                    url: window.location.href,
                  });
                } else {
                  // Fallback to copying URL
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Image Container */}
          <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-full">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[80vh] max-w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-image.jpg"; // Fallback image
              }}
            />

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white text-lg font-semibold mb-1">
                {treatment}
              </h3>
              <p className="text-white/80 text-sm">
                {alt}
                {issue && ` • ${issue}`}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
