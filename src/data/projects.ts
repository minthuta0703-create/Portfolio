export interface Project {
  id: string;
  title: string;
  tagline: string;
  status: "COMPLETED" | "IN PROGRESS" | "PROTOTYPING";
  tags: string[];
  reelUrl?: string;
}

export const projects: Project[] = [
  {
    id: "robotic-arm",
    title: "Robotic Arm Motion Tracking",
    tagline: "Translating human movement into robotic response.",
    status: "COMPLETED",
    tags: ["Robotics", "Sensors", "Control"],
  },
  {
    id: "audio-dsp",
    title: "Audio DSP / ANC System",
    tagline: "Real-time signal processing for active noise cancellation.",
    status: "IN PROGRESS",
    tags: ["DSP", "Audio", "MATLAB"],
  },
  {
    id: "robotic-hand",
    title: "Mechatronic Hand Build",
    tagline: "Mechanical motion controlled through custom electronics.",
    status: "PROTOTYPING",
    tags: ["Mechanical", "Arduino", "Python"],
  },
];

/** The nine-section case-study template shared by every project. */
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

export const statusStyles: Record<Project["status"], string> = {
  COMPLETED: "border-primary/40 text-primary bg-primary/10",
  "IN PROGRESS": "border-secondary/50 text-secondary-foreground bg-secondary/15",
  PROTOTYPING: "border-border text-muted-foreground bg-muted",
};
