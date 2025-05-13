import translations from '../locales/es.json';

export function translate(key: string, vars: Record<string, any> = {}): string {
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
