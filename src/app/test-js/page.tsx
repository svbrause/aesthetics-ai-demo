"use client";

import { useEffect } from "react";

export default function TestJSPage() {
  useEffect(() => {
    console.log("🔧 Test JS page loaded");

    // Test if we can find elements
    const testElements = document.querySelectorAll("*");
    console.log("Total elements found:", testElements.length);

    // Test if we can find purple elements
    const purpleElements = document.querySelectorAll('[class*="purple"]');
    console.log("Purple elements found:", purpleElements.length);

    // Test if we can find blue elements
    const blueElements = document.querySelectorAll('[class*="blue"]');
    console.log("Blue elements found:", blueElements.length);

    // Test if we can find progress bars
    const progressBars = document.querySelectorAll(".severity-scale-bar");
    console.log("Progress bars found:", progressBars.length);

    // Test if we can find area headings
    const areaHeadings = document.querySelectorAll(
      'div[class*="bg-gradient-to-b from-gray-600 to-gray-500"]'
    );
    console.log("Area headings found:", areaHeadings.length);

    // Try to change some colors
    purpleElements.forEach((element, index) => {
      console.log(`Purple element ${index}:`, element.className);
      (element as HTMLElement).style.color = "red !important";
    });

    blueElements.forEach((element, index) => {
      console.log(`Blue element ${index}:`, element.className);
      (element as HTMLElement).style.background = "red !important";
    });

    progressBars.forEach((element, index) => {
      console.log(`Progress bar ${index}:`, element.className);
      (element as HTMLElement).style.background = "red !important";
    });

    areaHeadings.forEach((element, index) => {
      console.log(`Area heading ${index}:`, element.className);
      (element as HTMLElement).style.background = "red !important";
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        JavaScript Test Page
      </h1>
      <p className="text-gray-300 mb-4">
        Check the browser console for debug output.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-100 mb-2">
            Purple Test Element
          </h3>
          <p className="text-purple-300">
            This should turn red if JavaScript is working
          </p>
        </div>

        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
          Blue Test Button
        </button>

        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full severity-scale-bar bg-gradient-to-r from-gray-600 to-gray-500"
            style={{ width: "50%" }}
          ></div>
        </div>

        <div className="w-1 h-6 bg-gradient-to-b from-gray-600 to-gray-500 rounded-full"></div>
      </div>
    </div>
  );
}
