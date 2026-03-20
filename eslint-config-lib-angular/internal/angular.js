module.exports = {
    overrides: [
        {
            files: [
                '*.ts'
            ],
            env: {
                browser: true,
                es6: true,
                node: true,
            },
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: [
                    'tsconfig.json'
                ],
                createDefaultProgram: true,
                sourceType: 'module',
                errorOnUnknownASTType: true,
                warnOnUnsupportedTypeScriptVersion: false,
                ecmaVersion: 6,
            },
            extends: [
                'plugin:@angular-eslint/template/process-inline-templates',
                'plugin:@angular-eslint/recommended',
            ],
            plugins: [
                'change-detection-strategy',
            ],
            rules: {
                '@angular-eslint/component-class-suffix': 'error',
                '@angular-eslint/contextual-lifecycle': 'error',
                '@angular-eslint/directive-class-suffix': 'error',
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        'type': 'attribute',
                        'prefix': 'of',
                        'style': 'kebab-case'
                    }
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        'type': 'element',
                        'prefix': 'of',
                        'style': 'kebab-case'
                    }
                ],
                '@angular-eslint/no-conflicting-lifecycle': 'error',
                '@angular-eslint/no-input-rename': 'off',
                '@angular-eslint/no-inputs-metadata-property': 'error',
                '@angular-eslint/no-output-native': 'error',
                '@angular-eslint/no-output-on-prefix': 'error',
                '@angular-eslint/no-output-rename': 'error',
                '@angular-eslint/no-outputs-metadata-property': 'error',
                '@angular-eslint/template/no-negated-async': [
                    'off'
                ],
                '@angular-eslint/use-lifecycle-interface': 'error',
                '@angular-eslint/use-pipe-transform-interface': 'error',
                // '@angular-eslint/template/eqeqeq': ['error', { "allowNullOrUndefined": true }],
                'change-detection-strategy/on-push': 'error'
            }
        },
        {
            files: [
                '*.component.ts'
            ]
        }
    ],
};
