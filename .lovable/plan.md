
## Plan: Convert to Vite + React SPA

### What changes

Convert the project from TanStack Start (SSR) to a standard Vite + React SPA with react-router-dom, keeping all UI intact.

### Steps

1. **Install/remove dependencies**
   - Add: `react-router-dom`
   - Remove: `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@lovable.dev/vite-tanstack-config`, `@cloudflare/vite-plugin`
   - Keep: `@tanstack/react-query`, all Radix/UI deps, recharts, etc.

2. **Rewrite `vite.config.ts`**
   - Use `@vitejs/plugin-react` (already installed) + `vite-tsconfig-paths` + `@tailwindcss/vite`
   - Set `base` to `'/comfy-risk-view/'` in production
   - Remove TanStack/Cloudflare plugin usage

3. **Create standard SPA entry points**
   - `index.html` at project root (with `<div id="root">` and `<script src="/src/main.tsx">`)
   - `src/main.tsx` — renders `<App />` into `#root`, imports styles
   - `src/App.tsx` — `BrowserRouter` with routes, wraps layout (Sidebar + Outlet)

4. **Convert route files to plain React components**
   - `src/routes/index.tsx` → `src/pages/HomePage.tsx` (remove `createFileRoute`, export component)
   - `src/routes/risks.tsx` → `src/pages/RisksPage.tsx`
   - `src/routes/profile.tsx` → `src/pages/ProfilePage.tsx`
   - Delete `src/routes/__root.tsx`, `src/router.tsx`, `src/routeTree.gen.ts`

5. **Update imports across components**
   - `Sidebar.tsx`: `Link` and `useLocation` from `react-router-dom`
   - `RiskModal.tsx`: `useNavigate` from `react-router-dom`
   - `profile.tsx`: `useNavigate` from `react-router-dom`

6. **Delete SSR/TanStack artifacts**
   - `app.config.ts`
   - `wrangler.jsonc`
   - `src/routes/` directory (after moving pages out)

7. **Add `public/404.html`**
   - GitHub Pages SPA redirect trick: redirect all paths to `index.html` via JS

8. **Update `styles.css`**
   - Remove `?url` import pattern from root; import directly in `main.tsx`

All existing UI components, mock data, styles, and business logic remain unchanged — only the routing/build infrastructure changes.
