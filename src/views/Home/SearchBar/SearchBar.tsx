'use client';

import React, { useState } from 'react';

// Translation
import { translate } from '@/locales/translate';

// Icons
import { BiSearchAlt } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';

interface Props {
  isLightboxFiltersOpen: boolean;
  setIsLightboxFiltersOpen: (state: boolean) => void;
  onChangeFilters: (
    optionalPageSize?: number,
    optionalFilters?: Record<string, (string | number)[]>,
    optionalSearchTerm?: string
  ) => void;
  disabled: boolean;
}

const SearchBar = ({
  isLightboxFiltersOpen,
  setIsLightboxFiltersOpen,
  onChangeFilters,
  disabled,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClearInput = () => {
    setSearchTerm('');
    onChangeFilters(undefined, undefined, '');
  };

  return (
    <div className="flex justify-center items-center gap-2 pr-1 relative mt-2.5">
      <button
        className={`${disabled ? '' : 'bg-white'} p-2.5 rounded-full border border-gray-300 relative hover:outline-none hover:ring-primary ${isLightboxFiltersOpen ? 'ring-2 ring-primary' : ''}`}
        onClick={() => {
          setIsLightboxFiltersOpen(!isLightboxFiltersOpen);
        }}
        disabled={disabled}
      >
        <FaFilter
          className={`${isLightboxFiltersOpen ? 'text-primary' : ''} ${disabled ? 'text-gray-600' : ''}`}
        />
      </button>
      <div className="flex w-full relative">
        <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          className="w-full py-2 pl-10 pr-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={translate('SEARCH_TREASURES')}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onBlur={() => onChangeFilters(undefined, undefined, searchTerm)}
          disabled={disabled}
        />
        {searchTerm && (
          <button
            onClick={handleClearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
