import { create } from 'zustand';

interface LightboxOptionsStore {
  isOpen: boolean;
  title: string;
  text: string;
  buttonText1: string;
  buttonText2: string;
  isAlternative: boolean;
  onAccept: () => void;
  setContent: (
    title: string,
    text: string,
    buttonText1: string,
    buttonText2: string,
    isAlternative: boolean,
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
  isAlternative: false,
  onAccept: () => {},
  setContent: (
    title: string,
    text: string,
    buttonText1: string,
    buttonText2: string,
    isAlternative: boolean,
    onAccept: () => void
  ) => set({ title, text, buttonText1, buttonText2, isAlternative, onAccept }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLightboxOptions;
