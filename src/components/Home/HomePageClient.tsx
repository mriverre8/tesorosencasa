'use client';

import React, { useEffect, useState, useCallback } from 'react';

// Components
import SearchBar from './SearchBar/SearchBar';
import CardMobile from './CardMobile/CardMobile';
import Card from './Card/Card';
import StreamCardSkeleton from '../common/StreamCardSkeleton';
import ActiveFiltersContainer from './ActiveFiltersContainer.tsx/ActiveFiltersContainer';
import StreamCard from '../common/StreamCard';
import LightboxFilters from './LightboxFilters/LightboxFilters';
import CardMobileSkeleton from './CardMobile/CardMobileSkeleton';
import CardSkeleton from './Card/CardSkeleton';

// Hooks
import useLoader from '@/hooks/useLoader';
import useAppContext, {
  useTesoros,
  useTotalPages,
  useFiltersState,
  useSearchTermState,
  usePage,
  useIsSearching,
  useHasBeenInitialized,
  useStreamData,
  useFiltersData,
} from '@/hooks/useAppContext';
import { useSearch } from '@/hooks/useSearch';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Types
import { tesoros, stream } from '@prisma/client';

interface InitialData {
  tesoros: tesoros[];
  total: number;
  totalPages: number;
  filtersData: Record<string, (string | number)[]>;
  streamData: stream | null;
}

interface Props {
  initialData: InitialData;
}

const HomePageClient = ({ initialData }: Props) => {
  const translate = useTranslations();
  const loader = useLoader();

  const { setInitialData, setPage } = useAppContext();
  const tesoros = useTesoros();
  const totalPages = useTotalPages();
  const filtersState = useFiltersState();
  const searchTermState = useSearchTermState();
  const page = usePage();
  const isSearching = useIsSearching();
  const hasBeenInitialized = useHasBeenInitialized();
  const streamData = useStreamData();
  const filtersData = useFiltersData();

  const { immediateSearch } = useSearch({ debounceMs: 300 });

  const [isLightboxFiltersOpen, setIsLightboxFiltersOpen] = useState(false);

  // Initialize store with server data and handle persisted filters
  useEffect(() => {
    if (!hasBeenInitialized) {
      setInitialData(initialData);

      // After initialization, check if there are persisted filters to apply
      setTimeout(() => {
        const state = useAppContext.getState();
        const hasPersistedFilters =
          Object.keys(state.filtersState).length > 0 ||
          state.searchTermState.trim() !== '';

        if (hasPersistedFilters) {
          // Apply persisted filters
          immediateSearch(state.filtersState, state.searchTermState, 1);
        }
      }, 100); // Small delay to ensure store is fully hydrated
    }
  }, [hasBeenInitialized, initialData, setInitialData, immediateSearch]);

  const handleFiltersChange = useCallback(
    async (
      optionalFilters?: Record<string, (string | number)[]>,
      optionalSearchTerm?: string
    ) => {
      loader.onOpen();

      try {
        // Update the store with new filters and search term first
        const { setFiltersState, setSearchTermState } =
          useAppContext.getState();

        if (optionalFilters !== undefined) {
          setFiltersState(optionalFilters);
        }

        if (optionalSearchTerm !== undefined) {
          setSearchTermState(optionalSearchTerm);
        }

        // Then perform the search with updated values
        await immediateSearch(optionalFilters, optionalSearchTerm, 1);
      } catch (error) {
        console.error('Error changing filters:', error);
      } finally {
        loader.onClose();
      }
    },
    [immediateSearch, loader]
  );

  const handleNextPage = useCallback(async () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      await immediateSearch(filtersState, searchTermState, newPage);
      window.scrollTo(0, 0);
    }
  }, [
    page,
    totalPages,
    setPage,
    immediateSearch,
    filtersState,
    searchTermState,
  ]);

  const handlePrevPage = useCallback(async () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      await immediateSearch(filtersState, searchTermState, newPage);
      window.scrollTo(0, 0);
    }
  }, [page, setPage, immediateSearch, filtersState, searchTermState]);

  const isLoading = !hasBeenInitialized;

  return (
    <>
      <div className="my-2.5">
        {/* Stream Section */}
        <>
          {streamData && (
            <p className="text-sm font-medium mb-2">
              {translate('NEXT_STREAM')}
            </p>
          )}
          <div
            className={`flex flex-col gap-2 sticky top-20 z-50 ${streamData || isLoading ? 'mb-6' : ''}`}
          >
            {isLoading ? (
              <StreamCardSkeleton />
            ) : (
              <>{streamData && <StreamCard data={streamData} />}</>
            )}
          </div>
        </>

        {/* Filters Section */}
        <ActiveFiltersContainer
          filters={filtersState}
          onChangeFilters={handleFiltersChange}
        />

        {/* Search Section */}
        <SearchBar
          isLightboxFiltersOpen={isLightboxFiltersOpen}
          setIsLightboxFiltersOpen={setIsLightboxFiltersOpen}
          disabled={tesoros.length === 0 && !isSearching}
        />

        {/* Products Grid */}
        {isLoading || isSearching ? (
          <div className="mt-5">
            <div className="block mobile:hidden">
              <CardMobileSkeleton />
            </div>
            <div className="hidden mobile:grid mobile:grid-cols-2 mobile:gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[...Array(10)].map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : tesoros.length > 0 ? (
          <div className="mb-6">
            <div className="mt-5 mobile:grid mobile:grid-cols-2 mobile:gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {tesoros.map((tesoro: tesoros) => (
                <div key={tesoro.id}>
                  <div className="block mobile:hidden">
                    <CardMobile tesoro={tesoro} />
                    {tesoros.indexOf(tesoro) !== tesoros.length - 1 && (
                      <div className="w-full border-b border-gray-300 my-4" />
                    )}
                  </div>
                  <div className="hidden mobile:block">
                    <Card tesoro={tesoro} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className={`${page === 1 ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary-hover'} rounded-md p-0.5 flex items-center justify-center`}
                onClick={handlePrevPage}
                disabled={page === 1 || isSearching}
              >
                <IoIosArrowBack className="text-2xl text-white" />
              </button>
              <div>
                <span>{page}</span> de <span>{totalPages}</span>
              </div>
              <button
                className={`${page === totalPages ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary-hover'} rounded-md p-0.5 flex items-center justify-center`}
                onClick={handleNextPage}
                disabled={page === totalPages || isSearching}
              >
                <IoIosArrowForward className="text-2xl text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center my-24">
            <p className="text-center text-gray-400 text-sm">
              {translate('NO_TREASURES_FOUND')}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Filters */}
      <LightboxFilters
        isLightboxOpen={isLightboxFiltersOpen}
        closeLightbox={() => setIsLightboxFiltersOpen(false)}
        filtersData={filtersData}
        filters={filtersState}
        onChangeFilters={handleFiltersChange}
      />
    </>
  );
};

export default HomePageClient;
