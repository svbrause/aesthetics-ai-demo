"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Target,
  Sparkles,
  FileText,
  Camera,
  Edit,
  BarChart3,
} from "lucide-react";
import { PatientHeader } from "./PatientHeader";
import { PatientImages } from "./PatientImages";
import { AnalysisView } from "./AnalysisView";
import { TreatmentsView } from "./TreatmentsView";
import { TreatmentPlanView } from "./TreatmentPlanView";
import { TreatmentPlanPopup } from "./TreatmentPlanPopup";
import { PatientQuestionnaire } from "./PatientQuestionnaire";
import { EditPatientPopup } from "./EditPatientPopup";
import { ShareModal } from "./ShareModal";
import { PatientOverviewPopup } from "./PatientOverviewPopup";
import { TutorialOverlay } from "../TutorialOverlay";
import { useTheme } from "@/contexts/ThemeContext";
import { useShortlistWithAirtable } from "@/hooks/useShortlistWithAirtable";
import { useSeverityMappings } from "@/hooks/useSeverityMappings";
import { analysisAreas } from "@/data/analysisData";
import { treatments } from "@/data/treatmentsData";
import { Patient, Finding } from "@/types/patientTypes";

type ViewMode = "analysis" | "treatments" | "treatment-plan";

interface Treatment {
  id: number;
  name: string;
  category: string;
  area: string;
  goal: string;
  price: number;
  duration: string;
  downtime: string;
  invasiveness: "Minimal" | "Moderate" | "High";
  description: string;
  image: string;
  beforeAfter?: Array<{
    before: string;
    after: string;
    label: string;
  }>;
  benefits: string[];
  risks: string[];
  serves: string[];
  isHearted?: boolean;
}

interface TreatmentPlanItem {
  id: string;
  name: string;
  notes?: string;
  areas: string[];
  quantity?: string;
  unit?: string;
  price?: string;
  duration?: string;
  downtime?: string;
  invasiveness?: string;
  timeline?: "short-term" | "long-term";
  priority?: "high" | "medium" | "low";
}

interface PatientDetailScreenV2RefactoredGoldProps {
  patient: Patient;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
}

export function PatientDetailScreenV2RefactoredGold({
  patient,
  onBack,
  onOpenAreaAnalysis,
}: PatientDetailScreenV2RefactoredGoldProps) {
  // Guard clause to prevent hooks from being called with invalid patient data
  if (!patient || !patient.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient...</p>
        </div>
      </div>
    );
  }

  const { hipaaMode } = useTheme();
  const [currentView, setCurrentView] = useState<ViewMode>("analysis");

  // Use Airtable-integrated shortlist hook
  const {
    shortlist,
    loading: shortlistLoading,
    error: shortlistError,
    addToShortlist,
    removeFromShortlist,
    clearShortlist,
    updateShortlistItem,
    refreshShortlist,
  } = useShortlistWithAirtable({
    patientId: patient.id,
    initialShortlist: [
      // Add some test findings to shortlist for demo purposes
      {
        id: "demo-1",
        name: "Mid Cheek Flattening",
        score: 75,
        severity: "moderate",
      },
      {
        id: "demo-2",
        name: "Under Eye Dark Circles",
        score: 68,
        severity: "moderate",
      },
      {
        id: "demo-3",
        name: "Under Eye Hollow",
        score: 72,
        severity: "moderate",
      },
    ],
  });

  // Use severity mappings hook
  const {
    severityMappings,
    loading: severityLoading,
    error: severityError,
    getScaledFinding,
    getSeverityMapping,
    createOrUpdateSeverityMapping,
    refreshSeverityMappings,
  } = useSeverityMappings({
    patientId: patient.id,
  });
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
  const [showOverviewPopup, setShowOverviewPopup] = useState(false);
  const [selectedShortlistItems, setSelectedShortlistItems] = useState<
    Set<string>
  >(new Set());

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
    patient.findings.forEach((finding: any) => {
      const findingName = typeof finding === "string" ? finding : finding.name;
      const area = analysisAreas.find((area) =>
        area.findings.some((f) => f.name === findingName)
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

  // Shortlist functions are now provided by the useShortlistWithAirtable hook
  // Create a wrapper for the async addToShortlist function to match the expected interface
  const handleAddToShortlist = (finding: Finding) => {
    addToShortlist(finding);
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

  const moveToSavedForLater = (id: string) => {
    setTreatmentPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, timeline: "long-term" } : item
      )
    );
  };

  const moveToCurrentPlan = (id: string) => {
    setTreatmentPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, timeline: "short-term" } : item
      )
    );
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
          `${index + 1}. ${item.name}\n   Notes: ${
            item.notes || "No notes"
          }\n   Areas: ${(item.areas || []).join(", ")}\n   Price: ${
            item.price || "N/A"
          }\n   Duration: ${item.duration || "N/A"}\n   Downtime: ${
            item.downtime || "N/A"
          }\n   Invasiveness: ${item.invasiveness || "N/A"}\n\n`
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
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden relative patient-detail-container gold-theme"
      data-tutorial="patient-detail-container"
    >
      <TutorialOverlay />

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
                className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                onClick={() => setShowOverviewPopup(true)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50"
              >
                <Camera className="w-4 h-4 mr-2" />
                New Scan
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                onClick={() => setShowQuestionnaire(true)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Questionnaire
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                onClick={() => setIsEditingPatient(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient
              </Button>
            </div>
          </div>

          {/* HIPAA Session Warning */}
          {hipaaMode && (
            <div className="hipaa-session-warning">
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
                shortlistLoading={shortlistLoading}
                shortlistError={shortlistError}
              />
            </div>

            {/* Right Column - Content (expands to fill remaining space) */}
            <div className="flex-1 flex flex-col min-h-0">
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
                          ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/25 gold-theme-tab-button"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {view.icon}
                      <span className="ml-2 font-bold text-base">
                        {view.label}
                      </span>
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
                        onAddToShortlist={handleAddToShortlist}
                        onAddToTreatmentPlan={addToTreatmentPlan}
                        addedToPlan={addedToPlan}
                        selectedShortlistItems={selectedShortlistItems}
                        severityMappings={severityMappings}
                        getScaledFinding={getScaledFinding}
                        getSeverityMapping={getSeverityMapping}
                        createOrUpdateSeverityMapping={
                          createOrUpdateSeverityMapping
                        }
                        severityLoading={severityLoading}
                        severityError={severityError}
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
                        onMoveToSavedForLater={moveToSavedForLater}
                        onMoveToCurrentPlan={moveToCurrentPlan}
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
            patientFindings={currentPatient.findings.map((f) => f.name)}
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

          {/* Patient Overview Popup */}
          <PatientOverviewPopup
            isOpen={showOverviewPopup}
            onClose={() => setShowOverviewPopup(false)}
            patient={currentPatient}
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
      </div>
    </div>
  );
}
