const fs = require("fs");
const path = require("path");
const https = require("https");

// Read the CSV file
const csvContent = fs.readFileSync("Photos-Grid view.csv", "utf8");

// Simple CSV parser that handles quoted fields
function parseCSV(csv) {
  const lines = csv.split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = [];
      let current = "";
      let inQuotes = false;

      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      data.push(row);
    }
  }

  return data;
}

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
  });
}

// Function to sanitize filename
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
}

// Function to get category directory
function getCategoryDir(treatment) {
  const category =
    treatment["Name (from General Treatments)"] ||
    treatment["General Treatments"] ||
    "";
  const invasiveness = treatment["Invasiveness"] || "";

  if (
    category.toLowerCase().includes("botox") ||
    category.toLowerCase().includes("neurotoxin")
  ) {
    return "botox";
  } else if (
    category.toLowerCase().includes("filler") ||
    category.toLowerCase().includes("juvederm") ||
    category.toLowerCase().includes("restylane")
  ) {
    return "fillers";
  } else if (
    invasiveness === "9" ||
    category.toLowerCase().includes("surgical") ||
    category.toLowerCase().includes("blepharoplasty") ||
    category.toLowerCase().includes("rhinoplasty") ||
    category.toLowerCase().includes("facelift")
  ) {
    return "surgical";
  } else if (
    category.toLowerCase().includes("chemical") ||
    category.toLowerCase().includes("peel")
  ) {
    return "chemical-peels";
  } else if (
    category.toLowerCase().includes("laser") ||
    category.toLowerCase().includes("heat") ||
    category.toLowerCase().includes("energy")
  ) {
    return "laser";
  } else if (category.toLowerCase().includes("microneedling")) {
    return "microneedling";
  } else if (
    category.toLowerCase().includes("skincare") ||
    category.toLowerCase().includes("topical")
  ) {
    return "skincare";
  } else {
    return "other";
  }
}

// Process photos
async function processPhotos() {
  const photos = parseCSV(csvContent);
  const treatmentMapping = {};

  console.log(`Processing ${photos.length} photos...`);

  for (const photo of photos) {
    if (!photo.Photo || !photo["Name (from General Treatments)"]) continue;

    // Extract photo URL from the Photo field
    const photoMatch = photo.Photo.match(/https:\/\/[^)]+/);
    if (!photoMatch) continue;

    const photoUrl = photoMatch[0];
    const treatmentName = photo["Name (from General Treatments)"];
    const categoryDir = getCategoryDir(photo);

    // Create filename
    const filename = sanitizeFilename(`${treatmentName}.jpg`);
    const filepath = path.join(
      "public",
      "treatment-photos",
      categoryDir,
      filename
    );

    // Add to mapping
    if (!treatmentMapping[treatmentName]) {
      treatmentMapping[treatmentName] = [];
    }
    treatmentMapping[treatmentName].push({
      url: `/treatment-photos/${categoryDir}/${filename}`,
      originalUrl: photoUrl,
      filepath: filepath,
    });

    // Download the image
    try {
      await downloadImage(photoUrl, filepath);
    } catch (error) {
      console.error(`Failed to download ${photoUrl}:`, error.message);
    }
  }

  // Save mapping to JSON file
  fs.writeFileSync(
    "treatment-photo-mapping.json",
    JSON.stringify(treatmentMapping, null, 2)
  );
  console.log("Treatment photo mapping saved to treatment-photo-mapping.json");

  // Generate treatment data updates
  console.log("\nTreatment data updates needed:");
  for (const [treatmentName, photos] of Object.entries(treatmentMapping)) {
    if (photos.length > 0) {
      console.log(`${treatmentName}: "${photos[0].url}"`);
    }
  }
}

processPhotos().catch(console.error);
