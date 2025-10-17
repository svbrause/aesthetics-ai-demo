// Debug script to see what elements are actually available
if (typeof window !== "undefined") {
  console.log("🔍 Current URL:", window.location.pathname);
  console.log("🔍 Document ready state:", document.readyState);

  // Check all elements with data-tutorial
  const allTutorialElements = document.querySelectorAll("[data-tutorial]");
  console.log(
    "📋 All elements with data-tutorial:",
    allTutorialElements.length
  );
  allTutorialElements.forEach((el, index) => {
    console.log(
      `${index + 1}. ${el.tagName} - data-tutorial="${el.getAttribute(
        "data-tutorial"
      )}" - class="${el.className}"`
    );
  });

  // Check for patient-detail-container specifically
  const patientDetailContainer = document.querySelector(
    "[data-tutorial='patient-detail-container']"
  );
  console.log("🎯 patient-detail-container found:", !!patientDetailContainer);
  if (patientDetailContainer) {
    console.log("   Element:", patientDetailContainer);
  }

  // Check for any div with patient-detail-container class
  const patientDetailClass = document.querySelector(
    ".patient-detail-container"
  );
  console.log(
    "🎯 .patient-detail-container class found:",
    !!patientDetailClass
  );
  if (patientDetailClass) {
    console.log("   Element:", patientDetailClass);
  }

  // Check the main container
  const mainContainer = document.querySelector("div[class*='patient-detail']");
  console.log("🎯 Any div with 'patient-detail' in class:", !!mainContainer);
  if (mainContainer) {
    console.log("   Element:", mainContainer);
    console.log("   Classes:", mainContainer.className);
    console.log("   Data attributes:", mainContainer.dataset);
  }
} else {
  console.log("❌ This script must be run in the browser");
}
