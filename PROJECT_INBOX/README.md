# PROJECT_INBOX

Drop the raw materials for a finished project here, one folder per project:

```
PROJECT_INBOX/
└── my-new-project/
    ├── report.pdf
    ├── code/
    ├── images/
    ├── videos/
    └── notes.txt
```

Any mix of files is fine — PDFs, Word docs, code, photos, screenshots,
spreadsheets, CAD exports, test results, loose notes. No need to organise
them perfectly.

Then open Claude Code in this folder and say:

> **process project my-new-project**

Claude reads everything, drafts the project page, and puts the result in
`drafts/my-new-project/` for your review. Nothing is ever published
automatically — see PUBLISHING.md for the full workflow.

Everything in this folder stays on your computer (it is git-ignored).
