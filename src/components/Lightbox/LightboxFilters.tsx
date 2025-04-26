import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

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
    closeAction();
  };

  // Reset the filters to their default state
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
              valueRange: option.valueMaxRange, // Reset to max value
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
        {filterValues.map((filter) =>
          filter.type === 'range' ? (
            // Range filter
            <div key={filter.type}>
              <div className="flex items-center gap-2">
                <label htmlFor={filter.type}>0</label>
                <input
                  id={filter.type}
                  type="range"
                  className="cursor-pointer w-full"
                  min="0"
                  max={filter.valueMaxRange}
                  value={filter.valueRange}
                  onChange={(e) => handleFilterChange(e, filter)}
                />
                <label htmlFor={filter.type}>{filter.valueMaxRange}</label>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-xs text-gray-500">
                  Verás tesoros de 0 hasta {filter.valueRange} €
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
                  className="cursor-pointer"
                  checked={filter.checked}
                  onChange={(e) => handleFilterChange(e, filter)}
                />
                <label htmlFor={filter.valueCheckbox}>
                  {filter.valueCheckbox}
                </label>
              </div>
            </div>
          )
        )}
      </>
    );
  };

  if (!isLightboxOpen) return null;

  return (
    <div className="bg-black/50 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full flex-col max-w-md bg-white py-6 pl-6 pr-3 rounded-lg shadow-xl">
          {/* Header */}
          <div className="relative flex items-center justify-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Filtrar Resultados
            </h2>
            <IoClose
              onClick={closeAction}
              className="absolute right-0 text-2xl cursor-pointer transform transition-transform hover:scale-125 hover:text-yellow-400"
            />
          </div>

          {/* Filters list */}
          <div className="space-y-4 overflow-y-auto h-[60vh]">
            {Object.keys(tempFilters).map((filterCategory, index) => (
              <div key={index} className="filter-section">
                {/* Dropdown Header */}
                <div
                  onClick={() => toggleDropdown(filterCategory)}
                  className="flex justify-between items-center cursor-pointer px-3 py-2 bg-gray-100 rounded-md"
                >
                  <h3 className="text-gray-600 font-medium">
                    {translateFilter[filterCategory]}
                  </h3>
                  <span
                    className={`transform transition-transform ${openDropdown[filterCategory] ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </div>

                {/* Dropdown content */}
                {openDropdown[filterCategory] && (
                  <div className="flex flex-col text-sm gap-2 text-gray-500 px-3 mt-2">
                    {getFilters(tempFilters[filterCategory])}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Buttons: Reset and Apply Filters */}
          <div className="flex flex-col xs:flex-row items-center justify-center xs:gap-5 mt-3">
            <button
              onClick={resetFilters}
              className="border-2 border-green-600 hover:border-green-400 gap-1 mt-3 rounded-full py-0.5 px-3.5 text-sm whitespace-nowrap"
            >
              Reestablecer filtros
            </button>
            <button
              onClick={applyFilters}
              className="border text-white bg-green-600 hover:bg-green-500 gap-1 mt-3 rounded-full py-1 px-4 text-sm whitespace-nowrap"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxFilters;
