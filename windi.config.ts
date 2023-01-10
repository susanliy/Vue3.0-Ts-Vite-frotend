import { defineConfig } from 'vite-plugin-windicss';
export const primaryColor = '#3d47bf';

export default defineConfig({
  darkMode: 'class',
  theme: {
    textColor: {
      primary: primaryColor,
    },
  },
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
});
