import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // @eslint/js v9 and eslint-plugin-react v7 export their `recommended`
  // presets as single config objects (not arrays), so they are passed
  // directly. typescript-eslint's `recommended` is still an array of
  // configs, so it is spread into the call.
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    // Project root config files use CJS globals (e.g. `module`) and are not
    // application code — exclude them from the browser-globals env. Also
    // skip the husky hook scripts and any third-party build artefacts.
    ignores: [
      "dist/**",
      "node_modules/**",
      "public/**",
      ".husky/**",
      "**/*.config.{js,cjs,mjs,ts}",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // Enable type-aware lint rules (no-explicit-any, no-unsafe-*) by giving
      // the typescript-eslint parser access to the tsconfig via projectService.
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "react-hooks/set-state-in-effect": "off",
      // Type-safety belt-and-suspenders: block any usage and unsafe operations.
      // tsconfig "strict" already prevents implicit any, these rules additionally
      // flag explicit any annotations and any operation that would silently
      // propagate through one.
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
