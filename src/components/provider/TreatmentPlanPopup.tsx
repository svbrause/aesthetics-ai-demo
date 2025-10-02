"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { X, Plus, Minus, Star, ChevronDown } from "lucide-react";

interface TreatmentPlanPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (treatmentDetails: TreatmentDetails) => void;
  treatment: any;
  patientFindings?: string[];
  shortlist?: any[];
}

interface TreatmentDetails {
  id: string;
  name: string;
  notes: string;
  quantity?: string;
  unit?: string;
  timeline: "short-term" | "long-term";
  targetedFindings: string[];
  price: string;
  duration: string;
  downtime: string;
  invasiveness: string;
}

const quantityUnits = [
  "units",
  "syringes",
  "ml",
  "sessions",
  "treatments",
  "areas",
];

export function TreatmentPlanPopup({
  isOpen,
  onClose,
  onAdd,
  treatment,
  patientFindings = [],
  shortlist = [],
}: TreatmentPlanPopupProps) {
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("units");
  const [timeline, setTimeline] = useState<"short-term" | "long-term">(
    "short-term"
  );
  const [targetedFindings, setTargetedFindings] = useState<string[]>([]);
  const [customFinding, setCustomFinding] = useState("");
  const [showCustomFinding, setShowCustomFinding] = useState(false);
  const [showOtherFindings, setShowOtherFindings] = useState(false);

  // Get findings that this treatment serves
  const relevantFindings = treatment?.serves || [];

  // Get all available findings (patient findings + shortlist findings)
  const allAvailableFindings = [
    ...new Set([
      ...patientFindings,
      ...shortlist.map((item) => item.name),
      ...relevantFindings,
    ]),
  ];

  // Initialize with relevant findings when treatment changes
  useEffect(() => {
    if (treatment && relevantFindings.length > 0) {
      setTargetedFindings(relevantFindings);
    }
  }, [treatment, relevantFindings]);

  const handleFindingToggle = (finding: string) => {
    setTargetedFindings((prev) =>
      prev.includes(finding)
        ? prev.filter((f) => f !== finding)
        : [...prev, finding]
    );
  };

  const handleAddCustomFinding = () => {
    if (
      customFinding.trim() &&
      !targetedFindings.includes(customFinding.trim())
    ) {
      setTargetedFindings((prev) => [...prev, customFinding.trim()]);
      setCustomFinding("");
      setShowCustomFinding(false);
    }
  };

  const handleAdd = () => {
    if (targetedFindings.length === 0) return;

    const treatmentDetails: TreatmentDetails = {
      id: treatment.id,
      name: treatment.name,
      notes: notes.trim(),
      quantity: quantity.trim() || undefined,
      unit: quantity.trim() ? unit : undefined,
      timeline,
      targetedFindings,
      price: treatment.price || "N/A",
      duration: treatment.duration || "N/A",
      downtime: treatment.downtime || "N/A",
      invasiveness: treatment.invasiveness || "N/A",
    };

    onAdd(treatmentDetails);
    onClose();

    // Reset form
    setNotes("");
    setQuantity("");
    setUnit("units");
    setTimeline("short-term");
    setTargetedFindings([]);
    setCustomFinding("");
    setShowCustomFinding(false);
    setShowOtherFindings(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="p-6 bg-gray-800/95 backdrop-blur-sm border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Add to Treatment Plan
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Treatment Info */}
              <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                <h3 className="text-lg font-medium text-white mb-2">
                  {treatment.name}
                </h3>
                <p className="text-gray-300 text-sm">{treatment.description}</p>
              </div>

              {/* Targeted Findings */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">
                  Select Findings to Target{" "}
                  <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-gray-400 mb-4">
                  Choose which findings this treatment will address. You can
                  select multiple findings.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {/* Relevant findings (pre-selected) */}
                  <div className="lg:col-span-1">
                    {relevantFindings.length > 0 && (
                      <div>
                        <div className="text-xs text-blue-400 mb-2 flex items-center font-medium">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended for this treatment:
                        </div>
                        <div className="space-y-2">
                          {relevantFindings.map((finding) => (
                            <label
                              key={finding}
                              className={`group flex items-center p-3 rounded-xl text-sm transition-all duration-300 border cursor-pointer hover:bg-gray-700/30 hover:scale-[1.02] ${
                                targetedFindings.includes(finding)
                                  ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border-blue-500/50 shadow-lg shadow-blue-500/10"
                                  : "bg-gray-700/30 text-gray-300 border-gray-600/30 hover:border-gray-500/50"
                              }`}
                            >
                              <div className="relative mr-3">
                                <input
                                  type="checkbox"
                                  checked={targetedFindings.includes(finding)}
                                  onChange={() => handleFindingToggle(finding)}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
                                    targetedFindings.includes(finding)
                                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-500 shadow-lg shadow-blue-500/30"
                                      : "bg-gray-700/50 border-gray-500 group-hover:border-gray-400"
                                  }`}
                                >
                                  {targetedFindings.includes(finding) && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <span className="flex-1 font-medium">
                                {finding}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Other available findings */}
                  <div className="lg:col-span-1">
                    {allAvailableFindings.filter(
                      (f) => !relevantFindings.includes(f)
                    ).length > 0 && (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setShowOtherFindings(!showOtherFindings)
                          }
                          className="flex items-center text-xs text-gray-400 mb-2 hover:text-gray-300 transition-colors font-medium"
                        >
                          <ChevronDown
                            className={`w-3 h-3 mr-1 transition-transform ${
                              showOtherFindings ? "rotate-180" : ""
                            }`}
                          />
                          Other available findings (
                          {
                            allAvailableFindings.filter(
                              (f) => !relevantFindings.includes(f)
                            ).length
                          }
                          ):
                        </button>
                        {showOtherFindings && (
                          <div className="max-h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {allAvailableFindings
                              .filter((f) => !relevantFindings.includes(f))
                              .map((finding) => (
                                <label
                                  key={finding}
                                  className={`group flex items-center p-3 rounded-xl text-sm transition-all duration-300 border cursor-pointer hover:bg-gray-700/30 hover:scale-[1.02] ${
                                    targetedFindings.includes(finding)
                                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-500/10"
                                      : "bg-gray-700/30 text-gray-300 border-gray-600/30 hover:border-gray-500/50"
                                  }`}
                                >
                                  <div className="relative mr-3">
                                    <input
                                      type="checkbox"
                                      checked={targetedFindings.includes(
                                        finding
                                      )}
                                      onChange={() =>
                                        handleFindingToggle(finding)
                                      }
                                      className="sr-only"
                                    />
                                    <div
                                      className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
                                        targetedFindings.includes(finding)
                                          ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/30"
                                          : "bg-gray-700/50 border-gray-500 group-hover:border-gray-400"
                                      }`}
                                    >
                                      {targetedFindings.includes(finding) && (
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                  <span className="flex-1 font-medium">
                                    {finding}
                                  </span>
                                </label>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Custom finding input */}
                  <div className="lg:col-span-1">
                    {!showCustomFinding ? (
                      <button
                        type="button"
                        onClick={() => setShowCustomFinding(true)}
                        className="px-2 py-1.5 rounded-lg text-xs border border-dashed border-gray-600/50 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-all duration-200 w-full"
                      >
                        + Add custom finding
                      </button>
                    ) : (
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={customFinding}
                          onChange={(e) => setCustomFinding(e.target.value)}
                          placeholder="Enter custom finding..."
                          className="w-full p-1.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddCustomFinding()
                          }
                        />
                        <div className="flex gap-1.5">
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleAddCustomFinding}
                            disabled={!customFinding.trim()}
                            className="flex-1 text-xs py-1"
                          >
                            Add
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setShowCustomFinding(false);
                              setCustomFinding("");
                            }}
                            className="flex-1 text-xs py-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity and Unit - Optional */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1.5 block">
                    Quantity <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g., 30, 1.5, 2"
                    className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1.5 block">
                    Unit <span className="text-gray-500">(optional)</span>
                  </label>
                  <CustomSelect
                    options={quantityUnits.map((u) => ({ value: u, label: u }))}
                    value={unit}
                    onChange={setUnit}
                    placeholder="Select unit"
                    disabled={!quantity.trim()}
                  />
                </div>
              </div>

              {/* Timeline Selection */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Treatment Timeline
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeline("short-term")}
                    className={`p-3 rounded-lg text-sm transition-all duration-200 border-2 ${
                      timeline === "short-term"
                        ? "bg-blue-600/20 text-blue-400 border-blue-500"
                        : "bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-medium mb-1">Current Plan</div>
                    <div className="text-xs text-gray-400">
                      Immediate treatment (1-6 months)
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeline("long-term")}
                    className={`p-3 rounded-lg text-sm transition-all duration-200 border-2 ${
                      timeline === "long-term"
                        ? "bg-purple-600/20 text-purple-400 border-purple-500"
                        : "bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-medium mb-1">Save for Later</div>
                    <div className="text-xs text-gray-400">
                      Future consideration (6+ months)
                    </div>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes or specifications..."
                  rows={3}
                  className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-700">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={targetedFindings.length === 0}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Plan
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
