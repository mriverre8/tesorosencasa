import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useMemo } from 'react';
import { stream, tesoros } from '@prisma/client';

interface AppContextStore {
  // Data
  tesoros: tesoros[];
  filtersData: Record<string, (string | number)[]>;
  streamData: stream | null;

  // UI State
  filtersState: Record<string, (string | number)[]>;
  searchTermState: string;
  page: number;
  totalPages: number;
  total: number;

  // Loading states
  isLoading: boolean;
  isSearching: boolean;
  hasBeenInitialized: boolean;

  // Actions
  setInitialData: (data: {
    tesoros: tesoros[];
    filtersData: Record<string, (string | number)[]>;
    streamData: stream | null;
    totalPages: number;
    total: number;
  }) => void;
  setTesoros: (tesoros: tesoros[], totalPages: number, total: number) => void;
  setFiltersState: (filtersState: Record<string, (string | number)[]>) => void;
  setSearchTermState: (searchTerm: string) => void;
  setPage: (page: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsSearching: (isSearching: boolean) => void;
  resetFilters: () => void;
}

const useAppContext = create<AppContextStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Data
        tesoros: [],
        filtersData: {},
        streamData: null,

        // UI State
        filtersState: {},
        searchTermState: '',
        page: 1,
        totalPages: 1,
        total: 0,

        // Loading states
        isLoading: false,
        isSearching: false,
        hasBeenInitialized: false,

        // Actions
        setInitialData: (data) =>
          set({
            tesoros: data.tesoros,
            filtersData: data.filtersData,
            streamData: data.streamData,
            totalPages: data.totalPages,
            total: data.total,
            hasBeenInitialized: true,
            isLoading: false,
          }),

        setTesoros: (tesoros, totalPages, total) =>
          set({
            tesoros,
            totalPages,
            total,
            isSearching: false,
          }),

        setFiltersState: (filtersState) => {
          const currentFilters = get().filtersState;
          const filtersChanged =
            JSON.stringify(currentFilters) !== JSON.stringify(filtersState);

          if (filtersChanged) {
            set({
              filtersState,
              page: 1, // Reset to first page when filters change
            });
          }
        },

        setSearchTermState: (searchTermState) => {
          const currentSearchTerm = get().searchTermState;

          if (currentSearchTerm !== searchTermState) {
            set({
              searchTermState,
              page: 1, // Reset to first page when search changes
            });
          }
        },

        setPage: (page) => set({ page }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setIsSearching: (isSearching) => set({ isSearching }),

        resetFilters: () =>
          set({
            filtersState: {},
            searchTermState: '',
            page: 1,
          }),
      }),
      {
        name: 'tesoros-app-storage',
        storage: createJSONStorage(() => localStorage),
        // Only persist UI state, not data that should be fresh on each load
        partialize: (state) => ({
          filtersState: state.filtersState,
          searchTermState: state.searchTermState,
        }),
      }
    )
  )
);

// Individual selectors to avoid object creation on every render
export const useTesoros = () => useAppContext((state) => state.tesoros);
export const useTotal = () => useAppContext((state) => state.total);
export const useTotalPages = () => useAppContext((state) => state.totalPages);

export const useFiltersData = () => useAppContext((state) => state.filtersData);
export const useStreamData = () => useAppContext((state) => state.streamData);

export const useFiltersState = () =>
  useAppContext((state) => state.filtersState);
export const useSearchTermState = () =>
  useAppContext((state) => state.searchTermState);
export const usePage = () => useAppContext((state) => state.page);

export const useIsLoading = () => useAppContext((state) => state.isLoading);
export const useIsSearching = () => useAppContext((state) => state.isSearching);
export const useHasBeenInitialized = () =>
  useAppContext((state) => state.hasBeenInitialized);

// Composite selectors with useMemo for when you need multiple values
export const useTesorosData = () => {
  const tesoros = useTesoros();
  const total = useTotal();
  const totalPages = useTotalPages();

  return useMemo(
    () => ({ tesoros, total, totalPages }),
    [tesoros, total, totalPages]
  );
};

export const useUIState = () => {
  const filtersState = useFiltersState();
  const searchTermState = useSearchTermState();
  const page = usePage();

  return useMemo(
    () => ({ filtersState, searchTermState, page }),
    [filtersState, searchTermState, page]
  );
};

export const useLoadingStates = () => {
  const isLoading = useIsLoading();
  const isSearching = useIsSearching();
  const hasBeenInitialized = useHasBeenInitialized();

  return useMemo(
    () => ({ isLoading, isSearching, hasBeenInitialized }),
    [isLoading, isSearching, hasBeenInitialized]
  );
};

export default useAppContext;
