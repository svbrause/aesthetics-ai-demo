// Theme utility functions for consistent styling across different themes
import { useEffect } from "react";
export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  text: string;
  border: string;
  gradient: string;
  progressBar: string;
}

export const THEME_COLORS: Record<string, ThemeColors> = {
  medspa: {
    primary: "#c08497",
    primaryLight: "#D4A5A9",
    primaryDark: "#a8717a",
    background: "#f8f9fa",
    text: "#f9fafb",
    border: "#e5e7eb",
    gradient: "linear-gradient(to right, #c08497, #a8717a)",
    progressBar: "linear-gradient(90deg, #c08497 0%, #a8717a 100%)",
  },
  gold: {
    primary: "#c49d6b",
    primaryLight: "#d4b876",
    primaryDark: "#8b6f4a",
    background: "#1a1a1a",
    text: "#f0d4a3",
    border: "#6b5a47",
    gradient:
      "linear-gradient(to right, #6b5a47, #8b6f4a, #aa8960, #c49d6b, #d4b876)",
    progressBar:
      "linear-gradient(90deg, #6b5a47 0%, #8b6f4a 25%, #aa8960 50%, #c49d6b 75%, #d4b876 100%)",
  },
};

export interface ThemeStyleConfig {
  areaHeadings: {
    background: string;
    border: string;
    color: string;
  };
  progressBars: {
    background: string;
  };
  purpleElements: {
    background: string;
    text: Record<string, string>;
    border: Record<string, string>;
  };
  blueElements: {
    background: string;
  };
  buttons: {
    selected: {
      background: string;
      border: string;
      color: string;
    };
    unselected: {
      background: string;
      border: string;
      color: string;
    };
  };
}

export const THEME_CONFIGS: Record<string, ThemeStyleConfig> = {
  medspa: {
    areaHeadings: {
      background: "#4b5563",
      border: "1px solid #374151",
      color: "#ffffff",
    },
    progressBars: {
      background: "linear-gradient(90deg, #c08497 0%, #a8717a 100%)",
    },
    purpleElements: {
      background:
        "linear-gradient(to right, rgba(192, 132, 151, 0.1), rgba(168, 113, 122, 0.1))",
      text: {
        "text-purple-100": "#f9fafb",
        "text-purple-300": "#c08497",
        "text-purple-400": "#c08497",
      },
      border: {
        "border-purple-400/30": "rgba(192, 132, 151, 0.3)",
        "border-purple-400/50": "rgba(192, 132, 151, 0.5)",
      },
    },
    blueElements: {
      background: "linear-gradient(to right, #c08497, #a8717a)",
    },
    buttons: {
      selected: {
        background: "#c08497",
        border: "#c08497",
        color: "white",
      },
      unselected: {
        background: "#f3f4f6",
        border: "#e5e7eb",
        color: "#6b7280",
      },
    },
  },
  gold: {
    areaHeadings: {
      background: "linear-gradient(to bottom, #1a1a1a, #262626)",
      border: "1px solid #6b5a47",
      color: "#f0d4a3",
    },
    progressBars: {
      background:
        "linear-gradient(90deg, #6b5a47 0%, #8b6f4a 25%, #aa8960 50%, #c49d6b 75%, #d4b876 100%)",
    },
    purpleElements: {
      background:
        "linear-gradient(to right, rgba(170, 137, 96, 0.1), rgba(196, 157, 107, 0.1))",
      text: {
        "text-purple-100": "#f0d4a3",
        "text-purple-300": "#c49d6b",
        "text-purple-400": "#c49d6b",
      },
      border: {
        "border-purple-400/30": "rgba(170, 137, 96, 0.3)",
        "border-purple-400/50": "rgba(170, 137, 96, 0.5)",
      },
    },
    blueElements: {
      background:
        "linear-gradient(to right, #6b5a47, #8b6f4a, #aa8960, #c49d6b, #d4b876)",
    },
    buttons: {
      selected: {
        background: "#c49d6b",
        border: "#c49d6b",
        color: "white",
      },
      unselected: {
        background: "#2a2a2a",
        border: "#6b5a47",
        color: "#f0d4a3",
      },
    },
  },
};

export function applyThemeStyles(theme: string) {
  const config = THEME_CONFIGS[theme];
  if (!config) {
    console.warn(`Theme config not found for: ${theme}`);
    return;
  }

  console.log(`🔧 Applying ${theme} theme styles...`);

  // Apply area headings
  const areaHeadings = document.querySelectorAll(
    'div[class*="bg-gradient-to-b from-gray-600 to-gray-500"], div[class*="bg-gradient-to-b from-gray-800 to-gray-700"], div[class*="sticky top-0"], div[class*="bg-gray-900/95"]'
  );
  areaHeadings.forEach((heading) => {
    const element = heading as HTMLElement;
    element.style.background = `${config.areaHeadings.background} !important`;
    element.style.border = `${config.areaHeadings.border} !important`;
    element.style.color = `${config.areaHeadings.color} !important`;
    element.style.backdropFilter = "none !important";
  });

  // Apply progress bars
  const progressBars = document.querySelectorAll(
    'div[style*="background:linear-gradient(to right, #374151, #6b7280)"], .severity-scale-bar, div[class*="severity-scale"]'
  );
  progressBars.forEach((bar) => {
    (
      bar as HTMLElement
    ).style.background = `${config.progressBars.background} !important`;
  });

  // Apply purple elements
  const purpleElements = document.querySelectorAll(
    'div[class*="from-purple-500"], span[class*="text-purple"], button[class*="text-purple"], div[class*="border-purple"], [class*="purple"]'
  );
  purpleElements.forEach((element) => {
    const htmlElement = element as HTMLElement;

    // Apply background
    if (htmlElement.className.includes("from-purple-500")) {
      htmlElement.style.background = `${config.purpleElements.background} !important`;
    }

    // Apply text colors
    Object.entries(config.purpleElements.text).forEach(([className, color]) => {
      if (htmlElement.classList.contains(className)) {
        htmlElement.style.color = `${color} !important`;
      }
    });

    // Apply border colors
    Object.entries(config.purpleElements.border).forEach(
      ([className, color]) => {
        if (htmlElement.className.includes(className)) {
          htmlElement.style.borderColor = `${color} !important`;
        }
      }
    );
  });

  // Apply blue elements
  const blueElements = document.querySelectorAll(
    'button[class*="from-blue-600"], button[class*="to-purple-600"], [class*="blue"]'
  );
  blueElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    if (
      htmlElement.className.includes("from-blue-600") ||
      htmlElement.className.includes("to-purple-600")
    ) {
      htmlElement.style.background = `${config.blueElements.background} !important`;
    }
  });

  // Apply button styles
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    const htmlButton = button as HTMLElement;
    const text = htmlButton.textContent?.trim() || "";

    if (text === "All Areas" || text === "Analysis") {
      // Selected state
      htmlButton.style.backgroundColor = `${config.buttons.selected.background} !important`;
      htmlButton.style.borderColor = `${config.buttons.selected.border} !important`;
      htmlButton.style.color = `${config.buttons.selected.color} !important`;
    } else if (
      text.includes("★") ||
      text.includes("Nose") ||
      text.includes("Mouth") ||
      text.includes("Eyes")
    ) {
      // Filter chips
      const isActive =
        htmlButton.hasAttribute("active") ||
        htmlButton.classList.contains("active") ||
        htmlButton.getAttribute("aria-pressed") === "true";

      if (isActive) {
        htmlButton.style.backgroundColor = `${config.buttons.selected.background} !important`;
        htmlButton.style.borderColor = `${config.buttons.selected.border} !important`;
        htmlButton.style.color = `${config.buttons.selected.color} !important`;
      } else {
        htmlButton.style.backgroundColor = `${config.buttons.unselected.background} !important`;
        htmlButton.style.borderColor = `${config.buttons.unselected.border} !important`;
        htmlButton.style.color = `${config.buttons.unselected.color} !important`;
      }
    }
  });

  console.log(`✅ ${theme} theme styles applied`);
}

export function createThemeHook(themeName: string, themeClass: string) {
  return function useThemeHook() {
    useEffect(() => {
      // Apply theme class
      document.documentElement.classList.remove(
        "light",
        "dark",
        "gold-theme",
        "medspa-theme"
      );
      document.documentElement.classList.add(themeClass);

      // Apply styles immediately
      applyThemeStyles(themeName);

      // Apply styles with delays to catch dynamically rendered elements
      const timeouts = [
        setTimeout(() => applyThemeStyles(themeName), 1000),
        setTimeout(() => applyThemeStyles(themeName), 3000),
        setTimeout(() => applyThemeStyles(themeName), 5000),
        setTimeout(() => applyThemeStyles(themeName), 10000),
      ];

      // Watch for dynamically added elements
      const observer = new MutationObserver((mutations) => {
        const shouldApply = mutations.some(
          (mutation) =>
            mutation.type === "childList" && mutation.addedNodes.length > 0
        );
        if (shouldApply) {
          setTimeout(() => applyThemeStyles(themeName), 100);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Cleanup
      return () => {
        timeouts.forEach(clearTimeout);
        observer.disconnect();
        document.documentElement.classList.remove(
          "light",
          "dark",
          "gold-theme",
          "medspa-theme"
        );
        document.documentElement.classList.add("dark");
      };
    }, []);
  };
}
