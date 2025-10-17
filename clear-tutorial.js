// Script to clear tutorial state for testing
if (typeof window !== "undefined") {
  localStorage.removeItem("tutorialState");
  console.log("✅ Tutorial state cleared");
} else {
  console.log("❌ This script must be run in the browser");
}
