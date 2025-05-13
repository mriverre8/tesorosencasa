'use client';

import { translate } from '@/locales/translate';

import { BiSearchAlt } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';

interface Props {
  searchTerm: string;
  setSearchTerm: (state: string) => void;
  showFilterSelector: boolean;
  setShowFilterSelector: (state: boolean) => void;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  showFilterSelector,
  setShowFilterSelector,
}: Props) => {
  return (
    <div className="flex justify-center items-center gap-2 pr-1 relative mt-2.5">
      <button
        className={`bg-white p-2.5 rounded-full border border-gray-300 relative hover:outline-none hover:ring-primary ${showFilterSelector ? 'ring-2 ring-primary' : ''}`}
        onClick={() => {
          setShowFilterSelector(!showFilterSelector);
        }}
      >
        <FaFilter className={`${showFilterSelector ? 'text-primary' : ''}`} />
      </button>

      <div className="flex w-full relative">
        <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          className="w-full py-2 pl-10 pr-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={translate('SEARCH_TREASURES')}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
