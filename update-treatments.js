const fs = require("fs");

// Read the mapping file
const mapping = JSON.parse(
  fs.readFileSync("treatment-photo-mapping.json", "utf8")
);

// Read the current treatments data
const treatmentsData = fs.readFileSync("src/data/treatmentsData.ts", "utf8");

// Create a mapping from current treatment names to new photos
const treatmentPhotoMap = {
  "Juvederm Voluma": mapping["Filler"]?.[0]?.url || "/Sydney Adams Front.png",
  "Botox for Crow's Feet":
    mapping["Neurotoxin"]?.[0]?.url || "/Sydney Adams Front.png",
  "Tear Trough Filler":
    mapping["Filler"]?.[0]?.url || "/Sydney Adams Front.png",
  "Botox Forehead":
    mapping["Neurotoxin"]?.[0]?.url || "/Sydney Adams Front.png",
  "Lip Filler": mapping["Filler"]?.[0]?.url || "/Sydney Adams Front.png",
  "Chin Filler": mapping["Filler"]?.[0]?.url || "/Sydney Adams Front.png",
  Sculptra: mapping["Filler"]?.[0]?.url || "/Sydney Adams Front.png",
  "Thread Lift": mapping["Threadlift"]?.[0]?.url || "/Sydney Adams Front.png",
  "Upper Blepharoplasty":
    mapping["Blepharoplasty"]?.[0]?.url || "/Sydney Adams Front.png",
  "Lower Blepharoplasty":
    mapping["Blepharoplasty"]?.[0]?.url || "/Sydney Adams Front.png",
  "PRP Treatment":
    mapping["Oral/Topical"]?.[0]?.url || "/Sydney Adams Front.png",
  "Brow Lift": mapping["Browlift"]?.[0]?.url || "/Sydney Adams Front.png",
};

// Update the treatments data
let updatedData = treatmentsData;

for (const [treatmentName, photoUrl] of Object.entries(treatmentPhotoMap)) {
  // Find and replace the image field for each treatment
  const regex = new RegExp(
    `(name: "${treatmentName.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    )}"[\\s\\S]*?)image: "[^"]*"`,
    "g"
  );
  updatedData = updatedData.replace(regex, `$1image: "${photoUrl}"`);
}

// Write the updated data back
fs.writeFileSync("src/data/treatmentsData.ts", updatedData);

console.log("Updated treatment photos:");
for (const [treatmentName, photoUrl] of Object.entries(treatmentPhotoMap)) {
  console.log(`${treatmentName}: ${photoUrl}`);
}
