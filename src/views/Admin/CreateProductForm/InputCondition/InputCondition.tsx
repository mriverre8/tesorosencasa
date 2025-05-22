import React, { useEffect, useRef, useState } from 'react';

// Translation
import { translate } from '@/locales/translate';

const CONDITIONS = [
  'CONDITION_1',
  'CONDITION_2',
  'CONDITION_3',
  'CONDITION_4',
  'CONDITION_5',
] as const;

interface Props {
  value: string;
  updateForm: (key: string, value: string) => void;
}

const InputCondition = ({ value, updateForm }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (condition: string) => {
    updateForm('condition', condition);
    setShowDropdown(false);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    updateForm('condition', translate('CONDITION_6'));
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label htmlFor="condition" className="px-0.5 text-sm block mb-1">
        {translate('TREASSAURE_CONDITION')}
      </label>
      <input type="hidden" name="condition" value={value} />
      <div className="relative">
        <button
          type="button"
          className={`w-full border border-gray-300 rounded-full py-2 px-4 text-left bg-white focus:ring-2 focus:ring-primary outline-none ${
            value !== translate('CONDITION_6') ? 'text-black' : 'text-gray-400'
          }`}
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {value}
        </button>

        {value !== translate('CONDITION_6') && (
          <button
            onClick={clearSelection}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {showDropdown && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto z-10">
          {CONDITIONS.map((condition, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onMouseDown={() => handleSelect(translate(condition))}
            >
              {translate(condition)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputCondition;
