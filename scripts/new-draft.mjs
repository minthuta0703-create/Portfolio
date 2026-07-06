#!/usr/bin/env node
/**
 * Scaffold an empty draft:  npm run draft <project-id>
 * Creates drafts/<id>/draft.md + drafts/<id>/assets/
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const id = process.argv.slice(2).filter((a) => a !== "--")[0];

if (!id || !/^[a-z0-9-]+$/.test(id)) {
  console.error('\n✗ Usage: npm run draft <project-id>  (lowercase-with-dashes, e.g. "line-follower-bot")\n');
  process.exit(1);
}

const dir = path.join(root, "drafts", id);
if (fs.existsSync(path.join(dir, "draft.md"))) {
  console.error(`\n✗ drafts/${id}/draft.md already exists — edit that one instead.\n`);
  process.exit(1);
}

fs.mkdirSync(path.join(dir, "assets"), { recursive: true });

const template = `---
title: My New Project
tagline: One sentence that appears on the project card.
status: IN PROGRESS
tags: Robotics, Control
date: ${new Date().toISOString().slice(0, 7)}
reelUrl:
---

<!-- Write plain paragraphs under each heading. Blank line = new paragraph.
     Delete nothing: empty sections simply show a "coming soon" placeholder. -->

## Overview

## Why I Built This

## How It Works

## The Build

## Testing & Results

## What Went Wrong

## What I Learned

## Final Outcome

## Project Files
<!-- Put downloadable files in the assets/ folder, then list them in
     the Files section below (not here — this section is for text). -->

## Images
<!-- One line per image, e.g.
![Short caption](assets/photo1.jpg)
Delete a line to drop the image; reorder lines to reorder images. -->

## Files
<!-- One line per downloadable file, e.g.
[Final report (PDF)](assets/report.pdf) -->
`;

fs.writeFileSync(path.join(dir, "draft.md"), template);

console.log(`\n✓ Draft created: drafts/${id}/draft.md`);
console.log(`  1. Put images/files into drafts/${id}/assets/`);
console.log(`  2. Write your content in draft.md (any text editor)`);
console.log(`  3. Stage it:  npm run stage ${id}\n`);
