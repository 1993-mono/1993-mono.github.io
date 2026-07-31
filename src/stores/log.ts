import { create } from 'zustand';

interface LogStore {
  selectedPrimaryTab: string | null;
  selectedSecondaryTab: string | null;
  setSelectedPrimaryTab: (tab: string | null) => void;
  setSelectedSecondaryTab: (tab: string | null) => void;
  resetTabs: () => void;
}

export const useLogStore = create<LogStore>((set) => ({
  selectedPrimaryTab: null,
  selectedSecondaryTab: null,
  setSelectedPrimaryTab: (tab) => set({ selectedPrimaryTab: tab, selectedSecondaryTab: null }),
  setSelectedSecondaryTab: (tab) => set({ selectedSecondaryTab: tab }),
  resetTabs: () => set({ selectedPrimaryTab: null, selectedSecondaryTab: null }),
}));