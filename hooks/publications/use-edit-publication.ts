import { create } from "zustand";

type EditPublicationState = {
  id: number | null;
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
};

export const useEditPublication = create<EditPublicationState>((set) => ({
  id: null,
  isOpen: false,
  onOpen: (id: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}));
