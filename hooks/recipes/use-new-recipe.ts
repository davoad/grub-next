import { create } from "zustand";

type NewRecipeState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewRecipe = create<NewRecipeState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
