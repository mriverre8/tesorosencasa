import { tesoros } from '@prisma/client';

// Given a country name and a list of countries, returns the country object of the list
export const findCountryByName = (
  countries: { name: string; flag: string }[],
  countryName: string
) => {
  return countries.find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  );
};

// Given a value (number as string) and a setValue function, sets the value only if it matches the regex.
export const acceptOnlyNumbers = (
  value: string,
  setValue: (value: string) => void,
  blockComma = false
) => {
  // Expresión regular para permitir solo números y, opcionalmente, una coma con hasta dos decimales
  const regex = blockComma ? /^$|^[1-9]\d*$/ : /^\d*(,\d{0,2})?$/;

  if (regex.test(value)) {
    setValue(value);
  }
};

export const minutesToHours = (minutes: string): string => {
  const totalMinutes = parseInt(minutes, 10);

  if (isNaN(totalMinutes)) {
    return '0h 0min';
  }

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return `${hours}h ${mins}min`;
};

// Given a list of products, generates filter options based on unique values in specific fields.
export const generateFilters = (
  products: tesoros[]
): Record<string, (string | number)[]> => {
  const filters: Record<string, (string | number)[]> = {};

  const fields = ['condition', 'origin', 'brand', 'material', 'category'];

  for (const field of fields) {
    const uniqueValues = new Set<string>();

    products.forEach((product) => {
      const value = product[field as keyof tesoros];

      if (field === 'condition' && Array.isArray(value)) {
        value.forEach((con) => uniqueValues.add(String(con)));
      } else if (field === 'material' && Array.isArray(value)) {
        value.forEach((mat) => uniqueValues.add(String(mat)));
      } else if (value !== null && value !== undefined) {
        uniqueValues.add(String(value));
      }
    });

    if (uniqueValues.size > 0) {
      filters[field] = Array.from(uniqueValues);
    }
  }

  if (products.length > 0) {
    const maxPrice = Math.max(...products.map((p) => p.price));
    filters['price'] = [Math.ceil(maxPrice)];
  }

  return filters;
};

// Given a list of products, filters, and a search term, returns the filtered list of products.
export const filterProducts = (
  products: tesoros[],
  filters: Record<string, (string | number)[]>,
  searchTerm: string
): tesoros[] => {
  return products.filter((product) => {
    // Search term filter
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
        (product.category &&
          product.category.toLowerCase().includes(searchLower)) ||
        (product.origin && product.origin.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;
    }

    // Apply filters
    for (const [key, values] of Object.entries(filters)) {
      if (values.length === 0) continue;

      const productValue = product[key as keyof tesoros];

      if (key === 'condition' && Array.isArray(productValue)) {
        const hasMatch = productValue.some((condition) =>
          values.includes(condition as string | number)
        );
        if (!hasMatch) return false;
      } else if (key === 'material' && Array.isArray(productValue)) {
        const hasMatch = productValue.some((material) =>
          values.includes(material as string | number)
        );
        if (!hasMatch) return false;
      } else if (key === 'price' && typeof productValue === 'number') {
        const maxPrice = Math.max(...(values as number[]));
        if (productValue > maxPrice) return false;
      } else {
        // For other fields (brand, origin, category), exclude products with null/undefined values
        // when a filter is applied, and check if the value matches the filter
        if (productValue === null || productValue === undefined) {
          return false;
        }
        if (!values.includes(productValue as string | number)) return false;
      }
    }

    return true;
  });
};
