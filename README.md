# Min Thuta — Portfolio

Personal portfolio site ("Engineering Without Lanes") — React + Vite + Tailwind CSS v4 + React Router.

Originally exported from Figma Make, then cleaned up as a working baseline.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

## Branches

- `main` — cleaned baseline matching the Figma export design (light theme)
- `v2` — improved prototype: dark theme, refined typography, animations, polish

## To-dos before publishing

- Replace `public/profile.svg` with a real photo (update the `src` in `src/pages/Home.tsx`)
- Replace `contact@example.com` with the real contact email
- Replace the lorem-ipsum thesis text on the home page (baseline branch)
- Point the Source Code / Video Demo links on the project page at real URLs

## Structure

```
src/
  main.tsx            entry
  app.tsx             router provider
  routes.tsx          route table
  components/
    layout/RootLayout.tsx   header, footer, blueprint grid background
    figma/ImageWithFallback.tsx
  pages/
    Home.tsx          hero, story timeline, thesis card, concepts, projects
    ProjectDetail.tsx case-study layout with sticky table of contents
  styles/
    index.css         entry stylesheet
    fonts.css         Google Fonts (Space Grotesk / Inter / JetBrains Mono)
    tailwind.css      Tailwind v4 setup
    theme.css         design tokens + base styles + blueprint-grid utility
```
