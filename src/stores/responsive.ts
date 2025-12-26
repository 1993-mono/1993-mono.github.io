import { create } from "zustand";

export type ResponsiveMode = "pc" | "mobile";

interface ResponsiveStore {
  mode: ResponsiveMode;
  setMode: (mode: ResponsiveMode) => void;
}

export const useResponsiveStore = create<ResponsiveStore>((set) => ({
  mode: "pc",
  setMode: (mode) => set({ mode }),
}));

