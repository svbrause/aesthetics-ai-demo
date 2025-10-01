#!/usr/bin/env node

/**
 * Debug script to test form submission
 * Run this with: node debug-form-submission.js
 */

const fs = require("fs");
const path = require("path");

// Create a test video file (small MP4)
const createTestVideo = () => {
  // This creates a minimal MP4 file for testing
  const testVideoData = Buffer.from([
    0x00,
    0x00,
    0x00,
    0x20,
    0x66,
    0x74,
    0x79,
    0x70, // ftyp box
    0x69,
    0x73,
    0x6f,
    0x6d,
    0x00,
    0x00,
    0x02,
    0x00,
    0x69,
    0x73,
    0x6f,
    0x6d,
    0x69,
    0x73,
    0x6f,
    0x32,
    0x6d,
    0x70,
    0x34,
    0x31,
    0x00,
    0x00,
    0x00,
    0x08,
    0x6d,
    0x64,
    0x61,
    0x74,
    0x00,
    0x00,
    0x00,
    0x00, // mdat box (empty)
  ]);

  const testVideoPath = path.join(__dirname, "test-video.mp4");
  fs.writeFileSync(testVideoPath, testVideoData);
  return testVideoPath;
};

// Create a test image file (small PNG)
const createTestImage = () => {
  // This creates a minimal PNG file for testing
  const testImageData = Buffer.from([
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a, // PNG signature
    0x00,
    0x00,
    0x00,
    0x0d,
    0x49,
    0x48,
    0x44,
    0x52, // IHDR chunk
    0x00,
    0x00,
    0x00,
    0x01,
    0x00,
    0x00,
    0x00,
    0x01,
    0x08,
    0x02,
    0x00,
    0x00,
    0x00,
    0x90,
    0x77,
    0x53,
    0xde,
    0x00,
    0x00,
    0x00,
    0x0c,
    0x49,
    0x44,
    0x41,
    0x54,
    0x08,
    0xd7,
    0x63,
    0x00,
    0x01,
    0x00,
    0x00,
    0x05,
    0x00,
    0x01,
    0x0d,
    0x0a,
    0x2d,
    0xb4,
    0x00,
    0x00,
    0x00,
    0x00,
    0x49,
    0x45,
    0x4e,
    0x44,
    0xae,
    0x42,
    0x60,
    0x82,
  ]);

  const testImagePath = path.join(__dirname, "test-image.png");
  fs.writeFileSync(testImagePath, testImageData);
  return testImagePath;
};

const testFormSubmission = async () => {
  console.log("🧪 Starting form submission test...");

  try {
    // Create test files
    const testVideoPath = createTestVideo();
    const testImagePath = createTestImage();

    console.log("📁 Created test files:");
    console.log(
      `  Video: ${testVideoPath} (${fs.statSync(testVideoPath).size} bytes)`
    );
    console.log(
      `  Image: ${testImagePath} (${fs.statSync(testImagePath).size} bytes)`
    );

    // Create FormData
    const FormData = require("form-data");
    const formData = new FormData();

    // Add text fields
    formData.append("firstName", "Test");
    formData.append("lastName", "User");
    formData.append("email", "test@example.com");
    formData.append("phone", "(555) 123-4567");
    formData.append("dateOfBirth", "1990-01-01");
    formData.append(
      "previousProcedures",
      JSON.stringify(["None: I'm new to medical aesthetics"])
    );
    formData.append("goals", JSON.stringify(["I just want to look better"]));
    formData.append("regions", JSON.stringify(["Skin"]));

    // Add files
    formData.append("frontPhoto", fs.createReadStream(testImagePath), {
      filename: "test-front.png",
      contentType: "image/png",
    });
    formData.append("leftSidePhoto", fs.createReadStream(testImagePath), {
      filename: "test-left.png",
      contentType: "image/png",
    });
    formData.append("rightSidePhoto", fs.createReadStream(testImagePath), {
      filename: "test-right.png",
      contentType: "image/png",
    });
    formData.append("expressions", fs.createReadStream(testVideoPath), {
      filename: "test-expressions.mp4",
      contentType: "video/mp4",
    });

    console.log("📤 Submitting form data...");

    // Submit to your API
    const fetch = require("node-fetch");
    const response = await fetch("http://localhost:3000/api/demo-form-submit", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    console.log(`📊 Response status: ${response.status}`);
    console.log(
      `📊 Response headers:`,
      Object.fromEntries(response.headers.entries())
    );

    const result = await response.text();
    console.log("📊 Response body:", result);

    if (response.ok) {
      console.log("✅ Form submission successful!");
    } else {
      console.log("❌ Form submission failed!");
    }

    // Clean up test files
    fs.unlinkSync(testVideoPath);
    fs.unlinkSync(testImagePath);
    console.log("🧹 Cleaned up test files");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Run the test
testFormSubmission();
