/**
 * Projects are auto-discovered from src/content/projects/*.json — one file
 * per project, created by the publishing pipeline (see PUBLISHING.md).
 * Adding a project never requires editing this file.
 */

export interface ProjectContent {
  id: string;
  /** Display order on the landing grid (ascending). */
  order: number;
  title: string;
  tagline: string;
  status: "COMPLETED" | "IN PROGRESS" | "PROTOTYPING";
  tags: string[];
  date?: string;
  /** Instagram reel/post URL — shown on the project page when set. */
  reelUrl?: string;
  /** Section name -> paragraphs. Empty sections show placeholder text. */
  sections: Record<string, string[]>;
  images: { src: string; caption?: string }[];
  files: { label: string; href: string }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  status: ProjectContent["status"];
  tags: string[];
  reelUrl?: string;
}

const modules = import.meta.glob("../content/projects/*.json", {
  eager: true,
}) as unknown as Record<string, { default: ProjectContent }>;

export const projectContents: ProjectContent[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);

export const projects: Project[] = projectContents.map((p) => ({
  id: p.id,
  title: p.title,
  tagline: p.tagline,
  status: p.status,
  tags: p.tags,
  reelUrl: p.reelUrl || undefined,
}));

/** The nine-section case-study template shared by every project page. */
export const projectSections = [
  "Overview",
  "Why I Built This",
  "How It Works",
  "The Build",
  "Testing & Results",
  "What Went Wrong",
  "What I Learned",
  "Final Outcome",
  "Project Files",
] as const;

export const statusStyles: Record<ProjectContent["status"], string> = {
  COMPLETED: "border-primary/40 text-primary bg-primary/10",
  "IN PROGRESS": "border-secondary/50 text-secondary-foreground bg-secondary/15",
  PROTOTYPING: "border-border text-muted-foreground bg-muted",
};
