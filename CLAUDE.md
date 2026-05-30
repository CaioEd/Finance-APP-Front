# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal finance web app (React + TypeScript + Vite). The frontend is a SPA that consumes a separate Django-style REST API (https://github.com/CaioEd/Finance-APP). This repo contains only the frontend; the backend is not here.

UI language is Portuguese (e.g. "Receitas" = incomes, "Despesas" = expenses).

## Commands

```shell
npm run dev      # start Vite dev server (or `make run`)
npm run build    # tsc -b + vite build (or `make build`)
npm run lint     # ESLint, fails on any warning (--max-warnings 0)
npm run preview  # serve the production build
make install     # npm install
```

There is no test suite or test runner configured.

## Environment

Copy `.env.example` to `.env` and set the API base URLs. Services read `import.meta.env.VITE_API_URL` for all requests. `VITE_API_SSE_URL` / `VITE_API_SOCKET_URL` are declared but not yet wired into the code.

## Architecture

### Routing & app shell
- `src/main.tsx` mounts the provider stack: `ThemeProvider` → `SidebarProvider` → `AuthProvider` → `AppRoutes`. All four wrap the entire app, so theme/sidebar/auth context is global.
- `src/routes/index.tsx` is the single source of routes (BrowserRouter). Routes are **not** guarded — there is no auth wrapper on protected routes; screens fetch data and rely on the API rejecting requests without a token. `/unauthorized` exists for manual redirects.
- Note `src/App.tsx` is a leftover scaffold ("Hello" button) and is not used; the real entry is `main.tsx` → `routes`.

### Feature folder convention (`src/screens/<feature>/`)
Each CRUD feature (`incomes`, `expenses`, `balance`, `users`) follows the same layout:
- `service.ts` — an `Api<Feature>` class with **static** methods (`GetAll`, `GetByID`, `Insert`, `Update`, `Delete`). This is the data layer.
- `list.tsx` — list screen, renders the data table inside the sidebar/breadcrumb shell.
- `add.tsx` / `edit.tsx` — forms (react-hook-form + zod via `@hookform/resolvers`).
- `columns.tsx` — `@tanstack/react-table` column defs + the row TypeScript type (e.g. `Incomes`).
- `data-table.tsx` — the table component wrapping `@tanstack/react-table`.

`screens/signin` and `screens/signup` use `index.tsx` + `service.tsx` instead. `screens/dashboard.tsx` and the top-level `screens/service.ts` (`ApiDashboard`) cover the dashboard aggregates (monthly totals, balance-by-date, PDF download).

### API service pattern (important — repeated everywhere)
Every service method independently:
1. Reads the JWT from `localStorage.getItem("access")`.
2. Sends `Authorization: Bearer <token>` (login/signup are the exceptions).
3. Wraps the axios call in try/catch that only `console.log`s the error and returns `undefined` on failure.

There is **no shared axios instance or interceptor** — the token header is hand-written in each method. When adding endpoints, copy the existing pattern in the relevant `service.ts`.

### Auth & storage
- `src/storage.ts` — `Storage` class with static `StoreUserData` / `RetrieveUserData` / `DeleteUserToken`. Persists `first_name`, `username`, and the token under the key `access` in `localStorage`.
- `src/context/general.tsx` — `AuthContext` / `AuthProvider`. Hydrates auth state from `Storage` on mount, exposes `authenticated`, user fields, and handlers (`HandleUserData`, `deleteToken`, etc.). Components read auth via this context; service methods read the raw token from `localStorage` directly (the two are kept in sync through `Storage`).

### UI components
- shadcn/ui (Radix primitives) lives in `src/components/ui/` — generated components, configured via `components.json` (style "default", base color zinc, CSS variables). Add new ones with the shadcn CLI rather than hand-writing.
- `src/components/app/` holds app-specific composites: `app-sidebar.tsx` (the persistent nav shell used by every screen) and `pagination.tsx`.
- Theme: `components/theme-provider.tsx` + `components/toggleTheme.tsx` (light/dark via Tailwind).
- Toasts: both `sonner` and the shadcn `toast`/`use-toast` hook are present.

### Path alias
`@/` → `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Always import with `@/...`.

### Notable
- `src/data/*.json` are static mock fixtures (incomes/expenses), not the live data source.
- Several context/service files use untyped `any` and loose `({ children })` props — the codebase is not strictly typed despite TS; match the surrounding style, but `npm run lint` must still pass with zero warnings.

## Docker

`Dockerfile` builds the app and serves the static `dist/` via nginx (`nginx.conf`) on port 80.
