"use client";

import { useState, useEffect } from "react";

// Mock patient data
const mockPatient = {
  id: "1001",
  name: "Sydney Adams",
  age: 28,
  email: "sydney.adams@email.com",
  phone: "(555) 123-4567",
  lastVisit: "2024-01-15",
  score: 78,
  findings: [
    { name: "Forehead Wrinkles", severity: "moderate", score: 70 },
    { name: "Dark Spots", severity: "subtle", score: 25 },
    { name: "Nasolabial Folds", severity: "severe", score: 85 },
  ],
  frontImage: "/Sydney Adams Front.png",
  sideImage: "/Sydney Adams Side.png",
  scanDate: "December 15, 2024",
};

export default function TestPatientSimple() {
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPatient(mockPatient);
    }, 1000);
  }, []);

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Test Patient Simple</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Patient: {patient.name}</h2>
        <p>Age: {patient.age}</p>
        <p>Email: {patient.email}</p>
        <p>Score: {patient.score}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Findings:</h3>
          <ul className="space-y-2">
            {patient.findings.map((finding: any, index: number) => (
              <li key={index} className="bg-gray-700 p-3 rounded">
                {finding.name} - {finding.severity} ({finding.score})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
