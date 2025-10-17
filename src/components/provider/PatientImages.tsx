"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useTheme } from "@/contexts/ThemeContext";
import {
  RotateCcw,
  Camera,
  Star,
  Calendar,
  FileText,
  Edit,
  Save,
  X,
  Maximize2,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Patient } from "@/types/patientTypes";
import { PatientQuestionnaire } from "./PatientQuestionnaire";
import { PhotoViewerPopup } from "./PhotoViewerPopup";
import { PatientImage } from "@/components/ui/PatientImage";

interface PatientImagesProps {
  patient: Patient;
  shortlist: any[];
  treatmentPlan: any[];
  interestedAreas: string[];
  onUpdatePatient?: (updatedPatient: Patient) => void;
  onRemoveFromShortlist?: (findingName: string) => void;
  selectedShortlistItems?: Set<string>;
  onShortlistItemSelect?: (itemName: string) => void;
  shortlistLoading?: boolean;
  shortlistError?: string | null;
}

export function PatientImages({
  patient,
  shortlist,
  treatmentPlan,
  interestedAreas,
  onUpdatePatient,
  onRemoveFromShortlist,
  selectedShortlistItems = new Set(),
  onShortlistItemSelect,
  shortlistLoading = false,
  shortlistError = null,
}: PatientImagesProps) {
  const [isSideView, setIsSideView] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [editedPatient, setEditedPatient] = useState({
    email: patient.email || "",
    phone: patient.phone || "",
    dateOfBirth: (patient as any).dateOfBirth || "",
  });
  const { hipaaMode } = useTheme();

  // Debug: Log the current image source
  const currentImageSrc = isSideView
    ? (patient as any).editedSideImage || patient.sideImage
    : (patient as any).editedFrontImage || patient.frontImage;

  console.log(
    "PatientImages - Current image source:",
    currentImageSrc,
    "isSideView:",
    isSideView
  );

  const getScoreColorClasses = (score: number) => {
    // Create a gradient from red-orange (low scores) to green (high scores)
    // More evenly distributed colors with 80 being a proper midpoint
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 80) return "from-yellow-300 to-yellow-400";
    if (score >= 70) return "from-orange-300 to-yellow-300";
    if (score >= 60) return "from-red-400 to-orange-400";
    if (score >= 50) return "from-red-500 to-red-400";
    if (score >= 40) return "from-red-600 to-red-500";
    return "from-red-700 to-red-600";
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
      dateOfBirth: (patient as any).dateOfBirth || "",
    });
    setIsEditingPatient(false);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full flex flex-col space-y-6"
      >
        {/* Patient Image - Responsive size */}
        <div className="relative">
          <motion.div
            key={isSideView ? "side" : "front"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative w-full max-w-md mx-auto h-80 rounded-2xl overflow-hidden group cursor-pointer ${
              hipaaMode ? "hipaa-secure" : ""
            }`}
            onClick={() => setShowPhotoViewer(true)}
          >
            <PatientImage
              src={currentImageSrc}
              alt={`${hipaaMode ? "Masked patient" : patient.name} ${
                isSideView ? "side" : "front"
              } view`}
              className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 ${
                hipaaMode ? "hipaa-masked" : ""
              }`}
              fallbackSrc={
                isSideView
                  ? "/Chelsea Perry Side.png"
                  : "/Chelsea Perry Front.png"
              }
            />

            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />

            {/* View indicator - bottom left */}
            <div
              className={`absolute bottom-4 left-4 px-3 py-1 rounded-full backdrop-blur-md ${
                isSideView
                  ? "bg-purple-500/30 border border-yellow-400/50"
                  : "bg-blue-500/30 border border-blue-400/50"
              }`}
            >
              <span className="text-white text-sm font-medium">
                {isSideView ? "Side" : "Front"}
                {(isSideView && (patient as any).editedSideImage) ||
                (!isSideView && (patient as any).editedFrontImage)
                  ? " (Edited)"
                  : ""}
              </span>
            </div>

            {/* Expand button - top right */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="ghost"
                className="backdrop-blur-md bg-black/30 border-white/20 hover:bg-black/50 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPhotoViewer(true);
                }}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* View Toggle */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSideView(!isSideView)}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
              style={{
                backgroundColor: "#f3f4f6",
                borderColor: "#d1d5db",
                color: "#374151",
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isSideView ? "Switch to Front View" : "Switch to Side View"}
            </Button>
          </div>
        </div>

        {/* Shortlist Section */}
        <div className="mt-6 flex-1">
          <Card className="p-4 h-full flex flex-col medspa-shortlist bg-medspa-bg-secondary border-medspa-primary/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center medspa-shortlist-title">
              <Star className="w-5 h-5 mr-2 text-white medspa-shortlist-star" />
              Findings Shortlist
              {/* Airtable sync status indicator */}
              {shortlistLoading && (
                <Loader2 className="w-4 h-4 ml-2 text-yellow-300 animate-spin gold-theme-loader" />
              )}
              {shortlistError && (
                <span title={shortlistError}>
                  <AlertCircle className="w-4 h-4 ml-2 text-red-300" />
                </span>
              )}
              {!shortlistLoading && !shortlistError && shortlist.length > 0 && (
                <span title="Synced with Airtable">
                  <CheckCircle className="w-4 h-4 ml-2 text-green-300" />
                </span>
              )}
            </h3>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {shortlist.length > 0 ? (
                  shortlist.map((item, index) => {
                    const isSelected = selectedShortlistItems.has(item.name);
                    return (
                      <div
                        key={index}
                        className={`inline-flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-medspa-primary text-white hover:bg-medspa-primary/90"
                            : "text-white hover:bg-medspa-primary/80"
                        }`}
                        style={{
                          backgroundColor: isSelected ? "#367588" : "#367588",
                          borderColor: "#367588",
                        }}
                        onClick={() => onShortlistItemSelect?.(item.name)}
                      >
                        <span className="text-sm font-medium whitespace-nowrap text-white">
                          {item.name}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 h-auto ml-1 text-white/80 hover:text-white hover:bg-white/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveFromShortlist?.(item.name);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm text-center py-4 w-full">
                    No items in shortlist
                  </p>
                )}
              </div>
            </div>
          </Card>
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

      {/* Photo Viewer Popup */}
      <PhotoViewerPopup
        isOpen={showPhotoViewer}
        onClose={() => setShowPhotoViewer(false)}
        frontImage={patient.frontImage}
        sideImage={patient.sideImage}
        editedFrontImage={(patient as any).editedFrontImage}
        editedSideImage={(patient as any).editedSideImage}
        patientName={patient.name}
        onSaveEditedImage={(imageData, viewType) => {
          // Save the edited image to the patient's data
          const updatedPatient = {
            ...patient,
            [viewType === "front" ? "editedFrontImage" : "editedSideImage"]:
              imageData,
          };
          onUpdatePatient?.(updatedPatient);
          console.log(`Saved edited ${viewType} image for ${patient.name}`);
        }}
      />
    </div>
  );
}
