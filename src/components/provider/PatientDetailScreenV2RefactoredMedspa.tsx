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
  Eye,
  Smile,
  Circle,
  Heart,
  Square,
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
import { Patient, Finding, AnalysisArea } from "@/types/patientTypes";

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

interface PatientDetailScreenV2RefactoredMedspaProps {
  patient: Patient;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
}

export function PatientDetailScreenV2RefactoredMedspa({
  patient,
  onBack,
  onOpenAreaAnalysis,
}: PatientDetailScreenV2RefactoredMedspaProps) {
  // Guard clause to prevent hooks from being called with invalid patient data
  if (!patient || !patient.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medspa-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading patient...</p>
        </div>
      </div>
    );
  }

  const { hipaaMode } = useTheme();
  const [currentView, setCurrentView] = useState<ViewMode>("analysis");
  const [currentPatient, setCurrentPatient] = useState<Patient>(patient);

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
      {
        id: "demo-1",
        name: "Mid Cheek Flattening",
        score: 75,
        severity: "moderate",
        airtableRecordId: "demo-1",
      },
      {
        id: "demo-2",
        name: "Under Eye Dark Circles",
        score: 68,
        severity: "moderate",
        airtableRecordId: "demo-2",
      },
      {
        id: "demo-3",
        name: "Under Eye Hollow",
        score: 72,
        severity: "moderate",
        airtableRecordId: "demo-3",
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
  } = useSeverityMappings({ patientId: patient.id });

  // State for modals and popups
  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showOverviewPopup, setShowOverviewPopup] = useState(false);

  // Treatment plan state
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanItem[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );
  const [showTreatmentPopup, setShowTreatmentPopup] = useState(false);
  const [addedToPlan, setAddedToPlan] = useState<Set<string>>(new Set());
  const [selectedShortlistItems, setSelectedShortlistItems] = useState<
    Set<string>
  >(new Set());

  // Convert patient findings to the format expected by AnalysisView
  const patientFindings: Finding[] =
    patient.findings?.map((finding) => ({
      id: finding.name.toLowerCase().replace(/\s+/g, "-"),
      name: finding.name,
      score: finding.score,
      severity:
        (finding.severity as any) === "subtle"
          ? "mild"
          : (finding.severity as "mild" | "moderate" | "severe"),
      description: `Description for ${finding.name}`,
      commonality: 0.5,
      ageGroup: "25-45",
      causes: ["Aging", "Sun damage", "Genetics"],
      symptoms: ["Visible signs", "Skin changes"],
      beforeAfter: [],
      treatments: ["Treatment options"],
      educational: `Educational information about ${finding.name}`,
    })) || [];

  // Create analysis areas from patient findings
  const analysisAreas: AnalysisArea[] = [
    {
      id: "forehead",
      name: "Forehead",
      score: 70,
      description: "Forehead area analysis",
      icon: <Target className="w-5 h-5" />,
      color: "blue",
      subcategories: [],
      findings: patientFindings.filter((finding) =>
        finding.name.toLowerCase().includes("forehead")
      ),
    },
    {
      id: "eyes",
      name: "Eyes",
      score: 70,
      description: "Eyes area analysis",
      icon: <Eye className="w-5 h-5" />,
      color: "green",
      subcategories: [],
      findings: patientFindings.filter((finding) =>
        finding.name.toLowerCase().includes("eye")
      ),
    },
    {
      id: "cheeks",
      name: "Cheeks",
      score: 70,
      description: "Cheeks area analysis",
      icon: <Smile className="w-5 h-5" />,
      color: "purple",
      subcategories: [],
      findings: patientFindings.filter((finding) =>
        finding.name.toLowerCase().includes("cheek")
      ),
    },
    {
      id: "nose",
      name: "Nose",
      score: 70,
      description: "Nose area analysis",
      icon: <Circle className="w-5 h-5" />,
      color: "orange",
      subcategories: [],
      findings: patientFindings.filter((finding) =>
        finding.name.toLowerCase().includes("nose")
      ),
    },
    {
      id: "mouth",
      name: "Mouth",
      score: 70,
      description: "Mouth area analysis",
      icon: <Heart className="w-5 h-5" />,
      color: "pink",
      subcategories: [],
      findings: patientFindings.filter(
        (finding) =>
          finding.name.toLowerCase().includes("mouth") ||
          finding.name.toLowerCase().includes("lip")
      ),
    },
    {
      id: "chin",
      name: "Chin",
      score: 70,
      description: "Chin area analysis",
      icon: <Square className="w-5 h-5" />,
      color: "teal",
      subcategories: [],
      findings: patientFindings.filter((finding) =>
        finding.name.toLowerCase().includes("chin")
      ),
    },
  ];

  // Get interested areas based on shortlist
  const getInterestedAreas = () => {
    const interestedAreas = new Set<string>();
    shortlist.forEach((item) => {
      const findingName = item.name;
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

  const getMedspaColorClasses = () => {
    return {
      gradient: "from-medspa-primary to-medspa-secondary",
      bg: "bg-card-bg",
      border: "border-card-border",
      text: "text-text-primary",
      accentText: "text-medspa-primary",
      accentBg: "bg-medspa-light",
      accentBorder: "border-medspa-primary",
      buttonBg: "bg-medspa-primary",
      buttonHover: "hover:bg-medspa-secondary",
    };
  };

  const medspaClasses = getMedspaColorClasses();

  return (
    <div
      className="bg-gray-50 flex flex-col h-screen overflow-hidden relative patient-detail-container medspa-theme"
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
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 border border-gray-200"
                onClick={() => setShowOverviewPopup(true)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 border border-gray-200"
                onClick={handleNewScan}
              >
                <Camera className="w-4 h-4 mr-2" />
                New Scan
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 border border-gray-200"
                onClick={handleQuestionnaire}
              >
                <FileText className="w-4 h-4 mr-2" />
                Questionnaire
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 border border-gray-200"
                onClick={handleEditPatient}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient
              </Button>
            </div>
          </div>

          {/* HIPAA Session Warning */}
          {hipaaMode && (
            <div className="hipaa-session-warning bg-warning/10 border border-warning/20 text-warning px-4 py-2 text-sm text-center">
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
                  className="flex space-x-1 p-1 bg-gray-100 rounded-lg border border-gray-200 shadow-sm"
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
                          ? "accent-tab shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
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
                        analysisAreas={analysisAreas}
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
                      treatments={treatments}
                      analysisAreas={analysisAreas}
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
                    <TreatmentPlanView
                      treatmentPlan={treatmentPlan}
                      onRemoveFromPlan={removeFromTreatmentPlan}
                      onMoveToSavedForLater={moveToSavedForLater}
                      onMoveToCurrentPlan={moveToCurrentPlan}
                      onDownloadPDF={handleDownloadPDF}
                      onShare={handleShare}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Popups */}
      <AnimatePresence>
        {showTreatmentPlan && (
          <TreatmentPlanPopup
            isOpen={showTreatmentPlan}
            onClose={() => setShowTreatmentPlan(false)}
            onAdd={(treatmentDetails) => {
              console.log("Add treatment:", treatmentDetails);
            }}
            treatment={treatmentPlan}
            patientFindings={patientFindings.map((f) => f.name)}
            shortlist={shortlist}
          />
        )}

        {showQuestionnaire && (
          <PatientQuestionnaire
            isOpen={showQuestionnaire}
            onClose={() => setShowQuestionnaire(false)}
            patientName={currentPatient.name}
          />
        )}

        {isEditingPatient && (
          <EditPatientPopup
            isOpen={isEditingPatient}
            patient={currentPatient}
            onSave={(updatedPatient) => {
              setCurrentPatient(updatedPatient);
              setIsEditingPatient(false);
            }}
            onClose={() => setIsEditingPatient(false)}
          />
        )}

        {showShareModal && (
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            patientName={currentPatient.name}
            treatmentPlan={treatmentPlan}
          />
        )}

        {showOverviewPopup && (
          <PatientOverviewPopup
            isOpen={showOverviewPopup}
            patient={currentPatient}
            onClose={() => setShowOverviewPopup(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
