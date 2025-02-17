import { Filter } from '@/types/filter';
import { getFilters, translateFilter } from '@/utils/getFilters';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface ProductsProps {
  filters: Record<string, Filter[]>;
  setFilters: (state: Record<string, Filter[]>) => void;
  closeAction: () => void;
}

const LightboxFilters = ({
  filters,
  setFilters,
  closeAction,
}: ProductsProps) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const applyFilters = () => {
    setFilters(tempFilters);
    closeAction();
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: Filter
  ) => {
    // Clonar profundamente el objeto para evitar modificar `filters` accidentalmente
    const updatedFilters = JSON.parse(JSON.stringify(tempFilters));

    // Buscar el índice del filtro dentro de su categoría (parent)
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
        if (
          updatedFilters[filter.parent][filterIndex].valueRange !==
          updatedFilters[filter.parent][filterIndex].valueMaxRange
        ) {
          updatedFilters[filter.parent][filterIndex].valueRangeChanged = true;
        } else {
          updatedFilters[filter.parent][filterIndex].valueRangeChanged = false;
        }
      } else if (filter.type === 'checkbox') {
        updatedFilters[filter.parent][filterIndex].checked = e.target.checked;
      }

      setTempFilters(updatedFilters);
    }
  };

  return (
    <div className="w-full flex-col max-w-md bg-white py-6 pl-6 pr-3 rounded-lg shadow-xl">
      <div className="relative flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Filtrar Resultados
        </h2>
        <IoClose
          onClick={() => closeAction()}
          className="absolute right-0 text-2xl cursor-pointer transform transition-transform  hover:scale-125 hover:text-yellow-400"
        />
      </div>
      <div className="space-y-4 overflow-y-auto max-h-[60vh]">
        {Object.keys(tempFilters).map((filter, index) => (
          <div key={index} className="">
            <h3 className="text-gray-600 font-medium mb-3">
              {translateFilter[filter]}
            </h3>
            <div className="flex flex-col text-sm gap-2 text-gray-500 px-3">
              {getFilters(tempFilters[filter], handleFilterChange)}
            </div>
          </div>
        ))}
      </div>
      <div className=" flex items-center justify-center gap-5 mt-3">
        <button
          onClick={() => closeAction()}
          className="border-2 border-green-600 hover:border-green-400 gap-1 mt-3 rounded-full py-0.5 px-3.5 text-sm"
        >
          Cancelar
        </button>
        <button
          onClick={() => applyFilters()}
          className="border text-white bg-green-600 hover:bg-green-500 gap-1 mt-3 rounded-full py-1 px-4 text-sm whitespace-nowrap "
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};

export default LightboxFilters;
