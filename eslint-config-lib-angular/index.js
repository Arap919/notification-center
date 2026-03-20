module.exports = {
    extends: [
        '@tinkoff/eslint-config',
        '@tinkoff/eslint-config-angular',
        './internal/base',
        './internal/typescript',
        './internal/angular',
        './internal/rxjs',
        './internal/html',
    ],
    rules: {
        'prettier/prettier': 0,
    }
};
