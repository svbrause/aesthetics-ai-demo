"use client";

import { usePathname } from "next/navigation";
import { useNavigation } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";

interface NavigationProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  customBackAction?: () => void;
  className?: string;
}

export function Navigation({
  showBackButton = true,
  showHomeButton = false,
  customBackAction,
  className = "",
}: NavigationProps) {
  const pathname = usePathname();
  const { goBack, navigateToHome, navigateToProviderDashboard } =
    useNavigation();

  // Don't show navigation on welcome screen
  if (pathname === "/") {
    return null;
  }

  const handleBack = () => {
    if (customBackAction) {
      customBackAction();
    } else {
      goBack();
    }
  };

  const handleHome = () => {
    if (pathname.startsWith("/provider")) {
      navigateToProviderDashboard();
    } else {
      navigateToHome();
    }
  };

  return (
    <div className={`flex items-center gap-2 p-4 ${className}`}>
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          ← Back
        </Button>
      )}

      {showHomeButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHome}
          className="flex items-center gap-2"
        >
          🏠 Home
        </Button>
      )}
    </div>
  );
}
