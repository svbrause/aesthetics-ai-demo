"use client";

import { useEffect } from "react";

export default function TestCSSPage() {
  useEffect(() => {
    // Apply gold theme
    document.documentElement.classList.remove("light", "dark", "gold-theme");
    document.documentElement.classList.add("gold-theme");
  }, []);

  return (
    <div className="gold-theme p-8">
      <h1 className="text-2xl font-bold text-white mb-4">CSS Test Page</h1>
      <p className="text-gray-300 mb-4">
        Testing if CSS overrides are working.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-100 mb-2">
            Purple Test Element
          </h3>
          <p className="text-purple-300">
            This should turn gold if CSS is working
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
