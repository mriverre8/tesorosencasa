'use client';

import React, { useEffect, useState } from 'react';

// Components
import LightboxLoader from '@/components/Lightbox/LightboxLoader';
import ActiveFiltersContainer from '@/views/Home/ActiveFiltersContainer.tsx/ActiveFiltersContainer';
import SearchBar from './SearchBar/SearchBar';
import LightboxFilters from '@/views/Home/LightboxFilters/LightboxFilters';
import CardMobile from '@/components/CardMobile';

// Types
import { tesoros } from '@prisma/client';

// Actions
import { getAllProducts } from '@/actions/getAllProducts';

// Translation
import { translate } from '@/locales/translate';

interface Props {
  filtersData: Record<string, (string | number)[]>;
}

const HomePage = ({ filtersData }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLightboxFiltersOpen, setIsLightboxFiltersOpen] = useState(false);

  const [tesorosData, setTesorosData] = useState<tesoros[]>([]);

  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const tesorosData = await getAllProducts(1, 15, filters);
      setTesorosData(tesorosData);
      setIsLoading(false);
    }
    fetchData();
  }, [filters]);

  return (
    <>
      <div className="my-2.5">
        {/* Contenedor con los filtros aplicados */}
        <ActiveFiltersContainer filters={filters} setFilters={setFilters} />
        {/* Buscador de tesoros */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLightboxFiltersOpen={isLightboxFiltersOpen}
          setIsLightboxFiltersOpen={setIsLightboxFiltersOpen}
        />
        {/* Tesoros */}
        {tesorosData.length > 0 ? (
          <div className="mt-5 ">
            {tesorosData.map((tesoro, index) => (
              <div key={index}>
                <CardMobile tesoro={tesoro} />
              </div>
            ))}
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
        setFilters={setFilters}
      />
    </>
  );
};

export default HomePage;
