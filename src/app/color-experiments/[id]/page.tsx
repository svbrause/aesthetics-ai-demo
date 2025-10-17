"use client";

import { PatientDetailScreenV2ColorExperiment } from "@/components/provider/PatientDetailScreenV2ColorExperiment";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock patient data - using the same data as the provider page
const mockPatients = {
  "1001": {
    id: "1001",
    name: "Sydney Adams",
    age: 28,
    email: "sydney.adams@email.com",
    phone: "(555) 123-4567",
    lastVisit: "2024-01-15",
    score: 78,
    findings: [
      { name: "Forehead Wrinkles", severity: "moderate", score: 70 },
      { name: "Dark Spots", severity: "mild", score: 60 },
      { name: "Nasolabial Folds", severity: "moderate", score: 75 },
      { name: "Marionette Lines", severity: "moderate", score: 72 },
      { name: "Red Spots", severity: "mild", score: 55 },
      { name: "Whiteheads", severity: "mild", score: 50 },
      { name: "Temporal Hollow", severity: "moderate", score: 68 },
      { name: "Under Eye Hollow", severity: "moderate", score: 70 },
      { name: "Upper Eye Hollow", severity: "mild", score: 62 },
      { name: "Lower Eyelid Sag", severity: "moderate", score: 65 },
      { name: "Mid Cheek Flattening", severity: "moderate", score: 72 },
      { name: "Crooked Nose", severity: "mild", score: 58 },
      { name: "Dorsal Hump", severity: "mild", score: 60 },
      { name: "Dry Lips", severity: "mild", score: 55 },
      { name: "Excess/Submental Fullness", severity: "moderate", score: 68 },
      { name: "Prejowl Sulcus", severity: "moderate", score: 70 },
      { name: "Retruded Chin", severity: "moderate", score: 72 },
      { name: "Masseter Hypertrophy", severity: "mild", score: 58 },
    ],
    frontImage: "/Sydney Adams Front.png",
    sideImage: "/Sydney Adams Side.png",
    scanDate: "December 15, 2024",
  },
};

// Color scheme definitions
const colorSchemes = {
  "1": {
    name: "Traditional Medspa",
    colors: {
      primary: "#8B7355", // Light wood brown
      secondary: "#A8D8B9", // Pastel teal
      accent: "#7FB069", // Plant green
      background: "#F5F5F0", // Off-white/beige
      surface: "#FFFFFF", // White
      text: "#2C2C2C", // Dark gray/black
      textSecondary: "#6B6B6B", // Medium gray
      border: "#D4C4A8", // Light wood brown
      success: "#7FB069", // Plant green
      warning: "#D4A574", // Warm brown
      error: "#C17B7B", // Muted red
    },
  },
};

export default function ColorExperimentPage() {
  const router = useRouter();
  const params = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [colorScheme, setColorScheme] = useState<any>(null);

  useEffect(() => {
    const experimentId = params.id as string;
    const patientId = "1001"; // Always use Sydney Adams for experiments

    // Get the color scheme
    const scheme = colorSchemes[experimentId as keyof typeof colorSchemes];
    if (!scheme) {
      router.push("/provider/patients");
      return;
    }

    // Get the patient data
    const foundPatient = mockPatients[patientId as keyof typeof mockPatients];
    if (!foundPatient) {
      router.push("/provider/patients");
      return;
    }

    setPatient(foundPatient);
    setColorScheme(scheme);
  }, [params.id, router]);

  const handleBack = () => {
    router.push("/provider/patients");
  };

  const handleOpenAreaAnalysis = (area: string) => {
    console.log("Open area analysis:", area);
  };

  if (!patient || !colorScheme) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading experiment...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colorScheme.colors.background,
        color: colorScheme.colors.text,
      }}
    >
      {/* Color scheme indicator */}
      <div
        className="fixed top-4 left-4 z-50 px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
        style={{
          backgroundColor: colorScheme.colors.surface,
          color: colorScheme.colors.text,
          border: `1px solid ${colorScheme.colors.border}`,
        }}
      >
        Color Experiment #{params.id}: {colorScheme.name}
      </div>

      {/* Apply color scheme as CSS custom properties */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --color-primary: ${colorScheme.colors.primary};
            --color-secondary: ${colorScheme.colors.secondary};
            --color-accent: ${colorScheme.colors.accent};
            --color-background: ${colorScheme.colors.background};
            --color-surface: ${colorScheme.colors.surface};
            --color-text: ${colorScheme.colors.text};
            --color-text-secondary: ${colorScheme.colors.textSecondary};
            --color-border: ${colorScheme.colors.border};
            --color-success: ${colorScheme.colors.success};
            --color-warning: ${colorScheme.colors.warning};
            --color-error: ${colorScheme.colors.error};
          }
        `,
        }}
      />

      {/* Patient Detail Screen with Color Scheme */}
      <div
        className="min-h-screen"
        style={{ backgroundColor: colorScheme.colors.background }}
      >
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className="text-3xl font-bold"
                    style={{ color: colorScheme.colors.text }}
                  >
                    {patient.name}
                  </h1>
                  <p
                    className="text-lg"
                    style={{ color: colorScheme.colors.textSecondary }}
                  >
                    Patient ID: {patient.id} | Age: {patient.age} | Score:{" "}
                    {patient.score}
                  </p>
                </div>
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: colorScheme.colors.primary,
                    color: colorScheme.colors.surface,
                  }}
                >
                  Back to Provider Portal
                </button>
              </div>
            </div>

            {/* Patient Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: colorScheme.colors.surface,
                  border: `1px solid ${colorScheme.colors.border}`,
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: colorScheme.colors.text }}
                >
                  Front View
                </h3>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    src={patient.frontImage}
                    alt="Front view"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: colorScheme.colors.surface,
                  border: `1px solid ${colorScheme.colors.border}`,
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: colorScheme.colors.text }}
                >
                  Side View
                </h3>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    src={patient.sideImage}
                    alt="Side view"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Analysis Findings */}
            <div
              className="p-6 rounded-lg mb-8"
              style={{
                backgroundColor: colorScheme.colors.surface,
                border: `1px solid ${colorScheme.colors.border}`,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: colorScheme.colors.text }}
              >
                Analysis Findings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patient.findings.map((finding: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: colorScheme.colors.background,
                      borderColor: colorScheme.colors.border,
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4
                        className="font-medium"
                        style={{ color: colorScheme.colors.text }}
                      >
                        {finding.name}
                      </h4>
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor:
                            finding.severity === "severe"
                              ? colorScheme.colors.error + "20"
                              : finding.severity === "moderate"
                              ? colorScheme.colors.warning + "20"
                              : colorScheme.colors.success + "20",
                          color:
                            finding.severity === "severe"
                              ? colorScheme.colors.error
                              : finding.severity === "moderate"
                              ? colorScheme.colors.warning
                              : colorScheme.colors.success,
                        }}
                      >
                        {finding.severity}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="flex-1 h-2 rounded-full mr-3"
                        style={{ backgroundColor: colorScheme.colors.border }}
                      >
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${finding.score}%`,
                            backgroundColor:
                              finding.severity === "severe"
                                ? colorScheme.colors.error
                                : finding.severity === "moderate"
                                ? colorScheme.colors.warning
                                : colorScheme.colors.success,
                          }}
                        ></div>
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: colorScheme.colors.textSecondary }}
                      >
                        {finding.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Information */}
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: colorScheme.colors.surface,
                border: `1px solid ${colorScheme.colors.border}`,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: colorScheme.colors.text }}
              >
                Patient Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: colorScheme.colors.text }}
                  >
                    Contact Information
                  </h3>
                  <p style={{ color: colorScheme.colors.textSecondary }}>
                    <strong>Email:</strong> {patient.email}
                  </p>
                  <p style={{ color: colorScheme.colors.textSecondary }}>
                    <strong>Phone:</strong> {patient.phone}
                  </p>
                </div>
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: colorScheme.colors.text }}
                  >
                    Visit Information
                  </h3>
                  <p style={{ color: colorScheme.colors.textSecondary }}>
                    <strong>Last Visit:</strong> {patient.lastVisit}
                  </p>
                  <p style={{ color: colorScheme.colors.textSecondary }}>
                    <strong>Scan Date:</strong> {patient.scanDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
