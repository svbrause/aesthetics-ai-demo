"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ComponentCustomizerPage() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [customClasses, setCustomClasses] = useState<string>("");

  const utilityClasses = [
    // Background Colors
    {
      name: "Primary Background",
      class: "medspa-primary-bg",
      description: "#367588",
    },
    {
      name: "Secondary Background",
      class: "medspa-secondary-bg",
      description: "#2c5f6b",
    },
    {
      name: "Accent 24% Background",
      class: "medspa-accent-24-bg",
      description: "rgba(54, 117, 136, 0.24)",
    },
    {
      name: "Main Background",
      class: "medspa-bg-main",
      description: "#F8F9FA",
    },
    {
      name: "Secondary Background",
      class: "medspa-bg-secondary",
      description: "#F3F4F6",
    },

    // Text Colors
    {
      name: "Primary Text",
      class: "medspa-primary-text",
      description: "#367588",
    },
    {
      name: "Secondary Text",
      class: "medspa-secondary-text",
      description: "#2c5f6b",
    },
    {
      name: "Text Primary",
      class: "medspa-text-primary",
      description: "#000000",
    },
    {
      name: "Text Secondary",
      class: "medspa-text-secondary",
      description: "#6B7280",
    },
    {
      name: "Text on Primary",
      class: "medspa-text-on-primary",
      description: "white",
    },

    // Border Colors
    {
      name: "Primary Border",
      class: "medspa-primary-border",
      description: "#367588",
    },
    {
      name: "Secondary Border",
      class: "medspa-secondary-border",
      description: "#2c5f6b",
    },
    {
      name: "Accent Border",
      class: "medspa-border-accent",
      description: "rgba(54, 117, 136, 0.24)",
    },
    {
      name: "Primary Border (2px)",
      class: "medspa-border-primary",
      description: "#367588, 2px width",
    },

    // Button Variants
    {
      name: "Primary Button",
      class: "medspa-btn-primary",
      description: "Primary color button",
    },
    {
      name: "Secondary Button",
      class: "medspa-btn-secondary",
      description: "Secondary color button",
    },
    {
      name: "Outline Button",
      class: "medspa-btn-outline",
      description: "Outline button",
    },

    // Card Variants
    {
      name: "Primary Card",
      class: "medspa-card-primary",
      description: "Primary color card",
    },
    {
      name: "Secondary Card",
      class: "medspa-card-secondary",
      description: "Secondary color card",
    },
    {
      name: "Accent Card",
      class: "medspa-card-accent",
      description: "Accent color card",
    },

    // Progress Bars
    {
      name: "Primary Progress",
      class: "medspa-progress-primary",
      description: "Primary gradient progress",
    },
    {
      name: "Progress Background",
      class: "medspa-progress-bg",
      description: "Progress bar background",
    },

    // Shadows
    {
      name: "Primary Shadow",
      class: "medspa-shadow-primary",
      description: "Primary color shadow",
    },
    {
      name: "Secondary Shadow",
      class: "medspa-shadow-secondary",
      description: "Secondary color shadow",
    },
  ];

  const components = [
    {
      name: "Analysis Tab",
      id: "analysis-tab",
      currentClass:
        "bg-gradient-to-r from-medspa-primary to-medspa-secondary text-white",
    },
    {
      name: "Add to Shortlist Button",
      id: "add-shortlist-btn",
      currentClass: "bg-medspa-primary text-white",
    },
    {
      name: "Filter Chips",
      id: "filter-chips",
      currentClass:
        "bg-medspa-bg-secondary text-medspa-text-secondary border-medspa-accent-24",
    },
    {
      name: "Progress Bars",
      id: "progress-bars",
      currentClass: "medspa-progress-primary",
    },
    {
      name: "Area Headings",
      id: "area-headings",
      currentClass: "bg-medspa-gray-600 text-white",
    },
    {
      name: "Finding Cards",
      id: "finding-cards",
      currentClass: "bg-white border-medspa-accent-24",
    },
  ];

  const handleClassSelect = (className: string) => {
    if (selectedComponent) {
      setCustomClasses((prev) => {
        const classes = prev
          .split(" ")
          .filter((c) => !utilityClasses.some((u) => u.class === c));
        return [...classes, className].join(" ");
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen medspa-new-theme bg-medspa-bg p-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-medspa-text-primary mb-8">
          Component Customizer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Component Selector */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-medspa-text-primary mb-4">
                Select Component to Customize
              </h2>
              <div className="space-y-3">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      selectedComponent === component.id
                        ? "medspa-card-primary"
                        : "medspa-card-secondary"
                    }`}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm opacity-75 mt-1">
                      Current: {component.currentClass}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Custom Classes Input */}
            {selectedComponent && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-medspa-text-primary mb-4">
                  Custom Classes for{" "}
                  {components.find((c) => c.id === selectedComponent)?.name}
                </h3>
                <div className="space-y-4">
                  <textarea
                    value={customClasses}
                    onChange={(e) => setCustomClasses(e.target.value)}
                    className="w-full p-3 border border-medspa-accent-24 rounded-lg bg-white text-medspa-text-primary"
                    rows={3}
                    placeholder="Enter custom classes here..."
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(customClasses)}
                      className="medspa-btn-primary"
                    >
                      Copy Classes
                    </Button>
                    <Button
                      onClick={() => setCustomClasses("")}
                      className="medspa-btn-outline"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Utility Classes */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-medspa-text-primary mb-4">
                Available Utility Classes
              </h2>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {utilityClasses.map((utility) => (
                  <button
                    key={utility.class}
                    onClick={() => handleClassSelect(utility.class)}
                    className="p-3 text-left rounded-lg border medspa-card-secondary hover:medspa-card-accent transition-all"
                  >
                    <div className="font-medium text-medspa-text-primary">
                      {utility.name}
                    </div>
                    <div className="text-sm text-medspa-text-secondary">
                      {utility.class}
                    </div>
                    <div className="text-xs text-medspa-text-secondary mt-1">
                      {utility.description}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Preview */}
            {selectedComponent && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-medspa-text-primary mb-4">
                  Preview
                </h3>
                <div className="space-y-4">
                  {selectedComponent === "analysis-tab" && (
                    <Button className={`px-6 py-3 ${customClasses}`}>
                      Analysis Tab Preview
                    </Button>
                  )}
                  {selectedComponent === "add-shortlist-btn" && (
                    <Button className={`px-4 py-2 ${customClasses}`}>
                      Add to Shortlist
                    </Button>
                  )}
                  {selectedComponent === "filter-chips" && (
                    <div className="flex gap-2">
                      <button
                        className={`px-3 py-1 rounded-full ${customClasses}`}
                      >
                        Filter Chip
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full ${customClasses}`}
                      >
                        Selected ★
                      </button>
                    </div>
                  )}
                  {selectedComponent === "progress-bars" && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${customClasses}`}
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  )}
                  {selectedComponent === "area-headings" && (
                    <div className={`px-4 py-2 rounded ${customClasses}`}>
                      Area Heading Preview
                    </div>
                  )}
                  {selectedComponent === "finding-cards" && (
                    <div className={`p-4 rounded-lg border ${customClasses}`}>
                      <h4 className="font-medium">Finding Card Preview</h4>
                      <p className="text-sm mt-2">
                        This is a finding card with your custom styling.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Usage Instructions */}
        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-semibold text-medspa-text-primary mb-4">
            How to Use This Tool
          </h2>
          <div className="space-y-3 text-medspa-text-secondary">
            <p>
              1. <strong>Select a component</strong> from the left panel that
              you want to customize
            </p>
            <p>
              2. <strong>Click utility classes</strong> from the right panel to
              add them to your component
            </p>
            <p>
              3. <strong>Preview the changes</strong> in the preview section
            </p>
            <p>
              4. <strong>Copy the classes</strong> and apply them to your actual
              component
            </p>
            <p>
              5. <strong>Example usage:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                className="medspa-btn-primary medspa-shadow-primary"
              </code>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

