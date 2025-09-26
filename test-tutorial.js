// Test script to clear tutorial state and test the fixes
if (typeof window !== "undefined") {
  // Clear tutorial state
  localStorage.removeItem("tutorialState");
  console.log("✅ Tutorial state cleared");

  // Test if elements exist
  const testElements = [
    '[data-tutorial="provider-dashboard"]',
    '[data-tutorial="patient-list-header"]',
    '[data-tutorial="patient-detail-container"]',
    '[data-tutorial="patient-header"]',
  ];

  // Additional test for current page elements
  console.log("🔍 Current page elements with data-tutorial:");
  const allElements = document.querySelectorAll("[data-tutorial]");
  allElements.forEach((el, index) => {
    console.log(
      `${index + 1}. ${el.tagName} - data-tutorial="${el.getAttribute(
        "data-tutorial"
      )}"`
    );
  });

  console.log("🔍 Testing tutorial elements:");
  testElements.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      console.log(`✅ Found: ${selector}`);
    } else {
      console.log(`❌ Missing: ${selector}`);
    }
  });

  // Show current URL
  console.log("📍 Current URL:", window.location.pathname);
} else {
  console.log("❌ This script must be run in the browser");
}
