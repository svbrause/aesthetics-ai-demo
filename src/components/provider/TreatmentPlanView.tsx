"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Send,
  Download,
  FileText,
  ChevronDown,
  X,
  Share2,
  Clock,
  ShoppingCart,
} from "lucide-react";
// TreatmentPlanItem interface defined locally
interface TreatmentPlanItem {
  id: string;
  name: string;
  notes?: string;
  areas: string[];
  quantity?: string;
  unit?: string;
  price?: string;
  duration?: string;
  downtime?: string;
  invasiveness?: string;
  timeline?: "short-term" | "long-term";
  priority?: "high" | "medium" | "low";
}

interface TreatmentPlanViewProps {
  treatmentPlan: TreatmentPlanItem[];
  onRemoveFromPlan: (id: string) => void;
  onMoveToSavedForLater: (id: string) => void;
  onMoveToCurrentPlan: (id: string) => void;
  onDownloadPDF: () => void;
  onShare: () => void;
}

export function TreatmentPlanView({
  treatmentPlan,
  onRemoveFromPlan,
  onMoveToSavedForLater,
  onMoveToCurrentPlan,
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
      <Card className="p-6 bg-medspa-bg-secondary border border-medspa-primary/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-medspa-text-primary">
            Treatment Plan ({treatmentPlan.length} items)
          </h3>
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={onDownloadPDF}
              className="bg-medspa-primary text-white hover:bg-medspa-primary/90 border border-medspa-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="bg-medspa-bg-secondary text-medspa-text-primary hover:bg-medspa-accent-24 border border-medspa-primary/30"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {treatmentPlan.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-16 h-16 text-medspa-text-secondary mx-auto mb-4" />
            <p className="text-medspa-text-primary">
              No treatments added to plan yet
            </p>
            <p className="text-sm text-medspa-text-secondary">
              Add treatments from the Treatments tab
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Current Plan Section */}
            <div>
              <div className="flex items-center mb-4">
                <h4 className="text-lg font-semibold text-medspa-text-primary">
                  Current Plan ({currentPlan.length} items)
                </h4>
                <div className="ml-3 px-3 py-1 bg-medspa-accent-24 text-medspa-text-primary text-xs rounded-full border border-medspa-primary/30">
                  Immediate Treatment
                </div>
              </div>
              {currentPlan.length === 0 ? (
                <div className="text-center py-6 bg-medspa-accent-24 rounded-lg border border-medspa-primary/30">
                  <p className="text-medspa-text-primary">
                    No treatments in current plan
                  </p>
                  <p className="text-sm text-medspa-text-secondary">
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
                <h4 className="text-lg font-semibold text-medspa-text-primary">
                  Save for Later ({saveForLater.length} items)
                </h4>
                <div className="ml-3 px-3 py-1 bg-medspa-accent-24 text-medspa-text-primary text-xs rounded-full border border-medspa-primary/30">
                  Future Consideration
                </div>
              </div>
              {saveForLater.length === 0 ? (
                <div className="text-center py-6 bg-medspa-accent-24 rounded-lg border border-medspa-primary/30">
                  <p className="text-medspa-text-primary">
                    No treatments saved for later
                  </p>
                  <p className="text-sm text-medspa-text-secondary">
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
        className="p-4 bg-medspa-bg-secondary rounded-lg border border-medspa-primary/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="font-medium text-medspa-text-primary">
              {item.name}
            </div>
            <div className="text-sm text-medspa-text-secondary">
              ${item.price} • {item.duration} • {item.downtime}
            </div>

            {/* Targeted Findings - removed as property doesn't exist */}

            {/* Expandable Content */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-medspa-primary/30"
              >
                <div className="space-y-3">
                  {item.notes && (
                    <div>
                      <h5 className="text-sm font-medium text-medspa-text-primary mb-2">
                        Notes:
                      </h5>
                      <p className="text-sm text-medspa-text-secondary">
                        {item.notes}
                      </p>
                    </div>
                  )}

                  {/* Targeted Findings - removed as property doesn't exist */}

                  {item.areas && item.areas.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-medspa-text-primary mb-2">
                        Treatment Areas:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {item.areas.map((area: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-medspa-accent-24 text-medspa-text-primary text-xs rounded border border-medspa-primary/30"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.quantity && item.unit && (
                    <div>
                      <h5 className="text-sm font-medium text-medspa-text-primary mb-2">
                        Dosage:
                      </h5>
                      <p className="text-sm text-medspa-text-secondary">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-medspa-text-secondary">Price:</span>
                      <span className="text-medspa-text-primary ml-2">
                        ${item.price}
                      </span>
                    </div>
                    <div>
                      <span className="text-medspa-text-secondary">
                        Duration:
                      </span>
                      <span className="text-medspa-text-primary ml-2">
                        {item.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-medspa-text-secondary">
                        Downtime:
                      </span>
                      <span className="text-medspa-text-primary ml-2">
                        {item.downtime}
                      </span>
                    </div>
                    <div>
                      <span className="text-medspa-text-secondary">
                        Invasiveness:
                      </span>
                      <span className="text-medspa-text-primary ml-2">
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
              className="text-medspa-text-secondary hover:text-medspa-text-primary"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 rotate-180" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

            {/* Move buttons - only show if item is in current plan or saved for later */}
            {item.timeline === "short-term" || !item.timeline ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveToSavedForLater(item.id)}
                className="text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                title="Save for Later"
              >
                <Clock className="w-4 h-4" />
                <span className="text-xs">Save for Later</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveToCurrentPlan(item.id)}
                className="text-green-500 hover:text-green-600 flex items-center space-x-1"
                title="Move to Current Plan"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs">Move to Current Plan</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFromPlan(item.id)}
              className="text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
}
