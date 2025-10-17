"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";
import { Palette } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getThemeLabel = (currentTheme: string) => {
    switch (currentTheme) {
      case "dark":
        return "Dark";
      case "light":
        return "Light";
      case "gold":
        return "Gold";
      case "medspa-new":
        return "Medspa";
      default:
        return "Dark"; // Default to "Dark" instead of "Unknown" to prevent hydration mismatch
    }
  };

  // Don't render until hydrated to prevent mismatch
  if (!isHydrated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-gray-700/50"
      >
        <Palette className="w-4 h-4" />
        <span>Dark</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-gray-700/50"
    >
      <Palette className="w-4 h-4" />
      <span>{getThemeLabel(theme)}</span>
    </Button>
  );
}
