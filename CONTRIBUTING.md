# Contributing to Wan 2.1

Thank you for your interest in contributing to Wan 2.1! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Python 3.10+
- Git
- A Supabase account
- A Replicate API key

### Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/Krosebrook/LocalWan.git
   cd LocalWan
   ```

2. **Install Dependencies**
   ```bash
   # Install Node.js dependencies
   npm install
   
   # Install Python dependencies
   cd apps/api
   pip install -r requirements.txt
   cd ../..
   ```

3. **Set Up Environment Variables**
   ```bash
   # Copy example files
   cp .env.example .env
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env
   
   # Edit the files with your credentials
   ```

4. **Run Development Servers**
   ```bash
   npm run dev
   ```

## Project Structure

```
wan21-monorepo/
├── apps/
│   ├── web/          # Next.js PWA frontend
│   └── api/          # FastAPI backend
├── packages/
│   ├── ui/           # Shared UI components
│   └── db/           # Database utilities
└── turbo.json        # Turborepo config
```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint rules configured in the project
- Use Prettier for code formatting
- Write meaningful variable and function names
- Add JSDoc comments for complex functions

### Python

- Follow PEP 8 style guide
- Use type hints for function parameters and returns
- Use Black for code formatting
- Use Ruff for linting
- Write docstrings for all functions and classes

### React Components

- Use functional components with hooks
- Prefer named exports over default exports
- Extract reusable logic into custom hooks
- Keep components small and focused
- Use TypeScript interfaces for props

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add video download functionality
fix: resolve progress tracking bug
docs: update API documentation
```

## Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   npm run test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Ensure CI checks pass

## Code Review Guidelines

### For Contributors

- Respond to review comments promptly
- Be open to feedback and suggestions
- Make requested changes in new commits
- Keep discussions professional and constructive

### For Reviewers

- Be respectful and constructive
- Focus on code quality and best practices
- Suggest improvements, don't demand them
- Approve when changes meet standards

## Testing

### Frontend Testing

```bash
cd apps/web
npm run test
```

### Backend Testing

```bash
cd apps/api
pytest
```

## Adding Dependencies

### Node.js Dependencies

For workspace root:
```bash
npm install <package> -w <workspace>
```

For specific app:
```bash
cd apps/web
npm install <package>
```

### Python Dependencies

```bash
cd apps/api
pip install <package>
pip freeze > requirements.txt
```

## Documentation

- Update README.md for major changes
- Add JSDoc/docstrings for new functions
- Update API documentation for endpoint changes
- Include examples in documentation

## Security

### Reporting Vulnerabilities

If you discover a security vulnerability:
1. DO NOT create a public issue
2. Email security@wan21.com with details
3. Wait for a response before disclosing

### Security Best Practices

- Never commit credentials or API keys
- Use environment variables for sensitive data
- Validate all user inputs
- Follow OWASP guidelines
- Keep dependencies updated

## Questions?

- Open a discussion on GitHub
- Join our community Discord (link in README)
- Email support@wan21.com

## License

By contributing to Wan 2.1, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Wan 2.1! 🎉
