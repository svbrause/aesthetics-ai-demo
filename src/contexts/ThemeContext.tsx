"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light" | "gold" | "medspa-new";
type HipaaMode = boolean;

interface ThemeContextType {
  theme: Theme;
  hipaaMode: HipaaMode;
  toggleTheme: () => void;
  toggleHipaaMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme with a consistent default for SSR
  const [theme, setTheme] = useState<Theme>("dark");
  const [hipaaMode, setHipaaMode] = useState<HipaaMode>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load theme and HIPAA mode from localStorage on mount (after hydration)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true);

      // Load theme from localStorage
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (
        savedTheme &&
        ["dark", "light", "gold", "medspa-new"].includes(savedTheme)
      ) {
        setTheme(savedTheme);
      }

      // Load HIPAA mode from localStorage
      const savedHipaaMode = localStorage.getItem("hipaaMode") === "true";
      setHipaaMode(savedHipaaMode);
    }
  }, []);

  useEffect(() => {
    // Only apply theme changes after hydration
    if (!isHydrated) return;

    // Apply theme classes
    document.documentElement.classList.remove(
      "light",
      "dark",
      "gold-theme",
      "medspa-new-theme"
    );
    document.documentElement.classList.add(
      theme === "gold"
        ? "gold-theme"
        : theme === "medspa-new"
        ? "medspa-new-theme"
        : theme
    );

    // Apply HIPAA mode class
    if (hipaaMode) {
      document.documentElement.classList.add("hipaa-mode");
    } else {
      document.documentElement.classList.remove("hipaa-mode");
    }

    // Save theme and HIPAA mode to localStorage (only on client side)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      localStorage.setItem("hipaaMode", hipaaMode.toString());
    }

    // Debug logging
    console.log("Theme applied:", theme);
    console.log("HTML classes:", document.documentElement.className);
  }, [theme, hipaaMode, isHydrated]);

  // Theme toggle - cycle through dark, light, gold, and medspa-new
  const toggleTheme = () => {
    setTheme((prev) => {
      const themes: Theme[] = ["dark", "light", "gold", "medspa-new"];
      const currentIndex = themes.indexOf(prev);
      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex];
    });
  };

  const toggleHipaaMode = () => {
    setHipaaMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, hipaaMode, toggleTheme, toggleHipaaMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
