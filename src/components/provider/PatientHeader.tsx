"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Target, Sparkles, FileText, Shield } from "lucide-react";
import { Patient, ViewMode } from "@/types/patientTypes";

interface PatientHeaderProps {
  patient: Patient;
  currentView: ViewMode;
  onBack: () => void;
  onViewChange: (view: ViewMode) => void;
}

export function PatientHeader({
  patient,
  currentView,
  onBack,
  onViewChange,
}: PatientHeaderProps) {
  const { hipaaMode } = useTheme();
  const viewOptions = [
    {
      id: "analysis" as ViewMode,
      label: "Analysis",
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: "treatments" as ViewMode,
      label: "Treatments",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: "treatment-plan" as ViewMode,
      label: "Treatment Plan",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-4 border-b border-gray-800/50 ${
          hipaaMode ? "hipaa-header" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300">
                {hipaaMode ? "***MASKED***" : patient.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {hipaaMode ? "Age: ***" : `${patient.age} years old`} • Patient
                ID #{hipaaMode ? "***" : patient.id} •{" "}
                {patient.scanDate || "Dec 15, 2024"}
              </p>
              {hipaaMode && (
                <div className="absolute -top-2 -right-2 flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500 font-semibold">
                    HIPAA SECURE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
