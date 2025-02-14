import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["src/**/*.{ts,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  {settings: {react: {version: "detect"}}},
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {ignores: ["dist", "node_modules"]}
];