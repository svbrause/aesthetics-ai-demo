// Debug URL generator for patient detail pages
const baseUrl = "http://localhost:3000";

// Known providers and their codes
const providers = {
  TheTreatment250: "Katie Shafer, Jessica Boucher, etc.",
  Lakeshore153: "Jessica Boucher",
  EliteMedSpa1065: "Endia Simmons",
  pscstockton: "Catie Marchini, etc.",
};

// Known patient IDs
const patients = {
  rec00VwvJGYuuio2q: "Katie Shafer (TheTreatment250)",
  rec123456789: "Jessica Boucher (Lakeshore153)",
  rec987654321: "Endia Simmons (EliteMedSpa1065)",
  rec111111111: "Catie Marchini (pscstockton)",
};

console.log("🐛 DEBUG URLS FOR PATIENT DETAIL PAGES\n");

console.log("Available Providers:");
Object.entries(providers).forEach(([code, description]) => {
  console.log(`  ${code}: ${description}`);
});

console.log("\nKnown Patients:");
Object.entries(patients).forEach(([id, description]) => {
  console.log(`  ${id}: ${description}`);
});

console.log("\n🔗 DEBUG URLs:");
console.log("Copy and paste these URLs directly into your browser:\n");

Object.entries(patients).forEach(([patientId, description]) => {
  // Extract provider code from description
  const providerMatch = description.match(/\(([^)]+)\)/);
  if (providerMatch) {
    const providerCode = providerMatch[1];
    const debugUrl = `${baseUrl}/provider-login/patients/${patientId}?debug_provider=${providerCode}`;
    const autoUrl = `${baseUrl}/provider-login/patients/${patientId}?debug_provider=auto`;
    const shortUrl = `${baseUrl}/provider-login/patients/${patientId}?debug`;

    console.log(`${description}:`);
    console.log(`  Specific: ${debugUrl}`);
    console.log(`  Auto:     ${autoUrl}`);
    console.log(`  Short:    ${shortUrl}\n`);
  }
});

console.log("🌐 UNIVERSAL DEBUG URL:");
console.log("For any patient ID, use one of these patterns:");
console.log(
  `  ${baseUrl}/provider-login/patients/[PATIENT_ID]?debug_provider=auto`
);
console.log(`  ${baseUrl}/provider-login/patients/[PATIENT_ID]?debug`);
console.log("");

console.log("💡 Usage:");
console.log("1. Make sure your dev server is running (npm run dev)");
console.log("2. Copy any URL above and paste it in your browser");
console.log("3. You should see a yellow debug banner at the top");
console.log("4. No authentication required - perfect for debugging!");
console.log("\n⚠️  Remember to remove debug mode before production!");
