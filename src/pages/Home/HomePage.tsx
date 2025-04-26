'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Icons
import { FaFilter, FaInstagram } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

// Components
import Card from '@/components/Card';
import CardMobile from '@/components/CardMobile';
import LightboxFilters from '@/components/Lightbox/LightboxFilters';

// Utilities
import {
  generateFilters,
  obtainFilteredResults,
  removeAppliedFilter,
} from '@/utils/utilsHomePage';

// Types
import { Tesoro } from '@/types/tesoro';

interface Props {
  tesorosData: Tesoro[];
}

const HomePage = ({ tesorosData }: Props) => {
  const [filters, setFilters] = useState(() => generateFilters(tesorosData));
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterSelector, setShowFilterSelector] = useState(false);

  const filteredResults = obtainFilteredResults(filters, tesorosData);

  const filteredTesoros = filteredResults.filter((tesoro) =>
    tesoro.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-20 mt-2.5">
        {/* Filters */}
        <div className="flex gap-2 max-w-[1220px] overflow-y-auto mb-3 text-xs">
          {Object.entries(filters).map(([category, options]) =>
            options.map((option, index) =>
              option.type === 'checkbox' && option.checked ? (
                <button
                  key={`${category}-${index}`}
                  onClick={() =>
                    setFilters(
                      removeAppliedFilter(
                        category,
                        option.valueCheckbox!,
                        filters
                      )
                    )
                  }
                  className="bg-yellow-400/70 rounded-full px-3 py-1 gap-1 flex items-center justify-center whitespace-nowrap mt-2.5"
                >
                  {option.valueCheckbox}
                  <IoClose />
                </button>
              ) : option.type === 'range' && option.valueRangeChanged ? (
                <button
                  key={`${category}-${index}`}
                  onClick={() =>
                    setFilters(
                      removeAppliedFilter(category, option.valueRange!, filters)
                    )
                  }
                  className="bg-yellow-400/70 rounded-full px-3 py-1 flex items-center justify-center gap-1 whitespace-nowrap mt-2.5"
                >
                  Precio hasta {option.valueRange} €
                  <IoClose />
                </button>
              ) : null
            )
          )}
        </div>
        {/* Buscador */}
        <div className="flex justify-center items-center gap-2 pr-1 relative">
          {tesorosData.length > 0 && (
            <button
              className={`text-gray-600 hover:text-yellow-400 bg-white p-2.5 rounded-full border border-gray-300 relative hover:outline-none hover:ring-2 hover:ring-yellow-400 ${showFilterSelector ? 'ring-2 ring-yellow-400' : ''}`}
              onClick={() => {
                setShowFilterSelector(!showFilterSelector);
              }}
            >
              <FaFilter
                className={`${showFilterSelector ? 'text-yellow-400' : ''}`}
              />
            </button>
          )}
          <div className="flex w-full relative">
            <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full py-2 pl-10 pr-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Buscar tesoros"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Productos */}
        {filteredTesoros.length > 0 ? (
          <>
            {/* Mobile View */}
            <div className="block sm:hidden mt-5 ">
              {filteredTesoros.map((tesoro, index) => (
                <div key={index}>
                  <CardMobile tesoro={tesoro} />
                </div>
              ))}
            </div>
            {/* Desktop View */}
            <div className="hidden sm:block mt-5 ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTesoros.map((tesoro, index) => (
                  <Link href={`/product/${tesoro.id}`} key={index}>
                    <Card tesoro={tesoro} />
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center my-24 ">
            <p className="text-center text-gray-400">
              No hay tesoros disponibles.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox de filtros */}

      <LightboxFilters
        isLightboxOpen={showFilterSelector}
        closeAction={() => setShowFilterSelector(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
};

export default HomePage;
