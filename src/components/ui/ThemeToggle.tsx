"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Shield } from "lucide-react";
import { Button } from "./Button";

export function ThemeToggle() {
  const { hipaaMode, toggleHipaaMode } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* HIPAA Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleHipaaMode}
        className={`flex items-center gap-2 ${
          hipaaMode
            ? "bg-green-600 text-white hover:bg-green-700"
            : "hover:bg-gray-700"
        }`}
        title={hipaaMode ? "Disable HIPAA Mode" : "Enable HIPAA Mode"}
      >
        <Shield className="w-4 h-4" />
        <span className="hidden sm:inline">
          {hipaaMode ? "HIPAA ON" : "HIPAA"}
        </span>
      </Button>

    </div>
  );
}
