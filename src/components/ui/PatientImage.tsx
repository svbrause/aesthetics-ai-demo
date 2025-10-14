"use client";

import { useState } from "react";
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

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // If there's an error and we have a fallback, use the fallback
  const imageSrc = imageError && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      <motion.img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {imageError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
          <div className="text-center text-gray-400">
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
}






