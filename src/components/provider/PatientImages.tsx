"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useTheme } from "@/contexts/ThemeContext";
import {
  RotateCcw,
  Camera,
  Target,
  Calendar,
  FileText,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Patient } from "@/types/patientTypes";
import { PatientQuestionnaire } from "./PatientQuestionnaire";

interface PatientImagesProps {
  patient: Patient;
  shortlist: any[];
  treatmentPlan: any[];
  interestedAreas: string[];
  onUpdatePatient?: (updatedPatient: Patient) => void;
}

export function PatientImages({
  patient,
  shortlist,
  treatmentPlan,
  interestedAreas,
  onUpdatePatient,
}: PatientImagesProps) {
  const [isSideView, setIsSideView] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [editedPatient, setEditedPatient] = useState({
    email: patient.email || "",
    phone: patient.phone || "",
    dateOfBirth: patient.dateOfBirth || "",
  });
  const { hipaaMode } = useTheme();

  const getScoreColorClasses = (score: number) => {
    // Create a gradient from red-orange (low scores) to green (high scores)
    // More evenly distributed colors with 80 being a proper midpoint
    if (score >= 90)
      return "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500";
    if (score >= 80)
      return "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-400";
    if (score >= 70)
      return "from-orange-400 to-yellow-400 dark:from-orange-300 dark:to-yellow-300";
    if (score >= 60)
      return "from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400";
    if (score >= 50)
      return "from-red-600 to-red-500 dark:from-red-500 dark:to-red-400";
    if (score >= 40)
      return "from-red-700 to-red-600 dark:from-red-600 dark:to-red-500";
    return "from-red-800 to-red-700 dark:from-red-700 dark:to-red-600";
  };

  const handleSavePatient = () => {
    if (onUpdatePatient) {
      const updatedPatient = {
        ...patient,
        ...editedPatient,
      };
      onUpdatePatient(updatedPatient);
    }
    setIsEditingPatient(false);
  };

  const handleCancelEdit = () => {
    setEditedPatient({
      email: patient.email || "",
      phone: patient.phone || "",
      dateOfBirth: patient.dateOfBirth || "",
    });
    setIsEditingPatient(false);
  };

  return (
    <div className="w-1/3 p-6 flex flex-col items-center justify-start">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full space-y-6"
      >
        {/* Patient Image */}
        <div className="relative">
          <motion.div
            key={isSideView ? "side" : "front"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative w-full h-96 rounded-2xl overflow-hidden group ${
              hipaaMode ? "hipaa-secure" : ""
            }`}
          >
            <img
              src={isSideView ? patient.sideImage : patient.frontImage}
              alt={`${hipaaMode ? "Masked patient" : patient.name} ${
                isSideView ? "side" : "front"
              } view`}
              className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 ${
                hipaaMode ? "hipaa-masked" : ""
              }`}
            />

            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />

            {/* View indicator */}
            <div
              className={`absolute bottom-4 left-4 px-3 py-1 rounded-full backdrop-blur-md ${
                isSideView
                  ? "bg-purple-500/30 border border-purple-400/50"
                  : "bg-blue-500/30 border border-blue-400/50"
              }`}
            >
              <span className="text-white text-sm font-medium">
                {isSideView ? "Side" : "Front"}
              </span>
            </div>
          </motion.div>

          {/* View Toggle */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSideView(!isSideView)}
              className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isSideView ? "Switch to Front View" : "Switch to Side View"}
            </Button>
          </div>

          {/* Scan Date and Action Buttons */}
          <div className="space-y-4 mt-6">
            {/* Scan Date */}
            <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last Scan
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {patient.scanDate || "December 15, 2024"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take New Scan
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25"
                onClick={() => setShowQuestionnaire(true)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Fill Out Questionnaire
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 shadow-lg shadow-orange-500/25"
                onClick={() => setIsEditingPatient(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient Info
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Questionnaire Modal */}
      <PatientQuestionnaire
        isOpen={showQuestionnaire}
        onClose={() => setShowQuestionnaire(false)}
        patientName={patient.name}
      />

      {/* Patient Edit Modal */}
      {isEditingPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Edit Patient Information
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={editedPatient.email}
                  onChange={(e) =>
                    setEditedPatient((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="patient@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editedPatient.phone}
                  onChange={(e) =>
                    setEditedPatient((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={editedPatient.dateOfBirth}
                  onChange={(e) =>
                    setEditedPatient((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="ghost"
                onClick={handleCancelEdit}
                className="flex-1 text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePatient}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
