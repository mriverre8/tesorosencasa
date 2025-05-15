import React, { useEffect, useState, useCallback, useMemo } from 'react';

// Translation
import { translate } from '@/locales/translate';

// Icons
import { IoIosArrowForward } from 'react-icons/io';
import { RiDeleteBin5Line } from 'react-icons/ri';

interface Props {
  isLightboxOpen: boolean;
  filtersData: Record<string, (string | number)[]>;
  filters: Record<string, (string | number)[]>;
  setFilters: (filters: Record<string, (string | number)[]>) => void;
  closeLightbox: () => void;
}

const LightboxFilters = ({
  isLightboxOpen,
  filtersData,
  filters,
  setFilters,
  closeLightbox,
}: Props) => {
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, (string | number)[]>
  >({});
  const [previousFilters, setPreviousFilters] = useState<
    Record<string, (string | number)[]>
  >({});

  useEffect(() => {
    if (isLightboxOpen) {
      setSelectedFilters(filters);
      setPreviousFilters(filters);
      manageDropdownInistalState(filters);
    }
  }, [isLightboxOpen, filters]);

  const toggleDropdown = useCallback((category: string) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  const updateFilterState = useCallback(
    (category: string, values: (string | number)[]) => {
      setSelectedFilters((prev) => {
        const updated = { ...prev };
        if (values.length === 0) {
          delete updated[category];
        } else {
          updated[category] = values;
        }
        return updated;
      });
    },
    []
  );

  const handleCheckboxChange = (category: string, value: string) => {
    const current = selectedFilters[category] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilterState(category, updated);
  };

  const handleRangeChange = (category: string, value: number, max: number) => {
    updateFilterState(category, value === max ? [] : [value]);
  };

  const manageDropdownInistalState = (
    filters: Record<string, (string | number)[]>
  ) => {
    const updated: Record<string, boolean> = {};
    for (const category in filtersData) {
      updated[category] = !!filters[category]?.length;
    }
    setOpenDropdown(updated);
  };

  const hasChanges = useMemo(() => {
    const keys1 = Object.keys(selectedFilters);
    const keys2 = Object.keys(previousFilters);
    if (keys1.length !== keys2.length) return true;
    return keys1.some((key) => {
      const a = (selectedFilters[key] || []).sort();
      const b = (previousFilters[key] || []).sort();
      return JSON.stringify(a) !== JSON.stringify(b);
    });
  }, [selectedFilters, previousFilters]);

  const hasAppliedFilters = useMemo(
    () => Object.keys(selectedFilters).length > 0,
    [selectedFilters]
  );

  const clearFilters = () => {
    setSelectedFilters({});
    setOpenDropdown({});
  };

  const submitFilters = () => {
    setFilters(selectedFilters);
    closeLightbox();
  };

  const cancelFilters = () => {
    setSelectedFilters(previousFilters);
    closeLightbox();
  };

  const renderFilterInput = (category: string, values: (string | number)[]) =>
    values.map((value) =>
      category === 'price' ? (
        <div key={value}>
          <div className="flex items-center gap-2">
            <label>0</label>
            <input
              type="range"
              className="cursor-pointer w-full accent-primary"
              min="0"
              max={value as number}
              value={
                selectedFilters[category]?.[0] !== undefined
                  ? selectedFilters[category][0]
                  : value
              }
              onChange={(e) =>
                handleRangeChange(category, +e.target.value, value as number)
              }
            />
            <label>{value}</label>
          </div>
          <div className="text-center text-xs text-gray-three">
            {translate('PRICE_INFO', {
              maxValue:
                selectedFilters[category]?.[0] !== undefined
                  ? selectedFilters[category][0]
                  : value,
            })}
          </div>
        </div>
      ) : (
        <div key={value} className="flex items-center gap-2">
          <input
            id={`${category}-${value}`}
            type="checkbox"
            className="cursor-pointer accent-primary"
            checked={selectedFilters[category]?.includes(value) || false}
            onChange={() => handleCheckboxChange(category, value as string)}
          />
          <label htmlFor={`${category}-${value}`}>{value}</label>
        </div>
      )
    );

  if (!isLightboxOpen) return null;

  return (
    <div
      className="bg-black/50 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5"
      onClick={closeLightbox}
    >
      <div className="flex items-center justify-center h-full w-full">
        <div
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">
            {translate('FILTER_RESULTS')}
          </h2>

          <div className="space-y-4 overflow-y-auto h-[45vh] px-3">
            {Object.entries(filtersData).map(([category, values]) => (
              <div key={category} className="filter-section relative">
                <div
                  onClick={() => toggleDropdown(category)}
                  className="flex justify-between items-center cursor-pointer py-2 border-b"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{translate(category)}</h3>
                    <p className="text-sm text-primary ">
                      {selectedFilters[category] &&
                        selectedFilters[category].length}
                    </p>
                  </div>
                  <span
                    className={`transition-transform ${openDropdown[category] ? 'rotate-90' : ''}`}
                  >
                    <IoIosArrowForward />
                  </span>
                </div>

                {openDropdown[category] && (
                  <div className="flex flex-col text-sm gap-2 text-gray-500 mt-2">
                    {renderFilterInput(category, values)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {hasChanges && (
              <button
                className="bg-secondary hover:bg-secondary-hover rounded-full text-sm text-white px-3.5 py-0.5"
                onClick={submitFilters}
              >
                {translate('APPLY_FILTERS')}
              </button>
            )}
            <button
              className="bg-secondary hover:bg-secondary-hover rounded-full text-sm text-white px-3.5 py-0.5"
              onClick={cancelFilters}
            >
              {translate('GO_BACK')}
            </button>
          </div>

          {hasAppliedFilters && (
            <div className="flex justify-center mt-2">
              <button
                className="flex items-center gap-1 text-sm text-red-600 px-3.5 py-0.5"
                onClick={clearFilters}
              >
                <RiDeleteBin5Line />
                {translate('CLEAR_FILTERS')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LightboxFilters;
