"use client";

import { PatientDetailScreenV2Refactored } from "@/components/provider/PatientDetailScreenV2Refactored";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProvider } from "@/contexts/ProviderContext";

interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  lastVisit: string;
  score: number;
  findings: Array<{
    name: string;
    severity: "mild" | "moderate" | "severe";
    score: number;
  }>;
  frontImage: string;
  sideImage: string;
  scanDate: string;
  airtableRecordId: string;
  provider: string;
  status: "active" | "inactive" | "pending";
  reviewStatus: string;
  color: "blue" | "purple" | "green" | "red" | "yellow";
}

export default function ProviderLoginPatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { provider } = useProvider();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!provider) {
      router.push("/provider-login");
      return;
    }

    const patientId = params.patient_id as string;
    if (patientId) {
      fetchPatient(patientId);
    }
  }, [params.patient_id, provider, router]);

  const fetchPatient = async (patientId: string) => {
    try {
      setLoading(true);
      setError("");

      // Fetch the specific patient directly
      const response = await fetch(
        `/api/provider-patient/${patientId}?providerCode=${provider?.code}&debug=true`
      );
      const data = await response.json();

      if (data.success) {
        // Transform the patient data to match the expected format
        const transformedPatient = transformPatientData(data.patient);
        setPatient(transformedPatient);
      } else {
        setError(data.error || "Failed to fetch patient data");
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      setError("Failed to load patient data");
    } finally {
      setLoading(false);
    }
  };

  const transformPatientData = (airtablePatient: any) => {
    // Transform findings from Airtable format to the expected format
    let transformedFindings: Array<{
      name: string;
      severity: "mild" | "moderate" | "severe";
      score: number;
    }> = [];

    // If findings are just strings, convert them to the expected object format
    if (
      Array.isArray(airtablePatient.findings) &&
      airtablePatient.findings.length > 0
    ) {
      if (typeof airtablePatient.findings[0] === "string") {
        transformedFindings = (airtablePatient.findings as string[]).map(
          (finding: string) => ({
            name: finding,
            severity: "moderate" as const, // Default severity
            score: Math.max(60, 100 - Math.random() * 40), // Random score between 60-100
          })
        );
      } else {
        // If already in object format, ensure proper typing
        transformedFindings = airtablePatient.findings.map((finding: any) => ({
          name: finding.name,
          severity:
            (finding.severity as "mild" | "moderate" | "severe") ||
            ("moderate" as const),
          score: finding.score || 70,
        }));
      }
    }

    return {
      ...airtablePatient,
      findings: transformedFindings,
      color: "blue" as const, // Default color
      status:
        (airtablePatient.status as "active" | "inactive" | "pending") ||
        ("active" as const),
    };
  };

  const handleBack = () => {
    router.push("/provider-login/patients");
  };

  const handleOpenAreaAnalysis = (area: string) => {
    console.log("Open area analysis:", area);
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen medspa-new-theme"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 medspa-primary-border mx-auto mb-4"></div>
          <p className="medspa-text-on-secondary">Loading patient...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center h-screen medspa-new-theme"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold medspa-text-on-primary mb-2">
            Error Loading Patient
          </h2>
          <p className="medspa-text-on-secondary mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 medspa-primary-bg medspa-primary-hover medspa-text-on-primary rounded-lg transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div
        className="flex items-center justify-center h-screen medspa-new-theme"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        <div className="text-center">
          <div className="medspa-text-on-secondary mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold medspa-text-on-primary mb-2">
            Patient Not Found
          </h2>
          <p className="medspa-text-on-secondary mb-4">
            This patient is not in your patient list.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 medspa-primary-bg medspa-primary-hover medspa-text-on-primary rounded-lg transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="medspa-new-theme">
      <PatientDetailScreenV2Refactored
        patient={patient}
        onBack={handleBack}
        onOpenAreaAnalysis={handleOpenAreaAnalysis}
      />
    </div>
  );
}
