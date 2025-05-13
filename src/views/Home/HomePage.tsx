'use client';

import React, { useEffect, useState } from 'react';

// Components
import ActiveFiltersContainer from '@/views/Home/ActiveFiltersContainer.tsx/ActiveFiltersContainer';
import CardMobile from '@/components/CardMobile';
import LightboxFilters from '@/views/Home/LightboxFilters/LightboxFilters';

// Types
import { Tesoro } from '@/types/tesoro';
import { getAllProducts } from '@/actions/getAllProducts';
import SearchBar from './SearchBar/SearchBar';
import LightboxLoader from '@/components/Lightbox/LightboxLoader';
import { translate } from '@/locales/translate';

interface Props {
  filtersData: Record<string, (string | number)[]>;
}

const HomePage = ({ filtersData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tesorosData, setTesorosData] = useState<Tesoro[]>([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterSelector, setShowFilterSelector] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedData = await getAllProducts(1, 15, filters);
      const tesorosData = fetchedData ?? [];
      setTesorosData(tesorosData);
      setIsLoading(false);
    }

    fetchData();
  }, [filters]);

  return (
    <>
      <div className="my-2.5">
        {/* Filters */}
        <ActiveFiltersContainer filters={filters} setFilters={setFilters} />
        {/* Buscador */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilterSelector={showFilterSelector}
          setShowFilterSelector={setShowFilterSelector}
        />
        {/* Productos */}
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

      <LightboxLoader isLightboxOpen={isLoading} />
      {/* Lightbox de filtros */}
      <LightboxFilters
        isLightboxOpen={showFilterSelector}
        closeAction={() => setShowFilterSelector(false)}
        filtersData={filtersData}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
};

export default HomePage;
