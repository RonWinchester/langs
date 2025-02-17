const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const prettier = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: {
        module: "readonly", // ✅ Исправляет ошибку "module is not defined"
        require: "readonly", // ✅ Исправляет ошибку "require is not defined"
        process: "readonly", // ✅ Исправляет ошибку "process is not defined" (если нужна)
        __dirname: "readonly", // ✅ Для CommonJS
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
      "import/no-unresolved": "off",
      "no-console": "warn",
    },
  },
  prettier,
];
