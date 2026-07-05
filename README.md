# Min Thuta — Portfolio

Single-page portfolio ("Engineering Without Lanes") — React + Vite + Tailwind CSS v4.

One page, four full-screen sections: Hero → Projects → Story → Engineering Notebook.
Snap-scrolling on desktop, free scroll on mobile. Signature robotic-arm navigation
(wall-mounted IK arm on desktop, sliding gantry on mobile) plus scroll-driven gears.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

## Branches

- `main` — cleaned baseline matching the original Figma export (multi-page, light theme)
- `v2` — current single-page prototype

## To-dos before publishing

- Save your photo as `public/profile.jpg` (grey by default, colour on hover)
- Replace placeholder story lines / project taglines as builds progress

## Structure

```
src/
  main.tsx                 entry
  app.tsx                  renders the single page
  pages/Landing.tsx        the whole site: hero + 3 sections, snap, chrome
  components/
    ArmNav.tsx             arm-driven section nav (vertical + gantry variants)
    RoboticArm.tsx         2-link IK arm + gantry carriage (SVG, rAF-smoothed)
    Gear.tsx               scroll-driven gear
  hooks/useReveal.ts       scroll-reveal hook
  data/projects.ts         project cards
  data/concepts.ts         notebook concept cards
  styles/                  fonts, tailwind setup, theme tokens + utilities
```
