"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Target, Sparkles, FileText, Camera, Edit } from "lucide-react";
import { PatientHeader } from "./PatientHeader";
import { PatientImages } from "./PatientImages";
import { AnalysisView } from "./AnalysisView";
import { TreatmentsView } from "./TreatmentsView";
import { TreatmentPlanView } from "./TreatmentPlanView";
import { TreatmentPlanPopup } from "./TreatmentPlanPopup";
import { PatientQuestionnaire } from "./PatientQuestionnaire";
import { EditPatientPopup } from "./EditPatientPopup";
import { ShareModal } from "./ShareModal";
import { TutorialOverlay } from "../TutorialOverlay";
import { useTheme } from "@/contexts/ThemeContext";
import { analysisAreas } from "@/data/analysisData";
import { treatments } from "@/data/treatmentsData";
import {
  Patient,
  ViewMode,
  TreatmentPlanItem,
  Treatment,
} from "@/types/patientTypes";

interface PatientDetailScreenV2ColorExperimentProps {
  patient: Patient;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
  colorScheme: {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      success: string;
      warning: string;
      error: string;
    };
  };
}

export function PatientDetailScreenV2ColorExperiment({
  patient,
  onBack,
  onOpenAreaAnalysis,
  colorScheme,
}: PatientDetailScreenV2ColorExperimentProps) {
  const { hipaaMode } = useTheme();
  const [currentView, setCurrentView] = useState<ViewMode>("analysis");
  const [shortlist, setShortlist] = useState<any[]>([
    // Add some test findings to shortlist for demo purposes
    { name: "Mid Cheek Flattening", score: 75, severity: "moderate" },
    { name: "Under Eye Dark Circles", score: 68, severity: "moderate" },
    { name: "Under Eye Hollow", score: 72, severity: "moderate" },
  ]);
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanItem[]>(
    () => {
      // Default treatment plans for demo patients
      const defaultPlans: Record<string, TreatmentPlanItem[]> = {
        "Sydney Adams": [
          {
            id: "botox-forehead",
            name: "Botox",
            notes: "40 units for forehead and glabella lines",
            areas: ["Forehead"],
            quantity: "40",
            unit: "units",
            price: "400-600",
            duration: "3-4 months",
            downtime: "None",
            invasiveness: "Minimal",
          },
          {
            id: "juvederm-voluma",
            name: "Juvederm Voluma",
            notes: "2.5ml for mid cheek enhancement and jawline definition",
            areas: ["Cheeks", "Jawline"],
            quantity: "2.5",
            unit: "ml",
            price: "1200-1500",
            duration: "12-18 months",
            downtime: "1-2 days",
            invasiveness: "Moderate",
          },
        ],
        "Chelsea Perry": [
          {
            id: "botox-comprehensive",
            name: "Botox",
            notes: "50 units for comprehensive facial rejuvenation",
            areas: ["Forehead", "Eyes", "Lips"],
            quantity: "50",
            unit: "units",
            price: "500-750",
            duration: "3-4 months",
            downtime: "None",
            invasiveness: "Minimal",
          },
          {
            id: "restylane-lips",
            name: "Restylane",
            notes: "1ml for lip enhancement and philtral column definition",
            areas: ["Lips"],
            quantity: "1",
            unit: "ml",
            price: "600-800",
            duration: "6-9 months",
            downtime: "1-2 days",
            invasiveness: "Minimal",
          },
        ],
      };
      return defaultPlans[patient?.name] || [];
    }
  );
  const [showTreatmentPopup, setShowTreatmentPopup] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );
  const [addedToPlan, setAddedToPlan] = useState<Set<string>>(new Set());
  const [sessionTime, setSessionTime] = useState(0);
  const [currentPatient, setCurrentPatient] = useState(patient);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedShortlistItems, setSelectedShortlistItems] = useState<
    Set<string>
  >(new Set());

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full">
        <p style={{ color: colorScheme.colors.textSecondary }}>
          No patient selected
        </p>
      </div>
    );
  }

  // Get interested areas based on patient findings
  const getInterestedAreas = () => {
    const interestedAreas = new Set<string>();
    patient.findings.forEach((finding: string) => {
      const area = analysisAreas.find((area) =>
        area.findings.some((f) => f.name === finding)
      );
      if (area) {
        interestedAreas.add(area.id);
      }
    });
    return Array.from(interestedAreas);
  };

  const allInterestedAreas = getInterestedAreas();

  // Show all areas that have findings
  const interestedAreas = analysisAreas
    .filter((area) => allInterestedAreas.includes(area.id))
    .map((area) => area.id);

  const addToShortlist = (finding: any) => {
    setShortlist((prev) => [...prev, finding]);
  };

  const removeFromShortlist = (findingName: string) => {
    setShortlist((prev) => prev.filter((item) => item.name !== findingName));
  };

  const addToTreatmentPlan = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setShowTreatmentPopup(true);
  };

  const handleAddToTreatmentPlan = (treatmentDetails: any) => {
    const itemId = treatmentDetails.id || treatmentDetails.name;
    setTreatmentPlan((prev) => [...prev, treatmentDetails]);
    setAddedToPlan((prev) => new Set([...prev, itemId.toString()]));
    setShowTreatmentPopup(false);
    setSelectedTreatment(null);
  };

  const removeFromTreatmentPlan = (id: string) => {
    setTreatmentPlan((prev) => prev.filter((item) => item.id !== id));
    setAddedToPlan((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleClearFilters = () => {
    // This will be handled by the TreatmentsView component
  };

  const handleViewAllAreas = () => {
    // This will be handled by the parent component
  };

  const handleDownloadPDF = () => {
    // Generate and download PDF
    console.log("Downloading PDF...");
    // In a real app, this would generate a PDF with the treatment plan
    // For now, we'll create a simple text file as a demo
    const treatmentPlanText = treatmentPlan
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   Notes: ${item.notes}\n   Areas: ${(
            item.areas ||
            item.targetedFindings ||
            []
          ).join(", ")}\n   Price: ${item.price}\n   Duration: ${
            item.duration
          }\n   Downtime: ${item.downtime}\n   Invasiveness: ${
            item.invasiveness
          }\n\n`
      )
      .join("");

    const content = `Treatment Plan for ${currentPatient.name}\n\n${treatmentPlanText}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentPatient.name}_Treatment_Plan.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setCurrentPatient(updatedPatient);
  };

  const handleNewScan = () => {
    // Navigate to upload page or open scan modal
    console.log("New scan requested");
  };

  const handleQuestionnaire = () => {
    setShowQuestionnaire(true);
  };

  const handleEditPatient = () => {
    setIsEditingPatient(true);
  };

  const handleShortlistItemSelect = (itemName: string) => {
    setSelectedShortlistItems((prev) => {
      // If the clicked item is already selected, deselect it
      if (prev.has(itemName)) {
        return new Set();
      }
      // Otherwise, select only this item (deselect all others)
      return new Set([itemName]);
    });
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden relative patient-detail-container"
      style={{
        background: `linear-gradient(135deg, ${colorScheme.colors.background} 0%, ${colorScheme.colors.surface} 100%)`,
      }}
      data-tutorial="patient-detail-container"
    >
      <TutorialOverlay />
      {/* Animated background elements with color scheme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: `${colorScheme.colors.secondary}20`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: `${colorScheme.colors.accent}20`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: `${colorScheme.colors.primary}20`,
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Main Container with max width and centering */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col h-full">
          {/* Header */}
          <div
            className="patient-header relative"
            data-tutorial="patient-header"
          >
            <PatientHeader
              patient={currentPatient}
              currentView={currentView}
              onBack={onBack}
              onViewChange={setCurrentView}
            />

            {/* Action Buttons - Top Right */}
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
              <Button
                size="sm"
                variant="ghost"
                className="hover:bg-opacity-20"
                style={{
                  color: colorScheme.colors.textSecondary,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colorScheme.colors.text;
                  e.currentTarget.style.backgroundColor = `${colorScheme.colors.primary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    colorScheme.colors.textSecondary;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Camera className="w-4 h-4 mr-2" />
                New Scan
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="hover:bg-opacity-20"
                style={{
                  color: colorScheme.colors.textSecondary,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colorScheme.colors.text;
                  e.currentTarget.style.backgroundColor = `${colorScheme.colors.primary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    colorScheme.colors.textSecondary;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => setShowQuestionnaire(true)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Questionnaire
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="hover:bg-opacity-20"
                style={{
                  color: colorScheme.colors.textSecondary,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colorScheme.colors.text;
                  e.currentTarget.style.backgroundColor = `${colorScheme.colors.primary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    colorScheme.colors.textSecondary;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => setIsEditingPatient(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient
              </Button>
            </div>
          </div>

          {/* HIPAA Session Warning */}
          {hipaaMode && (
            <div
              className="hipaa-session-warning"
              style={{
                backgroundColor: colorScheme.colors.warning,
                color: colorScheme.colors.text,
                border: `1px solid ${colorScheme.colors.border}`,
              }}
            >
              ⚠️ HIPAA Compliance Mode Active - Session will timeout in 15
              minutes for security
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Left Column - Patient Images (fixed max width) */}
            <div
              className="w-1/2 lg:w-80 xl:w-96 flex-shrink-0"
              data-tutorial="patient-photos"
            >
              <PatientImages
                patient={currentPatient}
                shortlist={shortlist}
                treatmentPlan={treatmentPlan}
                interestedAreas={interestedAreas}
                onUpdatePatient={handleUpdatePatient}
                onRemoveFromShortlist={removeFromShortlist}
                selectedShortlistItems={selectedShortlistItems}
                onShortlistItemSelect={handleShortlistItemSelect}
              />
            </div>

            {/* Right Column - Content (expands to fill remaining space) */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Tab Bar - Always visible at top of right column */}
              <div className="p-6 pb-2">
                <div
                  className="flex space-x-1 p-1 rounded-xl border"
                  style={{
                    backgroundColor: `${colorScheme.colors.surface}80`,
                    borderColor: colorScheme.colors.border,
                  }}
                  data-tutorial="tab-navigation"
                >
                  {[
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
                      label: "Plan",
                      icon: <FileText className="w-4 h-4" />,
                    },
                  ].map((view) => (
                    <Button
                      key={view.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentView(view.id)}
                      className="flex-1 transition-all duration-300"
                      style={{
                        backgroundColor:
                          currentView === view.id
                            ? `linear-gradient(135deg, ${colorScheme.colors.primary}, ${colorScheme.colors.accent})`
                            : "transparent",
                        color:
                          currentView === view.id
                            ? colorScheme.colors.surface
                            : colorScheme.colors.textSecondary,
                        boxShadow:
                          currentView === view.id
                            ? `0 4px 14px 0 ${colorScheme.colors.primary}40`
                            : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (currentView !== view.id) {
                          e.currentTarget.style.color = colorScheme.colors.text;
                          e.currentTarget.style.backgroundColor = `${colorScheme.colors.primary}10`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentView !== view.id) {
                          e.currentTarget.style.color =
                            colorScheme.colors.textSecondary;
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {view.icon}
                      <span className="ml-2 font-medium">{view.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Scrollable Content Area - Now includes filters */}
              <div
                className="flex-1 overflow-y-auto p-6 min-h-0"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <AnimatePresence mode="wait">
                  {currentView === "analysis" && (
                    <div data-tutorial="analysis-areas">
                      <AnalysisView
                        analysisAreas={analysisAreas as any}
                        patient={currentPatient}
                        shortlist={shortlist}
                        onAddToShortlist={addToShortlist}
                        onAddToTreatmentPlan={addToTreatmentPlan}
                        addedToPlan={addedToPlan}
                        selectedShortlistItems={selectedShortlistItems}
                      />
                    </div>
                  )}

                  {currentView === "treatments" && (
                    <TreatmentsView
                      treatments={treatments as any}
                      analysisAreas={analysisAreas as any}
                      addedToPlan={addedToPlan}
                      shortlist={shortlist}
                      patient={currentPatient}
                      onAddToTreatmentPlan={addToTreatmentPlan}
                      onRemoveFromShortlist={removeFromShortlist}
                      onClearFilters={handleClearFilters}
                      onViewAllAreas={handleViewAllAreas}
                      selectedShortlistItems={selectedShortlistItems}
                    />
                  )}

                  {currentView === "treatment-plan" && (
                    <div data-tutorial="treatment-plan">
                      <TreatmentPlanView
                        treatmentPlan={treatmentPlan}
                        onRemoveFromPlan={removeFromTreatmentPlan}
                        onExportToEMR={() => {}}
                        onDownloadPDF={handleDownloadPDF}
                        onShare={handleShare}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Treatment Plan Popup */}
          <TreatmentPlanPopup
            isOpen={showTreatmentPopup}
            onClose={() => setShowTreatmentPopup(false)}
            onAdd={handleAddToTreatmentPlan}
            treatment={selectedTreatment}
            patientFindings={currentPatient.findings}
            shortlist={shortlist}
          />

          {/* Edit Patient Popup */}
          <EditPatientPopup
            patient={currentPatient}
            isOpen={isEditingPatient}
            onClose={() => setIsEditingPatient(false)}
            onSave={(updatedPatient) => {
              // Handle patient update - in a real app this would update the patient data
              console.log("Updated patient:", updatedPatient);
              setCurrentPatient(updatedPatient);
              setIsEditingPatient(false);
            }}
          />

          {/* Patient Questionnaire Modal */}
          <PatientQuestionnaire
            isOpen={showQuestionnaire}
            onClose={() => setShowQuestionnaire(false)}
            patientName={currentPatient.name}
          />

          {/* Share Modal */}
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            patientName={currentPatient.name}
            treatmentPlan={treatmentPlan}
          />

          {/* HIPAA Security Status Bar */}
          {hipaaMode && (
            <div
              className="hipaa-status-bar"
              style={{
                backgroundColor: colorScheme.colors.surface,
                borderTop: `1px solid ${colorScheme.colors.border}`,
                color: colorScheme.colors.text,
              }}
            >
              <div className="status-item">
                <div
                  className="status-indicator"
                  style={{ backgroundColor: colorScheme.colors.success }}
                ></div>
                <span>Session Active</span>
              </div>
              <div className="status-item">
                <span>🔒 Data Encrypted</span>
              </div>
              <div className="status-item">
                <span>📋 Audit Logged</span>
              </div>
              <div className="status-item">
                <span>⏰ Session: 2:34</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
