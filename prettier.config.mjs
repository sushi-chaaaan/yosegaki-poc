/** @type {import("prettier").Config} */
export default {
  // config
  semi: false,
  singleQuote: false,
  overrides: [
    {
      files: ["*.css", "*.scss"],
      options: {
        singleQuote: false,
      },
    },
  ],
}
