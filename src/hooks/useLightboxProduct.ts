import { tesoros } from '@prisma/client';
import { create } from 'zustand';

interface LightboxProductStore {
  isOpen: boolean;
  product: tesoros;
  setContent: (product: tesoros) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useLightboxProduct = create<LightboxProductStore>((set) => ({
  isOpen: false,
  product: {} as tesoros,
  setContent: (product: tesoros) => set({ product }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLightboxProduct;
