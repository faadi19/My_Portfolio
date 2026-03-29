# Project images (bundled by Vite)

These files are **imported in code**, so they always load in dev and production.

## Current placeholders

Visible SVG placeholders are used so project cards always show something (no green/empty boxes). Each has the project name and “Replace with screenshot”.

## Use real screenshots

1. Add your PNG/JPG in the same folder with the **same filename** but **.png** extension (e.g. `preview.png`, `main-home.png`, `landing-page-home.png`).
2. In `src/data/portfolio.ts`, change the import from `.svg` to `.png` for that project (e.g. `preview.svg` → `preview.png`).
3. Restart dev or run `npm run build`.

| Path | Project |
|------|---------|
| `ndisync/preview.png` | NDISync |
| `Shifara/main-home.png` | Shifara |
| `RecCiaga/landing-page-home.png` | RecCiaga |

Recommended size: 800×450 px (or similar landscape).
