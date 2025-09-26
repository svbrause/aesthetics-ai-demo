"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector for the element to highlight
  position: "top" | "bottom" | "left" | "right" | "center";
  action?: string; // Optional action to perform (click, hover, etc.)
  screen: string; // Which screen this step belongs to
  order: number;
  navigateTo?: string; // Optional navigation action (route to navigate to)
  autoNavigate?: boolean; // Whether to automatically navigate after this step
  waitForNavigation?: boolean; // Whether to wait for navigation before showing next step
}

export interface TutorialContextType {
  isActive: boolean;
  currentStep: TutorialStep | null;
  currentStepIndex: number;
  steps: TutorialStep[];
  startTutorial: (tutorialName: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTutorial: () => void;
  completeTutorial: () => void;
  isStepVisible: (stepId: string) => boolean;
  navigateToStep: (stepId: string) => void;
  isNavigating: boolean;
  resetTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

// Define all tutorial steps in sequential order
const tutorialSteps: TutorialStep[] = [
  // ===== DASHBOARD SCREEN =====
  {
    id: "dashboard-welcome",
    title: "Welcome to Aesthetics AI",
    description:
      "Welcome to your provider dashboard! This is your command center for managing patients and conducting AI-powered aesthetic analyses. Let's explore the key features together.",
    target: "[data-tutorial='provider-dashboard']",
    position: "center",
    screen: "provider-dashboard",
    order: 1,
  },
  {
    id: "dashboard-recent-patients",
    title: "Recent Patients Overview",
    description:
      "Here you can see your most recent patients with their photos, analysis scores, and key information. Each card shows the patient's current status and last analysis date.",
    target: "[data-tutorial='patient-card']",
    position: "bottom",
    screen: "provider-dashboard",
    order: 2,
  },
  {
    id: "dashboard-patients-button",
    title: "View All Patients",
    description:
      "Click this 'View All' button to access your complete patient database. This will take you to a comprehensive list where you can search, filter, and manage all your patients.",
    target: "[data-tutorial='patients-button']",
    position: "right",
    screen: "provider-dashboard",
    order: 3,
    navigateTo: "/provider/patients",
    autoNavigate: true,
    waitForNavigation: true,
  },
  {
    id: "patients-page-welcome",
    title: "Patient Database",
    description:
      "Welcome to your complete patient database! Here you can see all your patients with their contact information, analysis scores, and current status. Use the search and filter options to quickly find specific patients.",
    target: "[data-tutorial='patient-list-header']",
    position: "center",
    screen: "patient-list",
    order: 4,
  },

  // ===== PATIENT LIST SCREEN =====
  {
    id: "patient-list-header",
    title: "Patient Management",
    description:
      "This is your complete patient database. Here you can see all your patients with their contact information, analysis scores, and current status. Use the search and filter options to quickly find specific patients.",
    target: "[data-tutorial='patient-list-header']",
    position: "bottom",
    screen: "patient-list",
    order: 5,
  },
  {
    id: "patient-search",
    title: "Search & Filter Tools",
    description:
      "Use these tools to quickly find patients. Search by name or email, and filter by status (active, follow-up, inactive) to organize your patient list efficiently.",
    target: "[data-tutorial='patients-search']",
    position: "bottom",
    screen: "patient-list",
    order: 6,
  },
  {
    id: "patient-card",
    title: "Patient Information Cards",
    description:
      "Each patient card shows comprehensive information including photos, contact details, analysis scores, and findings count. Click on any card to view detailed patient information and analysis results.",
    target: "[data-tutorial='patient-card']",
    position: "right",
    screen: "patient-list",
    order: 7,
    navigateTo: "/provider/patient/1001",
    autoNavigate: true,
    waitForNavigation: true,
  },
  {
    id: "patient-detail-welcome",
    title: "Patient Detail View",
    description:
      "Welcome to the patient detail page! Here you can view comprehensive patient information, analysis results, and treatment plans. This is where you'll conduct detailed assessments and create treatment recommendations.",
    target: "[data-tutorial='patient-detail-container']",
    position: "center",
    screen: "patient-detail",
    order: 8,
  },

  // ===== PATIENT DETAIL SCREEN =====
  {
    id: "patient-header",
    title: "Patient Detail View",
    description:
      "This is the detailed patient view where you can see comprehensive information about a specific patient. The header shows patient details and provides quick access to important actions.",
    target: "[data-tutorial='patient-header']",
    position: "bottom",
    screen: "patient-detail",
    order: 9,
  },
  {
    id: "patient-actions",
    title: "Quick Action Buttons",
    description:
      "These buttons allow you to take new scans, fill out questionnaires, and edit patient information without leaving the current screen. Each action is designed to streamline your workflow.",
    target: "[data-tutorial='patient-actions']",
    position: "bottom",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "patient-photo",
    title: "Patient Photos",
    description:
      "View the patient's front and side photos here. You can switch between views to see different angles. The photos are essential for analysis and treatment planning.",
    target: "[data-tutorial='patient-photos']",
    position: "right",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "patient-shortlist",
    title: "Key Findings Shortlist",
    description:
      "The shortlist shows the most important findings for this patient. These are the key areas that need attention and can be added to treatment plans or used for filtering treatments.",
    target: "[data-tutorial='patient-shortlist']",
    position: "right",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "tab-navigation",
    title: "Tab Navigation",
    description:
      "Use these tabs to switch between different views: Analysis (detailed findings), Treatments (available procedures), and Plan (treatment recommendations). Each tab provides different insights and tools.",
    target: "[data-tutorial='tab-navigation']",
    position: "bottom",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "analysis-areas",
    title: "Facial Analysis Areas",
    description:
      "This shows the facial areas analyzed by AI with their respective findings and severity scores. Click on areas to see detailed analysis and understand what treatments might be appropriate.",
    target: "[data-tutorial='analysis-areas']",
    position: "right",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "treatment-filters",
    title: "Treatment Filtering",
    description:
      "Use these filters to find the most relevant treatments for this patient. Filter by modality, area, price range, and other criteria to narrow down your options.",
    target: "[data-tutorial='treatment-filters']",
    position: "bottom",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "treatment-cards",
    title: "Available Treatments",
    description:
      "Browse through available treatments with before/after photos, pricing, duration, and downtime information. Add treatments to your plan based on the patient's specific needs.",
    target: "[data-tutorial='treatment-cards']",
    position: "right",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "treatment-plan",
    title: "Treatment Plan",
    description:
      "This is your customized treatment plan for this patient. Add treatments, set quantities, and organize them by priority. This plan can be exported to EMR systems or shared with the patient.",
    target: "[data-tutorial='treatment-plan']",
    position: "right",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "plan-actions",
    title: "Plan Management",
    description:
      "Export the treatment plan to EMR systems, download as PDF, or make modifications. These tools help you integrate the plan into your clinical workflow and share it with patients.",
    target: "[data-tutorial='plan-actions']",
    position: "top",
    screen: "patient-detail",
    order: 29,
  },
  {
    id: "dashboard-new-scan",
    title: "Start New Analysis",
    description:
      "Now let's try creating a new patient analysis. Click this button to upload photos and start the AI-powered assessment process. This will take you to the photo upload screen.",
    target: "[data-tutorial='new-scan-button']",
    position: "bottom",
    screen: "provider-dashboard",
    order: 29,
    navigateTo: "/provider/upload",
    autoNavigate: true,
    waitForNavigation: true,
  },

  // ===== UPLOAD SCREEN =====
  {
    id: "upload-welcome",
    title: "Photo Upload & Analysis",
    description:
      "This is where you upload patient photos for AI analysis. The system will analyze facial features and provide detailed treatment recommendations based on the uploaded images.",
    target: "[data-tutorial='upload-interface']",
    position: "center",
    screen: "upload",
    order: 29,
  },
  {
    id: "upload-instructions",
    title: "Photo Guidelines",
    description:
      "Follow these guidelines for best analysis results. Ensure good lighting, proper angles, and clear visibility of facial features. The quality of photos directly impacts the accuracy of the analysis.",
    target: "[data-tutorial='upload-instructions']",
    position: "bottom",
    screen: "upload",
    order: 29,
  },
  {
    id: "upload-actions",
    title: "Upload Controls",
    description:
      "Use these controls to upload photos, start the analysis, or navigate back. The system will guide you through each step of the upload and analysis process.",
    target: "[data-tutorial='upload-actions']",
    position: "top",
    screen: "upload",
    order: 29,
  },

  // ===== RESULTS SCREEN =====
  {
    id: "results-welcome",
    title: "Analysis Results",
    description:
      "Here you can view the detailed AI analysis results for the uploaded photos. Review the findings, treatment recommendations, and save the patient data for future reference.",
    target: "[data-tutorial='results-interface']",
    position: "center",
    screen: "results",
    order: 29,
  },
  {
    id: "results-analysis",
    title: "Detailed Analysis",
    description:
      "Review the AI analysis findings for each facial area. Click on areas to see detailed information, severity scores, and specific treatment suggestions for each finding.",
    target: "[data-tutorial='results-analysis']",
    position: "top",
    screen: "results",
    order: 29,
  },
  {
    id: "results-actions",
    title: "Result Management",
    description:
      "Save the analysis as a draft, start a new scan, or return to the dashboard. These options help you manage your analysis workflow and ensure no data is lost.",
    target: "[data-tutorial='results-actions']",
    position: "bottom",
    screen: "results",
    order: 29,
  },

  // ===== ANALYSIS TOOLS SCREEN =====
  {
    id: "analysis-tools-welcome",
    title: "Advanced Analysis Tools",
    description:
      "Access advanced analysis tools and features here. These tools enhance your patient analysis capabilities and provide additional insights for treatment planning.",
    target: "[data-tutorial='analysis-tools']",
    position: "center",
    screen: "analysis-tools",
    order: 29,
  },
  {
    id: "analysis-tools-features",
    title: "Tool Capabilities",
    description:
      "Explore different analysis tools and their specific capabilities. Each tool provides unique insights for patient assessment and helps you make more informed treatment decisions.",
    target: "[data-tutorial='analysis-tools-features']",
    position: "top",
    screen: "analysis-tools",
    order: 29,
  },

  // ===== TUTORIAL COMPLETION =====
  {
    id: "tutorial-complete",
    title: "Tutorial Complete!",
    description:
      "Congratulations! You've completed the comprehensive tutorial. You now understand how to navigate the system, manage patients, conduct analyses, and create treatment plans. You're ready to start using Aesthetics AI effectively!",
    target: "[data-tutorial='provider-dashboard']",
    position: "center",
    screen: "provider-dashboard",
    order: 29,
  },
];

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Helper function to detect current screen based on URL
  const detectCurrentScreen = useCallback(() => {
    if (typeof window === "undefined") return null;

    const pathname = window.location.pathname;
    if (pathname === "/provider") return "provider-dashboard";
    if (pathname === "/provider/patients") return "patient-list";
    if (pathname.startsWith("/provider/patient/")) return "patient-detail";
    if (pathname === "/provider/upload") return "upload";
    if (pathname === "/provider/results") return "results";
    if (pathname === "/provider/analysis-tools") return "analysis-tools";
    return null;
  }, []);

  // Initialize tutorial state from localStorage on mount
  React.useEffect(() => {
    console.log("🔄 TutorialContext: Initializing from localStorage");
    console.log(
      "🔄 Current URL:",
      typeof window !== "undefined" ? window.location.href : "SSR"
    );

    const savedTutorialState = localStorage.getItem("tutorialState");
    if (savedTutorialState) {
      try {
        const state = JSON.parse(savedTutorialState);
        console.log("🔄 Saved tutorial state:", state);

        if (state.isActive) {
          // Validate the state before applying it
          const stepExists = allSteps[state.currentStepIndex];
          if (stepExists) {
            const currentScreen = detectCurrentScreen();
            console.log("🔄 Detected current screen:", currentScreen);
            console.log("🔄 Expected screen for step:", stepExists.screen);

            // Check if we're on the correct screen for this step
            if (currentScreen && stepExists.screen !== currentScreen) {
              console.log(
                "⚠️ Screen mismatch detected, finding appropriate step for current screen"
              );

              // Find the first step for the current screen
              const screenStep = allSteps.find(
                (step) => step.screen === currentScreen
              );
              if (screenStep) {
                const newStepIndex = allSteps.indexOf(screenStep);
                console.log("✅ Found appropriate step for current screen:", {
                  stepId: screenStep.id,
                  stepIndex: newStepIndex,
                  screen: currentScreen,
                });
                setIsActive(true);
                setCurrentStepIndex(newStepIndex);
                setCurrentScreen(currentScreen);
              } else {
                console.log(
                  "❌ No steps found for current screen, clearing tutorial"
                );
                localStorage.removeItem("tutorialState");
              }
            } else {
              console.log("✅ Valid tutorial state, restoring:", {
                stepIndex: state.currentStepIndex,
                stepId: stepExists.id,
                screen: state.currentScreen,
              });
              setIsActive(true);
              setCurrentStepIndex(state.currentStepIndex);
              setCurrentScreen(state.currentScreen);
            }
          } else {
            console.log("❌ Invalid tutorial state detected, clearing...");
            localStorage.removeItem("tutorialState");
          }
        } else {
          console.log("📝 Tutorial not active in saved state");
        }
      } catch (error) {
        console.error("❌ Error loading tutorial state:", error);
        localStorage.removeItem("tutorialState");
      }
    } else {
      console.log("📝 No saved tutorial state found");
    }
  }, [detectCurrentScreen]);

  // Save tutorial state to localStorage whenever it changes
  React.useEffect(() => {
    const tutorialState = {
      isActive,
      currentStepIndex,
      currentScreen,
    };
    localStorage.setItem("tutorialState", JSON.stringify(tutorialState));
  }, [isActive, currentStepIndex, currentScreen]);

  // Get all steps in order (no filtering by screen for sequential flow)
  const allSteps = tutorialSteps.sort((a, b) => a.order - b.order);
  const currentStep =
    isActive && allSteps[currentStepIndex] ? allSteps[currentStepIndex] : null;

  // Debug logging for currentStep
  React.useEffect(() => {
    console.log("Tutorial state changed:", {
      isActive,
      currentStepIndex,
      currentScreen,
      currentStep: currentStep?.id || "null",
      allStepsLength: allSteps.length,
    });
  }, [isActive, currentStepIndex, currentScreen, currentStep, allSteps.length]);

  // Handle screen changes during navigation
  React.useEffect(() => {
    if (isActive && currentStep) {
      const detectedScreen = detectCurrentScreen();
      if (detectedScreen && detectedScreen !== currentScreen) {
        console.log("🔄 Screen changed during tutorial:", {
          from: currentScreen,
          to: detectedScreen,
          currentStep: currentStep.id,
        });

        // Find the first step for the new screen
        const screenStep = allSteps.find(
          (step) => step.screen === detectedScreen
        );
        if (screenStep) {
          const newStepIndex = allSteps.indexOf(screenStep);
          console.log("✅ Switching to appropriate step for new screen:", {
            stepId: screenStep.id,
            stepIndex: newStepIndex,
            screen: detectedScreen,
          });
          setCurrentStepIndex(newStepIndex);
          setCurrentScreen(detectedScreen);
        }
      }
    }
  }, [isActive, currentStep, currentScreen, detectCurrentScreen]);

  // Auto-resume tutorial when page loads and tutorial is active
  React.useEffect(() => {
    if (isActive && currentStep) {
      console.log("Tutorial active on page load:", currentStep.id);
      // Tutorial will automatically continue as the overlay is already active
    }
  }, [isActive, currentStep]);

  // Only log when tutorial becomes active
  if (isActive && currentStep) {
    console.log("Tutorial active:", {
      currentStep: currentStep.id,
      currentStepIndex,
      currentScreen,
      totalSteps: allSteps.length,
    });
  }

  const startTutorial = useCallback((tutorialName: string) => {
    setIsActive(true);
    setCurrentStepIndex(0);
    setCurrentScreen("provider-dashboard"); // Always start from dashboard
  }, []);

  const nextStep = useCallback(() => {
    console.log("=== NEXT STEP CALLED ===");
    console.log("Current step index:", currentStepIndex);
    console.log("Total steps:", allSteps.length);

    if (currentStepIndex < allSteps.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      const nextStep = allSteps[nextStepIndex];

      console.log("Next step:", nextStep);
      console.log("Next step navigateTo:", nextStep.navigateTo);
      console.log("Next step autoNavigate:", nextStep.autoNavigate);

      // Check if this step requires navigation
      if (nextStep.navigateTo && nextStep.autoNavigate) {
        console.log("🚀 NAVIGATING TO:", nextStep.navigateTo);
        setIsNavigating(true);

        // Navigate to the next screen first
        router.push(nextStep.navigateTo);
        console.log("📍 Router.push called, waiting for navigation...");

        // Wait for navigation to complete, then update state
        setTimeout(() => {
          console.log("⏰ Navigation timeout completed, updating state...");
          console.log("Setting step index to:", nextStepIndex);
          console.log("Setting screen to:", nextStep.screen);
          setCurrentStepIndex(nextStepIndex);
          setCurrentScreen(nextStep.screen);
          setIsNavigating(false);
          console.log("✅ Navigation state updated");
        }, 1000);
      } else {
        console.log("📝 No navigation needed, updating step directly");
        setCurrentStepIndex(nextStepIndex);
        setCurrentScreen(nextStep.screen);
      }
    } else {
      console.log("🏁 Tutorial complete!");
      completeTutorial();
    }
  }, [currentStepIndex, allSteps.length, router]);

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevStepIndex = currentStepIndex - 1;
      const prevStep = allSteps[prevStepIndex];

      // Check if previous step is on a different screen
      if (prevStep.navigateTo && prevStep.autoNavigate) {
        setIsNavigating(true);

        // Update state first
        setCurrentStepIndex(prevStepIndex);
        setCurrentScreen(prevStep.screen);

        // Navigate to the previous screen
        router.push(prevStep.navigateTo);

        setTimeout(() => {
          setIsNavigating(false);
        }, 1500);
      } else {
        setCurrentStepIndex(prevStepIndex);
        setCurrentScreen(prevStep.screen);
      }
    }
  }, [currentStepIndex, router]);

  const skipTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setCurrentScreen(null);
    setIsNavigating(false);
    localStorage.removeItem("tutorialState");
  }, []);

  // Emergency reset function
  const resetTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setCurrentScreen(null);
    setIsNavigating(false);
    localStorage.removeItem("tutorialState");
    console.log("Tutorial reset complete");
  }, []);

  const completeTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setCurrentScreen(null);
    setIsNavigating(false);
    localStorage.removeItem("tutorialState");
  }, []);

  const navigateToStep = useCallback(
    (stepId: string) => {
      const stepIndex = allSteps.findIndex((step) => step.id === stepId);
      if (stepIndex !== -1) {
        const step = allSteps[stepIndex];
        if (step.navigateTo) {
          setIsNavigating(true);

          // Update state first
          setCurrentStepIndex(stepIndex);
          setCurrentScreen(step.screen);

          // Navigate to the step's screen
          router.push(step.navigateTo);

          setTimeout(() => {
            setIsNavigating(false);
          }, 1500);
        } else {
          setCurrentStepIndex(stepIndex);
          setCurrentScreen(step.screen);
        }
      }
    },
    [router]
  );

  const isStepVisible = useCallback(
    (stepId: string) => {
      const step = allSteps.find((s) => s.id === stepId);
      return step ? step.screen === currentScreen : false;
    },
    [currentScreen]
  );

  const value: TutorialContextType = {
    isActive,
    currentStep,
    currentStepIndex,
    steps: allSteps,
    startTutorial,
    nextStep,
    previousStep,
    skipTutorial,
    completeTutorial,
    isStepVisible,
    navigateToStep,
    isNavigating,
    resetTutorial,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider");
  }
  return context;
}
