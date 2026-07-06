# Publishing guide — from finished project to live page

You never need to touch code for this. The flow is always:

```
RAW FILES → DRAFT → YOUR REVIEW & EDITS → PREVIEW → YOUR APPROVAL → LIVE
```

Nothing goes on the internet until the very last step, and only you (or
Claude, when you explicitly say so) can trigger it.

---

## Adding a new project

**1. Drop the raw materials in the inbox.**
Put everything in one folder — reports, PDFs, notes, code, photos,
screenshots, test results. Messy is fine.

```
PROJECT_INBOX/line-follower-bot/
```

**2. Ask Claude to process it.**
Open Claude Code in this folder and say:

> process project line-follower-bot

Claude reads everything and creates `drafts/line-follower-bot/` containing:
- `draft.md` — the project page as a plain document
- `QUESTIONS.md` — what Claude couldn't verify and needs from you
- `INTEL.md` — private reel/story ideas (never published)
- `assets/` — the images and files it picked

Claude only writes what your files prove. Anything uncertain is marked
`[CONFIRM: …]` — it will never invent results or experiences.

**3. Review and edit `draft.md`.**
Open it in any text editor (TextEdit works). It reads like a document:
- Fix or rewrite any text under the `##` headings
- Answer the `[CONFIRM: …]` marks (edit the sentence, delete the mark)
- Delete an image line to drop that image; reorder lines to reorder them
- Leave a section empty if it's not ready — it shows a tidy "coming soon"

**4. Stage it (puts it on your local site only).**

> stage line-follower-bot        ← tell Claude, or run: npm run stage line-follower-bot

The script checks everything and tells you exactly what's wrong if
something doesn't parse.

**5. Preview it in the real design.**

> npm run dev  →  http://localhost:5173/projects/line-follower-bot

Not happy? Edit `draft.md` again and re-stage. Repeat freely.

**6. Approve → publish.**
Tell Claude **"publish it"**, or run:

```bash
git add . && git commit -m "add project: line-follower-bot" && git push origin v2:main
```

The live site updates ~30 seconds later. This git push is the approval —
nothing before it touches the internet.

---

## Everyday small updates

| I want to… | Do this |
|---|---|
| Attach an Instagram reel to a project | Edit `src/content/projects/<id>.json` → set `"reelUrl": "https://www.instagram.com/reel/XXX/"` (or ask Claude) |
| Attach a reel to a notebook concept | Edit `src/data/concepts.ts` → add `reelUrl:` to that concept |
| Fix a typo on a published project | Edit `drafts/<id>/draft.md` and re-stage, or edit the JSON directly |
| Take a project off the site | `npm run stage -- --remove <id>` then publish |
| Add a notebook concept | Copy a block in `src/data/concepts.ts`, or ask Claude |
| Change story chapters / hero text | `src/pages/Landing.tsx` (see CUSTOMIZING.md) |

After ANY of these: publish with the same git command as step 6.

## Starting a draft without Claude

`npm run draft <id>` scaffolds an empty `draft.md` template you can fill
in yourself — same review/stage/publish flow from step 3.

## Rules the system enforces

- Claude never stages, commits, or pushes on its own — those are your calls
- `PROJECT_INBOX/` and `drafts/` never leave your computer (git-ignored),
  so raw materials, QUESTIONS and INTEL stay private
- Videos don't go in the repo — post them as reels and link via `reelUrl`
