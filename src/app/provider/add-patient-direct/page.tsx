"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Plus, Check } from "lucide-react";

export default function AddPatientDirectPage() {
  const router = useRouter();
  const [patientData, setPatientData] = useState({
    id: "1007",
    name: "",
    age: 35,
    email: "",
    phone: "",
    lastVisit: new Date().toISOString().split("T")[0],
    score: 75,
    findings: [
      "Forehead Wrinkles",
      "Glabella Wrinkles",
      "Dark Spots",
      "Red Spots",
      "Marionette Lines",
      "Temporal Hollow",
      "Brow Asymmetry",
      "Crooked Nose",
      "Dorsal Hump",
      "Over-Rotated",
      "Nasal Tip Too Wide",
      "Thin Lips",
      "Lacking Philtral Column",
      "Long Philtral Column",
      "Dry Lips",
      "Lip Thinning When Smiling",
      "Retruded Chin",
    ],
    frontImage: "",
    sideImage: "",
    scanDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    airtableRecordId: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFindingChange = (index: number, value: string) => {
    const newFindings = [...patientData.findings];
    newFindings[index] = value;
    setPatientData((prev) => ({
      ...prev,
      findings: newFindings,
    }));
  };

  const addFinding = () => {
    setPatientData((prev) => ({
      ...prev,
      findings: [...prev.findings, ""],
    }));
  };

  const removeFinding = (index: number) => {
    const newFindings = patientData.findings.filter((_, i) => i !== index);
    setPatientData((prev) => ({
      ...prev,
      findings: newFindings,
    }));
  };

  const createPatient = async () => {
    if (!patientData.name || !patientData.id) {
      alert("Please fill in patient name and ID");
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch("/api/create-patient-direct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push(`/provider/patient/${patientData.id}`);
        }, 2000);
      } else {
        throw new Error("Failed to create patient");
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleBack = () => {
    router.push("/provider");
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Patient Created!
          </h2>
          <p className="text-gray-300 mb-4">Redirecting to patient view...</p>
          <p className="text-sm text-gray-400">Patient ID: {patientData.id}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2">
            Add Patient Directly
          </h1>
          <p className="text-gray-300">
            Create a patient record without complex API calls
          </p>
        </motion.div>

        <Card className="p-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={patientData.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1007"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter patient name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={patientData.age}
                  onChange={(e) =>
                    handleInputChange("age", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={patientData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="patient@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={patientData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Analysis Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={patientData.score}
                  onChange={(e) =>
                    handleInputChange("score", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Findings */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Findings</h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addFinding}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Finding
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {patientData.findings.map((finding, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={finding}
                      onChange={(e) =>
                        handleFindingChange(index, e.target.value)
                      }
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter finding"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFinding(index)}
                      className="px-2"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Front Image URL
                </label>
                <input
                  type="url"
                  value={patientData.frontImage}
                  onChange={(e) =>
                    handleInputChange("frontImage", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Side Image URL
                </label>
                <input
                  type="url"
                  value={patientData.sideImage}
                  onChange={(e) =>
                    handleInputChange("sideImage", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={createPatient}
              disabled={isCreating || !patientData.name || !patientData.id}
              className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Patient...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Patient
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
