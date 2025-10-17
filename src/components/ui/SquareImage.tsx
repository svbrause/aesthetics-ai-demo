"use client";

import { useState } from "react";

interface SquareImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  size?: string; // e.g., "h-24", "h-32", "h-40"
}

export function SquareImage({
  src,
  alt,
  className = "",
  onError,
  size = "h-24",
}: SquareImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative w-full ${size} rounded-xl overflow-hidden bg-gray-700/30`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain ${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={onError}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
        </div>
      )}
    </div>
  );
}
