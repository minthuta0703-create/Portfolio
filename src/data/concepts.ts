export interface Concept {
  id: string;
  title: string;
  tag: string;
  hook: string;
  reelUrl?: string;
}

export const concepts: Concept[] = [
  {
    id: "buck-converter",
    title: "Buck Converter",
    tag: "Power Electronics",
    hook: "Turning a high voltage into a low one — efficiently.",
  },
  {
    id: "laplace-transform",
    title: "Laplace Transform",
    tag: "Engineering Maths",
    hook: "Time-domain problems, solved in the s-plane.",
  },
  {
    id: "fourier-series",
    title: "Fourier Series",
    tag: "Signals",
    hook: "Any signal is a sum of sines. Once you see it, you can't unsee it.",
  },
  {
    id: "ev-inverter",
    title: "EV Inverter",
    tag: "Power Systems",
    hook: "How DC batteries drive AC motors.",
  },
  {
    id: "pid-tuning",
    title: "PID Tuning",
    tag: "Control Systems",
    hook: "Three knobs, endless behaviour. Why tuning is more art than formula.",
  },
  {
    id: "eigenvalues",
    title: "Eigenvalues",
    tag: "Engineering Maths",
    hook: "The directions a system stretches without turning.",
  },
];

export const notebookSections = [
  "The intuition",
  "The maths",
  "Where you meet it",
  "Common mistakes",
] as const;
