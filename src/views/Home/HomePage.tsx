'use client';

import React, { /* useEffect, */ useEffect, useState } from 'react';

// Components
import ActiveFiltersContainer from '@/views/Home/ActiveFiltersContainer.tsx/ActiveFiltersContainer';
import SearchBar from './SearchBar/SearchBar';
import LightboxFilters from '@/views/Home/LightboxFilters/LightboxFilters';
import CardMobile from './CardMobile/CardMobile';
import Card from './Card/Card';

// Hooks
import useLoader from '@/hooks/useLoader';

// Types
import { tesoros } from '@prisma/client';

// Actions
import { getProductsByFilters } from '@/actions/getProductsByFilters';

// Translation
import { useTranslations } from 'next-intl';
import StreamCard from '@/components/StreamCard';
import { getStream } from '@/actions/getStream';
import StreamCardSkeleton from '@/components/StreamCardSkeleton';

interface Props {
  filtersData: Record<string, (string | number)[]>;
  tesorosData: tesoros[];
}

const HomePage = ({ filtersData, tesorosData }: Props) => {
  const translate = useTranslations();

  const loader = useLoader();
  const [isLightboxFiltersOpen, setIsLightboxFiltersOpen] = useState(false);

  const [tesoros, setTesoros] = useState(tesorosData);

  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [pageSize, setPageSize] = useState(15);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [streamData, setStreamData] = useState(null);

  const onChangeFilters = async (
    optionalPageSize?: number,
    optionalFilters?: Record<string, (string | number)[]>,
    optionalSearchTerm?: string
  ) => {
    const effectiveFilters = optionalFilters ?? filters;
    const effectivePageSize = optionalPageSize ?? pageSize;
    const effectiveSearchTerm = optionalSearchTerm ?? searchTerm;

    loader.onOpen();
    setFilters(effectiveFilters);
    setSearchTerm(effectiveSearchTerm);
    setPageSize(effectivePageSize);
    setHasMore(true);
    const filteredTesoros = await getProductsByFilters(
      effectivePageSize,
      effectiveFilters,
      effectiveSearchTerm
    );
    setTesoros(filteredTesoros);
    loader.onClose();
  };

  const handleLoadMore = async () => {
    const newPageSize = pageSize + 15;
    loader.onOpen();

    const newTesoros = await getProductsByFilters(
      newPageSize,
      filters,
      searchTerm
    );

    if (newTesoros.length === tesoros.length) {
      setHasMore(false);
    } else {
      setTesoros(newTesoros);
      setPageSize(newPageSize);
    }

    loader.onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      const stream = await getStream();
      setLoading(false);
      setStreamData(stream);
    };
    fetchData();
  }, []);

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
            className={`flex flex-col gap-2 sticky top-20 z-50 ${streamData || loading ? 'mb-6' : ''}`}
          >
            {loading ? (
              <StreamCardSkeleton />
            ) : (
              <>{streamData && <StreamCard data={streamData} />}</>
            )}
          </div>
        </>
        {/* Contenedor con los filtros aplicados */}
        <ActiveFiltersContainer
          filters={filters}
          onChangeFilters={onChangeFilters}
        />
        {/* Buscador de tesoros */}
        <SearchBar
          isLightboxFiltersOpen={isLightboxFiltersOpen}
          setIsLightboxFiltersOpen={setIsLightboxFiltersOpen}
          onChangeFilters={onChangeFilters}
          disabled={tesorosData.length === 0}
        />
        {/* Tesoros */}
        {tesoros.length > 0 ? (
          <div className="mb-6">
            <div className="mt-5 mobile:grid mobile:grid-cols-2 mobile:gap-4 sm:grid-cols-3 lg:grid-cols-5 ">
              {tesoros.map((tesoro, index) => (
                <div key={index}>
                  <div className="block mobile:hidden">
                    <CardMobile tesoro={tesoro} />
                    {index !== tesoros.length - 1 && (
                      <div className="w-full border-b border-gray-300 my-4" />
                    )}
                  </div>
                  <div className="hidden mobile:block">
                    <Card tesoro={tesoro} />
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <button
                onClick={() => handleLoadMore()}
                className="w-full text-secondary hover:text-secondary-hover underline underline-offset-2 text-sm mt-8 mb-2"
              >
                Cargar más
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center my-24 ">
            <p className="text-center text-gray-400 text-sm">
              {translate('NO_TREASURES_FOUND')}
            </p>
          </div>
        )}
      </div>
      {/* Lightboxes */}
      <LightboxFilters
        isLightboxOpen={isLightboxFiltersOpen}
        closeLightbox={() => setIsLightboxFiltersOpen(false)}
        filtersData={filtersData}
        filters={filters}
        onChangeFilters={onChangeFilters}
      />
    </>
  );
};

export default HomePage;
