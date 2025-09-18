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
  const [theme, setTheme] = useState<Theme>("dark");
  const [hipaaMode, setHipaaMode] = useState<HipaaMode>(false);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Apply HIPAA mode class
    if (hipaaMode) {
      document.documentElement.classList.add("hipaa-mode");
    } else {
      document.documentElement.classList.remove("hipaa-mode");
    }

    // Debug logging
    console.log("Theme applied:", theme);
    console.log("HTML classes:", document.documentElement.className);
  }, [theme, hipaaMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
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
