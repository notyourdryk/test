import { defineConfig } from "eslint/config";
import configTypescript from 'eslint-config-typescript';

export default defineConfig([
    {
        ...configTypescript,
        rules: {
            semi: "error",
            "prefer-const": "error",
            "import/no-anonymous-default-export": "off",
        },
    },
]);
