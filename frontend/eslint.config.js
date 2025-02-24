import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            import: importPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            ...importPlugin.configs.recommended.rules, // Рекомендованные правила для импортов
            "import/order": [
                "error",
                {
                    alphabetize: { order: "asc", caseInsensitive: true },
                    "newlines-between": "always",
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                    ],
                },
            ],
            "@typescript-eslint/no-unused-vars": "off",
            "no-undef": "off",
            "import/no-unresolved": "off",
            "no-console": "warn",
            "import/named": "off",
            "@typescript-eslint/no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "@ideanick/backend/**",
                                "!@ideanick/backend/**/",
                                "!@ideanick/backend/**/input",
                                "!@ideanick/backend/src/utils/can",
                            ],
                            allowTypeImports: true,
                            message:
                                "Only types and input schemas are allowed to be imported from backend workspace",
                        },
                    ],
                },
            ],
        },
    },
);
