import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,
  
  // Test files configuration (must come before general TypeScript config)
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/tests/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
        // Don't require project for test files to avoid tsconfig conflicts
      },
      globals: {
        // Test globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        // Browser globals for tests
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        customElements: 'readonly',
        HTMLElement: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off' // Allow console in tests
    }
  },
  
  // TypeScript files configuration (excluding test files)
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        // Browser globals
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        customElements: 'readonly',
        HTMLElement: 'readonly',
        // React globals
        React: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      
      // Custom rules that are compatible with v8
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-undef': 'error'
    }
  },
  
  // JavaScript files configuration
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly'
      }
    }
  },
  
  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts'
    ]
  },
  
  // Prettier integration (must be last)
  prettier
] 