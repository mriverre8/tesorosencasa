'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BiSearchAlt } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa6';

import { Tesoro } from '@/types/tesoro';
import Card from '@/components/Card';
import Lightbox from '@/components/Lightbox';
import LightboxFilters from '@/components/Lightbox/LightboxFilters';
/* import HomeFilters from './HomeFilters'; */
import { generateFilters } from '@/utils/getFilters';
import { IoClose } from 'react-icons/io5';
import CardMobile from '@/components/CardMobile';

interface ProductsProps {
  tesorosData: Tesoro[];
}

const HomeProducts = ({ tesorosData }: ProductsProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState(() => generateFilters(tesorosData));

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filteredByFilters = tesorosData.filter((tesoro) => {
    // Filtrar por checkboxes activos
    const activeCheckboxFilters = Object.entries(filters).flatMap(
      ([category, options]) =>
        options
          .filter((option) => option.checked) // Solo los seleccionados
          .map((option) => ({ category, value: option.valueCheckbox }))
    );

    const matchesAllCheckboxes = activeCheckboxFilters.every((filter) => {
      if (filter.category === 'units') {
        return filter.value === 'Disponibles'
          ? tesoro.units > 0
          : tesoro.units === 0;
      }
      return tesoro[filter.category as keyof Tesoro] === filter.value;
    });

    // Filtrar por rango de precio (si está activo)
    const priceFilter = filters.price?.find(
      (filter) => filter.type === 'range' && filter.valueRangeChanged
    );
    const matchesPrice =
      !priceFilter ||
      (tesoro.price >= 0 && tesoro.price <= priceFilter.valueRange!);

    // Solo incluir productos que cumplan TODOS los filtros activos
    return matchesAllCheckboxes && matchesPrice;
  });

  // Ahora aplicamos el filtro de nombre, buscando en cualquier parte del string
  const filteredTesoros = filteredByFilters.filter(
    (tesoro) => tesoro.name.toLowerCase().includes(searchTerm.toLowerCase()) // Ahora busca en todo el nombre
  );

  const removeFilter = (category: string, value: string | number) => {
    const updatedFilters = { ...filters };

    updatedFilters[category] = updatedFilters[category].map((option) => {
      if (option.type === 'checkbox' && option.valueCheckbox === value) {
        return {
          ...option,
          checked: false,
        };
      }

      if (option.type === 'range' && option.valueRange === value) {
        return {
          ...option,
          valueRangeChanged: false,
          valueRange: option.valueMaxRange,
        };
      }

      return option;
    });

    setFilters(updatedFilters);
  };

  return (
    <div className="mb-20 mt-5">
      <div className="flex gap-2 max-w-[1220px] overflow-y-auto mb-3 text-xs sm:text-sm ">
        {Object.entries(filters).map(([category, options]) =>
          options.map((option, index) =>
            option.type === 'checkbox' && option.checked ? (
              <button
                key={`${category}-${index}`}
                onClick={() => removeFilter(category, option.valueCheckbox!)}
                className="bg-yellow-400/70 rounded-full px-3 py-1 gap-1 flex items-center justify-center whitespace-nowrap"
              >
                {option.valueCheckbox}
                <IoClose />
              </button>
            ) : option.type === 'range' && option.valueRangeChanged ? (
              <button
                key={`${category}-${index}`}
                onClick={() => removeFilter(category, option.valueRange!)}
                className="bg-yellow-400/70 rounded-full px-3 py-1 flex items-center justify-center gap-1 whitespace-nowrap"
              >
                Precio hasta {option.valueRange} €
                <IoClose />
              </button>
            ) : null
          )
        )}
      </div>
      <div className="flex justify-center items-center gap-2 pr-1 relative">
        <button
          className={`text-gray-600 hover:text-yellow-400 bg-white p-2.5 rounded-full border border-gray-300 relative hover:outline-none hover:ring-2 hover:ring-yellow-400 ${showFilterDropdown ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => {
            setShowFilterDropdown(!showFilterDropdown);
          }}
        >
          <FaFilter
            className={`${showFilterDropdown ? 'text-yellow-400' : ''}`}
          />
        </button>
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

      <div /* className="block sm:hidden" */ hidden={!showFilterDropdown}>
        <Lightbox isLightboxOpen={showFilterDropdown}>
          <LightboxFilters
            closeAction={() => setShowFilterDropdown(false)}
            filters={filters}
            setFilters={setFilters}
          />
        </Lightbox>
      </div>
      {/* <div className="hidden sm:block">
            <HomeFilters
              filters={filters}
              setFilters={setFilters}
              closeAction={() => setShowFilterDropdown(false)}
            />
          </div> */}

      {filteredTesoros.length > 0 ? (
        <>
          <div className="block sm:hidden mt-5 ">
            {filteredTesoros.map((tesoro, index) => (
              <div key={index}>
                <CardMobile tesoro={tesoro} />
              </div>
            ))}
          </div>
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
  );
};

export default HomeProducts;
