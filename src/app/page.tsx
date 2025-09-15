"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { PatientSelection } from "@/components/PatientSelection";
import { PhotoUpload } from "@/components/PhotoUpload";
import { ThreeSlideAnalysisScreen } from "@/components/ThreeSlideAnalysisScreen";
import { AnalysisScreen } from "@/components/AnalysisScreen";
import { Questionnaire } from "@/components/Questionnaire";
import { JourneyScreen } from "@/components/JourneyScreen";
import { ValueScreen } from "@/components/ValueScreen";
import { UserAnswers, PatientType } from "@/types";

type SceneType =
  | "welcome"
  | "patient-selection"
  | "photo-upload"
  | "questionnaire"
  | "analysis-loading"
  | "three-slide-analysis"
  | "detailed-analysis"
  | "journey"
  | "value";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<SceneType>("welcome");
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null
  );
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(
    {} as UserAnswers
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Reset scroll position when scene changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScene]);

  // Fix mobile Safari viewport height
  useEffect(() => {
    const setViewportHeight = () => {
      // Get the actual viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      // Additional fix for mobile Safari
      const actualHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        "--actual-vh",
        `${actualHeight}px`
      );
    };

    // Set initial height
    setViewportHeight();

    // Handle resize events
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    // Handle visual viewport changes (mobile Safari)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setViewportHeight);
    }

    // Set height on load
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

  const handleBegin = () => {
    setCurrentScene("patient-selection");
  };

  const handlePatientSelect = (patient: PatientType) => {
    setSelectedPatient(patient);
    // Set the appropriate photo based on selected patient
    if (patient === "sydney") {
      setUserPhoto("/Sydney Adams Front.jpg");
    } else {
      setUserPhoto("/Chelsea Perry Front.jpg");
    }
    setCurrentScene("questionnaire");
  };

  const handlePhotoSelect = (photoUrl: string) => {
    setUserPhoto(photoUrl);
  };

  const handlePhotoNext = () => {
    setCurrentScene("questionnaire");
  };

  const handleQuestionnaireComplete = (answers: UserAnswers) => {
    setUserAnswers(answers);
    setCurrentScene("analysis-loading");
  };

  const handleAnalysisLoadingComplete = () => {
    setCurrentScene("three-slide-analysis");
  };

  const handleMoreInfo = (category: string) => {
    setSelectedCategory(category);
    setCurrentScene("detailed-analysis");
  };

  const handleDetailedAnalysisBack = () => {
    setCurrentScene("three-slide-analysis");
  };

  const handleViewJourney = () => {
    setCurrentScene("journey");
  };

  const handleViewValue = () => {
    setCurrentScene("value");
  };

  const handleRestart = () => {
    setCurrentScene("welcome");
    setSelectedPatient(null);
    setUserPhoto("");
    setUserAnswers({} as UserAnswers);
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
        height: "100dvh",
        minHeight: "100dvh",
        maxHeight: "100dvh",
      }}
    >
      <AnimatePresence mode="wait">
        {currentScene === "welcome" && (
          <motion.div
            key="welcome"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <WelcomeScreen onBegin={handleBegin} />
          </motion.div>
        )}

        {currentScene === "patient-selection" && (
          <motion.div
            key="patient-selection"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <PatientSelection onPatientSelect={handlePatientSelect} />
          </motion.div>
        )}

        {currentScene === "photo-upload" && (
          <motion.div
            key="photo-upload"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <PhotoUpload
              onPhotoSelect={handlePhotoSelect}
              onNext={handlePhotoNext}
            />
          </motion.div>
        )}

        {currentScene === "questionnaire" && (
          <motion.div
            key="questionnaire"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          </motion.div>
        )}

        {currentScene === "analysis-loading" && (
          <motion.div
            key="analysis-loading"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <AnalysisScreen
              photoUrl={userPhoto}
              onComplete={handleAnalysisLoadingComplete}
              onViewJourney={handleViewJourney}
              showResults={false}
            />
          </motion.div>
        )}

        {currentScene === "three-slide-analysis" && (
          <motion.div
            key="three-slide-analysis"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <ThreeSlideAnalysisScreen
              photoUrl={userPhoto}
              selectedPatient={selectedPatient}
              onMoreInfo={handleMoreInfo}
              onViewJourney={handleViewJourney}
            />
          </motion.div>
        )}

        {currentScene === "detailed-analysis" && (
          <motion.div
            key="detailed-analysis"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <AnalysisScreen
              photoUrl={userPhoto}
              onComplete={handleDetailedAnalysisBack}
              onViewJourney={handleViewJourney}
              showResults={true}
              selectedCategory={selectedCategory}
            />
          </motion.div>
        )}

        {currentScene === "journey" && (
          <motion.div
            key="journey"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <JourneyScreen
              userAnswers={userAnswers}
              onViewValue={handleViewValue}
            />
          </motion.div>
        )}

        {currentScene === "value" && (
          <motion.div
            key="value"
            variants={sceneVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <ValueScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
