import React, { useState } from 'react';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { TbPlaylistAdd } from 'react-icons/tb';

interface Props {
  materials: string[];
  setMaterials: (materials: string[]) => void;
}

const InputMaterial = ({ materials, setMaterials }: Props) => {
  const translate = useTranslations();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();

    // Check if it starts with a whitespace
    if (/^\s/.test(inputValue)) {
      setError(
        translate('ERROR_STARTS_WITH_WHITESPACE') ||
          'No puede comenzar con un espacio'
      );
      return;
    }

    if (
      trimmedValue &&
      !materials.includes(trimmedValue) &&
      materials.length < 3
    ) {
      setMaterials([...materials, trimmedValue]);
      setInputValue('');
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Validate while typing
    if (/^\s/.test(value)) {
      setError(translate('INPUT_PRODUCT_MATERIAL_INVALID'));
    } else {
      setError('');
    }
  };

  const handleRemove = (materialToRemove: string) => {
    setMaterials(materials.filter((mat) => mat !== materialToRemove));
  };

  const isAddDisabled =
    !inputValue.trim() ||
    materials.includes(inputValue.trim()) ||
    materials.length >= 3 ||
    /^\s/.test(inputValue);

  return (
    <div>
      <label htmlFor="material" className="px-0.5 text-sm">
        {translate('TREASAURE_MATERIAL')}
      </label>
      <div className="flex gap-3">
        <input
          id="material"
          name="material"
          value={inputValue}
          maxLength={30}
          onChange={handleChange}
          type="text"
          placeholder={translate('UNKNOWN')}
          className={`border rounded-full px-4 py-2 w-full focus:ring-2 outline-none ${
            error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'
          }`}
          disabled={materials.length >= 3}
          autoComplete="off"
        />
        <button
          onClick={handleAdd}
          disabled={isAddDisabled}
          className={`text-sm transition ${
            isAddDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-primary'
          }`}
        >
          <TbPlaylistAdd className="text-3xl" />
        </button>
      </div>

      {error && <p className="px-0.5 text-red-500 text-xs mt-1">{error}</p>}

      <ul className="mt-4 mb-4">
        {materials.map((material, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-4 py-2 text-sm"
          >
            <div className="flex text-sm gap-2">
              <p className="font-semibold">{index + 1}.</p> <p>{material}</p>
            </div>
            <button
              onClick={() => handleRemove(material)}
              className="text-red-600 hover:underline"
            >
              {translate('DELETE')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputMaterial;
