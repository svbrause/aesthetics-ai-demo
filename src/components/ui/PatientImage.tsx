"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PatientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export function PatientImage({
  src,
  alt,
  className = "",
  fallbackSrc,
}: PatientImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    setCurrentSrc(src);

    // Preload the image to ensure it loads
    if (src) {
      const img = new Image();
      img.onload = () => {
        console.log(`Image preloaded successfully: ${src}`);
        setIsLoading(false);
      };
      img.onerror = () => {
        console.log(`Image preload failed: ${src}`);
        if (fallbackSrc) {
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            console.log(
              `Fallback image preloaded successfully: ${fallbackSrc}`
            );
            setCurrentSrc(fallbackSrc);
            setIsLoading(false);
          };
          fallbackImg.onerror = () => {
            console.log(`Fallback image also failed: ${fallbackSrc}`);
            setIsLoading(false);
          };
          fallbackImg.src = fallbackSrc;
        } else {
          setIsLoading(false);
        }
      };
      img.src = src;
    }
  }, [src, fallbackSrc]);

  // These handlers are now handled in the useEffect preloading
  const handleImageLoad = () => {
    // Image is already loaded via preloading
  };

  const handleImageError = () => {
    // Error is already handled via preloading
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medspa-primary"></div>
        </div>
      )}

      <motion.img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-contain rounded-lg transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {imageError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
          <div className="text-center text-gray-500">
            <div className="text-sm">Image unavailable</div>
            <div className="text-xs mt-1">Failed to load: {src}</div>
          </div>
        </div>
      )}
    </div>
  );
}
