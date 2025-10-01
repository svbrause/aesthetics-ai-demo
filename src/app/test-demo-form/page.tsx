"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function TestDemoForm() {
  const [testResult, setTestResult] = useState<string>("");

  const testFormSubmission = async () => {
    try {
      const testData = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "123-456-7890",
        previousProcedures: ["None: I'm new to medical aesthetics"],
        goals: "I just want to look better",
        frontPhoto: null,
        leftSidePhoto: null,
        rightSidePhoto: null,
        expressionsVideo: null,
      };

      const response = await fetch("/api/demo-form-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();
      setTestResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setTestResult(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Demo Form Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This page tests the demo form API endpoint.</p>
            <Button onClick={testFormSubmission}>Test Form Submission</Button>
            {testResult && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Test Result:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {testResult}
                </pre>
              </div>
            )}
            <div className="mt-4">
              <Button
                onClick={() => (window.location.href = "/demo-form")}
                variant="secondary"
              >
                Go to Demo Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
