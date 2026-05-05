
## Fix: Force Vite to re-transform cached files

The source files are already correct (no `@tanstack/react-router` references remain), but Vite's transform cache is stale and still serves old versions of `Sidebar.tsx` and `RiskModal.tsx` with the old imports.

### Steps

1. **Re-write `src/components/Sidebar.tsx`** — identical content, forces Vite to invalidate its transform cache for this file
2. **Re-write `src/components/RiskModal.tsx`** — same reason
3. **Verify the preview loads** — check browser screenshot confirms the app renders
