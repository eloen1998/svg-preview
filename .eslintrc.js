module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['dist', 'node_modules', '*.html'],
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
        '@typescript-eslint/ban-ts-comment': ['error', {
            'ts-ignore': 'allow-with-description'
        }],
        'no-multi-spaces': 'error',
        'block-spacing': 'error',
        'space-before-blocks': 'error',
        'comma-dangle': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
        'object-curly-spacing': ['error', 'always'],
        'space-infix-ops': 'error'
    }
}
