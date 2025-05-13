import translations from '../locales/es.json';

type TranslationKeys = keyof typeof translations;

type TranslationVariables = Record<string, string | number>;

export function translate(
  key: TranslationKeys,
  vars: TranslationVariables = {}
): string {
  const template = translations[key];

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
