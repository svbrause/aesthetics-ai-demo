"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";

export default function TestNewThemePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen medspa-new-theme bg-medspa-bg">
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-medspa-text-primary mb-4">
            New Medspa Theme Test
          </h1>
          <p className="text-medspa-text-secondary mb-4">
            Testing the new color scheme with your specified colors.
          </p>
          <Button
            onClick={toggleTheme}
            className="bg-medspa-primary text-white hover:bg-medspa-secondary"
          >
            Current Theme: {theme} - Click to Toggle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Color Palette Display */}
          <div className="bg-white rounded-lg p-6 border border-medspa-accent-24">
            <h2 className="text-xl font-semibold text-medspa-text-primary mb-4">
              Color Palette
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-medspa-bg border"></div>
                <span className="text-medspa-text-secondary">
                  Main Background: #F8F9FA
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-medspa-bg-secondary border"></div>
                <span className="text-medspa-text-secondary">
                  Secondary Background: #F3F4F6
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-medspa-primary border"></div>
                <span className="text-medspa-text-secondary">
                  Primary Accent: #367588
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded border-2"
                  style={{ backgroundColor: "rgba(54, 117, 136, 0.24)" }}
                ></div>
                <span className="text-medspa-text-secondary">
                  Secondary Accent: #367588 (24%)
                </span>
              </div>
            </div>
          </div>

          {/* Button Examples */}
          <div className="bg-white rounded-lg p-6 border border-medspa-accent-24">
            <h2 className="text-xl font-semibold text-medspa-text-primary mb-4">
              Buttons
            </h2>
            <div className="space-y-3">
              <Button className="w-full bg-medspa-primary text-white hover:bg-medspa-secondary">
                Primary Button
              </Button>
              <Button
                variant="ghost"
                className="w-full border-medspa-primary text-medspa-primary hover:bg-medspa-accent-24"
              >
                Outline Button
              </Button>
              <Button
                variant="ghost"
                className="w-full text-medspa-text-secondary hover:bg-medspa-accent-24"
              >
                Ghost Button
              </Button>
            </div>
          </div>

          {/* Text Examples */}
          <div className="bg-white rounded-lg p-6 border border-medspa-accent-24">
            <h2 className="text-xl font-semibold text-medspa-text-primary mb-4">
              Typography
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-medspa-text-primary">
                Primary Text
              </h3>
              <p className="text-medspa-text-secondary">
                Secondary text color for descriptions and labels.
              </p>
              <p className="text-medspa-text-secondary text-sm">
                Smaller secondary text.
              </p>
            </div>
          </div>

          {/* Card Examples */}
          <div className="bg-white rounded-lg p-6 border border-medspa-accent-24">
            <h2 className="text-xl font-semibold text-medspa-text-primary mb-4">
              Cards
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-medspa-bg-secondary rounded border border-medspa-accent-24">
                <span className="text-medspa-text-primary font-medium">
                  Card with secondary background
                </span>
              </div>
              <div className="p-3 bg-medspa-accent-24 rounded border border-medspa-primary">
                <span className="text-medspa-text-primary font-medium">
                  Card with accent background
                </span>
              </div>
            </div>
          </div>

          {/* Filter Chips Example */}
          <div className="bg-white rounded-lg p-6 border border-medspa-accent-24">
            <h2 className="text-xl font-semibold text-medspa-text-primary mb-4">
              Filter Chips
            </h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-medspa-bg-secondary text-medspa-text-secondary rounded-full border border-medspa-accent-24 hover:bg-medspa-accent-24">
                Unselected
              </button>
              <button className="px-3 py-1 bg-medspa-bg-secondary text-medspa-primary rounded-full border-2 border-medspa-primary">
                Selected ★
              </button>
              <button className="px-3 py-1 bg-medspa-primary text-white rounded-full">
                All Areas
              </button>
            </div>
          </div>

          {/* Progress Bar Example */}
          <div className="bg-white rounded-lg p-6 border border-medspa-accent-24">
            <h2 className="text-xl font-semibold text-medspa-text-primary mb-4">
              Progress Indicators
            </h2>
            <div className="space-y-3">
              <div className="w-full bg-medspa-bg-secondary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-medspa-primary to-medspa-secondary h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <div className="w-full bg-medspa-bg-secondary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-medspa-primary to-medspa-secondary h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg p-6 border border-medspa-accent-24">
          <h2 className="text-xl font-semibold text-medspa-text-primary mb-4">
            How to Apply This Theme
          </h2>
          <div className="text-medspa-text-secondary space-y-2">
            <p>
              1. The new theme is called "medspa-new" and has been added to the
              theme toggle.
            </p>
            <p>
              2. To apply it to the patient detail page, the main container
              already has the "medspa-new-theme" class.
            </p>
            <p>
              3. All the CSS overrides are in place to transform the existing
              dark theme to this light, professional look.
            </p>
            <p>
              4. The theme uses your exact color specifications: #F8F9FA,
              #F3F4F6, #367588, #000000, #6B7280
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
