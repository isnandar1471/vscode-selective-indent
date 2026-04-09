# Development

## Prerequisites

- **Node.js & NPM**: Version in [.nvmrc](../.nvmrc)
- **Visual Studio Code**: Version requirement in [package.json](../package.json) (`engines.vscode`)

## Setup

```bash
npm install
npm run watch  # Watch mode for development
```

## Development

Open the project in VS Code and press `F5` to run the extension. See [package.json](../package.json) for available scripts:

- `npm run compile` - Build with type checking
- `npm run check-types` - Type check only
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

See [tsconfig.json](../tsconfig.json) for TypeScript configuration and [eslint.config.mjs](../eslint.config.mjs) for linting rules.

## Testing

Tests are in `src/test/extension.test.ts`. Run with:

```bash
npm run test
```

See [package.json](../package.json) for the test setup.

## Publishing

```bash
npm install -g @vscode/vsce
vsce package
vsce publish
```

See [VS Code Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) for authentication.

## Structure

```
src/
├── extension.ts           # Extension entry point
├── IndentConverter.ts      # Core conversion logic
└── test/
    └── extension.test.ts   # Test suite
```

For details on configuration files, see each file directly.



