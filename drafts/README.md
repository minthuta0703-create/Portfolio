# drafts

Generated project drafts live here — one folder per project:

```
drafts/
└── my-new-project/
    ├── draft.md       ← the project page: edit this like a document
    ├── QUESTIONS.md   ← things Claude couldn't verify and needs you to answer
    ├── INTEL.md       ← private content ideas (reels, story angles) — never published
    └── assets/        ← the images/files selected for the page
```

Workflow: edit `draft.md` → `npm run stage <id>` → preview at
http://localhost:5173/projects/<id> → when happy, publish with git push.
Full guide: PUBLISHING.md.

Everything in this folder stays on your computer (it is git-ignored),
so QUESTIONS and INTEL never appear in the public repository.
