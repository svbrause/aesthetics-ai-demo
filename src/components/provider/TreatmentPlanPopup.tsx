"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { X, Plus, Minus } from "lucide-react";

interface TreatmentPlanPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (treatmentDetails: TreatmentDetails) => void;
  treatment: any;
  patientFindings?: any[];
  shortlist?: any[];
}

interface TreatmentDetails {
  id: string;
  name: string;
  notes: string;
  areas: string[];
  quantity: string;
  unit: string;
  timeline: "short-term" | "long-term";
}

const treatmentAreas = [
  "Forehead",
  "Eyes",
  "Cheeks",
  "Nose",
  "Lips",
  "Jawline",
  "Chin",
  "Neck",
  "Skin",
];

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
  patientFindings,
  shortlist,
}: TreatmentPlanPopupProps) {
  const [notes, setNotes] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("units");
  const [timeline, setTimeline] = useState<"short-term" | "long-term">(
    "short-term"
  );

  const handleAreaToggle = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleAdd = () => {
    if (!quantity.trim()) return;

    const treatmentDetails: TreatmentDetails = {
      id: treatment.id,
      name: treatment.name,
      notes: notes.trim(),
      areas: selectedAreas,
      quantity: quantity.trim(),
      unit,
      timeline,
    };

    onAdd(treatmentDetails);
    onClose();

    // Reset form
    setNotes("");
    setSelectedAreas([]);
    setQuantity("");
    setUnit("units");
    setTimeline("short-term");
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
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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

            <div className="space-y-6">
              {/* Treatment Info */}
              <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                <h3 className="text-lg font-medium text-white mb-2">
                  {treatment.name}
                </h3>
                <p className="text-gray-300 text-sm">{treatment.description}</p>
              </div>

              {/* Areas to Treat */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">
                  Areas to Treat
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {treatmentAreas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleAreaToggle(area)}
                      className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedAreas.includes(area)
                          ? "bg-blue-600 text-white border border-blue-500"
                          : "bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g., 30, 1.5, 2"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Unit
                  </label>
                  <CustomSelect
                    options={quantityUnits.map((u) => ({ value: u, label: u }))}
                    value={unit}
                    onChange={setUnit}
                    placeholder="Select unit"
                  />
                </div>
              </div>

              {/* Timeline Selection */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">
                  Treatment Timeline
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimeline("short-term")}
                    className={`p-4 rounded-lg text-sm transition-all duration-200 border-2 ${
                      timeline === "short-term"
                        ? "bg-blue-600/20 text-blue-400 border-blue-500"
                        : "bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-medium mb-1">Short-term</div>
                    <div className="text-xs text-gray-400">
                      Immediate results (1-6 months)
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeline("long-term")}
                    className={`p-4 rounded-lg text-sm transition-all duration-200 border-2 ${
                      timeline === "long-term"
                        ? "bg-purple-600/20 text-purple-400 border-purple-500"
                        : "bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-medium mb-1">Long-term</div>
                    <div className="text-xs text-gray-400">
                      Sustained results (6+ months)
                    </div>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes or specifications..."
                  rows={4}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={!quantity.trim()}
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
