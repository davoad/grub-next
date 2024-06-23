import { create } from "zustand";

type NewPublicationState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewPublication = create<NewPublicationState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
