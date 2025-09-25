import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Utils
import { findCountryByName } from '@/utils/utils';

// Countries data
import countriesMock from '@/mocks/countries.json';

// Translation
import { useTranslations } from 'next-intl';

interface Props {
  country: string;
  setCountry: (countrie: string) => void;
}

const InputCountries = ({ country, setCountry }: Props) => {
  const translate = useTranslations();

  const inputRef = useRef<HTMLInputElement>(null);

  // Contiene los países que se obtienen de la API
  const [countries, setCountries] = useState<{ name: string; flag: string }[]>(
    []
  );
  // Contiene los países filtrados por el input
  const [filteredCountries, setFilteredCountries] = useState<
    { name: string; flag: string }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  // Controla el cambio en el input de origen
  // Si lo que has introducido coincide con un país, lo selecciona
  // Si no, lo deja como texto plano
  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const matchedCountry = findCountryByName(countries, inputValue);

    if (matchedCountry) {
      setCountry(matchedCountry.name);
      setSelectedCountry(matchedCountry.flag);
    } else {
      setCountry(inputValue);
      setSelectedCountry('');
    }
  };

  // Controla el blur (cuando se libera el campo de la escritura) del input de origen
  // Si el país seleccionado coincide con uno de la lista (selectedCountry), lo deja como está y cierra el dropdown
  // Si no, lo deja como texto plano y cierra el dropdown
  const handlleOriginBlur = () => {
    if (selectedCountry === '') {
      setCountry('');
    }
    setShowDropdown(false);
  };

  // Limpia el input de origen (resetea los valores)
  const clearInput = (e: React.MouseEvent) => {
    e.preventDefault();
    setCountry('');
    setSelectedCountry('');
    setFilteredCountries(countries);
    inputRef.current?.focus();
  };

  // Obtiene los países al cargar el componente y los guarda en el estado
  useEffect(() => {
    setCountries(countriesMock);
  }, []);

  // Filtra los países que coincidan con el valor introducido en el input
  // Si no hay valor, muestra todos los países
  useEffect(() => {
    if (country && countries.length > 0) {
      setFilteredCountries(
        countries.filter((c) =>
          c.name.toLowerCase().includes(country.toLowerCase())
        )
      );
    } else {
      setSelectedCountry('');
      setFilteredCountries(countries);
    }
  }, [country, countries]);

  return (
    <div className="relative mb-4">
      <label htmlFor="origin" className="px-0.5 text-sm">
        {translate('TREASAURE_ORIGIN')}
      </label>

      <div className="flex flex-col w-full relative">
        {selectedCountry ? (
          <Image
            src={selectedCountry}
            alt="Country flag"
            width={28}
            height={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-7 rounded-md"
          />
        ) : (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 border w-7 h-5 rounded-md flex justify-center items-center">
            ?
          </div>
        )}
        <input
          ref={inputRef}
          id="origin"
          name="origin"
          type="text"
          placeholder={translate('UNKNOWN')}
          value={country}
          onChange={handleOriginChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={handlleOriginBlur}
          className="border rounded-lg py-2 pr-8 pl-[51px] w-full focus:ring-2 focus:ring-primary outline-none"
          autoComplete="off"
        />

        {country && (
          <button
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 "
          >
            ✕
          </button>
        )}
      </div>

      {showDropdown && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto z-10">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((c, index) => (
              <li
                key={index}
                onMouseDown={() => {
                  setCountry(c.name);
                  setSelectedCountry(c.flag);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 border-b text-sm"
              >
                <Image
                  src={c.flag}
                  alt={c.name}
                  width={28}
                  height={20}
                  className="h-5 w-7 rounded-md"
                />
                {c.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 text-sm">
              {translate('NO_RESULTS')}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default InputCountries;
