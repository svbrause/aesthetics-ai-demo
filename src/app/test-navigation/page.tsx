"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function TestNavigation() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3"];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-4">
            Navigation Test
          </h1>
          <p className="text-gray-300 mb-4">Current Step: {currentStep + 1}</p>
          <p className="text-gray-300 mb-6">Step Name: {steps[currentStep]}</p>

          <div className="flex gap-4">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="secondary"
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => (window.location.href = "/demo-form")}
              variant="secondary"
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              Go to Demo Form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
