import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        ignores: ["node_modules/", ".next/", "scripts/"],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@next/next": nextPlugin,
        },
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
        },
    },
];
