import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

// Types
import { Filter } from '@/types/filter';
import { translateFilter } from '@/utils/utilsHomePage';

interface ProductsProps {
  isLightboxOpen: boolean;
  filters: Record<string, Filter[]>;
  setFilters: (state: Record<string, Filter[]>) => void;
  closeAction: () => void;
}

const LightboxFilters = ({
  isLightboxOpen,
  filters,
  setFilters,
  closeAction,
}: ProductsProps) => {
  const [tempFilters, setTempFilters] = useState(filters);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});

  // Sync tempFilters with the incoming filters
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  // Apply selected filters and close the Lightbox
  const applyFilters = () => {
    setFilters(tempFilters);
    // Cerramos todos los dropdowns
    setOpenDropdown({});
    closeAction();
  };

  const closeLightbox = () => {
    // Cerramos todos los dropdowns
    setOpenDropdown({});
    closeAction();
  };

  // Reset the filters to their default state
  const resetFilters = () => {
    // Verificar si hay filtros seleccionados
    const hasSelectedFilters = Object.values(tempFilters).some((options) =>
      options.some(
        (option) =>
          (option.type === 'checkbox' && option.checked) ||
          (option.type === 'range' && option.valueRangeChanged)
      )
    );

    if (!hasSelectedFilters) {
      // Si no hay nada seleccionado, no hacemos nada
      return;
    }

    // Reseteamos los filtros
    const updatedFilters = Object.fromEntries(
      Object.entries(tempFilters).map(([category, options]) => [
        category,
        options.map((option) => {
          if (option.type === 'checkbox') {
            return { ...option, checked: false };
          }

          if (option.type === 'range') {
            return {
              ...option,
              valueRangeChanged: false,
              valueRange: option.valueMaxRange, // Resetear al máximo
            };
          }

          return option;
        }),
      ])
    );

    setTempFilters(updatedFilters);

    // Cerramos todos los dropdowns
    setOpenDropdown({});
  };

  // Handle changes to filter values (checkbox and range)
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: Filter
  ) => {
    // Deep clone the filters to avoid mutating the state directly
    const updatedFilters = JSON.parse(JSON.stringify(tempFilters));

    // Find the filter within its category (parent)
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

        // Check if range value has changed
        updatedFilters[filter.parent][filterIndex].valueRangeChanged =
          updatedFilters[filter.parent][filterIndex].valueRange !==
          updatedFilters[filter.parent][filterIndex].valueMaxRange;
      } else if (filter.type === 'checkbox') {
        updatedFilters[filter.parent][filterIndex].checked = e.target.checked;
      }

      setTempFilters(updatedFilters);
    }
  };

  // Toggle dropdown visibility for a specific filter section
  const toggleDropdown = (category: string) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Render filter inputs based on their type (checkbox or range)
  const getFilters = (filterValues: Filter[]) => {
    if (!Array.isArray(filterValues)) return null;

    return (
      <>
        {filterValues.map((filter) => {
          // Calculamos el valor máximo redondeado solo una vez
          const maxRange = Math.ceil(filter.valueMaxRange ?? 0);
          const valueRange = Math.ceil(filter.valueRange ?? 0);

          return filter.type === 'range' ? (
            // Range filter
            <div key={filter.type}>
              <div className="flex items-center gap-2">
                <label htmlFor={filter.type}>0</label>
                <input
                  id={filter.type}
                  type="range"
                  className="cursor-pointer w-full accent-yellow-400 range-slider"
                  min="0"
                  max={maxRange}
                  value={valueRange}
                  onChange={(e) => handleFilterChange(e, filter)}
                />
                <label htmlFor={filter.type}>{maxRange}</label>{' '}
                {/* También usamos la variable aquí */}
              </div>
              <div className="flex justify-center items-center">
                <p className="text-xs text-gray-three">
                  Verás tesoros de 0 hasta {valueRange} €
                </p>
              </div>
            </div>
          ) : (
            // Checkbox filter
            <div key={filter.valueCheckbox}>
              <div className="flex items-center gap-2">
                <input
                  id={filter.valueCheckbox}
                  type="checkbox"
                  className="cursor-pointer accent-yellow-400"
                  checked={filter.checked}
                  onChange={(e) => handleFilterChange(e, filter)}
                />
                <label htmlFor={filter.valueCheckbox}>
                  {filter.valueCheckbox}
                </label>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  // Función para contar los filtros seleccionados dentro de una categoría
  const countSelectedFilters = (category: string): number => {
    const selectedFilters = tempFilters[category].filter(
      (option) =>
        (option.type === 'checkbox' && option.checked) ||
        (option.type === 'range' && option.valueRangeChanged)
    );
    return selectedFilters.length;
  };

  // Función para comparar si filters y tempFilters son iguales
  const areFiltersEqual =
    JSON.stringify(filters) === JSON.stringify(tempFilters);

  // Función para saber si hay filtros seleccionados temporalmente
  const hasTempSelectedFilters = Object.values(tempFilters).some((options) =>
    options.some(
      (option) =>
        (option.type === 'checkbox' && option.checked) ||
        (option.type === 'range' && option.valueRangeChanged)
    )
  );

  if (!isLightboxOpen) return null;

  return (
    <div className="bg-black/50 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full flex-col max-w-md bg-white py-6 pl-3 pr-3 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-semibold">Filtrar Resultados</h2>
          </div>

          {/* Filters list */}
          <div className="space-y-4 overflow-y-auto h-[45vh] px-3">
            {Object.keys(tempFilters).map((filterCategory, index) => {
              const selectedCount = countSelectedFilters(filterCategory);
              return (
                <div key={index} className="filter-section relative">
                  {/* Dropdown Header */}
                  <div
                    onClick={() => toggleDropdown(filterCategory)}
                    className="flex justify-between items-center cursor-pointer  py-2 border-b"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {translateFilter[filterCategory]}{' '}
                      </h3>
                      {selectedCount > 0 && (
                        <div className="flex items-center justify-center rounded-full bg-primary w-5 h-5">
                          <span className="text-black text-xs font-semibold">
                            {selectedCount}
                          </span>
                        </div>
                      )}
                    </div>

                    <span
                      className={`transform transition-transform ${
                        openDropdown[filterCategory] ? 'rotate-90' : ''
                      }`}
                    >
                      <IoIosArrowForward />
                    </span>
                  </div>

                  {/* Dropdown content */}
                  {openDropdown[filterCategory] && (
                    <div className="flex flex-col text-sm gap-2 text-gray-500 mt-2">
                      {getFilters(tempFilters[filterCategory])}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Buttons: Reset and Apply Filters */}
          <div className="flex justify-center gap-7 flex-wrap">
            {hasTempSelectedFilters && (
              <button
                onClick={resetFilters}
                className="flex gap-1 items-center mt-3 text-sm whitespace-nowrap text-red-600"
              >
                <RiDeleteBin6Line className="text-base" />
                Quitar filtros
              </button>
            )}

            {/* Mostrar Volver solo si no hay cambios */}
            {areFiltersEqual && (
              <button
                onClick={closeLightbox}
                className="border text-white bg-secondary hover:bg-secondary-hover gap-1 mt-3 rounded-full py-1 px-4 text-sm whitespace-nowrap"
              >
                Volver
              </button>
            )}

            {/* Mostrar Aplicar solo si hay cambios */}
            {!areFiltersEqual && (
              <button
                onClick={applyFilters}
                className="border text-white bg-secondary hover:bg-secondary-hover gap-1 mt-3 rounded-full py-1 px-4 text-sm whitespace-nowrap"
              >
                Aplicar filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxFilters;
