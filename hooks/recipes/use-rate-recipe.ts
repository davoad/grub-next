import { create } from "zustand";

type RatingState = {
  recipeId: number | null;
  isOpen: boolean;
  onOpen: (recipeId: number) => void;
  onClose: () => void;
};

export const useRateRecipe = create<RatingState>((set) => ({
  recipeId: null,
  isOpen: false,
  onOpen: (recipeId: number) => set({ isOpen: true, recipeId }),
  onClose: () => set({ isOpen: false, recipeId: null }),
}));
