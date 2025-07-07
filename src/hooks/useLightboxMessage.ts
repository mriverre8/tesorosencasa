import { create } from 'zustand';

interface LightboxMessageStore {
  isOpen: boolean;
  title: string;
  text: string;
  buttonText: string;
  setContent: (title: string, text: string, buttonText: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useLightboxMessage = create<LightboxMessageStore>((set) => ({
  isOpen: false,
  title: '',
  text: '',
  buttonText: '',
  setContent: (title: string, text: string, buttonText: string) =>
    set({ title, text, buttonText }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLightboxMessage;
