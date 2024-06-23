import { create } from "zustand";

type EditRecipeState = {
  id: number | null;
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
};

export const useEditRecipe = create<EditRecipeState>((set) => ({
  id: null,
  isOpen: false,
  onOpen: (id: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}));
