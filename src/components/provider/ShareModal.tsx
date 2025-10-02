"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { X, Mail, Copy, Check, Share2 } from "lucide-react";
import { TreatmentPlanItem } from "@/types/patientTypes";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  treatmentPlan: TreatmentPlanItem[];
}

export function ShareModal({
  isOpen,
  onClose,
  patientName,
  treatmentPlan,
}: ShareModalProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(`Treatment Plan for ${patientName}`);
  const [message, setMessage] = useState(
    `Dear ${patientName},\n\nPlease find your personalized treatment plan below:\n\n`
  );
  const [copied, setCopied] = useState(false);

  const generateTreatmentPlanText = () => {
    return treatmentPlan
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   Notes: ${
            item.notes
          }\n   Areas: ${item.areas.join(", ")}\n   Price: ${
            item.price
          }\n   Duration: ${item.duration}\n   Downtime: ${
            item.downtime
          }\n   Invasiveness: ${item.invasiveness}\n\n`
      )
      .join("");
  };

  const fullMessage =
    message +
    generateTreatmentPlanText() +
    "\n\nBest regards,\nYour Aesthetic Provider";

  const handleEmailShare = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(fullMessage)}`;
    window.open(mailtoLink);
    onClose();
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: subject,
          text: fullMessage,
          url: window.location.href,
        });
        onClose();
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Share2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Share Treatment Plan
                  </h2>
                  <p className="text-sm text-gray-400">
                    Send the treatment plan to {patientName}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Patient Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@example.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Message Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message Preview
                </label>
                <Card className="p-4 bg-gray-800/50 border-gray-700">
                  <div className="max-h-40 overflow-y-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                      {fullMessage}
                    </pre>
                  </div>
                </Card>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleEmailShare}
                  disabled={!email.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  onClick={handleCopyToClipboard}
                  variant="ghost"
                  className="flex-1 backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Text
                    </>
                  )}
                </Button>
                {typeof navigator !== 'undefined' && navigator.share && (
                  <Button
                    onClick={handleWebShare}
                    variant="ghost"
                    className="flex-1 backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
