import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      /* Codebase convention: a leading underscore marks an intentionally
         unused binding (e.g. destructuring a field out of a payload just to
         drop it) — see components/Contact.tsx's `{ website: _hp, ...rest }`. */
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];

export default eslintConfig;
