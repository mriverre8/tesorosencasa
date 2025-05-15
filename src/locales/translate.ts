import translations from '../locales/es.json';

type TranslationVariables = Record<string, string | number>;

export function translate(
  key: string,
  vars: TranslationVariables = {}
): string {
  const template = translations[key as keyof typeof translations];

  if (!template) {
    return `[missing translation: ${key}]`;
  }

  return template.replace(
    /\$\{(\w+)\}/g,
    (_match: string, variable: string) => {
      if (!(variable in vars)) {
        return `[missing variable: ${variable}]`;
      }
      return String(vars[variable]);
    }
  );
}
