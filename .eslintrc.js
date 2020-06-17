module.exports = {
    env: {
      es6: true,
      node: true,
      jest: true
    },
    extends: ['airbnb-base', 'prettier', "eslint:recommended",
    "plugin:react/recommended"],
    plugins: ['prettier'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    "parser": "babel-eslint",
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
    }
    },
    rules: {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    },
  };
