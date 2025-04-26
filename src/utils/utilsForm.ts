export const findCountryByName = (
  countries: { name: string; flag: string }[],
  countryName: string
) => {
  return countries.find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  );
};

export const acceptOnlyNumbers = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValue: string,
  updateForm: (field: string, value: string) => void,
  blockComma = false
) => {
  const value = e.target.value;

  // Expresión regular para permitir solo números y, opcionalmente, una coma con hasta dos decimales
  const regex = blockComma ? /^\d*$/ : /^\d*(,\d{0,2})?$/;

  if (regex.test(value)) {
    updateForm(formValue, value);
  }
};
