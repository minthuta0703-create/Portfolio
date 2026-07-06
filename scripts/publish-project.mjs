#!/usr/bin/env node
/**
 * Stage a reviewed draft onto the site (locally — nothing goes live
 * until you git push).
 *
 *   npm run stage <project-id>            convert drafts/<id>/draft.md
 *                                         into site files
 *   npm run stage -- --remove <project-id>   take a staged project off
 *                                            the site again
 *
 * Reads:   drafts/<id>/draft.md  + drafts/<id>/assets/
 * Writes:  src/content/projects/<id>.json  + public/projects/<id>/
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(root, "src", "content", "projects");
const PUBLIC_DIR = path.join(root, "public", "projects");
const DRAFTS_DIR = path.join(root, "drafts");

const SECTION_NAMES = [
  "Overview",
  "Why I Built This",
  "How It Works",
  "The Build",
  "Testing & Results",
  "What Went Wrong",
  "What I Learned",
  "Final Outcome",
  "Project Files",
];
const SPECIAL_HEADINGS = ["Images", "Files"];
const STATUSES = ["COMPLETED", "IN PROGRESS", "PROTOTYPING"];

const fail = (msg) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};

const args = process.argv.slice(2).filter((a) => a !== "--");
const removeMode = args.includes("--remove");
const id = args.find((a) => !a.startsWith("--"));

if (!id) fail("Usage: npm run stage <project-id>   (or: npm run stage -- --remove <project-id>)");
if (!/^[a-z0-9-]+$/.test(id))
  fail(`Project id "${id}" must be lowercase letters, numbers and dashes only (it becomes the URL).`);

if (removeMode) {
  const jsonPath = path.join(CONTENT_DIR, `${id}.json`);
  const assetDir = path.join(PUBLIC_DIR, id);
  let did = false;
  if (fs.existsSync(jsonPath)) {
    fs.rmSync(jsonPath);
    did = true;
  }
  if (fs.existsSync(assetDir)) {
    fs.rmSync(assetDir, { recursive: true });
    did = true;
  }
  console.log(
    did
      ? `\n✓ "${id}" removed from the site files. If it was already live, commit & push to update the live site.\n`
      : `\nNothing to remove — "${id}" was not staged.\n`,
  );
  process.exit(0);
}

const draftPath = path.join(DRAFTS_DIR, id, "draft.md");
if (!fs.existsSync(draftPath))
  fail(`No draft found at drafts/${id}/draft.md — run "npm run draft ${id}" or ask Claude to process the project first.`);

const raw = fs.readFileSync(draftPath, "utf8").replace(/\r\n/g, "\n");

// ——— frontmatter ———
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
if (!fmMatch) fail("draft.md must start with a --- frontmatter block (see the template).");
const fm = {};
for (const line of fmMatch[1].split("\n")) {
  const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
  if (m) fm[m[1].toLowerCase()] = m[2].trim();
}

if (!fm.title) fail("Frontmatter is missing: title");
if (!fm.tagline) fail("Frontmatter is missing: tagline");
if (!STATUSES.includes(fm.status))
  fail(`Frontmatter status must be one of: ${STATUSES.join(" | ")} (got "${fm.status ?? ""}")`);
const tags = (fm.tags ?? "")
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);
if (tags.length === 0) fail("Frontmatter needs at least one tag, e.g.  tags: Robotics, Control");

// ——— body sections ———
const body = raw.slice(fmMatch[0].length);
const blocks = body.split(/^## +/m).slice(1); // first chunk before any heading is ignored
const sections = {};
const images = [];
const files = [];

const assetRef = (p) => {
  if (!p.startsWith("assets/"))
    fail(`Asset path "${p}" must start with assets/ (files go in drafts/${id}/assets/).`);
  const abs = path.join(DRAFTS_DIR, id, p);
  if (!fs.existsSync(abs)) fail(`Referenced asset does not exist: drafts/${id}/${p}`);
  return `/projects/${id}/${p.slice("assets/".length)}`;
};

for (const block of blocks) {
  const nl = block.indexOf("\n");
  const heading = (nl === -1 ? block : block.slice(0, nl)).trim();
  const content = nl === -1 ? "" : block.slice(nl + 1);

  if (heading === "Images") {
    for (const line of content.split("\n")) {
      const m = line.trim().match(/^!\[(.*?)\]\((.+?)\)$/);
      if (m) images.push({ src: assetRef(m[2]), caption: m[1] || undefined });
      else if (line.trim() && !line.trim().startsWith("<!--"))
        fail(`Images section: each line must look like  ![caption](assets/photo.jpg)  — got: "${line.trim()}"`);
    }
  } else if (heading === "Files") {
    for (const line of content.split("\n")) {
      const m = line.trim().match(/^\[(.+?)\]\((.+?)\)$/);
      if (m) files.push({ label: m[1], href: assetRef(m[2]) });
      else if (line.trim() && !line.trim().startsWith("<!--"))
        fail(`Files section: each line must look like  [Report (PDF)](assets/report.pdf)  — got: "${line.trim()}"`);
    }
  } else if (SECTION_NAMES.includes(heading)) {
    const paras = content
      .split(/\n\s*\n/)
      .map((p) =>
        p
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l && !l.startsWith("<!--"))
          .join(" "),
      )
      .filter(Boolean);
    if (paras.length) sections[heading] = paras;
  } else {
    fail(
      `Unknown heading "## ${heading}". Allowed: ${[...SECTION_NAMES, ...SPECIAL_HEADINGS]
        .map((s) => `"${s}"`)
        .join(", ")}`,
    );
  }
}

// ——— order ———
let order = Number(fm.order);
if (!Number.isFinite(order)) {
  order = 0;
  if (fs.existsSync(CONTENT_DIR)) {
    for (const f of fs.readdirSync(CONTENT_DIR)) {
      if (!f.endsWith(".json") || f === `${id}.json`) continue;
      const existing = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"));
      order = Math.max(order, existing.order ?? 0);
    }
  }
  order += 1;
}

// ——— copy assets ———
const srcAssets = path.join(DRAFTS_DIR, id, "assets");
const destAssets = path.join(PUBLIC_DIR, id);
fs.rmSync(destAssets, { recursive: true, force: true });
if (fs.existsSync(srcAssets)) {
  fs.cpSync(srcAssets, destAssets, { recursive: true });
}

// ——— write content record ———
const record = {
  id,
  order,
  title: fm.title,
  tagline: fm.tagline,
  status: fm.status,
  tags,
  date: fm.date ?? "",
  reelUrl: fm.reelurl ?? "",
  sections,
  images,
  files,
};
fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.writeFileSync(path.join(CONTENT_DIR, `${id}.json`), JSON.stringify(record, null, 2) + "\n");

const filled = SECTION_NAMES.filter((s) => sections[s]?.length);
const empty = SECTION_NAMES.filter((s) => !sections[s]?.length && !(s === "Project Files" && files.length));

console.log(`\n✓ "${fm.title}" staged.`);
console.log(`  Sections written: ${filled.length ? filled.join(", ") : "none"}`);
if (empty.length) console.log(`  Still placeholder: ${empty.join(", ")}`);
console.log(`  Images: ${images.length} · Files: ${files.length} · Reel: ${fm.reelurl ? "yes" : "not yet"}`);
console.log(`\nNext steps:`);
console.log(`  1. Preview:  npm run dev  →  http://localhost:5173/projects/${id}`);
console.log(`  2. Not happy? Edit drafts/${id}/draft.md and run this again.`);
console.log(`  3. Happy? Publish live:`);
console.log(`       git add . && git commit -m "add project: ${id}" && git push origin v2:main\n`);
