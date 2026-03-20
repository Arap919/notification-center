module.exports = {
    overrides: [
        {
            files: ['*.html'],
            parser: '@angular-eslint/template-parser',
            plugins: ['@angular-eslint/eslint-plugin-template'],
            rules: {
                'prettier/prettier': 0,
                'max-len': [
                    'error',
                    {
                        'code': 200
                    }
                ],
                'import/no-deprecated': 0,
                'strict': 0, // disable rule for scripts
                'lines-around-directive': 0 // disable rule for scripts
            },
        },
    ],
};
