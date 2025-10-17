"use client";

import { Button } from "@/components/ui/Button";

export default function TestButtonStylesPage() {
  return (
    <div className="min-h-screen bg-medspa-bg text-medspa-text-primary medspa-new-theme p-8">
      <h1 className="text-4xl font-bold mb-8">Button Styles Test Page</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Test 1: medspa-btn-primary class
          </h2>
          <Button className="medspa-btn-primary">
            Test Button with medspa-btn-primary
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Test 2: Add All button classes
          </h2>
          <Button className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 hover:from-gray-600 hover:to-gray-500 border border-gray-500">
            Add All (Original Classes)
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Test 3: Add to Shortlist button classes
          </h2>
          <Button className="bg-white text-black hover:bg-gray-100 hover:scale-105 shadow-lg h-9 rounded-md px-3 transition-all duration-300 medspa-btn-primary">
            Add to Shortlist (Mixed Classes)
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Test 4: Direct CSS test
          </h2>
          <button
            className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 hover:from-gray-600 hover:to-gray-500 border border-gray-500 px-4 py-2 rounded"
            style={{ backgroundColor: "#367588", color: "white" }}
          >
            Add All (With Inline Style Override)
          </button>
        </div>
      </div>
    </div>
  );
}

