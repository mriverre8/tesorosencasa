import { Filter } from '@/types/filter';
import { Tesoro } from '@/types/tesoro';

const FILTER_ID: (keyof Tesoro)[] = [
  'origin',
  'material',
  'type',
  'brand',
  'units',
  'price',
];

export const translateFilter: Record<string, string> = {
  origin: 'Origen',
  material: 'Material',
  brand: 'Marca',
  type: 'Tipo',
  units: 'Unidades',
  price: 'Precio',
};

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

export const obtainFilteredResults = (
  filters: Record<string, Filter[]>,
  tesorosData: Tesoro[]
) => {
  return tesorosData.filter((tesoro) => {
    const activeCheckboxFilters = Object.entries(filters).flatMap(
      ([category, options]) =>
        options
          .filter((option) => option.checked)
          .map((option) => ({ category, value: option.valueCheckbox }))
    );

    const matchesAllCheckboxes = activeCheckboxFilters.every((filter) => {
      if (filter.category === 'units') {
        return filter.value === 'Disponibles'
          ? tesoro.units > 0
          : tesoro.units === 0;
      }
      return tesoro[filter.category as keyof Tesoro] === filter.value;
    });

    // Filtrar por rango de precio (si está activo)
    const priceFilter = filters.price?.find(
      (filter) => filter.type === 'range' && filter.valueRangeChanged
    );
    const matchesPrice =
      !priceFilter ||
      (tesoro.price >= 0 && tesoro.price <= priceFilter.valueRange!);

    // Solo incluir productos que cumplan TODOS los filtros activos
    return matchesAllCheckboxes && matchesPrice;
  });
};

export const removeAppliedFilter = (
  category: string,
  value: string | number,
  filters: Record<string, Filter[]>
) => {
  const updatedFilters = { ...filters };

  updatedFilters[category] = updatedFilters[category].map((option) => {
    if (option.type === 'checkbox' && option.valueCheckbox === value) {
      return {
        ...option,
        checked: false,
      };
    }

    if (option.type === 'range' && option.valueRange === value) {
      return {
        ...option,
        valueRangeChanged: false,
        valueRange: option.valueMaxRange,
      };
    }

    return option;
  });

  return updatedFilters;
};
