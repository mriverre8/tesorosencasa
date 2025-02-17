'use client';

import { Filter } from '@/types/filter';
import { getFilters, translateFilter } from '@/utils/getFilters';
import React, { useEffect, useState } from 'react';

interface ProductsProps {
  filters: Record<string, Filter[]>;
  setFilters: (state: Record<string, Filter[]>) => void;
  closeAction: () => void;
}

const HomeFilters = ({ filters, setFilters, closeAction }: ProductsProps) => {
  const [activeFilter, setActiveFilter] = useState('origin');
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const applyFilters = () => {
    setFilters(tempFilters);
    closeAction();
  };

  const resetFilters = () => {
    let hasChanges = false;

    const updatedFilters = Object.fromEntries(
      Object.entries(tempFilters).map(([category, options]) => [
        category,
        options.map((option) => {
          if (option.type === 'checkbox' && option.checked) {
            hasChanges = true;
            return { ...option, checked: false };
          }

          if (option.type === 'range' && option.valueRangeChanged) {
            hasChanges = true;
            return {
              ...option,
              valueRangeChanged: false,
              valueRange: option.valueMaxRange, // Restablece al valor máximo
            };
          }

          return option;
        }),
      ])
    );

    if (hasChanges) {
      setFilters(updatedFilters);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: Filter
  ) => {
    // Clonar profundamente el objeto para evitar modificar `filters` accidentalmente
    const updatedFilters = JSON.parse(JSON.stringify(tempFilters));

    // Buscar el índice del filtro dentro de su categoría (parent)
    const filterIndex = updatedFilters[filter.parent].findIndex(
      (f: Filter) =>
        (filter.type === 'checkbox' &&
          f.valueCheckbox === filter.valueCheckbox) ||
        (filter.type === 'range' && f.valueMaxRange === filter.valueMaxRange)
    );

    if (filterIndex !== -1) {
      if (filter.type === 'range') {
        updatedFilters[filter.parent][filterIndex].valueRange = Number(
          e.target.value
        );
        if (
          updatedFilters[filter.parent][filterIndex].valueRange !==
          updatedFilters[filter.parent][filterIndex].valueMaxRange
        ) {
          updatedFilters[filter.parent][filterIndex].valueRangeChanged = true;
        } else {
          updatedFilters[filter.parent][filterIndex].valueRangeChanged = false;
        }
      } else if (filter.type === 'checkbox') {
        updatedFilters[filter.parent][filterIndex].checked = e.target.checked;
      }

      setTempFilters(updatedFilters);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl mt-3 border border-gray-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700 ">
          Filtrar Resultados
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => resetFilters()}
            className="border text-white bg-green-600 hover:bg-green-500 gap-1 rounded-full py-1 px-4 text-sm whitespace-nowrap "
          >
            Eliminar filtros
          </button>
          <button
            onClick={() => applyFilters()}
            className="border text-white bg-green-600 hover:bg-green-500 gap-1 rounded-full py-1 px-4 text-sm whitespace-nowrap "
          >
            Aplicar filtros
          </button>
        </div>
      </div>

      <div className="block xl:hidden">
        <div className="flex gap-6">
          <div className="h-56 mt-5 border-gray-200">
            <div className="flex flex-col gap-3 border-r mt-3 border-gray-200 pr-4">
              {Object.keys(tempFilters).map((filter, index) => (
                <div key={index} className="px-3">
                  <button
                    onClick={() => setActiveFilter(filter)}
                    className="text-gray-600 font-medium"
                  >
                    {translateFilter[filter]}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap flex-col justify-center gap-4 max-h-56 mt-5 overflow-y-auto  w-full">
            {getFilters(tempFilters[activeFilter], handleFilterChange)}
          </div>
        </div>
      </div>

      <div className="hidden xl:block ">
        <div className="flex gap-6 ">
          <div className="mt-5 border-gray-200 w-full">
            <div className="flex gap-3 border-r lg:border-r-0 lg:justify-between border-gray-200 pr-4">
              {Object.keys(tempFilters).map((filter, index) => (
                <div key={index} className="px-3">
                  <p className="text-gray-600 font-medium mb-2">
                    {translateFilter[filter]}
                  </p>
                  {getFilters(tempFilters[filter], handleFilterChange)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilters;
