import { create } from 'zustand';

interface ToastStore {
  isOpen: boolean;
  text: string;
  setText: (text: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useToast = create<ToastStore>((set) => ({
  isOpen: false,
  text: '',
  setText: (text: string) => set({ text }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useToast;
