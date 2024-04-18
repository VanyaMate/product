module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:i18next/recommended",
        "plugin:storybook/recommended"
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        'import',
        'n',
        'promise',
        'react',
        'react-hooks',
    ],
    rules: {
        'react-refresh/only-export-components': "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off",
        "no-empty-pattern": "off",

        "react/prefer-stateless-function": "error",
        "react/no-unused-prop-types": "error",
        "react/jsx-pascal-case": "error",
        "react/jsx-no-script-url": "error",
        "react/no-children-prop": "error",
        "react/no-danger": "error",
        "react/no-danger-with-children": "error",
        "react/no-unstable-nested-components": ["error", {allowAsProps: true}],
        "react/jsx-fragments": "error",
        "react/jsx-no-leaked-render": ["error", {validStrategies: ["ternary"]}],
        "react/jsx-max-depth": ["error", {max: 5}],
        "react/function-component-definition": [
            "warn",
            {namedComponents: "arrow-function"},
        ],
        "react/jsx-key": [
            "error",
            {
                checkFragmentShorthand: true,
                checkKeyMustBeforeSpread: true,
                warnOnDuplicates: true,
            },
        ],
        "react/jsx-no-useless-fragment": "warn",
        "react/jsx-curly-brace-presence": "warn",
        "react/no-typos": "warn",
        "react/display-name": "warn",
        "react/self-closing-comp": "warn",
        "react/jsx-sort-props": "warn",
        "react/react-in-jsx-scope": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/prop-types": "off",
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,it,story,stories,e2e-it,e2e-test}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
            }
        }
    ],
    globals: {
        __IS_DEV__: true,
        __API__: true
    }
}