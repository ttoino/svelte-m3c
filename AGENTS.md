# AGENTS.md

## Project Overview

Svelte 5 component library implementing Material Design 3. Uses Tailwind CSS v4, TypeScript, bits-ui primitives, and tailwind-variants for styling.

**Type**: Svelte library + Tailwind CSS v4
**Package Manager**: pnpm 11.2.2

## Development Environment

A Nix flake is present for local dev. If using direnv, it loads automatically:

```bash
direnv allow
```

Otherwise:

```bash
nix develop
```

## Commands

- `pnpm dev`: Start Vite dev server
- `pnpm build`: Package the library with `@sveltejs/package`
- `pnpm check`: Typecheck (`svelte-check`)
- `pnpm check:watch`: Typecheck in watch mode
- `pnpm lint`: ESLint
- `pnpm lint:fix`: ESLint with auto-fix
- `pnpm format`: Prettier check
- `pnpm format:fix`: Prettier write
- `pnpm test`: Run tests (including browser tests)

## CI Pipeline

GitHub Actions runs independent jobs on PRs/pushes to `main`/`develop`:

1. `format` — Prettier formatting
2. `lint` — ESLint with TypeScript, Svelte, and Perfectionist
3. `typecheck` — `svelte-check`
4. `test` — Vitest (including browser tests)
5. `build` — Package the library

All jobs use `pnpm install --frozen-lockfile`.

## Architecture Notes

- **Entry**: `src/lib/index.ts` re-exports public components/utilities.
- **Output**: `dist/` produced by `svelte-package`.
- **Exports**: configured in `package.json` (`exports`, `types`, `svelte`).

### Package Exports

This is a library with multiple entry points:

- Main: `svelte-m3c` → `src/lib/index.ts`
- Subpaths: `svelte-m3c/paints/*`, `svelte-m3c/palette`, `svelte-m3c/style`, `svelte-m3c/variants`
- CSS: `svelte-m3c/*` resolves to `dist/style/*.css`

### Test Types

- **Unit tests:** `*.test.ts` (excludes `*.svelte.test.ts`), run concurrently
- **Browser/visual tests:** `*.svelte.test.ts`, uses Playwright (chromium, firefox, webkit) + vitest-browser-svelte, viewport 512x512, screenshot comparison

### TypeScript / Build Config

- Module: `NodeNext`, resolution: `NodeNext`, strict mode enabled

## Code Style

### Imports

- ESLint perfectionist enforces **alphabetical** sorting
- Use `// @sort` comment to partition imports into groups
- Order: external deps → `$lib/` → relative
- **Always use `.js` extension** in imports, even for TS/Svelte files

### Prettier

- Print width: 80, tab width: 4 (2 for YAML), double quotes, trailing commas
- Plugins: `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`

### Svelte Components

- `<script lang="ts">` is enforced by ESLint (`svelte/block-lang`)
- Use `<script lang="ts" module>` to export `variantsConfig` and `variants`
- Props type: `WrapperProps<BaseProps, typeof variants>` from `$lib/types/style.js`
- Use Svelte 5 runes: `$props()`, `$derived()`, `$bindable()`

### Styling (Tailwind + tailwind-variants)

- Use `tv()` from `$lib/style.js` for component variants
- Export `variantsConfig` (plain object) and `variants` (tv instance) from module script
- Use Material Design 3 tokens: `primary`, `on-primary`, `surface`, `surface-container`, etc.

## Important Files

- `svelte.config.js`: Svelte compiler configuration
- `vite.config.ts`: Vite plugins and test config
- `tsconfig.json`: TypeScript compiler options
- `eslint.config.js`: ESLint rules and plugins
- `.prettierrc`: Prettier formatting config
- `flake.nix`: Nix development shell

## Dependency Automation

This project uses **Renovate** for dependency updates. Renovate opens a single monthly PR grouping all npm, GitHub Actions, and Nix input updates. Patch and minor devDependencies are auto-merged.

## Deployment

Published as an npm package. The GitHub Actions `cd.yml` workflow handles publishing on version tags.
