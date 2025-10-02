"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Send, Download, FileText, ChevronDown, X, Share2 } from "lucide-react";
import { TreatmentPlanItem } from "@/types/patientTypes";

interface TreatmentPlanViewProps {
  treatmentPlan: TreatmentPlanItem[];
  onRemoveFromPlan: (id: string) => void;
  onDownloadPDF: () => void;
  onShare: () => void;
}

export function TreatmentPlanView({
  treatmentPlan,
  onRemoveFromPlan,
  onDownloadPDF,
  onShare,
}: TreatmentPlanViewProps) {
  const [expandedTreatmentItems, setExpandedTreatmentItems] = useState<
    Set<string>
  >(new Set());

  // Separate treatments by timeline
  const currentPlan = treatmentPlan.filter(
    (item) => !item.timeline || item.timeline === "short-term"
  );
  const saveForLater = treatmentPlan.filter(
    (item) => item.timeline === "long-term"
  );

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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            Treatment Plan ({treatmentPlan.length} items)
          </h3>
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={onDownloadPDF}
              className="bg-gradient-to-r from-green-600 to-blue-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
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
          <div className="space-y-8">
            {/* Current Plan Section */}
            <div>
              <div className="flex items-center mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Current Plan ({currentPlan.length} items)
                </h4>
                <div className="ml-3 px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                  Immediate Treatment
                </div>
              </div>
              {currentPlan.length === 0 ? (
                <div className="text-center py-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <p className="text-gray-400">No treatments in current plan</p>
                  <p className="text-sm text-gray-500">
                    Add treatments to start your plan
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentPlan.map((item, index) => {
                    return renderTreatmentItem(item, index);
                  })}
                </div>
              )}
            </div>

            {/* Save for Later Section */}
            <div>
              <div className="flex items-center mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Save for Later ({saveForLater.length} items)
                </h4>
                <div className="ml-3 px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                  Future Consideration
                </div>
              </div>
              {saveForLater.length === 0 ? (
                <div className="text-center py-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <p className="text-gray-400">No treatments saved for later</p>
                  <p className="text-sm text-gray-500">
                    Add treatments to save for future consideration
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {saveForLater.map((item, index) => {
                    return renderTreatmentItem(item, index);
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );

  function renderTreatmentItem(item: TreatmentPlanItem, index: number) {
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
            </div>

            {/* Targeted Findings */}
            {item.targetedFindings && item.targetedFindings.length > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                Targets: {item.targetedFindings.join(", ")}
              </div>
            )}

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
                      <p className="text-sm text-gray-300">{item.notes}</p>
                    </div>
                  )}

                  {item.targetedFindings &&
                    item.targetedFindings.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-white mb-2">
                          Targeted Findings:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {item.targetedFindings.map(
                            (finding: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30"
                              >
                                {finding}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {item.areas && item.areas.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-white mb-2">
                        Treatment Areas:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {item.areas.map((area: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30"
                          >
                            {area}
                          </span>
                        ))}
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
                      <span className="text-white ml-2">${item.price}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white ml-2">{item.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Downtime:</span>
                      <span className="text-white ml-2">{item.downtime}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Invasiveness:</span>
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
  }
}
