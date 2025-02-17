import { Filter } from '@/types/filter';
import { Tesoro } from '@/types/tesoro';
import React from 'react';

export const translateFilter: Record<string, string> = {
  origin: 'Origen',
  material: 'Material',
  brand: 'Marca',
  type: 'Tipo',
  units: 'Unidades',
  price: 'Precio',
};

const FILTER_ID: (keyof Tesoro)[] = [
  'origin',
  'material',
  'type',
  'brand',
  'units',
  'price',
];

export const generateFilters = (data: Tesoro[]) => {
  const filters: Record<string, Filter[]> = {};

  FILTER_ID.forEach((key) => {
    if (!data.some((item) => item.hasOwnProperty(key))) return;

    if (key === 'units') {
      filters[key] = [
        {
          valueCheckbox: 'Disponibles',
          checked: false,
          type: 'checkbox',
          parent: key,
        },
        {
          valueCheckbox: 'No Disponibles',
          checked: false,
          type: 'checkbox',
          parent: key,
        },
      ];
    } else if (key === 'price') {
      const prices = data
        .map((item) => item.price)
        .filter((price) => price !== undefined);
      if (prices.length > 0) {
        const maxPrice = Math.max(...prices);
        filters[key] = [
          {
            valueMaxRange: maxPrice,
            valueRange: maxPrice,
            valueRangeChanged: false,
            type: 'range',
            parent: key,
          },
        ];
      }
    } else {
      const uniqueValues = Array.from(
        new Set(
          data
            .map((item) => item[key]?.toString())
            .filter((value): value is string => value !== undefined)
        )
      );
      if (uniqueValues.length > 0) {
        filters[key] = uniqueValues.map((value) => ({
          valueCheckbox: value,
          checked: false,
          type: 'checkbox',
          parent: key,
        }));
      }
    }
  });

  return filters;
};

export const getFilters = (
  filterValues: Filter[],
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: Filter
  ) => void
) => {
  if (!Array.isArray(filterValues)) return null;
  return (
    <>
      {filterValues.map((filter) =>
        filter.type === 'range' ? (
          // Caso Range
          <div key={filter.type}>
            <div className="flex items-center gap-2">
              <label htmlFor={filter.type}>0</label>
              <input
                id={filter.type}
                type="range"
                className="cursor-pointer w-full"
                min="0"
                max={filter.valueMaxRange}
                value={filter.valueRange}
                onChange={(e) => handleFilterChange(e, filter)}
              />
              <label
                onClick={(e) => e.preventDefault()} // Evita errores al hacer clic
                htmlFor={filter.type}
              >
                {filter.valueMaxRange}
              </label>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-xs text-gray-500">
                Verás tesoros de 0 hasta {filter.valueRange} €
              </p>
            </div>
          </div>
        ) : (
          // Caso Checkbox
          <div key={filter.valueCheckbox}>
            <div className="flex items-center gap-2">
              <input
                id={filter.valueCheckbox}
                type="checkbox"
                className="cursor-pointer"
                checked={filter.checked}
                onChange={(e) => handleFilterChange(e, filter)}
              />
              <label
                onClick={(e) => e.preventDefault()} // Evita errores al hacer clic
                htmlFor={filter.valueCheckbox}
              >
                {filter.valueCheckbox}
              </label>
            </div>
          </div>
        )
      )}
    </>
  );
};
