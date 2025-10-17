"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const getSeverityLevel = (score: number) => {
  if (score <= 25) return "Subtle";
  if (score <= 50) return "Mild";
  if (score <= 75) return "Moderate";
  return "Significant";
};

interface SeverityScaleProps {
  score: number; // 0-100 score
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SeverityScale({
  score,
  showLabels = true,
  size = "md",
  className = "",
}: SeverityScaleProps) {
  const { theme } = useTheme();

  // Check if gold theme is active - use client-side check only
  const [isGoldTheme, setIsGoldTheme] = useState(false);

  // Convert score (0-100) to position on scale (0-1)
  const normalizedScore = Math.max(0, Math.min(1, score / 100));

  // Calculate position on the scale (0-100%)
  const position = normalizedScore * 100;

  // Check if gold theme is active after component mounts
  useEffect(() => {
    const checkGoldTheme = () => {
      const isGold =
        theme === "gold" ||
        document.documentElement.classList.contains("gold-theme");
      setIsGoldTheme(isGold);
    };

    checkGoldTheme();

    // Also check when theme changes
    const observer = new MutationObserver(checkGoldTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  // Get size classes
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Scale Container */}
      <div className="relative">
        {/* Background Scale */}
        <div
          className={`w-full ${sizeClasses[size]} rounded-full overflow-hidden relative bg-gray-700`}
        >
          {/* Filled Bar */}
          <motion.div
            className="h-full rounded-full severity-scale-bar"
            style={{
              background: isGoldTheme
                ? `linear-gradient(90deg, 
                    #6b5a47 0%, 
                    #8b6f4a 25%, 
                    #aa8960 50%, 
                    #c49d6b 75%, 
                    #d4b876 100%)`
                : "linear-gradient(to right, #374151, #6b7280)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${position}%` }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        {/* Severity Label at End of Slider */}
        {showLabels && (
          <div className="relative mt-2">
            <div
              className="absolute flex items-center"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              <span
                className={`${labelSizeClasses[size]} text-gray-200 font-medium bg-gray-800 px-2 py-1 rounded-md shadow-sm border border-gray-600`}
              >
                {getSeverityLevel(score)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Alternative compact version for cards
export function SeverityScaleCompact({
  score,
  className = "",
}: {
  score: number;
  className?: string;
}) {
  const { theme } = useTheme();

  // Check if gold theme is active - use client-side check only
  const [isGoldTheme, setIsGoldTheme] = useState(false);

  const normalizedScore = Math.max(0, Math.min(1, score / 100));
  const position = normalizedScore * 100;

  // Check if gold theme is active after component mounts
  useEffect(() => {
    const checkGoldTheme = () => {
      const isGold =
        theme === "gold" ||
        document.documentElement.classList.contains("gold-theme");
      setIsGoldTheme(isGold);
    };

    checkGoldTheme();

    // Also check when theme changes
    const observer = new MutationObserver(checkGoldTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  // Get color based on position
  const getColor = (pos: number) => {
    if (pos < 25) return "#3b82f6"; // Blue
    if (pos < 50) return "#8b5cf6"; // Purple
    if (pos < 75) return "#ec4899"; // Pink
    return "#f97316"; // Orange
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Scale */}
      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full severity-scale-compact-bar"
          style={{
            width: `${position}%`,
            background: isGoldTheme
              ? `linear-gradient(90deg, 
                  #6b5a47 0%, 
                  #8b6f4a 20%, 
                  #aa8960 40%, 
                  #c49d6b 60%, 
                  #d4b876 80%, 
                  #f0d4a3 100%)`
              : "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #f97316)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${position}%` }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      {/* Position indicator */}
      <div
        className="w-2 h-2 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: getColor(position) }}
      />
    </div>
  );
}

// Text-based severity indicator
export function SeverityText({
  score,
  className = "",
}: {
  score: number;
  className?: string;
}) {
  const normalizedScore = Math.max(0, Math.min(1, score / 100));

  const getSeverityText = (score: number) => {
    if (score < 0.25) return "Subtle";
    if (score < 0.5) return "Mild";
    if (score < 0.75) return "Moderate";
    return "Significant";
  };

  const getTextColor = (score: number) => {
    // All severity levels use primary color text on secondary background
    return "text-medspa-primary";
  };

  return (
    <span
      className={`font-medium ${getTextColor(normalizedScore)} ${className}`}
    >
      {getSeverityText(normalizedScore)}
    </span>
  );
}
