# Contributing to @widgetflow/capsule

Thank you for your interest in contributing to `@widgetflow/capsule`! We welcome contributions from the community.

## Development Setup

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/capsule.git
   cd capsule
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Run tests to ensure everything works:
   ```bash
   pnpm test
   ```

## Development Workflow

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the package
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Lint the code
- `pnpm format` - Format the code
- `pnpm typecheck` - Check TypeScript types

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and ensure:
   - Tests pass: `pnpm test`
   - Linting passes: `pnpm lint`
   - Types are correct: `pnpm typecheck`
   - Code is formatted: `pnpm format`

3. Add tests for new functionality

4. Create a changeset for your changes:
   ```bash
   pnpm changeset
   ```
   
   Follow the prompts to describe your changes. This is used for versioning and changelog generation.

### Commit Guidelines

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `chore:` - Build/tooling changes

Example: `feat: add React adapter for isolated components`

## Pull Request Process

1. Ensure your branch is up to date with main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request with:
   - Clear description of changes
   - Reference any related issues
   - Include changeset (if applicable)

4. Wait for review and address feedback

## Code Style

- We use Prettier for code formatting
- ESLint for code quality
- TypeScript for type safety
- Write meaningful tests for new features

## Framework Support

Currently we support:
- ✅ Vanilla JavaScript/TypeScript
- ✅ Vue 3 (full implementation)
- 🚧 React (stub implementation - contributions welcome!)
- 🚧 Vite Plugin (basic implementation)

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests  
- Questions about usage
- Discussion about implementation

Thank you for contributing! 🎉 