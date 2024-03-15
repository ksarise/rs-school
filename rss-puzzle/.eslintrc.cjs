module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: '**/tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'no-console': 'off',
  },
  "overrides": [
    {
      "files": ["*.js"],
      "extends": ["plugin:@typescript-eslint/disable-type-checked"]
    }
  ],
  "settings": {
    "import/resolver": {
      "typescript": true
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    }
  }
};
