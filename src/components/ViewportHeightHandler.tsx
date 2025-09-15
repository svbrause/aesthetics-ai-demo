"use client";

import { useEffect } from "react";
import { initViewportHeight } from "@/lib/utils";

export function ViewportHeightHandler() {
  useEffect(() => {
    initViewportHeight();
  }, []);

  return null;
}
