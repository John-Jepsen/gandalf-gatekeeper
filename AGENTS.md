# Repository Guidelines

## Project Structure & Module Organization
- `src/` — React front-end (Gandalf chat UI). Key entrypoints: `main.tsx`, `App.tsx`, reusable UI in `components/`, helpers in `hooks/` and `lib/`.
- `docs/` — built static site for GitHub Pages deployment.
- `public/` (if present) — static assets served as-is.
- Root configs: `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `package.json`.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — start Vite dev server (hot reload).
- `npm run build` — type-check then build production assets to `dist/`, copied to `docs/` for Pages.
- `npm run preview` — serve the production build locally.
- `npm run lint` — run ESLint over the repo.

## Coding Style & Naming Conventions
- Language: TypeScript + React with functional components and hooks.
- Formatting: follow ESLint defaults; prefer 2-space indent (consistent with existing files) and single quotes in TSX.
- Components and hooks use `PascalCase` files (`GandalfFace.tsx`, `Typewriter.tsx`) and `camelCase` functions/variables.
- Keep UI text concise and thematic (Gandalf/“speak, friend, and enter”).

## Testing Guidelines
- No dedicated test suite yet. Before adding tests, prefer lightweight component tests (Vitest/Testing Library) in `src/__tests__/` or colocated `*.test.tsx`.
- Name tests after behavior, e.g., `App.speaksHintWhenWordWrong.test.tsx`.
- Run via `npm test` (once added) or `npm run lint` for static checks.

## Commit & Pull Request Guidelines
- Commit messages: short imperative summaries (e.g., “Update hint flow”, “Prep Pages build”).
- Scope commits narrowly; favor multiple small commits over one large change.
- PRs should include: brief description, before/after notes, relevant screenshots for UI changes, and deployment impact (e.g., Pages). Link issues when applicable.

## Deployment Notes
- GitHub Pages: source is `main`, folder `/docs`. Ensure `npm run build` then `cp -R dist docs` before pushing.
- `vite.config.ts` uses `base: './'` for subpath compatibility; keep it unless hosting changes.
