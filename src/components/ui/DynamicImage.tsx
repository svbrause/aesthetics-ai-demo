"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface DynamicImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  maxHeight?: string;
  minHeight?: string;
  isExpanded?: boolean;
  forceSquare?: boolean; // New prop to force 1:1 aspect ratio
}

export function DynamicImage({
  src,
  alt,
  className = "",
  onError,
  maxHeight = "20rem",
  minHeight = "8rem",
  isExpanded = false,
  forceSquare = false,
}: DynamicImageProps) {
  const [imageHeight, setImageHeight] = useState<string>("10rem");
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      const containerWidth = img.offsetWidth;
      let calculatedHeight;

      if (forceSquare) {
        // Force 1:1 aspect ratio - height equals width
        calculatedHeight = containerWidth;
      } else {
        // Original dynamic sizing based on image aspect ratio
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        calculatedHeight = containerWidth / aspectRatio;
      }

      // Apply min/max height constraints
      const minHeightPx = parseFloat(minHeight.replace("rem", "")) * 16; // Convert rem to px
      const maxHeightPx = parseFloat(maxHeight.replace("rem", "")) * 16;

      calculatedHeight = Math.max(
        minHeightPx,
        Math.min(maxHeightPx, calculatedHeight)
      );

      // Convert back to rem
      const heightInRem = calculatedHeight / 16;
      setImageHeight(`${heightInRem}rem`);
      setIsLoaded(true);
    };

    img.addEventListener("load", handleLoad);

    // If image is already loaded
    if (img.complete) {
      handleLoad();
    }

    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [src, maxHeight, minHeight]);

  return (
    <motion.div
      className="relative w-full flex justify-center items-center"
      animate={{
        height: isExpanded ? imageHeight : imageHeight,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-contain ${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        onError={onError}
        style={{
          maxHeight: imageHeight,
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
        </div>
      )}
    </motion.div>
  );
}
