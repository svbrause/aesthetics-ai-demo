import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Camera,
  FileText,
  Plus,
  Trash2,
  Edit,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Target,
  Eye,
  EyeOff,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Patient, Finding } from "@/types/patientTypes";
import { analysisAreas } from "@/data/analysisData";

// Utility functions for styling (matching the main analysis screen)
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "severe":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "moderate":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "mild":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getScoreColorClasses = (score: number) => {
  if (score >= 90) return "from-green-500 to-emerald-500";
  if (score >= 80) return "from-yellow-300 to-yellow-400";
  if (score >= 70) return "from-orange-300 to-yellow-300";
  if (score >= 60) return "from-red-400 to-orange-400";
  if (score >= 50) return "from-red-500 to-red-400";
  if (score >= 40) return "from-red-600 to-red-500";
  return "from-red-700 to-red-600";
};

// Removed image functions since photos are not needed

interface EditPatientPopupProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPatient: Patient) => void;
}

interface PatientScan {
  id: string;
  date: string;
  type: "front" | "side" | "both";
  images: {
    front?: string;
    side?: string;
  };
  findings: string[];
  notes?: string;
}

export function EditPatientPopup({
  patient,
  isOpen,
  onClose,
  onSave,
}: EditPatientPopupProps) {
  const [activeTab, setActiveTab] = useState<"general" | "scans" | "findings">(
    "general"
  );
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);
  const [providerFindings, setProviderFindings] = useState<Finding[]>([]);
  const [newFinding, setNewFinding] = useState({
    name: "",
    description: "",
    area: "",
    severity: "mild" as "mild" | "moderate" | "severe",
  });
  const [showAddFindingForm, setShowAddFindingForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hiddenFindings, setHiddenFindings] = useState<Set<string>>(
    new Set(patient.hiddenFindings || [])
  );
  const [showHiddenFindings, setShowHiddenFindings] = useState(false);

  // Mock scans data - in real app this would come from props or API
  const [scans, setScans] = useState<PatientScan[]>([
    {
      id: "1",
      date: patient.scanDate,
      type: "both",
      images: {
        front: patient.frontImage,
        side: patient.sideImage,
      },
      findings: patient.findings,
      notes: "Initial consultation scan",
    },
  ]);

  const handleSave = () => {
    // Keep all findings but mark hidden ones in metadata
    // In a real app, you might want to store hidden status separately
    const updatedPatient = {
      ...editedPatient,
      findings: [...patient.findings, ...providerFindings.map((f) => f.name)],
      // Store hidden findings metadata (in a real app, this would be in a separate field)
      hiddenFindings: Array.from(hiddenFindings),
    };
    onSave(updatedPatient);
    onClose();
  };

  const handleAddProviderFinding = () => {
    console.log("Attempting to add finding:", newFinding); // Debug log
    if (newFinding.name.trim() && newFinding.area) {
      const finding: Finding = {
        name: newFinding.name,
        score: 0, // No score for provider-identified findings
        severity: newFinding.severity,
        description: newFinding.description,
        commonality: 0,
        ageGroup: "",
        causes: [],
        symptoms: [],
        beforeAfter: [],
        treatments: [],
        educational: "",
        area: newFinding.area, // Add area to the finding
      };
      console.log("Created finding object:", finding); // Debug log
      setProviderFindings((prev) => {
        const newFindings = [...prev, finding];
        console.log("Updated providerFindings:", newFindings); // Debug log
        return newFindings;
      });
      setNewFinding({ name: "", description: "", area: "", severity: "mild" });
      setShowAddFindingForm(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
      console.log("Successfully added new finding:", finding); // Debug log
    } else {
      console.log("Validation failed:", {
        name: newFinding.name,
        area: newFinding.area,
        nameTrimmed: newFinding.name.trim(),
        hasArea: !!newFinding.area,
      }); // Debug log
    }
  };

  const handleRemoveProviderFinding = (index: number) => {
    setProviderFindings(providerFindings.filter((_, i) => i !== index));
  };

  const handleHideAIFinding = (findingName: string) => {
    setHiddenFindings((prev) => new Set([...prev, findingName]));
    console.log(`Hidden AI finding: ${findingName}`); // Debug log
  };

  const handleShowFinding = (findingName: string) => {
    setHiddenFindings((prev) => {
      const newSet = new Set(prev);
      newSet.delete(findingName);
      return newSet;
    });
    console.log(`Showed finding: ${findingName}`); // Debug log
  };

  // Group current findings by area (matching the analysis screen logic)
  const getFindingsByArea = () => {
    const findingsByArea: { [key: string]: { area: any; findings: any[] } } =
      {};

    // Group AI-detected findings - show all findings that are in patient.findings (including hidden ones)
    analysisAreas.forEach((area) => {
      const patientFindingsInArea = area.findings.filter((finding) =>
        patient.findings.includes(finding.name)
      );

      if (patientFindingsInArea.length > 0) {
        findingsByArea[area.id] = {
          area: area,
          findings: patientFindingsInArea.map((finding) => ({
            ...finding,
            isProviderIdentified: false,
          })),
        };
      }
    });

    // Group provider-identified findings
    providerFindings.forEach((finding) => {
      if (finding.area) {
        // Find the area by name (case-insensitive)
        const area = analysisAreas.find(
          (a) => a.name.toLowerCase() === finding.area.toLowerCase()
        );
        if (area) {
          if (!findingsByArea[area.id]) {
            findingsByArea[area.id] = {
              area: area,
              findings: [],
            };
          }
          // Add provider findings at the beginning of the array (top of list)
          findingsByArea[area.id].findings.unshift({
            ...finding,
            isProviderIdentified: true,
          });
        } else {
          // If area not found, create a generic area entry
          console.warn(`Area "${finding.area}" not found in analysisAreas`);
        }
      }
    });

    return Object.values(findingsByArea);
  };

  const tabs = [
    { id: "general", label: "General Info", icon: User },
    { id: "scans", label: "Scans", icon: Camera },
    { id: "findings", label: "Findings", icon: FileText },
  ] as const;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-white">Edit Patient</h2>
              <p className="text-gray-400 text-sm mt-1">
                {patient.name} • ID: #{patient.id}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {activeTab === "general" && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-300"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={editedPatient.name}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            name: e.target.value,
                          })
                        }
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Enter patient name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-300"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedPatient.email || ""}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            email: e.target.value,
                          })
                        }
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="patient@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-300"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={editedPatient.phone || ""}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            phone: e.target.value,
                          })
                        }
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="dob"
                        className="text-sm font-medium text-gray-300"
                      >
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={editedPatient.dateOfBirth || ""}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            dateOfBirth: e.target.value,
                          })
                        }
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="notes"
                      className="text-sm font-medium text-gray-300"
                    >
                      Additional Notes
                    </Label>
                    <textarea
                      id="notes"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white min-h-[100px] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Add any additional notes about the patient..."
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "scans" && (
                <motion.div
                  key="scans"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Patient Scans
                    </h3>
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Scan
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {scans.map((scan, index) => (
                      <Card
                        key={scan.id}
                        className="p-4 bg-gray-800/50 border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-white font-medium">
                                Scan #{index + 1}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                {scan.type === "both"
                                  ? "Front & Side"
                                  : scan.type}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">
                              Date: {new Date(scan.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-400 text-sm mb-3">
                              Findings: {scan.findings.length} detected
                            </p>
                            {scan.notes && (
                              <p className="text-gray-300 text-sm">
                                {scan.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "findings" && (
                <motion.div
                  key="findings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Patient Findings
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Current findings grouped by area. Add new findings as
                        needed. ({providerFindings.length} provider-added,{" "}
                        {hiddenFindings.size} hidden)
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowAddFindingForm(!showAddFindingForm)}
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Finding
                    </Button>
                  </div>

                  {/* Success Message */}
                  {showSuccessMessage && (
                    <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                      ✅ Successfully added new finding!
                    </div>
                  )}

                  {/* Add New Finding Form - Now at the top */}
                  {showAddFindingForm && (
                    <Card className="p-4 bg-gray-800/50 border-gray-700 mb-6">
                      <h4 className="text-md font-medium text-white mb-4">
                        Add New Finding
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">
                            Finding Name
                          </Label>
                          <Input
                            value={newFinding.name}
                            onChange={(e) =>
                              setNewFinding({
                                ...newFinding,
                                name: e.target.value,
                              })
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="e.g., Mild Asymmetry"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">
                            Area
                          </Label>
                          <select
                            value={newFinding.area}
                            onChange={(e) =>
                              setNewFinding({
                                ...newFinding,
                                area: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          >
                            <option value="">Select Area</option>
                            {analysisAreas.map((area) => (
                              <option key={area.id} value={area.name}>
                                {area.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">
                            Severity
                          </Label>
                          <select
                            value={newFinding.severity}
                            onChange={(e) =>
                              setNewFinding({
                                ...newFinding,
                                severity: e.target.value as
                                  | "mild"
                                  | "moderate"
                                  | "severe",
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          >
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                          </select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-sm font-medium text-gray-300">
                            Description
                          </Label>
                          <textarea
                            value={newFinding.description}
                            onChange={(e) =>
                              setNewFinding({
                                ...newFinding,
                                description: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white min-h-[80px] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Describe the finding in detail..."
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 mt-4">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowAddFindingForm(false);
                            setNewFinding({
                              name: "",
                              description: "",
                              area: "",
                              severity: "mild",
                            });
                            setShowSuccessMessage(false); // Clear any success message
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddProviderFinding}
                          disabled={!newFinding.name.trim() || !newFinding.area}
                          className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Finding
                        </Button>
                      </div>
                      {(!newFinding.name.trim() || !newFinding.area) && (
                        <div className="mt-2 text-sm text-red-400">
                          Please fill in both finding name and area to add a new
                          finding.
                        </div>
                      )}
                    </Card>
                  )}

                  {/* Current Findings Grouped by Area */}
                  <div className="space-y-6">
                    {getFindingsByArea().map((areaGroup) => {
                      const Icon = areaGroup.area.icon;
                      return (
                        <Card
                          key={areaGroup.area.id}
                          className="p-4 bg-gray-800/50 border-gray-700"
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <Icon className="w-5 h-5 text-cyan-400" />
                            <h4 className="text-lg font-semibold text-white">
                              {areaGroup.area.name}
                            </h4>
                            <span className="text-gray-400 text-sm">
                              ({areaGroup.findings.length} findings)
                            </span>
                          </div>

                          <div className="space-y-2">
                            {areaGroup.findings.map((finding, index) => {
                              const isHidden = hiddenFindings.has(finding.name);
                              return (
                                <div
                                  key={index}
                                  className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-200 group ${
                                    isHidden
                                      ? "bg-gray-800/20 border-gray-700/30 opacity-50"
                                      : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50"
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(
                                          finding.severity
                                        )}`}
                                      >
                                        {finding.severity}
                                      </span>
                                      {finding.isProviderIdentified && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-cyan-400 text-cyan-400">
                                          Provider
                                        </span>
                                      )}
                                      {isHidden && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-gray-500 text-gray-400">
                                          Hidden
                                        </span>
                                      )}
                                    </div>
                                    <span
                                      className={`font-medium ${
                                        isHidden
                                          ? "text-gray-400"
                                          : "text-white"
                                      }`}
                                    >
                                      {finding.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {isHidden ? (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleShowFinding(finding.name)
                                        }
                                        className="text-green-400 hover:text-green-300"
                                        title="Show finding"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    ) : (
                                      <>
                                        {finding.isProviderIdentified ? (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                              const providerIndex =
                                                providerFindings.findIndex(
                                                  (f) => f.name === finding.name
                                                );
                                              if (providerIndex !== -1) {
                                                handleRemoveProviderFinding(
                                                  providerIndex
                                                );
                                              }
                                            }}
                                            className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove provider finding"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        ) : (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              handleHideAIFinding(finding.name)
                                            }
                                            className="text-orange-400 hover:text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Hide AI finding"
                                          >
                                            <EyeOff className="w-4 h-4" />
                                          </Button>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Hidden Findings Summary */}
                  {hiddenFindings.size > 0 && (
                    <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <EyeOff className="w-4 h-4" />
                        <span className="text-sm">
                          {hiddenFindings.size} finding
                          {hiddenFindings.size !== 1 ? "s" : ""} hidden from
                          analysis
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Hidden findings are shown dimmed in the list above.
                        Click the eye icon to show them again.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-700">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
