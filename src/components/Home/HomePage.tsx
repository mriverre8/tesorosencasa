'use client';

import React, { useEffect, useState } from 'react';

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
import useAppContext from '@/hooks/useAppContext';

// Actions
import { getProductsByFilters } from '@/actions/getProductsByFilters';
import { getProducts } from '@/actions/getProducts';
import { getFilters } from '@/actions/getFilters';
import { getStream } from '@/actions/getStream';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Constants
import { PAGE_SIZE } from '@/constants/constants';

const HomePage = () => {
  const translate = useTranslations();
  const loader = useLoader();

  const context = useAppContext();

  const [isLightboxFiltersOpen, setIsLightboxFiltersOpen] = useState(false);

  const [loading, setLoading] = useState(!context.hasBeenInitialized);

  useEffect(() => {
    const fetchData = async () => {
      const [initialTesoros, initialFilters, stream] = await Promise.all([
        getProducts(),
        getFilters(),
        getStream(),
      ]);

      context.setTesoros(initialTesoros.data);
      context.setMaxPage(Math.ceil(initialTesoros.total / PAGE_SIZE));
      context.setFiltersData(initialFilters);
      context.setStreamData(stream);
      context.onInit();

      setLoading(false);
    };

    if (!context.hasBeenInitialized) {
      fetchData();
    }
  }, []);

  const onChangeFilters = async (
    optionalFilters?: Record<string, (string | number)[]>,
    optionalSearchTerm?: string
  ) => {
    const effectiveFilters = optionalFilters ?? context.filtersState;
    const effectiveSearchTerm = optionalSearchTerm ?? context.searchTermState;

    loader.onOpen();
    context.setFiltersState(effectiveFilters);
    context.setSearchTermState(effectiveSearchTerm);
    const filteredTesoros = await getProductsByFilters(
      1,
      effectiveFilters,
      effectiveSearchTerm
    );
    context.setTesoros(filteredTesoros.data);
    context.setMaxPage(Math.ceil(filteredTesoros.total / PAGE_SIZE));
    context.setPage(1);
    loader.onClose();
  };
  const handleNextPage = async () => {
    const newTesoros = await getProductsByFilters(
      context.page + 1,
      context.filtersState,
      context.searchTermState
    );
    context.setTesoros(newTesoros.data);
    context.setPage(context.page + 1);
    window.scrollTo(0, 0);
  };
  const handlePrevPage = async () => {
    const newTesoros = await getProductsByFilters(
      context.page - 1,
      context.filtersState,
      context.searchTermState
    );
    context.setTesoros(newTesoros.data);
    context.setPage(context.page - 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="my-2.5">
        <>
          {context.streamData && (
            <p className="text-sm font-medium mb-2">
              {translate('NEXT_STREAM')}
            </p>
          )}
          <div
            className={`flex flex-col gap-2 sticky top-20 z-50 ${context.streamData || loading ? 'mb-6' : ''}`}
          >
            {loading ? (
              <StreamCardSkeleton />
            ) : (
              <>
                {context.streamData && <StreamCard data={context.streamData} />}
              </>
            )}
          </div>
        </>

        <ActiveFiltersContainer
          filters={context.filtersState}
          onChangeFilters={onChangeFilters}
        />

        <SearchBar
          isLightboxFiltersOpen={isLightboxFiltersOpen}
          setIsLightboxFiltersOpen={setIsLightboxFiltersOpen}
          onChangeFilters={onChangeFilters}
          disabled={context.tesoros.length === 0}
        />

        {loading ? (
          <div className="mt-5">
            <div className="block mobile:hidden">
              <CardMobileSkeleton />
            </div>
            <div className="hidden mobile:grid mobile:grid-cols-2 mobile:gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[...Array(PAGE_SIZE)].map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : context.tesoros.length > 0 ? (
          <div className="mb-6">
            <div className="mt-5 mobile:grid mobile:grid-cols-2 mobile:gap-4 sm:grid-cols-3 lg:grid-cols-5 ">
              {context.tesoros.map((tesoro, index) => (
                <div key={index}>
                  <div className="block mobile:hidden">
                    <CardMobile tesoro={tesoro} />
                    {index !== context.tesoros.length - 1 && (
                      <div className="w-full border-b border-gray-300 my-4" />
                    )}
                  </div>
                  <div className="hidden mobile:block">
                    <Card tesoro={tesoro} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-8  ">
              <button
                className={` ${context.page === 1 ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary-hover'} rounded-md p-0.5 flex items-center justify-center`}
                onClick={() => handlePrevPage()}
                disabled={context.page === 1}
              >
                <IoIosArrowBack className="text-2xl text-white" />
              </button>
              <div>
                <span>{context.page}</span> de <span>{context.maxPage}</span>
              </div>
              <button
                className={` ${context.page === context.maxPage ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary-hover'} rounded-md p-0.5 flex items-center justify-center`}
                onClick={() => handleNextPage()}
                disabled={context.page === context.maxPage}
              >
                <IoIosArrowForward className="text-2xl text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center my-24 ">
            <p className="text-center text-gray-400 text-sm">
              {translate('NO_TREASURES_FOUND')}
            </p>
          </div>
        )}
      </div>

      <LightboxFilters
        isLightboxOpen={isLightboxFiltersOpen}
        closeLightbox={() => setIsLightboxFiltersOpen(false)}
        filtersData={context.filtersData}
        filters={context.filtersState}
        onChangeFilters={onChangeFilters}
      />
    </>
  );
};

export default HomePage;
