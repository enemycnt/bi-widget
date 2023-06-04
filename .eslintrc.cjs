module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  parserOptions: {
    project: ["./tsconfig.json"], // Specify it only for TypeScript files
  },
  plugins: ["react-refresh", "@typescript-eslint", "import", "@emotion"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "internal", "sibling"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
};
