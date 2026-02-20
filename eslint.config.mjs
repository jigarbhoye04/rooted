import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: ["node_modules/", ".next/", "scripts/"],
    },
    ...tseslint.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            "@typescript-eslint/no-unused-vars": "error",
        },
    },
];
