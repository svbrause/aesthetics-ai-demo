"use client";

import { PatientDetailScreenV2Refactored } from "@/components/provider/PatientDetailScreenV2Refactored";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mock patient data - same as the original
const mockPatient = {
  id: "1001",
  name: "Sydney Adams",
  age: 28,
  email: "sydney.adams@email.com",
  phone: "(555) 123-4567",
  lastVisit: "2024-01-15",
  status: "active" as const,
  score: 78,
  color: "blue" as const,
  findings: [
    { name: "Forehead Wrinkles", severity: "moderate" as const, score: 70 },
    { name: "Dark Spots", severity: "mild" as const, score: 25 },
    { name: "Nasolabial Folds", severity: "severe" as const, score: 85 },
    { name: "Marionette Lines", severity: "moderate" as const, score: 72 },
    { name: "Red Spots", severity: "mild" as const, score: 30 },
    { name: "Whiteheads", severity: "mild" as const, score: 45 },
    { name: "Temporal Hollow", severity: "severe" as const, score: 88 },
    { name: "Under Eye Hollow", severity: "moderate" as const, score: 70 },
    { name: "Upper Eye Hollow", severity: "mild" as const, score: 35 },
    { name: "Lower Eyelid Sag", severity: "mild" as const, score: 50 },
    { name: "Mid Cheek Flattening", severity: "severe" as const, score: 82 },
    { name: "Crooked Nose", severity: "mild" as const, score: 28 },
    { name: "Dorsal Hump", severity: "mild" as const, score: 40 },
    { name: "Dry Lips", severity: "mild" as const, score: 32 },
    {
      name: "Excess/Submental Fullness",
      severity: "moderate" as const,
      score: 68,
    },
    { name: "Prejowl Sulcus", severity: "severe" as const, score: 90 },
    { name: "Retruded Chin", severity: "moderate" as const, score: 72 },
    { name: "Masseter Hypertrophy", severity: "mild" as const, score: 38 },
  ],
  frontImage: "/Sydney Adams Front.png",
  sideImage: "/Sydney Adams Side.png",
  scanDate: "December 15, 2024",
};

export default function TestGoldThemePage() {
  const router = useRouter();

  // Apply gold theme immediately (before first render)
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("light", "dark", "gold-theme");
    document.documentElement.classList.add("gold-theme");
  }

  // Apply gold theme on mount
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "gold-theme");
    document.documentElement.classList.add("gold-theme");

    // Force apply gold theme styles after component mounts
    const applyGoldThemeStyles = () => {
      console.log("🔧 Applying gold theme styles...");

      // Fix area headings - more specific selectors
      const areaHeadings = document.querySelectorAll(
        'div[class*="bg-gradient-to-b from-gray-600 to-gray-500"], div[class*="bg-gradient-to-b from-gray-800 to-gray-700"]'
      );
      console.log("Found area headings:", areaHeadings.length);
      areaHeadings.forEach((heading) => {
        (heading as HTMLElement).style.background =
          "linear-gradient(to bottom, #1a1a1a, #262626) !important";
        console.log("Applied dark gray to area heading");
      });

      // Fix progress bars - try multiple selectors
      const progressBars1 = document.querySelectorAll(
        'div[style*="background:linear-gradient(to right, #374151, #6b7280)"]'
      );
      const progressBars2 = document.querySelectorAll(".severity-scale-bar");
      const progressBars3 = document.querySelectorAll(
        'div[class*="severity-scale"]'
      );

      console.log("Found progress bars (method 1):", progressBars1.length);
      console.log("Found progress bars (method 2):", progressBars2.length);
      console.log("Found progress bars (method 3):", progressBars3.length);

      [...progressBars1, ...progressBars2, ...progressBars3].forEach((bar) => {
        (bar as HTMLElement).style.background =
          "linear-gradient(90deg, #6b5a47 0%, #8b6f4a 25%, #aa8960 50%, #c49d6b 75%, #d4b876 100%) !important";
        console.log("Applied gold gradient to progress bar");
      });

      // Fix purple colors in findings shortlist - try multiple approaches
      const purpleElements1 = document.querySelectorAll(
        'div[class*="from-purple-500"], span[class*="text-purple"], button[class*="text-purple"], div[class*="border-purple"]'
      );
      const purpleElements2 = document.querySelectorAll('[class*="purple"]');
      const purpleElements3 = document.querySelectorAll("*");

      console.log("Found purple elements (method 1):", purpleElements1.length);
      console.log("Found purple elements (method 2):", purpleElements2.length);

      // Filter purple elements from all elements
      const allPurpleElements = Array.from(purpleElements3).filter((el) => {
        const htmlEl = el as HTMLElement;
        return (
          (htmlEl.className &&
            typeof htmlEl.className === "string" &&
            htmlEl.className.includes("purple")) ||
          (htmlEl.style.color && htmlEl.style.color.includes("purple")) ||
          (htmlEl.style.background &&
            htmlEl.style.background.includes("purple"))
        );
      });
      console.log(
        "Found purple elements (method 3):",
        allPurpleElements.length
      );

      [...purpleElements1, ...purpleElements2, ...allPurpleElements].forEach(
        (element) => {
          const htmlElement = element as HTMLElement;
          console.log("Processing purple element:", htmlElement.className);

          // Fix background gradients
          if (htmlElement.className.includes("from-purple-500")) {
            htmlElement.style.background =
              "linear-gradient(to right, rgba(170, 137, 96, 0.1), rgba(196, 157, 107, 0.1)) !important";
            console.log("Fixed purple background");
          }

          // Fix text colors
          if (htmlElement.classList.contains("text-purple-100")) {
            htmlElement.style.color = "#f0d4a3 !important";
            console.log("Fixed purple-100 text");
          } else if (htmlElement.classList.contains("text-purple-300")) {
            htmlElement.style.color = "#c49d6b !important";
            console.log("Fixed purple-300 text");
          } else if (htmlElement.classList.contains("text-purple-400")) {
            htmlElement.style.color = "#c49d6b !important";
            console.log("Fixed purple-400 text");
          }

          // Fix border colors
          if (htmlElement.className.includes("border-purple-400/30")) {
            htmlElement.style.borderColor =
              "rgba(170, 137, 96, 0.3) !important";
            console.log("Fixed purple border 30%");
          } else if (htmlElement.className.includes("border-purple-400/50")) {
            htmlElement.style.borderColor =
              "rgba(170, 137, 96, 0.5) !important";
            console.log("Fixed purple border 50%");
          }
        }
      );

      // Fix blue colors - try multiple approaches
      const blueElements1 = document.querySelectorAll(
        'button[class*="from-blue-600"], button[class*="to-purple-600"]'
      );
      const blueElements2 = document.querySelectorAll('[class*="blue"]');
      const blueElements3 = document.querySelectorAll("*");

      console.log("Found blue elements (method 1):", blueElements1.length);
      console.log("Found blue elements (method 2):", blueElements2.length);

      // Filter blue elements from all elements
      const allBlueElements = Array.from(blueElements3).filter((el) => {
        const htmlEl = el as HTMLElement;
        return (
          (htmlEl.className &&
            typeof htmlEl.className === "string" &&
            htmlEl.className.includes("blue")) ||
          (htmlEl.style.color && htmlEl.style.color.includes("blue")) ||
          (htmlEl.style.background && htmlEl.style.background.includes("blue"))
        );
      });
      console.log("Found blue elements (method 3):", allBlueElements.length);

      [...blueElements1, ...blueElements2, ...allBlueElements].forEach(
        (element) => {
          const htmlElement = element as HTMLElement;
          if (
            (htmlElement.className &&
              typeof htmlElement.className === "string" &&
              htmlElement.className.includes("from-blue-600")) ||
            (htmlElement.className &&
              typeof htmlElement.className === "string" &&
              htmlElement.className.includes("to-purple-600"))
          ) {
            htmlElement.style.background =
              "linear-gradient(to right, #aa8960, #c49d6b) !important";
            console.log("Applied gold colors to blue element");
          }
        }
      );

      // Dim finding card photos slightly
      const findingImages = document.querySelectorAll(
        'img[src*="/Images/Findings/"]'
      );
      console.log("Found finding images:", findingImages.length);
      findingImages.forEach((img) => {
        (img as HTMLElement).style.filter = "brightness(0.7) contrast(0.8)";
        console.log("Applied dimming to finding image");
      });

      // Apply gold theme to treatment tab elements - more comprehensive
      const allElements = document.querySelectorAll("*");
      console.log("Found all elements:", allElements.length);

      allElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        if (
          htmlElement.className &&
          typeof htmlElement.className === "string"
        ) {
          // Convert red colors to gold
          if (
            htmlElement.className.includes("text-red-") ||
            htmlElement.className.includes("bg-red-") ||
            htmlElement.className.includes("border-red-")
          ) {
            if (htmlElement.className.includes("text-red-")) {
              htmlElement.style.color = "#c49d6b !important";
            }
            if (htmlElement.className.includes("bg-red-")) {
              htmlElement.style.background =
                "rgba(170, 137, 96, 0.2) !important";
            }
            if (htmlElement.className.includes("border-red-")) {
              htmlElement.style.borderColor =
                "rgba(170, 137, 96, 0.3) !important";
            }
            console.log("Applied gold colors to red element");
          }

          // Convert blue colors to gold
          if (
            htmlElement.className.includes("text-blue-") ||
            htmlElement.className.includes("bg-blue-") ||
            htmlElement.className.includes("border-blue-")
          ) {
            if (htmlElement.className.includes("text-blue-")) {
              htmlElement.style.color = "#c49d6b !important";
            }
            if (htmlElement.className.includes("bg-blue-")) {
              htmlElement.style.background =
                "rgba(170, 137, 96, 0.2) !important";
            }
            if (htmlElement.className.includes("border-blue-")) {
              htmlElement.style.borderColor =
                "rgba(170, 137, 96, 0.3) !important";
            }
            console.log("Applied gold colors to blue element");
          }

          // Convert purple colors to gold
          if (
            htmlElement.className.includes("text-purple-") ||
            htmlElement.className.includes("bg-purple-") ||
            htmlElement.className.includes("border-purple-")
          ) {
            if (htmlElement.className.includes("text-purple-")) {
              htmlElement.style.color = "#c49d6b !important";
            }
            if (htmlElement.className.includes("bg-purple-")) {
              htmlElement.style.background =
                "rgba(170, 137, 96, 0.2) !important";
            }
            if (htmlElement.className.includes("border-purple-")) {
              htmlElement.style.borderColor =
                "rgba(170, 137, 96, 0.3) !important";
            }
            console.log("Applied gold colors to purple element");
          }

          // Convert pink colors to gold
          if (
            htmlElement.className.includes("text-pink-") ||
            htmlElement.className.includes("bg-pink-") ||
            htmlElement.className.includes("border-pink-")
          ) {
            if (htmlElement.className.includes("text-pink-")) {
              htmlElement.style.color = "#c49d6b !important";
            }
            if (htmlElement.className.includes("bg-pink-")) {
              htmlElement.style.background =
                "rgba(170, 137, 96, 0.2) !important";
            }
            if (htmlElement.className.includes("border-pink-")) {
              htmlElement.style.borderColor =
                "rgba(170, 137, 96, 0.3) !important";
            }
            console.log("Applied gold colors to pink element");
          }

          // Convert gradients to gold
          if (
            htmlElement.className.includes("from-red-") ||
            htmlElement.className.includes("to-red-") ||
            htmlElement.className.includes("from-blue-") ||
            htmlElement.className.includes("to-blue-") ||
            htmlElement.className.includes("from-purple-") ||
            htmlElement.className.includes("to-purple-") ||
            htmlElement.className.includes("from-pink-") ||
            htmlElement.className.includes("to-pink-")
          ) {
            htmlElement.style.background =
              "linear-gradient(to right, #aa8960, #c49d6b) !important";
            console.log("Applied gold gradient to element");
          }
        }
      });

      console.log("✅ Gold theme styles applied");
    };

    // Apply styles immediately
    applyGoldThemeStyles();

    // Apply styles after a short delay to catch any dynamically rendered elements
    const timeoutId = setTimeout(applyGoldThemeStyles, 1000);

    // Apply styles after a longer delay to catch all elements
    const timeoutId2 = setTimeout(applyGoldThemeStyles, 3000);

    // Apply styles after an even longer delay
    const timeoutId3 = setTimeout(applyGoldThemeStyles, 5000);

    // Apply styles after a very long delay to catch everything
    const timeoutId4 = setTimeout(applyGoldThemeStyles, 10000);

    // Also use MutationObserver to watch for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      let shouldApply = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          shouldApply = true;
        }
      });
      if (shouldApply) {
        setTimeout(applyGoldThemeStyles, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup on unmount - revert to dark theme
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      clearTimeout(timeoutId4);
      observer.disconnect();
      document.documentElement.classList.remove("light", "dark", "gold-theme");
      document.documentElement.classList.add("dark");
    };
  }, []);

  const handleBack = () => {
    router.push("/provider/patients");
  };

  const handleOpenAreaAnalysis = (area: string) => {
    console.log("Open area analysis:", area);
  };

  return (
    <div className="gold-theme">
      {/* Theme Toggle - Fixed position for easy access */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <PatientDetailScreenV2Refactored
        patient={mockPatient}
        onBack={handleBack}
        onOpenAreaAnalysis={handleOpenAreaAnalysis}
      />
    </div>
  );
}
