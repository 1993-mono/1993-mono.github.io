"use client";

import { useEffect } from "react";
import { useResponsiveStore, type ResponsiveMode } from "@/stores/responsive";

export default function ResponsiveDetector() {
  const setMode = useResponsiveStore((state) => state.setMode);

  useEffect(() => {
    const updateMode = () => {
      if (typeof window !== "undefined") {
        const newMode: ResponsiveMode = window.innerWidth > 1460 ? "pc" : "mobile";
        setMode(newMode);
      }
    };

    updateMode();

    window.addEventListener("resize", updateMode);

    return () => {
      window.removeEventListener("resize", updateMode);
    };
  }, [setMode]);

  return null;
}

