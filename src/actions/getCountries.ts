export const getCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    return data
      .map(
        (country: {
          name: { common: string };
          translations?: { spa?: { common: string } };
          flags: { svg: string };
        }) => ({
          name: country.translations?.spa?.common || country.name.common, // Obtiene el nombre en español si está disponible
          flag: country.flags.svg,
        })
      )
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
