# Contributing to CV Maker

Thank you for your interest in contributing to CV Maker! 🎉

## How to Contribute

### Reporting Bugs

- Use GitHub Issues to report bugs
- Describe the bug in detail
- Include steps to reproduce
- Add screenshots if applicable

### Suggesting Features

- Open a GitHub Issue with the "enhancement" label
- Describe the feature and its benefits
- Explain how it would work

### Code Contributions

#### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/cv-maker.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes: `npm run build`
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

#### Code Style

- Follow the existing code style
- Use TypeScript
- Use Tailwind CSS for styling
- Add comments for complex logic
- Keep components small and focused

#### Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

#### Pull Request Process

1. Update README.md if needed
2. Update DEVELOPMENT.md with any new features
3. Ensure all tests pass
4. Request review from maintainers
5. Address review comments

### Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run database migrations
npx prisma migrate dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Project Structure

```
cv-maker/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   │   └── ui/          # Reusable UI components
│   └── lib/             # Utilities
├── prisma/              # Database schema
└── public/              # Static files
```

### Adding New Features

#### Adding a CV Template

1. Create template component in `src/components/templates/`
2. Add template metadata
3. Update template selector
4. Test with sample data

#### Adding Translations

1. Update content objects in page components
2. Test RTL layout for Arabic
3. Verify all UI elements are translated

## Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Accept constructive criticism
- Focus on what's best for the community

## Questions?

Feel free to open an issue or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
