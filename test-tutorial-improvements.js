// Test script to verify tutorial improvements
if (typeof window !== "undefined") {
  console.log("🧪 Testing Tutorial Improvements");
  console.log("📍 Current URL:", window.location.pathname);

  // Test screen detection
  const pathname = window.location.pathname;
  let expectedScreen = null;
  if (pathname === "/provider") expectedScreen = "provider-dashboard";
  if (pathname === "/provider/patients") expectedScreen = "patient-list";
  if (pathname.startsWith("/provider/patient/"))
    expectedScreen = "patient-detail";
  if (pathname === "/provider/upload") expectedScreen = "upload";
  if (pathname === "/provider/results") expectedScreen = "results";
  if (pathname === "/provider/analysis-tools")
    expectedScreen = "analysis-tools";

  console.log("🎯 Expected screen:", expectedScreen);

  // Test available elements
  const allElements = document.querySelectorAll("[data-tutorial]");
  console.log("📋 Available tutorial elements:", allElements.length);
  allElements.forEach((el, index) => {
    console.log(
      `${index + 1}. ${el.tagName} - data-tutorial="${el.getAttribute(
        "data-tutorial"
      )}"`
    );
  });

  // Test specific elements for current screen
  const testElements = {
    "provider-dashboard": [
      "[data-tutorial='provider-dashboard']",
      "[data-tutorial='patient-card']",
      "[data-tutorial='patients-button']",
    ],
    "patient-list": [
      "[data-tutorial='patient-list-header']",
      "[data-tutorial='patients-search']",
      "[data-tutorial='patient-card']",
    ],
    "patient-detail": [
      "[data-tutorial='patient-detail-container']",
      "[data-tutorial='patient-header']",
    ],
    upload: [
      "[data-tutorial='upload-interface']",
      "[data-tutorial='upload-instructions']",
      "[data-tutorial='upload-actions']",
    ],
    results: [
      "[data-tutorial='results-interface']",
      "[data-tutorial='results-analysis']",
      "[data-tutorial='results-actions']",
    ],
    "analysis-tools": [
      "[data-tutorial='analysis-tools']",
      "[data-tutorial='analysis-tools-features']",
    ],
  };

  if (expectedScreen && testElements[expectedScreen]) {
    console.log(`🔍 Testing elements for ${expectedScreen}:`);
    testElements[expectedScreen].forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        console.log(`✅ Found: ${selector}`);
      } else {
        console.log(`❌ Missing: ${selector}`);
      }
    });
  }

  // Test tutorial state
  const tutorialState = localStorage.getItem("tutorialState");
  if (tutorialState) {
    const state = JSON.parse(tutorialState);
    console.log("📊 Current tutorial state:", state);
  } else {
    console.log("📊 No tutorial state found");
  }

  console.log("✅ Test complete!");
} else {
  console.log("❌ This script must be run in the browser");
}
