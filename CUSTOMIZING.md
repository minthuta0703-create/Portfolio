# Customizing your portfolio

> **Adding a new project?** That has its own zero-code workflow now —
> see **PUBLISHING.md**. This file covers everything else.

Everything you'll ever want to change, and exactly where to change it.
After any change: save the file, check it at http://localhost:5173 (`npm run dev`),
then publish with the three commands at the bottom.

---

## 1. Your photo

Replace `public/profile.jpg` with any photo (keep the same filename).
It shows grey and turns colour on hover automatically.

- If your face isn't centred nicely, open `src/pages/Landing.tsx`, find
  `object-[55%_45%]` and tweak the numbers: first = horizontal (0% left, 100% right),
  second = vertical (0% top, 100% bottom).
- Keep photos under ~500KB so the page loads fast. On a Mac:
  `sips -Z 1400 -s formatOptions 78 yourphoto.jpg --out public/profile.jpg`

## 2. Hero text (name, tagline, roles)

`src/pages/Landing.tsx` — search for:
- `Hi, I'm` — the headline
- `bridging the gap` — the intro paragraph
- `MECHATRONICS @ UTS SYDNEY` — the three role lines

## 3. Projects

**The easy way: use the publishing pipeline — see PUBLISHING.md.**
Drop raw files in `PROJECT_INBOX/`, say "process project <name>" to Claude,
review the draft, stage, publish. No code editing at all.

Under the hood, each project is one file in `src/content/projects/<id>.json`:

```json
{
  "id": "robotic-arm",            // becomes the URL: /projects/robotic-arm
  "order": 1,                     // position on the home grid (1 = first)
  "title": "Robotic Arm Motion Tracking",
  "tagline": "One-line description shown on the card.",
  "status": "COMPLETED",          // COMPLETED | IN PROGRESS | PROTOTYPING
  "tags": ["Robotics", "Sensors", "Control"],
  "reelUrl": "",                  // Instagram reel URL — embeds automatically
  "sections": {},                 // written by the pipeline
  "images": [],
  "files": []
}
```

Adding/removing a JSON file adds/removes the project everywhere — no other
code changes needed. The 9 section titles live in `src/data/projects.ts`
(`projectSections`).

## 4. Story chapters

`src/pages/Landing.tsx` — the `chapters` list at the top of the file.
Each chapter = `{ title, line }`. Add, remove, or reword freely.

## 5. Notebook concepts

`src/data/concepts.ts` — same pattern as projects:

```ts
{
  id: "buck-converter",           // URL: /notebook/buck-converter
  title: "Buck Converter",
  tag: "Power Electronics",
  hook: "One-liner shown on the card.",
  reelUrl: "https://www.instagram.com/reel/XXXX/",  // paste your reel URL here
},
```

The reel embeds automatically once `reelUrl` is set. The four deeper-dive
section titles (`The intuition`, etc.) are in the same file. The placeholder
text inside them is in `src/pages/ConceptDetail.tsx`.

## 6. Colours & fonts

`src/styles/theme.css` — the `:root` block at the top:
- `--background` page colour, `--foreground` text
- `--primary` engineering blue (links, badges, arm gripper)
- `--secondary` amber accents
- Fonts are set in the `@theme` block; the Google Fonts import is in
  `src/styles/fonts.css`.

## 7. Email address

It appears in two files — search for `minthuta0703` in
`src/pages/Landing.tsx` and `src/components/layout/DetailLayout.tsx`.

## 8. The robotic arm & gears

- Arm/gantry drawing: `src/components/RoboticArm.tsx`
- Section list it points at: the `navSections` list in `src/pages/Landing.tsx`
- Gear speed: in `Landing.tsx`, `scrollY * 0.12` — bigger number = faster spin.

---

## Publishing changes

```bash
cd "/Users/minthuta/Desktop/Claude Code Folder/portfolio"
git add .
git commit -m "describe what you changed"
git push
```

Vercel redeploys automatically ~30 seconds after every push to `main`.
(Your local branch is `v2`; push updates `v2` — to update the live site run
`git push origin v2:main` or just ask Claude to push.)

## Running locally

```bash
npm run dev      # live preview at http://localhost:5173
npm run build    # check the production build works
```
