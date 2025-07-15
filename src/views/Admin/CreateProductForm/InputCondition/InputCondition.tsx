import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { HiOutlineSelector } from 'react-icons/hi';

const CONDITIONS = [
  'CONDITION_1',
  'CONDITION_2',
  'CONDITION_3',
  'CONDITION_4',
  'CONDITION_5',
] as const;

interface Props {
  condition: string[];
  setCondition: (condition: string[]) => void;
}

const InputCondition = ({ condition, setCondition }: Props) => {
  const translate = useTranslations();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAddOption = (selection: string) => {
    const option = translate(selection);
    if (option && !condition.includes(option)) {
      setCondition([...condition, option]);
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setCondition(condition.filter((opt) => opt !== optionToRemove));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const isCondition1Translated = translate('CONDITION_1');
  const isCondition1Selected = condition.includes(isCondition1Translated);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine available options
  const availableOptions = CONDITIONS.filter((opt) => {
    if (opt === 'CONDITION_1' && condition.length > 0) return false;
    return !condition.includes(translate(opt));
  });

  const shouldDisableDropdown =
    condition.length === CONDITIONS.length - 1 || isCondition1Selected;

  return (
    <>
      <div className="flex flex-col gap-1 mb-2 relative" ref={dropdownRef}>
        <label htmlFor="dropdown-button" className="px-0.5 text-sm">
          {translate('TREASSAURE_CONDITION')}
        </label>

        <div className="flex relative justify-end items-center">
          <button
            id="dropdown-button"
            type="button"
            onClick={toggleDropdown}
            className={`border rounded-lg focus:ring-2 outline-none w-full px-2.5 py-2 text-left bg-white ${
              shouldDisableDropdown
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'focus:ring-primary'
            }`}
            disabled={shouldDisableDropdown}
          >
            {condition.length > 0
              ? translate('SELECT_ANOTHER_OPTION')
              : translate('CONDITION_6')}
          </button>
          <HiOutlineSelector className="absolute mr-2 pointer-events-none" />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow z-10">
            {availableOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleAddOption(opt)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {translate(opt)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        {condition.map((option, index) => (
          <div
            key={option}
            className="flex items-center justify-between px-4 py-2 text-sm"
          >
            <div className="flex text-sm gap-2">
              <p className="font-semibold">{index + 1}.</p> <p>{option}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveOption(option)}
              className="text-red-600 hover:underline"
            >
              {translate('DELETE')}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default InputCondition;
