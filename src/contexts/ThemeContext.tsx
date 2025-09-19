"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";
type HipaaMode = boolean;

interface ThemeContextType {
  theme: Theme;
  hipaaMode: HipaaMode;
  toggleTheme: () => void;
  toggleHipaaMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always use dark mode - no theme switching
  const [theme, setTheme] = useState<Theme>("dark");
  const [hipaaMode, setHipaaMode] = useState<HipaaMode>(() => {
    // Initialize HIPAA mode from localStorage if available, otherwise default to false
    if (typeof window !== "undefined") {
      const savedHipaaMode = localStorage.getItem("hipaaMode") === "true";
      return savedHipaaMode;
    }
    return false;
  });

  // Load HIPAA mode from localStorage on mount (fallback for SSR)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHipaaMode = localStorage.getItem("hipaaMode") === "true";

      if (savedHipaaMode !== hipaaMode) {
        setHipaaMode(savedHipaaMode);
      }
    }
  }, []);

  useEffect(() => {
    // Always apply dark theme
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("dark");

    // Apply HIPAA mode class
    if (hipaaMode) {
      document.documentElement.classList.add("hipaa-mode");
    } else {
      document.documentElement.classList.remove("hipaa-mode");
    }

    // Save HIPAA mode to localStorage (only on client side)
    if (typeof window !== "undefined") {
      localStorage.setItem("hipaaMode", hipaaMode.toString());
    }

    // Debug logging
    console.log("Theme applied: dark (fixed)");
    console.log("HTML classes:", document.documentElement.className);
  }, [hipaaMode]);

  // No theme toggle - always dark mode
  const toggleTheme = () => {
    // Do nothing - theme is always dark
    console.log("Theme toggle disabled - always dark mode");
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
