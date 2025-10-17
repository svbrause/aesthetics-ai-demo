"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Camera,
  Upload,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Scale,
  Eye,
  Heart,
  Bone,
  Gem,
  Syringe,
  Sparkles,
  Zap,
  Scissors,
  Droplets,
  Shield,
  ArrowRight as ArrowRightIcon,
  Brain,
  Target,
} from "lucide-react";
import Image from "next/image";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  previousProcedures: string[];
  goals: string[];
  regions: string[];
  frontPhoto: File | null;
  leftSidePhoto: File | null;
  rightSidePhoto: File | null;
}

const PREVIOUS_PROCEDURES = [
  {
    value: "Injectables (e.g. Botox or Fillers)",
    icon: <Syringe className="w-6 h-6" />,
    description: "Botox, dermal fillers, and injectable treatments",
  },
  {
    value: "Medical grade skincare",
    icon: <Sparkles className="w-6 h-6" />,
    description: "Prescription-strength skincare products",
  },
  {
    value:
      "Other minimally invasive (e.g. vampire facial, PRP, hair transplants)",
    icon: <Droplets className="w-6 h-6" />,
    description: "PRP, vampire facials, and other non-surgical treatments",
  },
  {
    value: "Chemical skin treatments (e.g. peels)",
    icon: <Zap className="w-6 h-6" />,
    description: "Chemical peels and exfoliating treatments",
  },
  {
    value: "Energy-based skin treatments (e.g. laser)",
    icon: <Zap className="w-6 h-6" />,
    description: "Laser therapy and energy-based treatments",
  },
  {
    value: "Surgical (e.g. liposuction, facelift)",
    icon: <Scissors className="w-6 h-6" />,
    description: "Surgical cosmetic procedures",
  },
  {
    value: "None: I'm new to medical aesthetics",
    icon: <Shield className="w-6 h-6" />,
    description: "First time exploring aesthetic treatments",
  },
];

const GOALS = [
  {
    value: "I want to look good for my age",
    icon: <Star className="w-6 h-6" />,
    description: "Reduce signs of aging and restore vitality",
  },
  {
    value: "I want to improve my facial balance",
    icon: <Scale className="w-6 h-6" />,
    description: "Improve facial harmony and proportions",
  },
  {
    value: "I want to look less tired",
    icon: <Eye className="w-6 h-6" />,
    description: "Address under-eye concerns and fatigue",
  },
  {
    value: "I want to look more feminine",
    icon: <Heart className="w-6 h-6" />,
    description: "Enhance feminine features and softness",
  },
  {
    value: "I want to look more masculine",
    icon: <Bone className="w-6 h-6" />,
    description: "Define stronger, more angular features",
  },
  {
    value: "I just want to look better",
    icon: <Gem className="w-6 h-6" />,
    description: "General improvement and enhancement",
  },
];

const REGIONS = [
  {
    value: "Skin",
    description: "Overall skin texture, tone, and quality",
  },
  {
    value: "Forehead",
    description: "Forehead lines, wrinkles, and shape",
  },
  {
    value: "Eyes",
    description: "Eye area, under-eye concerns, and surrounding features",
  },
  {
    value: "Cheeks",
    description: "Cheekbone definition, volume, and contour",
  },
  {
    value: "Lips",
    description: "Lip shape, size, definition, and volume",
  },
  {
    value: "Nose",
    description: "Nose shape, proportions, and definition",
  },
  {
    value: "Jawline",
    description: "Jawline definition, contour, and shape",
  },
  {
    value: "Neck",
    description: "Neck aging, lines, and definition",
  },
];

const PHOTO_INSTRUCTIONS = [
  {
    id: 1,
    title: "Find good lighting",
    description:
      "Stand near a window with natural light or use bright, even lighting",
    image: "/Scanning Guide Photos/Photo Taking 1.jpg",
  },
  {
    id: 2,
    title: "Position yourself",
    description: "Stand 3-4 feet away from the camera, looking directly at it",
    image: "/Scanning Guide Photos/Photo Taking 2.jpg",
  },
  {
    id: 3,
    title: "Neutral expression",
    description:
      "Keep a relaxed, neutral facial expression with your mouth closed",
    image: "/Scanning Guide Photos/Photo Taking 3.png",
  },
  {
    id: 4,
    title: "Look straight ahead",
    description: "Keep your head level and look directly at the camera",
    image: "/Scanning Guide Photos/Photo Taking 4.png",
  },
  {
    id: 5,
    title: "Turn to the left",
    description:
      "Turn your head 90 degrees to the left, keeping your body facing forward",
    image: "/Scanning Guide Photos/Photo Taking 5.png",
  },
  {
    id: 6,
    title: "Turn to the right",
    description:
      "Turn your head 90 degrees to the right, keeping your body facing forward",
    image: "/Scanning Guide Photos/Photo Taking 6.png",
  },
  {
    id: 7,
    title: "Look up slightly",
    description:
      "Tilt your head up about 15 degrees while looking at the camera",
    image: "/Scanning Guide Photos/Photo Taking 7.jpg",
  },
];

// Photo instruction groups for different steps
const PHOTO_GROUP_1 = PHOTO_INSTRUCTIONS.slice(0, 3); // Photos 1-3
const PHOTO_GROUP_2 = PHOTO_INSTRUCTIONS.slice(3, 5); // Photos 4-5
const PHOTO_GROUP_3 = [PHOTO_INSTRUCTIONS[5]]; // Photo 6
const PHOTO_GROUP_4 = [PHOTO_INSTRUCTIONS[6]]; // Photo 7

export default function DemoForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    previousProcedures: [],
    goals: [],
    regions: [],
    frontPhoto: null,
    leftSidePhoto: null,
    rightSidePhoto: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    phone?: string;
    dateOfBirth?: string;
  }>({});

  const fileInputRefs = {
    front: useRef<HTMLInputElement>(null),
    leftSide: useRef<HTMLInputElement>(null),
    rightSide: useRef<HTMLInputElement>(null),
  };

  const steps = [
    {
      title: "Welcome",
      description: "Get started with your consultation",
    },
    {
      title: "Video Introduction",
      description: "Watch our introduction video",
    },
    { title: "Personal Information", description: "Tell us about yourself" },
    { title: "Previous Procedures", description: "Select all that apply" },
    { title: "Your Goals", description: "Select all that apply" },
    {
      title: "Facial Regions",
      description: "Which areas do you want to improve?",
    },
    {
      title: "Take Photos",
      description: "Find good lighting",
    },
    {
      title: "Take Photos",
      description: "Position your face",
    },
    {
      title: "Take Photos",
      description: "Look straight ahead",
    },
    {
      title: "Upload Front Photo",
      description: "Neutral expression",
    },
    {
      title: "Take Photos",
      description: "Look straight ahead",
    },
    {
      title: "Take Photos",
      description: "Turn to the left",
    },
    { title: "Upload Left Photo", description: "Left side view" },
    {
      title: "Take Photos",
      description: "Right side positioning",
    },
    {
      title: "Upload Right Photo",
      description: "Right side view",
    },
    { title: "Review & Submit", description: "Review your information" },
  ];

  // Validation functions
  const validateEmail = (email: string): string | null => {
    if (!email) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");

    // Limit to 10 digits for US phone numbers
    const limitedDigits = digitsOnly.slice(0, 10);

    // Format as (XXX) XXX-XXXX
    if (limitedDigits.length === 0) return "";
    if (limitedDigits.length <= 3) return `(${limitedDigits}`;
    if (limitedDigits.length <= 6)
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
      3,
      6
    )}-${limitedDigits.slice(6)}`;
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return null;
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return "Please enter a valid phone number (at least 10 digits)";
    }
    if (digitsOnly.length > 15) {
      return "Phone number is too long";
    }
    return null;
  };

  const validateDateOfBirth = (dateOfBirth: string): string | null => {
    if (!dateOfBirth) return null;

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Check if birthday hasn't occurred this year
    const actualAge =
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ? age - 1
        : age;

    if (actualAge < 13) {
      return "You must be at least 13 years old to use this service";
    }
    if (actualAge > 120) {
      return "Please enter a valid date of birth";
    }
    if (birthDate > today) {
      return "Date of birth cannot be in the future";
    }

    return null;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation and formatting
    if (field === "email") {
      const error = validateEmail(value);
      setValidationErrors((prev) => ({ ...prev, email: error || undefined }));
    } else if (field === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formattedPhone }));
      const error = validatePhone(formattedPhone);
      setValidationErrors((prev) => ({ ...prev, phone: error || undefined }));
      return; // Don't update formData again since we already did it above
    } else if (field === "dateOfBirth") {
      const error = validateDateOfBirth(value);
      setValidationErrors((prev) => ({
        ...prev,
        dateOfBirth: error || undefined,
      }));
    }
  };

  const handleProcedureChange = (procedure: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      previousProcedures: checked
        ? [...prev.previousProcedures, procedure]
        : prev.previousProcedures.filter((p) => p !== procedure),
    }));
  };

  const handleGoalChange = (goal: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      goals: checked
        ? [...prev.goals, goal]
        : prev.goals.filter((g) => g !== goal),
    }));
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      regions: checked
        ? [...prev.regions, region]
        : prev.regions.filter((r) => r !== region),
    }));
  };

  const handleFileUpload = (
    type: "front" | "leftSide" | "rightSide",
    file: File | null
  ) => {
    if (file) {
      // Validate file size and type - Match server limits
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for images
      const ALLOWED_IMAGE_TYPES = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      const errors = [];

      // All files are images with 10MB limit
      if (file.size > MAX_FILE_SIZE) {
        errors.push(
          `File too large: ${(file.size / (1024 * 1024)).toFixed(
            2
          )}MB (max 10MB)`
        );
      }

      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        errors.push(`Invalid file type: ${file.type}. Allowed: images only`);
      }

      if (errors.length > 0) {
        alert(`File validation failed:\n${errors.join("\n")}`);
        return;
      }

      console.log(`📁 File selected for ${type}:`, {
        name: file.name,
        size: file.size,
        type: file.type,
        sizeMB: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    }

    setFormData((prev) => ({
      ...prev,
      [type === "front"
        ? "frontPhoto"
        : type === "leftSide"
        ? "leftSidePhoto"
        : "rightSidePhoto"]: file,
    }));
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const nextStep = () => {
    console.log("Next step clicked, current step:", currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log("Moved to step:", currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Check for validation errors before submitting
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const dateOfBirthError = validateDateOfBirth(formData.dateOfBirth);

    if (emailError || phoneError || dateOfBirthError) {
      setValidationErrors({
        email: emailError || undefined,
        phone: phoneError || undefined,
        dateOfBirth: dateOfBirthError || undefined,
      });
      alert("Please fix the validation errors before submitting.");
      return;
    }

    // Clear any existing validation errors
    setValidationErrors({});

    setIsSubmitting(true);
    try {
      console.log("Starting form submission...");

      // Create FormData to handle file uploads
      const submitData = new FormData();

      // Add text fields
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("dateOfBirth", formData.dateOfBirth);
      submitData.append(
        "previousProcedures",
        JSON.stringify(formData.previousProcedures)
      );
      submitData.append("goals", JSON.stringify(formData.goals));
      submitData.append("regions", JSON.stringify(formData.regions));

      // Add file fields
      if (formData.frontPhoto) {
        submitData.append("frontPhoto", formData.frontPhoto);
        console.log("Added front photo:", formData.frontPhoto.name);
      }
      if (formData.leftSidePhoto) {
        submitData.append("leftSidePhoto", formData.leftSidePhoto);
        console.log("Added left side photo:", formData.leftSidePhoto.name);
      }
      if (formData.rightSidePhoto) {
        submitData.append("rightSidePhoto", formData.rightSidePhoto);
        console.log("Added right side photo:", formData.rightSidePhoto.name);
      }

      console.log("Submitting form data...");

      // Create an AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch("/api/demo-form-submit", {
        method: "POST",
        body: submitData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log("Form submission successful:", result);
        setSubmitSuccess(true);
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.error("Form submission failed:", response.status, errorData);

        // Handle specific error types
        if (response.status === 400 && errorData.details) {
          // File validation errors
          const errorMessage = `File validation failed:\n${errorData.details.join(
            "\n"
          )}`;
          throw new Error(errorMessage);
        } else if (response.status === 413) {
          // Payload too large
          throw new Error(
            `Video file too large. Please try with a smaller video (under 25MB) or use a photo instead.`
          );
        } else {
          throw new Error(
            `Submission failed: ${response.status} - ${
              errorData.error || "Unknown error"
            }`
          );
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage =
            "Request timed out. Please check your internet connection and try again.";
        } else {
          errorMessage = error.message;
        }
      }

      alert(
        `There was an error submitting your form: ${errorMessage}. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    // Show success page if form was successfully submitted
    if (submitSuccess) {
      return (
        <div className="space-y-8 max-w-4xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-xl text-gray-300 mb-6">
              Your consultation form has been successfully submitted.
            </p>
          </div>

          {/* Success Details */}
          <div className="bg-gray-800/50 border-2 border-green-500/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              What happens next?
            </h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">
                    Analysis in Progress
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Our AI will analyze your photos and information to provide
                    personalized recommendations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Expert Review</h4>
                  <p className="text-gray-300 text-sm">
                    Our medical professionals will review the AI analysis and
                    add their expert insights.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">
                    Results Delivery
                  </h4>
                  <p className="text-gray-300 text-sm">
                    You'll receive your personalized treatment recommendations
                    within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-2">
              Questions?
            </h4>
            <p className="text-gray-300 text-sm">
              If you have any questions about your consultation, please contact
              us at{" "}
              <a
                href="mailto:support@ponceai.com"
                className="text-blue-400 hover:text-blue-300"
              >
                support@ponceai.com
              </a>
            </p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 0: // Welcome
        const floatingElements = [
          { icon: <Brain className="w-6 h-6" />, delay: 0, duration: 3 },
          { icon: <Target className="w-5 h-5" />, delay: 1, duration: 4 },
          { icon: <Sparkles className="w-6 h-6" />, delay: 2, duration: 3.5 },
          { icon: <Brain className="w-4 h-4" />, delay: 0.5, duration: 2.5 },
          { icon: <Target className="w-5 h-5" />, delay: 1.5, duration: 3.8 },
          { icon: <Sparkles className="w-6 h-6" />, delay: 2.5, duration: 4.2 },
        ];

        return (
          <div
            className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden flex flex-col"
            style={{
              height: "calc(var(--actual-vh, 100vh))",
              minHeight: "calc(var(--actual-vh, 100vh))",
              maxHeight: "calc(var(--actual-vh, 100vh))",
            }}
          >
            {/* Floating Background Elements */}
            <div className="absolute inset-0">
              {floatingElements.map((element, index) => (
                <motion.div
                  key={index}
                  className="absolute text-blue-500/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: element.duration,
                    repeat: Infinity,
                    delay: element.delay,
                    ease: "easeInOut",
                  }}
                >
                  {element.icon}
                </motion.div>
              ))}
            </div>

            {/* Main Content - Mobile Optimized */}
            <div className="relative z-10 flex-1 flex flex-col justify-between p-4 pb-6">
              {/* Top Section - Branding and Silhouette */}
              <div className="flex-1 flex flex-col justify-center items-center">
                {/* Ponce AI Branding */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Ponce AI
                  </h2>
                </motion.div>

                {/* Animated Silhouette */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mb-8 relative"
                >
                  <div className="relative w-32 h-40 mx-auto">
                    {/* Face Silhouette */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(59, 130, 246, 0.3)",
                          "0 0 40px rgba(147, 51, 234, 0.5)",
                          "0 0 20px rgba(59, 130, 246, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Analysis Lines */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <svg viewBox="0 0 128 160" className="w-full h-full">
                        {/* Scanning lines */}
                        <motion.line
                          x1="20"
                          y1="40"
                          x2="108"
                          y2="40"
                          stroke="url(#gradient1)"
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                        />
                        <motion.line
                          x1="20"
                          y1="80"
                          x2="108"
                          y2="80"
                          stroke="url(#gradient2)"
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                        <motion.line
                          x1="20"
                          y1="120"
                          x2="108"
                          y2="120"
                          stroke="url(#gradient3)"
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                          }}
                        />

                        {/* Analysis points */}
                        {[30, 50, 70, 90, 110].map((y, index) => (
                          <motion.circle
                            key={y}
                            cx="64"
                            cy={y}
                            r="2"
                            fill="url(#gradient1)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                          />
                        ))}

                        <defs>
                          <linearGradient
                            id="gradient1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                          <linearGradient
                            id="gradient2"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                          <linearGradient
                            id="gradient3"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hero Text - Smaller for Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-center mb-4"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                    <motion.span
                      className="block bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:via-gray-200 dark:to-gray-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      Intelligence
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:via-gray-200 dark:to-gray-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.8 }}
                    >
                      Reimagined
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      for Aesthetics
                    </motion.span>
                  </h1>
                </motion.div>
              </div>

              {/* Bottom Section - CTA Only */}
              <div className="space-y-4">
                {/* CTA Button - Clean and focused */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="group bg-white text-black hover:bg-gray-100 text-base px-8 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full max-w-xs"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Begin Your Concierge Demo
                      <motion.div className="group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRightIcon className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
          </div>
        );

      case 1: // Video Introduction
        return (
          <div className="space-y-6 sm:space-y-8 px-4">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                src="https://player.vimeo.com/video/910222701?autoplay=0&loop=0&muted=0&portrait=0&title=0&byline=0&badge=0"
                className="w-full h-full rounded-lg shadow-2xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Please watch the video above to learn about our facial analysis
                process.
              </p>
            </div>
          </div>
        );

      case 2: // Personal Information
        return (
          <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-white text-sm sm:text-base font-medium"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter your first name"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-11 sm:h-12 text-base rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-white text-sm sm:text-base font-medium"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter your last name"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-11 sm:h-12 text-base rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-white text-sm sm:text-base font-medium"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className={`bg-gray-800/50 text-white placeholder-gray-400 h-11 sm:h-12 text-base rounded-xl ${
                  validationErrors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : formData.email && !validationErrors.email
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                    : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {validationErrors.email ? (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {validationErrors.email}
                </p>
              ) : formData.email && !validationErrors.email ? (
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Valid email address
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  You need to verify your email to continue
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-white text-sm sm:text-base font-medium"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className={`bg-gray-800/50 text-white placeholder-gray-400 h-11 sm:h-12 text-base rounded-xl ${
                  validationErrors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : formData.phone && !validationErrors.phone
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                    : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {validationErrors.phone ? (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {validationErrors.phone}
                </p>
              ) : formData.phone && !validationErrors.phone ? (
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Valid phone number
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Enter your 10-digit phone number
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="dateOfBirth"
                className="text-white text-sm sm:text-base font-medium"
              >
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className={`bg-gray-800/50 text-white placeholder-gray-400 h-11 sm:h-12 text-base rounded-xl ${
                  validationErrors.dateOfBirth
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : formData.dateOfBirth && !validationErrors.dateOfBirth
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                    : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {validationErrors.dateOfBirth ? (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {validationErrors.dateOfBirth}
                </p>
              ) : formData.dateOfBirth && !validationErrors.dateOfBirth ? (
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Valid date of birth
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Enter your date of birth
                </p>
              )}
            </div>
          </div>
        );

      case 3: // Previous Procedures
        return (
          <div className="space-y-6 max-w-4xl mx-auto px-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white text-center">
                Have you had any aesthetic procedures?
              </h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-center text-base sm:text-lg">
                Select all that apply
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-8">
                {PREVIOUS_PROCEDURES.map((procedure, index) => (
                  <button
                    key={procedure.value}
                    onClick={() =>
                      handleProcedureChange(
                        procedure.value,
                        !formData.previousProcedures.includes(procedure.value)
                      )
                    }
                    className={`w-full p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                      formData.previousProcedures.includes(procedure.value)
                        ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70"
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-blue-400 flex-shrink-0">
                        {procedure.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {procedure.value}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {procedure.description}
                        </p>
                      </div>
                      {formData.previousProcedures.includes(
                        procedure.value
                      ) && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Your Goals
        return (
          <div className="space-y-6 max-w-4xl mx-auto px-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white text-center">
                What are your aesthetic goals?
              </h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-center text-base sm:text-lg">
                Select all that apply
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-8">
                {GOALS.map((goal, index) => (
                  <button
                    key={goal.value}
                    onClick={() =>
                      handleGoalChange(
                        goal.value,
                        !formData.goals.includes(goal.value)
                      )
                    }
                    className={`w-full p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                      formData.goals.includes(goal.value)
                        ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70"
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-blue-400 flex-shrink-0">
                        {goal.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {goal.value}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {goal.description}
                        </p>
                      </div>
                      {formData.goals.includes(goal.value) && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5: // Facial Regions
        return (
          <div className="space-y-6 max-w-4xl mx-auto px-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white text-center">
                Which regions of your face do you want to improve?
              </h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-center text-base sm:text-lg">
                Select all that apply
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-8">
                {REGIONS.map((region, index) => (
                  <button
                    key={region.value}
                    onClick={() =>
                      handleRegionChange(
                        region.value,
                        !formData.regions.includes(region.value)
                      )
                    }
                    className={`w-full p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                      formData.regions.includes(region.value)
                        ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70"
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {region.value}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {region.description}
                        </p>
                      </div>
                      {formData.regions.includes(region.value) && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6: // Photo 1
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center px-4">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_1[0].image}
                alt={PHOTO_GROUP_1[0].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
                priority
              />
            </div>
          </div>
        );

      case 7: // Photo 2
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center px-4">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_1[1].image}
                alt={PHOTO_GROUP_1[1].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        );

      case 8: // Photo 3
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center px-4">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_1[2].image}
                alt={PHOTO_GROUP_1[2].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        );

      case 9: // Upload Front Photo
        return (
          <div className="space-y-4 px-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white text-center sm:text-left">
                Upload Your Front Photo
              </h3>
              <p className="text-gray-300 text-sm mb-4 text-center sm:text-left">
                Now upload your front-facing photo with a neutral expression
                (following instructions 1-3 above).
              </p>
            </div>
            <Card className="bg-gray-800/50 border-gray-700 max-w-4xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <Camera className="h-6 w-6" />
                  Neutral Expression Front Photo
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Upload your front-facing photo with a neutral expression
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => fileInputRefs.front.current?.click()}
                      variant="secondary"
                      className="flex items-center gap-3 border-gray-600 text-white hover:bg-gray-700 px-8 py-3 text-base"
                    >
                      <Upload className="h-5 w-5" />
                      {formData.frontPhoto ? "Change Photo" : "Upload Photo"}
                    </Button>
                  </div>
                  {formData.frontPhoto && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3 text-green-400 bg-green-600/10 border border-green-400/30 rounded-lg p-3">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-base font-medium">
                          {formData.frontPhoto.name}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src={URL.createObjectURL(formData.frontPhoto)}
                          alt="Front photo preview"
                          width={200}
                          height={150}
                          className="rounded-xl object-cover shadow-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.front}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload("front", e.target.files?.[0] || null)
                  }
                />
              </CardContent>
            </Card>
          </div>
        );

      case 10: // Photo 4 - Look straight ahead
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center px-4">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_2[0].image}
                alt={PHOTO_GROUP_2[0].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        );

      case 11: // Photo 5 - Turn to the left
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center px-4">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_2[1].image}
                alt={PHOTO_GROUP_2[1].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        );

      case 12: // Upload Left Photo
        return (
          <div className="space-y-4 px-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white text-center sm:text-left">
                Upload Your Left Side Photo
              </h3>
              <p className="text-gray-300 text-sm mb-4 text-center sm:text-left">
                Now upload your left side profile photo (following instructions
                4-5 above).
              </p>
            </div>
            <Card className="bg-gray-800/50 border-gray-700 max-w-4xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <Camera className="h-6 w-6" />
                  Left Side Profile Photo
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Upload your left side profile photo
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => fileInputRefs.leftSide.current?.click()}
                      variant="secondary"
                      className="flex items-center gap-3 border-gray-600 text-white hover:bg-gray-700 px-8 py-3 text-base"
                    >
                      <Upload className="h-5 w-5" />
                      {formData.leftSidePhoto ? "Change Photo" : "Upload Photo"}
                    </Button>
                  </div>
                  {formData.leftSidePhoto && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3 text-green-400 bg-green-600/10 border border-green-400/30 rounded-lg p-3">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-base font-medium">
                          {formData.leftSidePhoto.name}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src={URL.createObjectURL(formData.leftSidePhoto)}
                          alt="Left side photo preview"
                          width={200}
                          height={150}
                          className="rounded-xl object-cover shadow-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.leftSide}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload("leftSide", e.target.files?.[0] || null)
                  }
                />
              </CardContent>
            </Card>
          </div>
        );

      case 13: // Photo 6 - Turn to the right
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center px-4">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_3[0].image}
                alt={PHOTO_GROUP_3[0].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        );

      case 14: // Upload Right Photo
        return (
          <div className="space-y-4 px-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white text-center sm:text-left">
                Upload Your Right Side Photo
              </h3>
              <p className="text-gray-300 text-sm mb-4 text-center sm:text-left">
                Now upload your right side profile photo (following instruction
                6 above).
              </p>
            </div>
            <Card className="bg-gray-800/50 border-gray-700 max-w-4xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <Camera className="h-6 w-6" />
                  Right Side Profile Photo
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Upload your right side profile photo
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => fileInputRefs.rightSide.current?.click()}
                      variant="secondary"
                      className="flex items-center gap-3 border-gray-600 text-white hover:bg-gray-700 px-8 py-3 text-base"
                    >
                      <Upload className="h-5 w-5" />
                      {formData.rightSidePhoto
                        ? "Change Photo"
                        : "Upload Photo"}
                    </Button>
                  </div>
                  {formData.rightSidePhoto && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3 text-green-400 bg-green-600/10 border border-green-400/30 rounded-lg p-3">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-base font-medium">
                          {formData.rightSidePhoto.name}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src={URL.createObjectURL(formData.rightSidePhoto)}
                          alt="Right side photo preview"
                          width={200}
                          height={150}
                          className="rounded-xl object-cover shadow-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.rightSide}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload("rightSide", e.target.files?.[0] || null)
                  }
                />
              </CardContent>
            </Card>
          </div>
        );

      case 15: // Review & Submit
        return (
          <div className="space-y-6 max-w-4xl mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
                Review Your Information
              </h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">
                Please review your information before submitting
              </p>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="p-6 rounded-xl border-2 border-gray-700 bg-gray-800/50">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  Personal Information
                </h4>
                <div className="space-y-3 text-white">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-medium">Name:</span>
                    <span>
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-medium">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Phone:</span>
                    <span>{formData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Previous Procedures */}
              <div className="p-6 rounded-xl border-2 border-gray-700 bg-gray-800/50">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  Previous Procedures
                </h4>
                <div className="space-y-2">
                  {formData.previousProcedures.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {formData.previousProcedures.map((procedure) => (
                        <div
                          key={procedure}
                          className="flex items-center gap-2 text-white bg-blue-500/20 border border-blue-500/30 rounded-lg p-3"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{procedure}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">None selected</p>
                  )}
                </div>
              </div>

              {/* Goals */}
              <div className="p-6 rounded-xl border-2 border-gray-700 bg-gray-800/50">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  Your Goals
                </h4>
                <div className="space-y-2">
                  {formData.goals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {formData.goals.map((goal) => (
                        <div
                          key={goal}
                          className="flex items-center gap-2 text-white bg-blue-500/20 border border-blue-500/30 rounded-lg p-3"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{goal}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">None selected</p>
                  )}
                </div>
              </div>

              {/* Regions */}
              <div className="p-6 rounded-xl border-2 border-gray-700 bg-gray-800/50">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  Facial Regions to Improve
                </h4>
                <div className="space-y-2">
                  {formData.regions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {formData.regions.map((region) => (
                        <div
                          key={region}
                          className="flex items-center gap-2 text-white bg-blue-500/20 border border-blue-500/30 rounded-lg p-3"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{region}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">None selected</p>
                  )}
                </div>
              </div>

              {/* Photos and Video */}
              <div className="p-6 rounded-xl border-2 border-gray-700 bg-gray-800/50">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  Photos & Video
                </h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">
                        Front Photo:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.frontPhoto
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {formData.frontPhoto ? "✓ Uploaded" : "✗ Not uploaded"}
                      </span>
                    </div>
                    {formData.frontPhoto && (
                      <div className="flex justify-center">
                        <Image
                          src={URL.createObjectURL(formData.frontPhoto)}
                          alt="Front photo preview"
                          width={200}
                          height={150}
                          className="rounded-xl object-cover shadow-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">
                        Left Side Photo:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.leftSidePhoto
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {formData.leftSidePhoto
                          ? "✓ Uploaded"
                          : "✗ Not uploaded"}
                      </span>
                    </div>
                    {formData.leftSidePhoto && (
                      <div className="flex justify-center">
                        <Image
                          src={URL.createObjectURL(formData.leftSidePhoto)}
                          alt="Left side photo preview"
                          width={200}
                          height={150}
                          className="rounded-xl object-cover shadow-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">
                        Right Side Photo:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.rightSidePhoto
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {formData.rightSidePhoto
                          ? "✓ Uploaded"
                          : "✗ Not uploaded"}
                      </span>
                    </div>
                    {formData.rightSidePhoto && (
                      <div className="flex justify-center">
                        <Image
                          src={URL.createObjectURL(formData.rightSidePhoto)}
                          alt="Right side photo preview"
                          width={200}
                          height={150}
                          className="rounded-xl object-cover shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(validationErrors.email || validationErrors.phone) && (
              <div className="text-center mt-8">
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-2">
                    Please fix the following errors:
                  </h4>
                  <ul className="text-red-300 text-sm space-y-1">
                    {validationErrors.email && (
                      <li>• {validationErrors.email}</li>
                    )}
                    {validationErrors.phone && (
                      <li>• {validationErrors.phone}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Show header and footer only after welcome screen */}
      {currentStep > 0 && (
        <>
          {/* Header */}
          <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                    {steps[currentStep]?.title}
                  </h1>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">
                    {steps[currentStep]?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="sticky top-16 z-10 bg-black/60 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content */}
      <div
        className={
          currentStep === 0
            ? "w-full h-screen"
            : "max-w-4xl mx-auto w-full py-4 sm:py-6 pb-24 sm:pb-6"
        }
      >
        {renderStepContent()}
      </div>

      {/* Navigation - Hide on success page and welcome screen */}
      {!submitSuccess && currentStep > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
            <div className="flex justify-between gap-3">
              <Button
                onClick={handlePrevious}
                variant="secondary"
                className="flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    !!(validationErrors.email || validationErrors.phone)
                  }
                  className="flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span className="hidden sm:inline">Submitting...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : validationErrors.email || validationErrors.phone ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        Fix errors to submit
                      </span>
                      <span className="sm:hidden">Fix errors</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Submit Form</span>
                      <span className="sm:hidden">Submit</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
