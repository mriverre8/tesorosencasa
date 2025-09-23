import { create } from 'zustand';
import { stream, tesoros } from '@prisma/client';

interface AppContextStore {
  hasBeenInitialized: boolean;
  page: number;
  maxPage: number;
  tesoros: tesoros[];
  filtersData: Record<string, (string | number)[]>;
  filtersState: Record<string, (string | number)[]>;
  streamData: stream | null;
  searchTermState: string;
  loading: boolean;
  onInit: () => void;
  setTesoros: (tesoros: tesoros[]) => void;
  setSearchTermState: (searchTerm: string) => void;
  setFiltersData: (filtersData: Record<string, (string | number)[]>) => void;
  setFiltersState: (filtersState: Record<string, (string | number)[]>) => void;
  setStreamData: (streamData: stream | null) => void;
  setPage: (page: number) => void;
  setMaxPage: (maxPage: number) => void;
  setLoading: (loading: boolean) => void;
}

const useAppContext = create<AppContextStore>((set) => ({
  hasBeenInitialized: false,
  tesoros: [],
  filtersData: {},
  filtersState: {},
  searchTermState: '',
  streamData: null,
  page: 1,
  maxPage: 1,
  loading: true,
  onInit: () => set({ hasBeenInitialized: true }),
  setTesoros: (tesoros) => set({ tesoros }),
  setFiltersData: (filtersData) => set({ filtersData }),
  setFiltersState: (filtersState) => set({ filtersState }),
  setSearchTermState: (searchTermState) => set({ searchTermState }),
  setStreamData: (streamData) => set({ streamData }),
  setPage: (page) => set({ page }),
  setMaxPage: (maxPage) => set({ maxPage }),
  setLoading: (loading) => set({ loading }),
}));

export default useAppContext;
