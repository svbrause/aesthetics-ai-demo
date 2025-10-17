"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { X, ChevronLeft, ChevronRight, Play, SkipForward } from "lucide-react";
import { useTutorial } from "@/contexts/TutorialContext";

interface TutorialOverlayProps {
  className?: string;
}

export function TutorialOverlay({ className = "" }: TutorialOverlayProps) {
  const {
    isActive,
    currentStep,
    currentStepIndex,
    steps,
    nextStep,
    previousStep,
    skipTutorial,
    completeTutorial,
    isNavigating,
    resetTutorial,
  } = useTutorial();

  const totalSteps = steps.length;

  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);
  const [popupPosition, setPopupPosition] = useState({
    x: 0,
    y: 0,
    finalPosition: "center" as string,
  });
  const [spotlightRect, setSpotlightRect] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Ensure we're on the client side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Emergency reset on component mount to clear any stuck tutorial state
  useEffect(() => {
    // Check if tutorial is stuck in an active state without a valid current step
    if (isActive && !currentStep) {
      console.log("Tutorial appears to be stuck, resetting...");
      resetTutorial();
    }
  }, [isActive, currentStep, resetTutorial]);

  // Find and highlight the target element
  useEffect(() => {
    if (!isActive || !currentStep) {
      console.log(
        "🔍 TutorialOverlay: Skipping element search - isActive:",
        isActive,
        "currentStep:",
        !!currentStep
      );
      setHighlightedElement(null);
      return;
    }

    console.log("🔍 TutorialOverlay: Starting element search");
    console.log("🔍 Current step details:", {
      id: currentStep.id,
      screen: currentStep.screen,
      target: currentStep.target,
      position: currentStep.position,
    });
    console.log("🔍 Current URL:", window.location.href);
    console.log("🔍 Document ready state:", document.readyState);

    const findTargetElement = () => {
      console.log("🔍 Looking for target element:", currentStep.target);

      const targetElement = document.querySelector(
        currentStep.target
      ) as HTMLElement;

      if (targetElement) {
        console.log("✅ Found target element:", targetElement);
        console.log("✅ Element details:", {
          tagName: targetElement.tagName,
          className: targetElement.className,
          id: targetElement.id,
          dataset: targetElement.dataset,
        });
        setHighlightedElement(targetElement);
        return true;
      } else {
        console.log("❌ Target element not found");
        console.log("❌ Looking for:", currentStep.target);
        console.log("❌ Current URL:", window.location.pathname);
        console.log(
          "❌ Available elements with data-tutorial:",
          Array.from(document.querySelectorAll("[data-tutorial]")).map(
            (el) => ({
              tagName: el.tagName,
              className: el.className,
              dataTutorial: el.getAttribute("data-tutorial"),
            })
          )
        );
        console.log(
          "❌ All elements with 'patient' in class:",
          Array.from(document.querySelectorAll("*"))
            .filter(
              (el) => el.className && String(el.className).includes("patient")
            )
            .map((el) => ({
              tagName: el.tagName,
              className: el.className,
              id: el.id,
            }))
        );
        return false;
      }
    };

    if (!findTargetElement()) {
      console.log("🔄 Retrying element search in 500ms...");
      const retryTimer = setTimeout(() => {
        console.log("🔄 Retry attempt...");
        if (!findTargetElement()) {
          console.log(
            "❌ Target element not found after retry:",
            currentStep.target
          );
          setHighlightedElement(null);
        }
      }, 500);

      return () => clearTimeout(retryTimer);
    }
  }, [isActive, currentStep]);

  // Calculate popup position when element is found
  useEffect(() => {
    if (highlightedElement && currentStep) {
      const rect = highlightedElement.getBoundingClientRect();
      setSpotlightRect({
        left: rect.left - 10,
        top: rect.top - 10,
        width: rect.width + 20,
        height: rect.height + 20,
      });

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popupWidth = Math.min(400, Math.max(300, viewportWidth - 40));
      const popupHeight = 200;
      const margin = 20;

      // Calculate smart positioning based on element position and tutorial step position preference
      let x, y, finalPosition;

      if (rect && rect.width > 0 && rect.height > 0) {
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const elementRight = rect.right;
        const elementLeft = rect.left;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // Smart positioning based on step position preference
        switch (currentStep.position) {
          case "top":
            x = Math.max(
              margin,
              Math.min(elementCenterX, viewportWidth - popupWidth - margin)
            );
            y = Math.max(margin, elementTop - popupHeight - 20);
            break;
          case "bottom":
            x = Math.max(
              margin,
              Math.min(elementCenterX, viewportWidth - popupWidth - margin)
            );
            y = Math.min(
              viewportHeight - popupHeight - margin,
              elementBottom + 20
            );
            break;
          case "left":
            x = Math.max(margin, elementLeft - popupWidth - 20);
            y = Math.max(
              margin,
              Math.min(elementCenterY, viewportHeight - popupHeight - margin)
            );
            break;
          case "right":
            x = Math.min(
              viewportWidth - popupWidth - margin,
              elementRight + 20
            );
            y = Math.max(
              margin,
              Math.min(elementCenterY, viewportHeight - popupHeight - margin)
            );
            break;
          default: // center
            x = Math.max(
              margin,
              Math.min(elementCenterX, viewportWidth - popupWidth - margin)
            );
            y = Math.max(
              margin,
              Math.min(elementCenterY, viewportHeight - popupHeight - margin)
            );
        }

        // Ensure popup doesn't overlap with the highlighted element
        const popupRight = x + popupWidth;
        const popupBottom = y + popupHeight;

        // Check for overlap and adjust position
        if (currentStep.position === "right" && x < elementRight + 20) {
          // Move to left side if right side overlaps
          x = Math.max(margin, elementLeft - popupWidth - 20);
        } else if (
          currentStep.position === "left" &&
          popupRight > elementLeft - 20
        ) {
          // Move to right side if left side overlaps
          x = Math.min(viewportWidth - popupWidth - margin, elementRight + 20);
        } else if (
          currentStep.position === "bottom" &&
          y < elementBottom + 20
        ) {
          // Move to top if bottom overlaps
          y = Math.max(margin, elementTop - popupHeight - 20);
        } else if (
          currentStep.position === "top" &&
          popupBottom > elementTop - 20
        ) {
          // Move to bottom if top overlaps
          y = Math.min(
            viewportHeight - popupHeight - margin,
            elementBottom + 20
          );
        }

        finalPosition = currentStep.position || "center";
      } else {
        // Fallback to screen center if element not found
        x = (viewportWidth - popupWidth) / 2;
        y = (viewportHeight - popupHeight) / 2;
        finalPosition = "center";
      }

      console.log("Smart popup positioning:", {
        x,
        y,
        viewportWidth,
        viewportHeight,
        popupWidth,
        popupHeight,
        elementRect: rect,
        position: currentStep.position,
        finalPosition,
      });

      setPopupPosition({ x, y, finalPosition });
    }
  }, [highlightedElement, currentStep]);

  // Handle window resize to recalculate popup position
  useEffect(() => {
    const handleResize = () => {
      if (highlightedElement && currentStep) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const popupWidth = Math.min(400, Math.max(300, viewportWidth - 40));
        const popupHeight = 200;

        const x = (viewportWidth - popupWidth) / 2;
        const y = (viewportHeight - popupHeight) / 2;
        const finalPosition = "center";

        setPopupPosition({ x, y, finalPosition });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [highlightedElement, currentStep]);

  // Add spotlight effect to the target element - NO darkening, only highlighting
  useEffect(() => {
    if (highlightedElement) {
      // Store original styles
      const originalStyles = {
        position: highlightedElement.style.position,
        zIndex: highlightedElement.style.zIndex,
        boxShadow: highlightedElement.style.boxShadow,
        border: highlightedElement.style.border,
        borderRadius: highlightedElement.style.borderRadius,
        outline: highlightedElement.style.outline,
        filter: highlightedElement.style.filter,
        opacity: highlightedElement.style.opacity,
      };

      // Apply ONLY highlighting styles - NO darkening or opacity changes
      highlightedElement.style.outline = "2px solid rgba(59, 130, 246, 0.8)";
      highlightedElement.style.outlineOffset = "2px";
      highlightedElement.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.3)";

      // Ensure NO darkening - remove any existing filters or opacity
      highlightedElement.style.filter = "none";
      highlightedElement.style.opacity = "1";

      // Cleanup function to restore original styles
      return () => {
        highlightedElement.style.position = originalStyles.position;
        highlightedElement.style.zIndex = originalStyles.zIndex;
        highlightedElement.style.boxShadow = originalStyles.boxShadow;
        highlightedElement.style.border = originalStyles.border;
        highlightedElement.style.borderRadius = originalStyles.borderRadius;
        highlightedElement.style.outline = originalStyles.outline;
        highlightedElement.style.outlineOffset = "";
        highlightedElement.style.filter = originalStyles.filter;
        highlightedElement.style.opacity = originalStyles.opacity;
      };
    }
  }, [highlightedElement]);

  // Don't render on server side to prevent hydration issues
  if (!isClient || !isActive || !currentStep) {
    return null;
  }

  // Show loading state during navigation
  if (isNavigating) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-white text-lg">Navigating to next step...</p>
      </div>
    );
  }

  return (
    <>
      {/* Very light overlay for subtle contrast */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)", // Much lighter
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* Cutout effect - creates a bright spot for the selected element */}
      {highlightedElement && (
        <div
          style={{
            position: "fixed",
            left: spotlightRect.left,
            top: spotlightRect.top,
            width: spotlightRect.width,
            height: spotlightRect.height,
            backgroundColor: "transparent",
            borderRadius: "8px",
            zIndex: 10000,
            pointerEvents: "none",
            // Create a cutout by using a large box-shadow that covers the rest of the screen
            // This makes the selected area appear brighter by removing the light overlay
            boxShadow: `
              0 0 0 9999px rgba(0, 0, 0, 0.2),
              0 0 0 2px rgba(59, 130, 246, 0.8),
              0 0 0 4px rgba(59, 130, 246, 0.3)
            `,
          }}
        />
      )}

      {/* Highlight border for the selected element */}
      {highlightedElement && (
        <div
          style={{
            position: "fixed",
            left: spotlightRect.left,
            top: spotlightRect.top,
            width: spotlightRect.width,
            height: spotlightRect.height,
            backgroundColor: "transparent",
            outline: "2px solid rgba(59, 130, 246, 0.8)",
            outlineOffset: "2px",
            borderRadius: "8px",
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.3)",
            zIndex: 10001,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Tutorial popup with dark theme */}
      {isActive && currentStep && (
        <div
          key={`tutorial-${currentStep.id}-${currentStepIndex}`}
          style={{
            position: "fixed",
            left: popupPosition.x,
            top: popupPosition.y,
            zIndex: 10002,
            maxWidth: `${Math.min(
              400,
              Math.max(300, window.innerWidth - 40)
            )}px`,
            width: `${Math.min(400, Math.max(300, window.innerWidth - 40))}px`,
            pointerEvents: "auto",
          }}
        >
          {/* Tooltip content */}
          <div
            style={{
              backgroundColor: "#1f2937",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              border: "1px solid #374151",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-300">
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTutorial}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-3 text-white">
              {currentStep.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              {currentStep.description}
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousStep}
                  disabled={currentStepIndex === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextStep}
                  className="text-gray-400 hover:text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetTutorial}
                  className="text-red-400 hover:text-red-300"
                >
                  Reset
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipTutorial}
                  className="text-gray-400 hover:text-white"
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  Skip Tutorial
                </Button>
                {currentStepIndex === totalSteps - 1 && (
                  <Button
                    onClick={completeTutorial}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
