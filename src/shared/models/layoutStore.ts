import { create } from "zustand";

interface LayoutStore {
  isFolded: boolean;
  toggleFold: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isFolded: false,
  toggleFold: () => set((state) => ({ isFolded: !state.isFolded })),
}));
