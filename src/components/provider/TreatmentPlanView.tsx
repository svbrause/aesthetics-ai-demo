"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Send, Download, FileText, ChevronDown, X } from "lucide-react";
import { TreatmentPlanItem } from "@/types/patientTypes";

interface TreatmentPlanViewProps {
  treatmentPlan: TreatmentPlanItem[];
  onRemoveFromPlan: (id: string) => void;
  onExportToEMR: () => void;
  onDownloadPDF: () => void;
}

export function TreatmentPlanView({
  treatmentPlan,
  onRemoveFromPlan,
  onExportToEMR,
  onDownloadPDF,
}: TreatmentPlanViewProps) {
  const [expandedTreatmentItems, setExpandedTreatmentItems] = useState<
    Set<string>
  >(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedTreatmentItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      key="treatment-plan"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">
            Treatment Plan ({treatmentPlan.length} items)
          </h3>
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={onExportToEMR}
              className="bg-gradient-to-r from-green-600 to-blue-600"
            >
              <Send className="w-4 h-4 mr-2" />
              Export to EMR
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownloadPDF}
              className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {treatmentPlan.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No treatments added to plan yet</p>
            <p className="text-sm text-gray-500">
              Add treatments from the Treatments tab
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {treatmentPlan.map((item, index) => {
              const itemId = `treatment-${item.id}`;
              const isExpanded = expandedTreatmentItems.has(itemId);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-700/30 rounded-lg border border-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-sm text-gray-400">
                        ${item.price} • {item.duration} • {item.downtime}
                        {item.timeline && (
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs ${
                              item.timeline === "short-term"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            }`}
                          >
                            {item.timeline === "short-term"
                              ? "Short-term"
                              : "Long-term"}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Serves:{" "}
                        {item.serves
                          ? item.serves.join(", ")
                          : "Various concerns"}
                      </div>

                      {/* Expandable Content */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-600/50"
                        >
                          <div className="space-y-3">
                            {item.notes && (
                              <div>
                                <h5 className="text-sm font-medium text-white mb-2">
                                  Notes:
                                </h5>
                                <p className="text-sm text-gray-300">
                                  {item.notes}
                                </p>
                              </div>
                            )}

                            {item.areas && item.areas.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-white mb-2">
                                  Treatment Areas:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {item.areas.map(
                                    (area: string, idx: number) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30"
                                      >
                                        {area}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {item.quantity && item.unit && (
                              <div>
                                <h5 className="text-sm font-medium text-white mb-2">
                                  Dosage:
                                </h5>
                                <p className="text-sm text-gray-300">
                                  {item.quantity} {item.unit}
                                </p>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Price:</span>
                                <span className="text-white ml-2">
                                  ${item.price}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white ml-2">
                                  {item.duration}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Downtime:</span>
                                <span className="text-white ml-2">
                                  {item.downtime}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">
                                  Invasiveness:
                                </span>
                                <span className="text-white ml-2">
                                  {item.invasiveness}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(itemId)}
                        className="text-gray-400 hover:text-white"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 rotate-180" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFromPlan(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
