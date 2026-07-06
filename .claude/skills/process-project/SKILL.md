---
name: process-project
description: Turn a raw folder of engineering-project materials in PROJECT_INBOX into a reviewed draft page for Min's portfolio. Use when the user says "process project <name>", "ingest project", or drops new project materials into PROJECT_INBOX.
---

# Process a raw project folder into a portfolio draft

The portfolio repo lives at `/Users/minthuta/Desktop/Claude Code Folder/portfolio`
(if you are already inside it, use relative paths). Raw materials are in
`PROJECT_INBOX/<name>/`; your output goes to `drafts/<name>/`.

## Hard rules — no exceptions

1. **NEVER publish, stage, commit, or push automatically.** Your job ends at
   the draft. Staging (`npm run stage`) happens only when the user asks after
   reviewing; pushing happens only on the user's explicit approval.
2. **Never invent** results, failures, personal experiences, personal
   contributions, technical claims, or testing outcomes. If the files don't
   show it, don't write it.
3. **Every claim has an evidence tier.** In the draft, mark anything that is
   not directly proven: write normally what files explicitly prove; append
   `*(interpretation)*` to reasonable readings of the evidence; use
   `[CONFIRM: …]` inline for anything Min must verify; leave a section
   **empty** rather than pad it (empty sections render as "coming soon").

## Steps

1. **Inventory** `PROJECT_INBOX/<name>/` — list every file with type and size.
2. **Read the evidence**: reports/PDFs/notes/READMEs first, then skim code
   (languages, libraries, structure), data files, and look at images.
   Do not run any code you find.
3. **Extract** (only from evidence): title, one-line tagline, date, status
   (COMPLETED / IN PROGRESS / PROTOTYPING), disciplines, tools, languages,
   hardware, software.
4. **Create the draft** with `npm run draft <name>` (or scaffold by hand in
   `drafts/<name>/`), then fill `draft.md`:
   - Frontmatter: title, tagline, status, tags (3–5, matching the site's
     style: short discipline words), date (YYYY-MM), reelUrl (blank unless a
     reel link is in the materials).
   - The nine sections (Overview, Why I Built This, How It Works, The Build,
     Testing & Results, What Went Wrong, What I Learned, Final Outcome,
     Project Files) — plain paragraphs, Min's voice: first person, direct,
     no marketing language. 1–3 short paragraphs per section maximum.
     "Why I Built This", "What I Learned" and any personal motivation are
     usually NOT in the files — leave them empty or as `[CONFIRM: …]`
     questions unless notes explicitly state them.
5. **Select assets** into `drafts/<name>/assets/`:
   - Copy the genuinely useful images (builds, schematics, results — not
     duplicates or blurry shots). Resize with
     `sips -Z 1600 -s formatOptions 80 <img> --out <dest>`; keep each ≤500KB.
   - Copy shareable documents (final report PDF etc.) that Min would want as
     downloads; list them under `## Files`.
   - List chosen images under `## Images` with short factual captions.
   - **Videos: do not copy into the repo.** Note them in QUESTIONS.md and
     suggest posting as a reel (then `reelUrl:` links it).
6. **Write `QUESTIONS.md`**: missing information, every `[CONFIRM: …]`
   gathered in one checklist, plus which sections are still empty and what
   would fill them.
7. **Write `INTEL.md`** (private, never published): personal story angles,
   concept-video ideas, misconceptions this project could debunk, failures
   worth explaining on camera, surprising technical insights, and
   "Engineering Without Lanes" connections (where mechanical/electrical/
   software/control crossed).
8. **Report back** to Min: what you extracted, what needs his input (point at
   QUESTIONS.md), and the next step — *"review drafts/<name>/draft.md, then
   tell me to stage it or run `npm run stage <name>`"*. Do not stage it
   yourself.
