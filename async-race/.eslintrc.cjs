module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint-config-airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    "@typescript-eslint/no-explicit-any": 2,
    "no-console": "off",
    "no-cycle": "off",
  },
  plugins: ["prettier", "import", "@typescript-eslint"],
  rules: { "no-console": 0 },
  settings: {
    "import/resolver": {
      typescript: true,
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
  },
};
