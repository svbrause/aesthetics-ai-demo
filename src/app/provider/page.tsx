"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProviderLoginScreen } from "@/components/provider/ProviderLoginScreen";
import { ProviderDashboard } from "@/components/provider/ProviderDashboard";
import { PatientManagementScreen } from "@/components/provider/PatientManagementScreen";
import { PatientDetailScreen } from "@/components/provider/PatientDetailScreen";
import { PatientDetailScreenV2 } from "@/components/provider/PatientDetailScreenV2";
import { PatientWelcomeScreen } from "@/components/provider/PatientWelcomeScreen";
import { AnalysisToolsScreen } from "@/components/provider/AnalysisToolsScreen";
import { AreaAnalysisPopup } from "@/components/provider/AreaAnalysisPopup";

type ProviderSceneType =
  | "login"
  | "dashboard"
  | "patient-management"
  | "patient-welcome"
  | "patient-detail"
  | "analysis-tools"
  | "area-analysis";

export default function ProviderApp() {
  const [currentScene, setCurrentScene] = useState<ProviderSceneType>("login");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedArea, setSelectedArea] = useState<string>("");

  // Reset scroll position when scene changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScene]);

  // Fix mobile Safari viewport height
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      const actualHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        "--actual-vh",
        `${actualHeight}px`
      );
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setViewportHeight);
    }

    window.addEventListener("load", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
      window.removeEventListener("load", setViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setViewportHeight);
      }
    };
  }, []);

  const handleLogin = () => {
    setCurrentScene("dashboard");
  };

  const handleViewPatients = () => {
    setCurrentScene("patient-management");
  };

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setCurrentScene("patient-detail");
  };

  const handleStartAnalysis = () => {
    setCurrentScene("patient-detail");
  };

  const handleBackToDashboard = () => {
    setCurrentScene("dashboard");
  };

  const handleBackToPatients = () => {
    setCurrentScene("patient-management");
  };

  const handleViewAnalysisTools = () => {
    setCurrentScene("analysis-tools");
  };

  const handleOpenAreaAnalysis = (area: string) => {
    setSelectedArea(area);
    setCurrentScene("area-analysis");
  };

  const handleCloseAreaAnalysis = () => {
    setCurrentScene("patient-detail");
  };

  const sceneVariants = {
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <main
      className="bg-black text-white overflow-hidden h-screen"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <AnimatePresence mode="wait">
        {currentScene === "login" && (
          <motion.div
            key="login"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <ProviderLoginScreen onLogin={handleLogin} />
          </motion.div>
        )}

        {currentScene === "dashboard" && (
          <motion.div
            key="dashboard"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <ProviderDashboard
              onViewPatients={handleViewPatients}
              onViewAnalysisTools={handleViewAnalysisTools}
              onSelectPatient={handleSelectPatient}
            />
          </motion.div>
        )}

        {currentScene === "patient-management" && (
          <motion.div
            key="patient-management"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <PatientManagementScreen
              onSelectPatient={handleSelectPatient}
              onBack={handleBackToDashboard}
            />
          </motion.div>
        )}

        {currentScene === "patient-welcome" && (
          <motion.div
            key="patient-welcome"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <PatientWelcomeScreen
              patient={selectedPatient}
              onStartAnalysis={handleStartAnalysis}
              onBack={handleBackToPatients}
            />
          </motion.div>
        )}

        {currentScene === "patient-detail" && (
          <motion.div
            key="patient-detail"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <PatientDetailScreenV2
              patient={selectedPatient}
              onBack={handleBackToPatients}
              onOpenAreaAnalysis={handleOpenAreaAnalysis}
            />
          </motion.div>
        )}

        {currentScene === "analysis-tools" && (
          <motion.div
            key="analysis-tools"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <AnalysisToolsScreen onBack={handleBackToDashboard} />
          </motion.div>
        )}

        {currentScene === "area-analysis" && (
          <motion.div
            key="area-analysis"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <AreaAnalysisPopup
              area={selectedArea}
              patient={selectedPatient}
              onClose={handleCloseAreaAnalysis}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
