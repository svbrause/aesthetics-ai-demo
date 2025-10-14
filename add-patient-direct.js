#!/usr/bin/env node

/**
 * Direct Patient Creation Script
 *
 * This script allows you to create patient records directly by:
 * 1. Editing the patient-template.json file
 * 2. Running this script to add the patient to the system
 *
 * Usage:
 * 1. Edit patient-template.json with your patient data
 * 2. Run: node add-patient-direct.js
 * 3. The patient will be added to the mock data
 */

const fs = require("fs");
const path = require("path");

// Path to the patient page file
const PATIENT_PAGE_PATH = "./src/app/provider/patient/[id]/page.tsx";

// Read the patient template
const templatePath = "./patient-template.json";
if (!fs.existsSync(templatePath)) {
  console.error("❌ patient-template.json not found!");
  console.log("Please create patient-template.json first.");
  process.exit(1);
}

const patientData = JSON.parse(fs.readFileSync(templatePath, "utf8"));

// Validate required fields
if (!patientData.id || !patientData.name) {
  console.error("❌ Missing required fields: id and name");
  process.exit(1);
}

// Read the current patient page
const patientPageContent = fs.readFileSync(PATIENT_PAGE_PATH, "utf8");

// Find the mockPatients object
const mockPatientsMatch = patientPageContent.match(
  /const mockPatients = \{([\s\S]*?)\};/
);
if (!mockPatientsMatch) {
  console.error("❌ Could not find mockPatients object in patient page");
  process.exit(1);
}

// Extract the current mockPatients content
const currentMockPatients = mockPatientsMatch[1];

// Create the new patient entry
const newPatientEntry = `  "${patientData.id}": {
    id: "${patientData.id}",
    name: "${patientData.name}",
    age: ${patientData.age || 35},
    email: "${patientData.email || "patient@email.com"}",
    phone: "${patientData.phone || "(555) 000-0000"}",
    lastVisit: "${
      patientData.lastVisit || new Date().toISOString().split("T")[0]
    }",
    score: ${patientData.score || 75},
    findings: [
${patientData.findings.map((finding) => `      "${finding}"`).join(",\n")}
    ],
    frontImage: "${patientData.frontImage || "/placeholder-front.png"}",
    sideImage: "${patientData.sideImage || "/placeholder-side.png"}",
    scanDate: "${
      patientData.scanDate ||
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }",
    airtableRecordId: "${patientData.airtableRecordId || ""}",
  },`;

// Add the new patient to the mockPatients object
const updatedMockPatients = currentMockPatients + "\n" + newPatientEntry;

// Replace the mockPatients object in the file
const updatedContent = patientPageContent.replace(
  /const mockPatients = \{[\s\S]*?\};/,
  `const mockPatients = {${updatedMockPatients}\n};`
);

// Write the updated file
fs.writeFileSync(PATIENT_PAGE_PATH, updatedContent);

console.log("✅ Patient added successfully!");
console.log(`📋 Patient ID: ${patientData.id}`);
console.log(`👤 Patient Name: ${patientData.name}`);
console.log(`🔍 Findings: ${patientData.findings.length} items`);
console.log(`📅 Scan Date: ${patientData.scanDate}`);
console.log("");
console.log(
  `🌐 You can now view the patient at: http://localhost:3000/provider/patient/${patientData.id}`
);
console.log("");
console.log("💡 To add another patient:");
console.log("   1. Edit patient-template.json");
console.log("   2. Run: node add-patient-direct.js");






