import { create } from 'zustand';

interface LightboxOptionsStore {
  isOpen: boolean;
  title: string;
  text: string;
  buttonText1: string;
  buttonText2: string;
  onAccept: () => void;
  setContent: (
    title: string,
    text: string,
    buttonText1: string,
    buttonText2: string,
    onAccept: () => void
  ) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useLightboxOptions = create<LightboxOptionsStore>((set) => ({
  isOpen: false,
  title: '',
  text: '',
  buttonText1: '',
  buttonText2: '',
  onAccept: () => {},
  setContent: (
    title: string,
    text: string,
    buttonText1: string,
    buttonText2: string,
    onAccept: () => void
  ) => set({ title, text, buttonText1, buttonText2, onAccept }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLightboxOptions;
