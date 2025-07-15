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
  const regex = blockComma ? /^\d*$/ : /^\d*(,\d{0,2})?$/;

  if (regex.test(value)) {
    setValue(value);
  }
};
