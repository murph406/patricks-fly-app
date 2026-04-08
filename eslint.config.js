const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      'semi': ['error', 'never'],
      'no-debugger': ['error'],  
      'react/jsx-no-duplicate-props': ['error'],
      'react/self-closing-comp': ['error'],
      'react-hooks/rules-of-hooks': ['error'],
      'react-hooks/exhaustive-deps': ['warn'],
      'prefer-const': ['error'], 
      'no-var': ['error'], 
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'pathGroups': [
            {
              'pattern': 'react',
              'group': 'builtin',
              'position': 'before'
            },
            {
              'pattern': 'react-native',
              'group': 'builtin',
              'position': 'before'
            },
            {
              'pattern': '@/**',
              'group': 'internal',
              'position': 'before'
            }
          ],
          'pathGroupsExcludedImportTypes': ['react', 'react-native'],
          'newlines-between': 'always',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          }
        }
      ]
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@components', './src/components'],
            ['@pages', './src/pages'],
            ['@utils', './src/utils'],
            ['@config', './src/config'],
            ['@features', './src/features'],
            ['@hooks', './src/hooks'],
            ['@services', './src/services'],
            ['@stores', './src/stores'],
            ['@router', './src/router'],
            ['@assets', './src/assets'],
            ['@constants', './src/constants'],
            ['@api', './src/api'],
            ['@', './src'],
          ],
          extensions: ['.js', '.jsx', '.json']
        }
      }
    }
  },
])