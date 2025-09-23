'use client';

import React, { useEffect, useRef } from 'react';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { BiSearchAlt } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';

// Hooks
import useAppContext from '@/hooks/useAppContext';

interface Props {
  isLightboxFiltersOpen: boolean;
  setIsLightboxFiltersOpen: (state: boolean) => void;
  onChangeFilters: (
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
  const translate = useTranslations();

  const context = useAppContext();

  const lastSearchTerm = useRef('');

  const handleClearInput = () => {
    context.setSearchTermState('');
    lastSearchTerm.current = '';
    onChangeFilters(undefined, '');
  };

  const handleBlur = () => {
    if (context.searchTermState.trim() !== lastSearchTerm.current.trim()) {
      lastSearchTerm.current = context.searchTermState.trim();
      onChangeFilters(undefined, context.searchTermState.trim());
    }
  };

  useEffect(() => {
    lastSearchTerm.current = context.searchTermState;
  }, []);

  return (
    <div className="flex justify-center items-center gap-2 pr-1 relative mt-2.5">
      <button
        className={`${disabled ? 'bg-gray-200/10' : 'bg-white'} p-2.5 rounded-full border relative hover:outline-none hover:ring-primary ${isLightboxFiltersOpen ? 'ring-1 ring-primary' : ''}`}
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
        <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        <input
          className="w-full py-2 pl-10 pr-8 rounded-full border focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={translate('SEARCH_TREASURES')}
          value={context.searchTermState}
          onChange={(e) => {
            context.setSearchTermState(e.target.value);
          }}
          onBlur={handleBlur}
        />
        {context.searchTermState && (
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
