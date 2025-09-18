"use client";

import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

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
    router.push("/patient-selection");
  };

  return (
    <main
      className="overflow-hidden h-screen"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <WelcomeScreen onBegin={handleBegin} />
    </main>
  );
}
