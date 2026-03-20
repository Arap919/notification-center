module.exports = {
    overrides: [
        {
            files: [
                '*.ts'
            ],
            plugins: [
                'rxjs'
            ],
            extends: [
                'plugin:rxjs/recommended'
            ],
            rules: {
                'rxjs/no-nested-subscribe': 'error',
                'rxjs/no-internal': 'off',
                'rxjs/no-implicit-any-catch': 'off'
            }
        },
    ],
};
