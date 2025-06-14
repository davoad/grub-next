import { create } from "zustand";

type NewPublicationState = {
  isOpen: boolean;
  newPublicationId: number | null;
  onOpen: () => void;
  onClose: () => void;
  setNewPublicationId: (id: number | null) => void;
};

export const useNewPublication = create<NewPublicationState>((set) => ({
  isOpen: false,
  newPublicationId: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setNewPublicationId: (id) => set({ newPublicationId: id }),
}));
