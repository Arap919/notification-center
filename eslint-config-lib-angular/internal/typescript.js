module.exports = {
    overrides: [
        {
            files: ['*.ts'],
            plugins: ['@stylistic'],
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
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended'
            ],
            rules: {
                '@typescript-eslint/consistent-type-imports': 'off', // @typescript-eslint has a bug 'An unhandled exception occurred: Cannot read properties of undefined (reading 'length')' in node_modules/@typescript-eslint/eslint-plugin/dist/rules/consistent-type-imports.js at 'if (report.node.attributes.length === 0) {'
                'sort-class-members/sort-class-members': 'off',
                'no-void': 'off',
                'import/order': 'off',
                'no-empty-function': [
                    'warn',
                    {
                        allow: [
                            'constructors',
                            'arrowFunctions'
                        ],
                    },
                ],
                '@typescript-eslint/prefer-readonly': 'off',
                '@typescript-eslint/no-property-access-from-index-signature': 'off',
                '@typescript-eslint/no-empty-function': [
                    'warn',
                    {
                        'allow': [
                            'constructors',
                            'arrowFunctions'
                        ]
                    }
                ],
                '@typescript-eslint/explicit-function-return-type': [
                    'error',
                    {
                        'allowExpressions': true
                    }
                ],
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        'default': [
                            'private-instance-field',
                            'public-instance-field',
                            'constructor',
                            'public-instance-method',
                            'protected-instance-method',
                            'private-instance-method',
                            'static-field',
                            'static-method'
                        ]
                    }
                ],
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        'selector': 'default',
                        'format': [
                            'camelCase',
                            'PascalCase'
                        ],
                        'leadingUnderscore': 'allow',
                        'trailingUnderscore': 'forbid'
                    },
                    {
                        'selector': 'variable',
                        'format': [
                            'strictCamelCase',
                            'UPPER_CASE'
                        ]
                    },
                    {
                        'selector': ['classProperty', 'classMethod'],
                        'modifiers': [
                            'private'
                        ],
                        'format': [
                            'camelCase'
                        ],
                        'leadingUnderscore': 'require'
                    },
                    {
                        'selector': [
                            'classMethod'
                        ],
                        'modifiers': [
                            'public'
                        ],
                        'format': [
                            'camelCase'
                        ],
                        'leadingUnderscore': 'forbid',
                        'trailingUnderscore': 'forbid'
                    },
                    {
                        'selector': [
                            'classMethod'
                        ],
                        'modifiers': [
                            'protected'
                        ],
                        'format': [
                            'camelCase'
                        ],
                        'leadingUnderscore': 'forbid',
                        'trailingUnderscore': 'forbid'
                    },
                    {
                        'selector': 'typeLike',
                        'format': [
                            'PascalCase'
                        ]
                    },
                    {
                        'selector': 'property',
                        'format': [
                            'camelCase'
                        ],
                        'leadingUnderscore': 'allow'
                    },
                    {
                        'selector': 'interface',
                        'format': [
                            'PascalCase'
                        ],
                        'custom': {
                            'regex': '^[A-Z]',
                            'match': true
                        }
                    },
                    {
                        'selector': 'enum',
                        'format': ['PascalCase'],
                        'custom': {
                            'regex': '^E[A-Z]',
                            'match': true
                        }
                    }
                ],
                '@typescript-eslint/no-inferrable-types': [
                    'error',
                    {
                        'ignoreParameters': true,
                        'ignoreProperties': true
                    }
                ],
                '@typescript-eslint/explicit-member-accessibility': [
                    'off',
                    {
                        'accessibility': 'explicit',
                        'methods': 'explicit'
                    }
                ],
                '@typescript-eslint/array-type': [
                    'error',
                    {
                        'default': 'array'
                    }
                ],
                '@stylistic/member-delimiter-style': [
                    'error',
                    {
                        'multiline': {
                            'delimiter': 'semi'
                        },
                        'singleline': {
                            'delimiter': 'semi',
                        }
                    }
                ],
                '@typescript-eslint/typedef': [
                    'error',
                    {
                        'parameter': true,
                        'propertyDeclaration': true,
                        'memberVariableDeclaration': true
                    }
                ],
                '@typescript-eslint/arrow-parens': [
                    'off',
                    'always'
                ],
                '@typescript-eslint/no-empty-interface': [
                    'error',
                    {
                        'allowSingleExtends': true
                    }
                ],
                '@typescript-eslint/strict-boolean-expressions': ['error',
                    {
                        'allowString': false,
                        'allowNumber': false,
                        'allowNullableObject': false,
                        'allowNullableBoolean': false,
                        'allowNullableString': false,
                        'allowNullableNumber': false,
                        'allowAny': false,
                        'allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing': true
                    }],
                '@typescript-eslint/no-non-null-assertion': 'error',
                '@stylistic/semi': 'error',
                '@stylistic/quotes': ['warn', 'single'],
            }
        }]
};
