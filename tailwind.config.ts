import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* background: 'var(--background)',
        foreground: 'var(--foreground)', */
        background: 'var(--bg)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'secondary-hover': 'var(--secondary-hover)',
      },
      screens: {
        mobile: '450px',
      },
    },
  },
  plugins: [],
} satisfies Config;
