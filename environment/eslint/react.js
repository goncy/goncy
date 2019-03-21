module.exports = {
  root: true,
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'error',
    'default-case': 'off',
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_$',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'jsx-a11y/accessible-emoji': 'off',
  },
};