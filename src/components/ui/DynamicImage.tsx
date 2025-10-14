"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DynamicImageProps {
  src: string;
  alt: string;
  className?: string;
  maxHeight?: string;
  minHeight?: string;
  isExpanded?: boolean;
  forceSquare?: boolean;
  fallbackSrc?: string;
  onError?: (e: any) => void;
}

export function DynamicImage({
  src,
  alt,
  className = "",
  maxHeight,
  minHeight,
  isExpanded = false,
  forceSquare = false,
  fallbackSrc,
  onError,
}: DynamicImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (e: any) => {
    setImageError(true);
    setIsLoading(false);
    if (onError) {
      onError(e);
    }
  };

  // If there's an error and we have a fallback, use the fallback
  const imageSrc = imageError && fallbackSrc ? fallbackSrc : src;

  // Build dynamic styles
  const dynamicStyles: React.CSSProperties = {};
  if (maxHeight) dynamicStyles.maxHeight = maxHeight;
  if (minHeight) dynamicStyles.minHeight = minHeight;

  return (
    <div className={`relative ${className}`} style={dynamicStyles}>
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
        } ${forceSquare ? "aspect-square" : ""}`}
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
