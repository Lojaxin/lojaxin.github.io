module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        // 'plugin:lodash/recommended'
    ],
    plugins: [
        'react',
        'react-hooks',
        'lodash'
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            globalReturn: true,
            legacyDecorators: true,
            impliedStrict: true,
            experimentalObjectRestSpread: true,
        },
        babelOptions: {
            parserOpts: {
                plugins: ['jsx', 'tsx']
            }
        },
        requireConfigFile: false
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    settings: {
        'import/ignore': [
            'node_modules'
        ]
    },
    globals: {
        Pubsub: true,
        window: true
    },
    // ignorePatterns: ['public/**', 'dist/**'],
    rules: {
        indent: [
            'warn',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['TemplateLiteral']
            }
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'block-spacing': [
            'error',
            'always'
        ],
        'brace-style': [
            'error',
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'only-multiline',
                objects: 'only-multiline',
                imports: 'only-multiline',
                exports: 'only-multiline',
                functions: 'never'
            }
        ],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'comma-style': [
            'error',
            'last'
        ],
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'func-call-spacing': [
            'error',
            'never'
        ],
        'no-trailing-spaces': [
            'error',
            {
                skipBlankLines: true
            }
        ],
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'quote-props': [
            'error',
            'as-needed'
        ],
        'space-before-function-paren': 0,
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': [
            'error',
            {
                int32Hint: false
            }
        ],
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        curly: [
            'error',
            'all'
        ],
        eqeqeq: [
            1,
            'smart'
        ],
        'no-multi-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        quotes: [1, 'single'],
        'no-extra-semi': 1,
        semi: [1, 'always'],

        strict: 2,
        'no-console': 1,
        'no-case-declarations': 0,
        'no-undef': 2,
        'no-unused-vars': [
            'error',
            {
                ignoreRestSiblings: true
            }
        ],
        'no-eval': 1,
        'valid-typeof': 2,
        'no-unreachable': 1,
        'no-dupe-args': 1,
        'no-dupe-keys': 1,
        'no-class-assign': 0,
        'jsx-quotes': 1,
        'no-control-regex': 0,
        'no-useless-escape': 0,
        'no-irregular-whitespace': 1,
        'no-func-assign': 1,
        'react/prefer-es6-class': [2, 'always'],
        'react/jsx-pascal-case': 1,
        'react/jsx-closing-tag-location': 1,
        'react/jsx-curly-spacing': 1,
        'react/self-closing-comp': 1,
        'react/display-name': 0,
        'react/require-render-return': 2,
        'react/jsx-no-target-blank': 0,
        'react/no-danger-with-children': 2,
        'react/no-string-refs': 2,
        'react/no-unknown-property': 2,
        'react/no-danger': 2,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/prop-types': 2,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-prototype-builtins': 0
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'plugin:@typescript-eslint/recommended'
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            rules: {
                '@typescript-eslint/no-explicit-any': 0,
                '@typescript-eslint/camelcase': 0,
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': ['error'],
                '@typescript-eslint/ban-types': 0,
                '@typescript-eslint/ban-ts-comment': 0,
                'constructor-super': 'off',
                'getter-return': 'off',
                'no-const-assign': 'error',
                'no-dupe-args': 'error',
                'no-dupe-class-members': 'error',
                'no-dupe-keys': 'error',
                'no-func-assign': 'error',
                'no-import-assign': 'error',
                'no-new-symbol': 'error',
                'no-obj-calls': 'error',
                'no-redeclare': 'off',
                '@typescript-eslint/no-redeclare': ['error'],
                'no-setter-return': 'off',
                'no-this-before-super': 'error',
                'no-undef': 'off',
                'no-unreachable': 'error',
                'no-unsafe-negation': 'error',
                'no-var': 'error',
                'prefer-const': 'error',
                'prefer-rest-params': 'error',
                'prefer-spread': 'error',
                'valid-typeof': 'error',
            },
        }
    ]
};
