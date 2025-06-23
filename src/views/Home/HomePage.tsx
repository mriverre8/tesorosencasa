'use client';

import React, { /* useEffect, */ useState } from 'react';

// Components
import LightboxLoader from '@/components/Lightbox/LightboxLoader';
import ActiveFiltersContainer from '@/views/Home/ActiveFiltersContainer.tsx/ActiveFiltersContainer';
import SearchBar from './SearchBar/SearchBar';
import LightboxFilters from '@/views/Home/LightboxFilters/LightboxFilters';
import CardMobile from './CardMobile/CardMobile';
import Card from './Card/Card';

// Types
import { tesoros } from '@prisma/client';

// Actions
import { getProductsByFilters } from '@/actions/getProductsByFilters';

// Translation
import { translate } from '@/locales/translate';

interface Props {
  filtersData: Record<string, (string | number)[]>;
  tesorosData: tesoros[];
}

const HomePage = ({ filtersData, tesorosData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLightboxFiltersOpen, setIsLightboxFiltersOpen] = useState(false);

  const [tesoros, setTesoros] = useState(tesorosData);

  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [pageSize, setPageSize] = useState(15);
  const [hasMore, setHasMore] = useState(true);

  const onChangeFilters = async (
    optionalPageSize?: number,
    optionalFilters?: Record<string, (string | number)[]>,
    optionalSearchTerm?: string
  ) => {
    const effectiveFilters = optionalFilters ?? filters;
    const effectivePageSize = optionalPageSize ?? pageSize;
    const effectiveSearchTerm = optionalSearchTerm ?? searchTerm;

    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    const newPageSize = pageSize + 15;
    setIsLoading(true);

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

    setIsLoading(false);
  };

  return (
    <>
      <div className="my-2.5">
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
            <p className="text-center text-gray-400">
              {translate('NO_TREASURES_FOUND')}
            </p>
          </div>
        )}
      </div>
      {/* Lightboxes */}
      <LightboxLoader isLightboxOpen={isLoading} />
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
