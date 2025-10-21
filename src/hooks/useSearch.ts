import { useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import useAppContext from './useAppContext';

interface UseSearchParams {
  debounceMs?: number;
}

export const useSearch = ({ debounceMs = 300 }: UseSearchParams = {}) => {
  const {
    setTesoros,
    setIsSearching,
    setFiltersState,
    setSearchTermState,
    filtersState,
    searchTermState,
    page,
  } = useAppContext();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(
    async (
      filters: Record<string, (string | number)[]>,
      searchTerm: string,
      currentPage: number = 1
    ) => {
      try {
        setIsSearching(true);

        if (JSON.stringify(filters) !== JSON.stringify(filtersState)) {
          setFiltersState(filters);
        }
        if (searchTerm !== searchTermState) {
          setSearchTermState(searchTerm);
        }

        const result = await api.searchProducts({
          filters,
          searchTerm,
          page: currentPage,
          pageSize: 10,
        });

        setTesoros(result.data, result.totalPages, result.total);
      } catch (error) {
        console.error('Search error:', error);
        setTesoros([], 0, 0);
      }
    },
    [
      setTesoros,
      setIsSearching,
      setFiltersState,
      setSearchTermState,
      filtersState,
      searchTermState,
    ]
  );

  const debouncedSearch = useCallback(
    (
      filters?: Record<string, (string | number)[]>,
      searchTerm?: string,
      currentPage?: number
    ) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      const effectiveFilters = filters ?? filtersState;
      const effectiveSearchTerm = searchTerm ?? searchTermState;
      const effectivePage = currentPage ?? page;

      debounceRef.current = setTimeout(() => {
        performSearch(effectiveFilters, effectiveSearchTerm, effectivePage);
      }, debounceMs);
    },
    [performSearch, filtersState, searchTermState, page, debounceMs]
  );

  const immediateSearch = useCallback(
    (
      filters?: Record<string, (string | number)[]>,
      searchTerm?: string,
      currentPage?: number
    ) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      const effectiveFilters = filters ?? filtersState;
      const effectiveSearchTerm = searchTerm ?? searchTermState;
      const effectivePage = currentPage ?? page;

      performSearch(effectiveFilters, effectiveSearchTerm, effectivePage);
    },
    [performSearch, filtersState, searchTermState, page]
  );

  return {
    debouncedSearch,
    immediateSearch,
  };
};
