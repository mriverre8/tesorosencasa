'use client';

import React, { useEffect, useState } from 'react';
import { tesoros, stream } from '@prisma/client';

// Components
import SearchBar from './SearchBar/SearchBar';
import CardMobile from './CardMobile/CardMobile';
import Card from './Card/Card';
import ActiveFiltersContainer from './ActiveFiltersContainer.tsx/ActiveFiltersContainer';
import StreamCard from '../common/StreamCard';
import LightboxFilters from './LightboxFilters/LightboxFilters';

// Hooks
import useStore from '@/hooks/useStore';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Constants
import { PAGE_SIZE } from '@/constants/constants';

// Utils
import { filterProducts, generateFilters } from '@/utils/utils';

interface HomePageProps {
  initialData: {
    products: tesoros[];
    stream: stream | null;
    total: number;
  };
}

const HomePage = ({ initialData }: HomePageProps) => {
  const translate = useTranslations();
  const store = useStore();

  // Initialize state with server data
  const products = initialData.products;
  const totalProducts = initialData.total;
  const streamData = initialData.stream;
  const filters = generateFilters(products);
  const initialPageProducts = products.slice(0, PAGE_SIZE);

  // State management - initialized with server data
  const [filteredProducts, setFilteredProducts] = useState<tesoros[]>(products);
  const [currentPageProducts, setCurrentPageProducts] =
    useState<tesoros[]>(initialPageProducts);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Math.ceil(totalProducts / PAGE_SIZE));
  const [isLightboxFiltersOpen, setIsLightboxFiltersOpen] = useState(false);

  // Update filtered products when filters or search term change
  useEffect(() => {
    const filtered = filterProducts(
      products,
      store.filtersState,
      store.searchTermState
    );
    setFilteredProducts(filtered);
    setMaxPage(Math.ceil(filtered.length / PAGE_SIZE));
    setPage(1);

    // Update current page products
    const startIndex = 0;
    const endIndex = PAGE_SIZE;
    setCurrentPageProducts(filtered.slice(startIndex, endIndex));
  }, [products, store.filtersState, store.searchTermState]);

  // Update current page products when page changes
  useEffect(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setCurrentPageProducts(filteredProducts.slice(startIndex, endIndex));
  }, [page, filteredProducts]);

  const onChangeFilters = async (
    optionalFilters?: Record<string, (string | number)[]>,
    optionalSearchTerm?: string
  ) => {
    const effectiveFilters = optionalFilters ?? store.filtersState;
    const effectiveSearchTerm = optionalSearchTerm ?? store.searchTermState;

    store.setFiltersState(effectiveFilters);
    store.setSearchTermState(effectiveSearchTerm);
  };

  const handleNextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="my-2.5">
        <>
          {streamData && (
            <p className="text-sm font-medium mb-2">
              {translate('NEXT_STREAM')}
            </p>
          )}
          <div
            className={`flex flex-col gap-2 sticky top-20 z-50 ${streamData ? 'mb-6' : ''}`}
          >
            {streamData && <StreamCard data={streamData} />}
          </div>
        </>

        <ActiveFiltersContainer
          filters={store.filtersState}
          onChangeFilters={onChangeFilters}
        />

        <SearchBar
          isLightboxFiltersOpen={isLightboxFiltersOpen}
          setIsLightboxFiltersOpen={setIsLightboxFiltersOpen}
          onChangeFilters={onChangeFilters}
          disabled={currentPageProducts.length === 0}
          searchTerm={store.searchTermState}
          setSearchTerm={store.setSearchTermState}
        />

        {currentPageProducts.length > 0 ? (
          <div className="mb-6">
            <div className="mt-5 mobile:grid mobile:grid-cols-2 mobile:gap-4 sm:grid-cols-3 lg:grid-cols-5 ">
              {currentPageProducts.map((tesoro: tesoros, index: number) => (
                <div key={tesoro.id}>
                  <div className="block mobile:hidden">
                    <CardMobile tesoro={tesoro} />
                    {index !== currentPageProducts.length - 1 && (
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
                className={` ${page === 1 ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary-hover'} rounded-md p-0.5 flex items-center justify-center`}
                onClick={() => handlePrevPage()}
                disabled={page === 1}
              >
                <IoIosArrowBack className="text-2xl text-white" />
              </button>
              <div>
                <span>{page}</span> de <span>{maxPage}</span>
              </div>
              <button
                className={` ${page === maxPage ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary-hover'} rounded-md p-0.5 flex items-center justify-center`}
                onClick={() => handleNextPage()}
                disabled={page === maxPage}
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
        filtersData={filters}
        filters={store.filtersState}
        onChangeFilters={onChangeFilters}
      />
    </>
  );
};

export default HomePage;
