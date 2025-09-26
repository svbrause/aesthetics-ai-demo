"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Target, Sparkles, FileText } from "lucide-react";
import { PatientHeader } from "./PatientHeader";
import { PatientImages } from "./PatientImages";
import { AnalysisView } from "./AnalysisView";
import { TreatmentsView } from "./TreatmentsView";
import { TreatmentPlanView } from "./TreatmentPlanView";
import { TreatmentPlanPopup } from "./TreatmentPlanPopup";
import { PatientQuestionnaire } from "./PatientQuestionnaire";
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

interface PatientDetailScreenV2RefactoredProps {
  patient: Patient;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
}

export function PatientDetailScreenV2Refactored({
  patient,
  onBack,
  onOpenAreaAnalysis,
}: PatientDetailScreenV2RefactoredProps) {
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

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No patient selected</p>
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

  // Show only top 3 areas by score by default
  const interestedAreas = analysisAreas
    .filter((area) => allInterestedAreas.includes(area.id))
    .slice(0, 3)
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

  const handleExportToEMR = () => {
    console.log("Exporting to EMR...");
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...");
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

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden relative patient-detail-container"
      data-tutorial="patient-detail-container"
    >
      <TutorialOverlay />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 dark:bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <div className="patient-header" data-tutorial="patient-header">
        <PatientHeader
          patient={currentPatient}
          currentView={currentView}
          onBack={onBack}
          onViewChange={setCurrentView}
        />
      </div>

      {/* HIPAA Session Warning */}
      {hipaaMode && (
        <div className="hipaa-session-warning">
          ⚠️ HIPAA Compliance Mode Active - Session will timeout in 15 minutes
          for security
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Third - Patient Images */}
        <div className="w-1/3" data-tutorial="patient-photos">
          <PatientImages
            patient={currentPatient}
            shortlist={shortlist}
            treatmentPlan={treatmentPlan}
            interestedAreas={interestedAreas}
            onUpdatePatient={handleUpdatePatient}
          />
        </div>

        {/* Right Two-Thirds - Content */}
        <div className="w-2/3 flex flex-col">
          {/* Tab Bar - Always visible at top of right column */}
          <div className="p-6 pb-2">
            <div
              className="flex space-x-1 p-1 bg-gray-800/50 rounded-xl border border-gray-700/50"
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
                  className={`flex-1 transition-all duration-300 ${
                    currentView === view.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {view.icon}
                  <span className="ml-2 font-medium">{view.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Scrollable Content Area - Now includes filters */}
          <div className="flex-1 overflow-y-auto p-6">
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
                  />
                </div>
              )}

              {currentView === "treatments" && (
                <TreatmentsView
                  treatments={treatments as any}
                  analysisAreas={analysisAreas as any}
                  addedToPlan={addedToPlan}
                  shortlist={shortlist}
                  onAddToTreatmentPlan={addToTreatmentPlan}
                  onRemoveFromShortlist={removeFromShortlist}
                  onClearFilters={handleClearFilters}
                  onViewAllAreas={handleViewAllAreas}
                />
              )}

              {currentView === "treatment-plan" && (
                <div data-tutorial="treatment-plan">
                  <TreatmentPlanView
                    treatmentPlan={treatmentPlan}
                    onRemoveFromPlan={removeFromTreatmentPlan}
                    onExportToEMR={handleExportToEMR}
                    onDownloadPDF={handleDownloadPDF}
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
      />

      {/* Patient Questionnaire Modal */}
      <PatientQuestionnaire
        isOpen={showQuestionnaire}
        onClose={() => setShowQuestionnaire(false)}
        patientName={currentPatient.name}
      />

      {/* HIPAA Security Status Bar */}
      {hipaaMode && (
        <div className="hipaa-status-bar">
          <div className="status-item">
            <div className="status-indicator"></div>
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
  );
}
