import { create } from 'zustand';

interface StoreProps {
  filtersState: Record<string, (string | number)[]>;
  searchTermState: string;
  setFiltersState: (filtersState: Record<string, (string | number)[]>) => void;
  setSearchTermState: (searchTermState: string) => void;
}

const useStore = create<StoreProps>((set) => ({
  filtersState: {},
  searchTermState: '',
  setFiltersState: (filtersState) => set({ filtersState }),
  setSearchTermState: (searchTermState) => set({ searchTermState }),
}));

export default useStore;
