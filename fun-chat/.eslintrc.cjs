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
  },
  plugins: ["prettier", "import", "@typescript-eslint"],
  rules: { 
    "no-console": 0 ,
    "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto"
    }
  ]},
  settings: {
    "import/resolver": {
      typescript: true,
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "noInlineConfig": true,
  },
};