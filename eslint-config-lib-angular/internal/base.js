module.exports = {
    overrides: [
        {
            files: ['*.ts'],
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
            rules: {
                'prettier/prettier': 0,
                'no-restricted-syntax': [
                    'error',
                    {'selector': 'MethodDefinition[kind=\'set\']', 'message': 'Property setters are not allowed'},
                    {'selector': 'MethodDefinition[kind=\'get\']', 'message': 'Property getters are not allowed'}
                ],
                'default-case': 'error',
                'no-plusplus': [
                    'warn',
                    {
                        'allowForLoopAfterthoughts': true
                    }
                ],
                'consistent-return': 'off',
                'no-var': 'error',
                'max-depth': [
                    'warn',
                    4
                ],
                'max-params': [
                    'off',
                    4
                ],
                'complexity': [
                    'warn',
                    25
                ],
                'max-statements': [
                    'warn',
                    25
                ],
                'no-unused-vars': [
                    'error',
                    {
                        'args': 'none'
                    }
                ],
                'max-classes-per-file': [
                    'error',
                    2
                ],
                'no-return-assign': [
                    'warn',
                    'except-parens'
                ],
                'no-useless-escape': 'off',
                'no-empty': [
                    'warn',
                    {
                        'allowEmptyCatch': true
                    }
                ],
                'eqeqeq': ['error', 'always', {'null': 'never'}],
                'no-console': [
                    'error',
                    {
                        'allow': [
                            'warn',
                            'clear',
                            'error'
                        ]
                    }
                ],
                'no-restricted-imports': [
                    'error',
                    'rxjs/Rx'
                ],
                'max-len': [
                    'error',
                    {
                        'code': 200
                    }
                ],
                'no-multiple-empty-lines': 'error',
                'no-debugger': 'error',
                'quote-props': [
                    'error',
                    'consistent-as-needed'
                ],
                'prefer-const': 'warn',
                'no-fallthrough': 'error',
                'object-shorthand': 'warn',
                'sort-keys': [
                    'off'
                ],
                'sort-imports': [
                    'off'
                ],
                'no-trailing-spaces': 'off',
                'no-alert': 'error',
                'comma-dangle': [
                    'error',
                    {
                        'arrays': 'only-multiline',
                        'objects': 'only-multiline',
                        'imports': 'only-multiline',
                        'exports': 'only-multiline',
                        'functions': 'only-multiline'
                    }
                ],
                'no-undefined': 'error',
                'no-undef-init': 'error',
                'no-nested-ternary': 'error',
                'no-multi-spaces': ['error', {'ignoreEOLComments': true}],
                'object-curly-spacing': ['error', 'always'],
                'comma-spacing': [2, {'before': false, 'after': true}],
                'no-restricted-globals': ['error', {
                    name: 'setInterval',
                    message: 'Avoid using timers.'
                }, {
                    name: 'setTimeout',
                    message: 'Avoid using timers.',
                }],
                'no-restricted-properties': ['error', {
                    object: 'window',
                    property: 'setInterval',
                    message: 'Avoid using timers.',
                }, {
                    object: 'window',
                    property: 'setTimeout',
                    message: 'Avoid using timers.',
                }],
                'no-else-return': [
                    'error',
                    {
                        'allowElseIf': true
                    }
                ]
            }
        }]
};
