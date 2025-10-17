"use client";

import { useState, useRef } from "react";
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
  Video,
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
  frontPhoto: File | null;
  leftSidePhoto: File | null;
  rightSidePhoto: File | null;
  expressions: File | null;
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
    frontPhoto: null,
    leftSidePhoto: null,
    rightSidePhoto: null,
    expressions: null,
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
    expressions: useRef<HTMLInputElement>(null),
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
    {
      title: "Take Photos",
      description: "Facial expressions",
    },
    {
      title: "Upload Expressions",
      description: "Photo or video",
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

  const handleFileUpload = (
    type: "front" | "leftSide" | "rightSide" | "expressions",
    file: File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type === "front"
        ? "frontPhoto"
        : type === "leftSide"
        ? "leftSidePhoto"
        : type === "rightSide"
        ? "rightSidePhoto"
        : "expressions"]: file,
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

      // Add file fields
      if (formData.frontPhoto) {
        submitData.append("frontPhoto", formData.frontPhoto);
      }
      if (formData.leftSidePhoto) {
        submitData.append("leftSidePhoto", formData.leftSidePhoto);
      }
      if (formData.rightSidePhoto) {
        submitData.append("rightSidePhoto", formData.rightSidePhoto);
      }
      if (formData.expressions) {
        submitData.append("expressions", formData.expressions);
      }

      const response = await fetch("/api/demo-form-submit", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
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
        return (
          <div className="space-y-8 max-w-4xl mx-auto text-center">
            {/* Ponce AI Branding */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse mb-4">
                Ponce AI
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Intelligence Reimagined for Aesthetics
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Get personalized recommendations for your aesthetic goals with
                our AI-powered analysis
              </p>
            </div>

            {/* Simple Process Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl border-2 border-gray-700 bg-gray-800/50">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI Photo Analysis
                </h3>
                <p className="text-gray-300 text-sm">
                  Upload photos for advanced facial analysis
                </p>
              </div>

              <div className="p-6 rounded-xl border-2 border-gray-700 bg-gray-800/50">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Personalized Results
                </h3>
                <p className="text-gray-300 text-sm">
                  Receive tailored treatment recommendations
                </p>
              </div>
            </div>
          </div>
        );

      case 1: // Video Introduction
        return (
          <div className="space-y-8">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                src="https://player.vimeo.com/video/910222701?autoplay=0&loop=0&muted=0&portrait=0&title=0&byline=0&badge=0"
                className="w-full h-full rounded-lg shadow-2xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-base md:text-lg">
                Please watch the video above to learn about our facial analysis
                process.
              </p>
            </div>
          </div>
        );

      case 2: // Personal Information
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-white text-base font-medium"
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
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-12 text-base rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-white text-base font-medium"
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
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-12 text-base rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-white text-base font-medium"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className={`bg-gray-800/50 text-white placeholder-gray-400 h-12 text-base rounded-xl ${
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
                className="text-white text-base font-medium"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className={`bg-gray-800/50 text-white placeholder-gray-400 h-12 text-base rounded-xl ${
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
                className="text-white text-base font-medium"
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
                className={`bg-gray-800/50 text-white placeholder-gray-400 h-12 text-base rounded-xl ${
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-white text-center">
                Have you had any aesthetic procedures?
              </h3>
              <p className="text-gray-300 mb-8 text-center text-lg">
                Select all that apply
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PREVIOUS_PROCEDURES.map((procedure, index) => (
                  <button
                    key={procedure.value}
                    onClick={() =>
                      handleProcedureChange(
                        procedure.value,
                        !formData.previousProcedures.includes(procedure.value)
                      )
                    }
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-white text-center">
                What are your aesthetic goals?
              </h3>
              <p className="text-gray-300 mb-8 text-center text-lg">
                Select all that apply
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOALS.map((goal, index) => (
                  <button
                    key={goal.value}
                    onClick={() =>
                      handleGoalChange(
                        goal.value,
                        !formData.goals.includes(goal.value)
                      )
                    }
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
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

      case 5: // Photo 1
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_1[0].image}
                alt={PHOTO_GROUP_1[0].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        );

      case 6: // Photo 2
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
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

      case 7: // Photo 3
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
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

      case 8: // Upload Front Photo
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Upload Your Front Photo
              </h3>
              <p className="text-gray-300 text-sm mb-4">
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

      case 9: // Photo 4 - Look straight ahead
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
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

      case 10: // Photo 5 - Turn to the left
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
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

      case 11: // Upload Left Photo
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Upload Your Left Side Photo
              </h3>
              <p className="text-gray-300 text-sm mb-4">
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

      case 12: // Photo 6 - Turn to the right
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
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

      case 13: // Upload Right Photo
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Upload Your Right Side Photo
              </h3>
              <p className="text-gray-300 text-sm mb-4">
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

      case 14: // Photo 7 - Look up slightly
        return (
          <div className="space-y-4 max-w-4xl mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="flex justify-center w-full">
              <Image
                src={PHOTO_GROUP_4[0].image}
                alt={PHOTO_GROUP_4[0].title}
                width={800}
                height={600}
                className="rounded-xl object-contain shadow-lg max-w-full max-h-[70vh]"
              />
            </div>
          </div>
        );

      case 15: // Upload Expressions (Photo or Video)
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Upload Your Expressions
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Upload either a photo or video showing different facial
                expressions (following instruction 7 above).
              </p>
            </div>
            <Card className="bg-gray-800/50 border-gray-700 max-w-4xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <Camera className="h-6 w-6" />
                  Expressions Photo or Video
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Upload your expressions photo or video
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => fileInputRefs.expressions.current?.click()}
                      variant="secondary"
                      className="flex items-center gap-3 border-gray-600 text-white hover:bg-gray-700 px-8 py-3 text-base"
                    >
                      <Upload className="h-5 w-5" />
                      {formData.expressions
                        ? "Change File"
                        : "Upload Photo or Video"}
                    </Button>
                  </div>
                  {formData.expressions && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3 text-green-400 bg-green-600/10 border border-green-400/30 rounded-lg p-3">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-base font-medium">
                          {formData.expressions.name}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        {formData.expressions.type.startsWith("video/") ? (
                          <video
                            src={URL.createObjectURL(formData.expressions)}
                            controls
                            className="rounded-xl shadow-lg max-w-full max-h-64"
                          />
                        ) : (
                          <Image
                            src={URL.createObjectURL(formData.expressions)}
                            alt="Expressions preview"
                            width={200}
                            height={150}
                            className="rounded-xl object-cover shadow-lg"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRefs.expressions}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload("expressions", e.target.files?.[0] || null)
                  }
                />
              </CardContent>
            </Card>
          </div>
        );

      case 16: // Review & Submit
        return (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2 text-white">
                Review Your Information
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
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
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-medium">Phone:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Date of Birth:</span>
                    <span>{formData.dateOfBirth || "Not provided"}</span>
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

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">
                        Expressions (Photo or Video):
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.expressions
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {formData.expressions ? "✓ Uploaded" : "✗ Not uploaded"}
                      </span>
                    </div>
                    {formData.expressions && (
                      <div className="flex justify-center">
                        {formData.expressions.type.startsWith("video/") ? (
                          <video
                            src={URL.createObjectURL(formData.expressions)}
                            controls
                            className="rounded-xl shadow-lg max-w-full max-h-40"
                          />
                        ) : (
                          <Image
                            src={URL.createObjectURL(formData.expressions)}
                            alt="Expressions preview"
                            width={200}
                            height={150}
                            className="rounded-xl object-cover shadow-lg"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(validationErrors.email ||
              validationErrors.phone ||
              validationErrors.dateOfBirth) && (
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
                    {validationErrors.dateOfBirth && (
                      <li>• {validationErrors.dateOfBirth}</li>
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">
                {steps[currentStep]?.title}
              </h1>
              <p className="text-gray-400 text-sm">
                {steps[currentStep]?.description}
              </p>
            </div>
            <div className="text-sm text-gray-400">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sticky top-[72px] z-10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <main className="flex-1 min-h-0 overflow-y-auto -webkit-overflow-scrolling-touch">
        <div className="max-w-4xl mx-auto w-full py-4 sm:py-6 pb-24 sm:pb-6 px-4">
          {renderStepContent()}
        </div>
      </main>

      {/* Fixed footer nav */}
      {!submitSuccess && (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    !!(
                      validationErrors.email ||
                      validationErrors.phone ||
                      validationErrors.dateOfBirth
                    )
                  }
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : validationErrors.email ||
                    validationErrors.phone ||
                    validationErrors.dateOfBirth ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Fix errors to submit
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submit Form
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2"
                >
                  Next
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
