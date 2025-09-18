"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ArrowLeft,
  Edit,
  Download,
  Share,
  Target,
  Sparkles,
  FileText,
  Shield,
} from "lucide-react";
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
                ID #{hipaaMode ? "***" : patient.id}
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

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-2 p-6 pb-2"
      >
        <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
          {viewOptions.map((view) => (
            <Button
              key={view.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(view.id)}
              className={`flex-1 transition-all duration-300 ${
                currentView === view.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              {view.icon}
              <span className="ml-2 font-medium">{view.label}</span>
            </Button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
