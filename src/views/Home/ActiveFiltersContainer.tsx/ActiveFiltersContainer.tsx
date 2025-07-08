'use client';

import React from 'react';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { IoClose } from 'react-icons/io5';

interface Props {
  filters: Record<string, (string | number)[]>;
  onChangeFilters: (
    optionalPageSize?: number,
    optionalFilters?: Record<string, (string | number)[]>,
    optionalSearchTerm?: string
  ) => void;
}

const ActiveFiltersContainer = ({ filters, onChangeFilters }: Props) => {
  const translate = useTranslations();

  const handleRemoveFilter = (category: string, value: string | number) => {
    const newFilters = { ...filters };

    newFilters[category] = newFilters[category].filter((v) => v !== value);

    if (newFilters[category].length === 0) {
      delete newFilters[category];
    }

    onChangeFilters(undefined, newFilters, undefined);
  };

  return (
    <div className="mt-1.5 mb-3" hidden={Object.keys(filters).length === 0}>
      <p className="text-xs font-semibold">{translate('APPLIED_FILTERS')}</p>
      <div className="flex gap-2 max-w-[1220px] overflow-y-auto  text-xs">
        {Object.entries(filters).map(([category, values]) =>
          values.map((value, index) => (
            <button
              key={`${category}-${index}`}
              onClick={() => handleRemoveFilter(category, value)}
              className="bg-primary rounded-full px-3 py-1 gap-1 flex items-center justify-center whitespace-nowrap mt-1"
            >
              {typeof value === 'number'
                ? translate('PRICE_TO', { price: value })
                : value}
              <IoClose />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveFiltersContainer;
