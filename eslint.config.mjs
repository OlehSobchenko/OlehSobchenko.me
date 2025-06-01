import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "next/core-web-vitals",
    "next",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@next/next/no-img-element": "off",
        "import/no-anonymous-default-export": "off",

        "no-console": ["warn", {
            allow: ["warn", "error", "info"],
        }],

        "no-trailing-spaces": "warn",
        "@next/next/next-script-for-ga": "off",

        "comma-dangle": ["warn", {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
            functions: "always-multiline",
        }],

        "semi": ["warn", "always"],

        quotes: ["warn", "single", {
            avoidEscape: true,
            allowTemplateLiterals: true,
        }],

        indent: ["off", 4],

        "max-len": ["warn", {
            code: 80,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreTrailingComments: true,
            ignoreTemplateLiterals: true,
            ignoreStrings: true,
            ignoreUrls: true,
        }],

        "import/order": "off",

        "react/no-unknown-property": ["error", {
            ignore: ["jsx"],
        }],

        "react/self-closing-comp": "off",
    },
}];
