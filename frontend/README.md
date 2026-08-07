# Workforce Marketplace App UI (Next.js)

Converted from the original Vite + React bundle to Next.js 14 (App Router + TypeScript + Tailwind).

## What changed from the original bundle

- `src/app/App.tsx` → `app/components/WorkforceMarketplaceApp.tsx`, marked `"use client"` (it uses `useState` and interactive UI, so it can't be a server component). The component itself is otherwise unchanged — same screens, same state machine, same data.
- `app/page.tsx` renders `WorkforceMarketplaceApp` as the site's home route (`/`).
- `index.html`'s `<title>`, `<meta name="description">`, and `<meta name="robots">` moved into `app/layout.tsx`'s `metadata` export (Next's standard way of managing `<head>` tags).
- Added `next.config.mjs` with `images.remotePatterns` allowing `images.unsplash.com`, since all the worker photos in the data are hotlinked from Unsplash.
- Added standard Next.js/Tailwind scaffolding: `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `app/globals.css`.
- The `src/app/components/ui/*` (shadcn) folder from the original bundle was dropped — nothing in `App.tsx` imports it, so it was unused boilerplate.

## One gap worth knowing about

The original bundle's `src/main.tsx` imported `./styles/index.css`, but that file wasn't included in the zip you uploaded — only `index.html`, `main.tsx`, `App.tsx`, and the unused `components/ui` folder were present. I don't know what was in that stylesheet. Since all the actual styling in `App.tsx` is done with Tailwind utility classes, I added a standard Tailwind `globals.css` (base/components/utilities + the `html,body,#root` height reset from `index.html`'s inline `<style>`). If the missing `index.css` had extra custom CSS (fonts, custom properties, animations beyond Tailwind), it isn't carried over — let me know if you have that file and I'll fold it in.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes

- Images still use plain `<img>` tags (17 of them, scattered through the worker/portfolio/review data). They work fine as-is; I didn't convert them to `next/image` since that requires explicit width/height (or `fill` + a sized wrapper) on each one, which is a larger, riskier edit to make without visual testing. Happy to do that pass separately if you want the optimization.
- No routing library was in use (the original used a `Screen` union type + `useState` to fake navigation between screens) — that's preserved exactly as-is. If you want real Next.js routes per screen (e.g. `/search`, `/chat`) instead of one big client component, that's a follow-up refactor, not part of this conversion.
