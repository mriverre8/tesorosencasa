import { tesoros } from '@prisma/client';
import { create } from 'zustand';

interface LightboxProductStore {
  isOpen: boolean;
  product: tesoros;
  onDelete: () => void;
  setContent: (product: tesoros, onAccept: () => void) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useLightboxProduct = create<LightboxProductStore>((set) => ({
  isOpen: false,
  product: {} as tesoros,
  onDelete: () => {},
  setContent: (product: tesoros, onDelete: () => void) =>
    set({ product, onDelete }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLightboxProduct;
