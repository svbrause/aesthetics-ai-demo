"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { X, Mail, Copy, Check, Share2, Plus } from "lucide-react";
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
  const [emails, setEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [ccInput, setCcInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ccError, setCcError] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [subject, setSubject] = useState(`Treatment Plan for ${patientName}`);
  const [message, setMessage] = useState(
    `Dear ${patientName},\n\nPlease find your personalized treatment plan below:\n\n`
  );
  const [editableMessage, setEditableMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Initialize editable message when component mounts
  useEffect(() => {
    const initialMessage =
      message +
      generateTreatmentPlanText() +
      "\n\nBest regards,\nYour Aesthetic Provider";
    setEditableMessage(initialMessage);
  }, [message, treatmentPlan]);

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

  const fullMessage = editableMessage;

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Add email to list
  const addEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (
      trimmedEmail &&
      isValidEmail(trimmedEmail) &&
      !emails.includes(trimmedEmail)
    ) {
      setEmails([...emails, trimmedEmail]);
      setEmailInput("");
      setEmailError("");
    } else if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
    } else if (emails.includes(trimmedEmail)) {
      setEmailError("This email is already added");
    }
  };

  // Remove email from list
  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  // Add CC email to list
  const addCcEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (
      trimmedEmail &&
      isValidEmail(trimmedEmail) &&
      !ccEmails.includes(trimmedEmail)
    ) {
      setCcEmails([...ccEmails, trimmedEmail]);
      setCcInput("");
      setCcError("");
    } else if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setCcError("Please enter a valid email address");
    } else if (ccEmails.includes(trimmedEmail)) {
      setCcError("This email is already added");
    }
  };

  // Remove CC email from list
  const removeCcEmail = (emailToRemove: string) => {
    setCcEmails(ccEmails.filter((email) => email !== emailToRemove));
  };

  // Handle email input key events
  const handleEmailInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail(emailInput);
    } else if (
      e.key === "Backspace" &&
      emailInput === "" &&
      emails.length > 0
    ) {
      // Remove last email if input is empty and backspace is pressed
      removeEmail(emails[emails.length - 1]);
    }
  };

  // Handle email input blur
  const handleEmailInputBlur = () => {
    if (emailInput.trim()) {
      addEmail(emailInput);
    }
  };

  // Handle CC input key events
  const handleCcInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCcEmail(ccInput);
    } else if (e.key === "Backspace" && ccInput === "" && ccEmails.length > 0) {
      // Remove last CC email if input is empty and backspace is pressed
      removeCcEmail(ccEmails[ccEmails.length - 1]);
    }
  };

  // Handle CC input blur
  const handleCcInputBlur = () => {
    if (ccInput.trim()) {
      addCcEmail(ccInput);
    }
  };

  const handleEmailShare = () => {
    if (emails.length === 0) {
      setEmailError("Please add at least one email address");
      return;
    }

    let mailtoLink = `mailto:${emails.join(",")}`;
    if (ccEmails.length > 0) {
      mailtoLink += `?cc=${ccEmails.join(",")}`;
    }
    mailtoLink += `${
      ccEmails.length > 0 ? "&" : "?"
    }subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      fullMessage
    )}`;

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
            className="bg-gray-900 rounded-xl w-full max-w-2xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#36758820" }}
                >
                  <Share2 className="w-5 h-5" style={{ color: "#367588" }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Share Treatment Plan
                  </h2>
                  <p className="text-sm text-gray-500">
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
              {/* Email Input with Bubbles */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipients
                </label>
                <div
                  className={`w-full min-h-[48px] px-4 py-2 bg-gray-800 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${
                    emailError ? "border-red-500" : "border-gray-600"
                  }`}
                >
                  <div className="flex flex-wrap gap-2 items-center">
                    {/* Email Bubbles */}
                    {emails.map((email, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 text-white text-sm rounded-full"
                        style={{ backgroundColor: "#367588" }}
                      >
                        <span className="text-white">{email}</span>
                        <button
                          type="button"
                          onClick={() => removeEmail(email)}
                          className="rounded-full p-0.5 transition-colors hover:opacity-80"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </motion.div>
                    ))}

                    {/* Email Input */}
                    <input
                      type="text"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        setEmailError("");
                      }}
                      onKeyDown={handleEmailInputKeyDown}
                      onBlur={handleEmailInputBlur}
                      placeholder={
                        emails.length === 0 ? "Enter email addresses..." : ""
                      }
                      className="flex-1 min-w-[200px] bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>

                  {/* Error Message */}
                  {emailError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {emailError}
                    </motion.div>
                  )}
                </div>
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

              {/* Editable Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message Content
                </label>
                <textarea
                  value={editableMessage}
                  onChange={(e) => setEditableMessage(e.target.value)}
                  className="w-full h-80 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  placeholder="Enter your message here..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleEmailShare}
                  disabled={emails.length === 0}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email {emails.length > 0 && `(${emails.length})`}
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
                {typeof navigator !== "undefined" && "share" in navigator && (
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
