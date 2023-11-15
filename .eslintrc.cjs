// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/** @type {ConfigData} */
module.exports = {
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: ["simple-import-sort", "perfectionist"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["./", "../", "~/"],
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "perfectionist/sort-jsx-props": "error",
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  ignorePatterns: [".eslintrc.cjs", "tailwind.config.ts"],
}
