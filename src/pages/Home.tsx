import { Link } from "react-router";
import { ArrowUpRight, FolderKanban, BookOpen, User } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const EMAIL = "minthuta0703@gmail.com";

const sections = [
  {
    to: "/projects",
    label: "01",
    title: "Projects",
    description: "Builds, hardware, and control systems — with the full case-study behind each.",
    icon: FolderKanban,
  },
  {
    to: "/story",
    label: "02",
    title: "Story",
    description: "How I got here — Myanmar to Bristol to UTS, and why engineering lanes broke.",
    icon: User,
  },
  {
    to: "/notebook",
    label: "03",
    title: "Engineering Notebook",
    description: "Short explainers on the concepts I keep coming back to. One reel per idea.",
    icon: BookOpen,
  },
];

export function Home() {
  return (
    <div className="flex flex-col pb-20">
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-28 max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 mb-24">
        <div className="shrink-0 w-40 h-40 md:w-56 md:h-56 relative border border-border p-2 bg-card shadow-sm">
          <div className="w-full h-full relative overflow-hidden bg-muted">
            <ImageWithFallback
              src="/profile.svg"
              alt="Min Thuta"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-secondary" />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/60 tracking-widest">
            FIG. 01 — OPERATOR
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-4">
            Mechatronics / Systems / Storytelling
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.05] text-gradient">
            Hi, I'm Min. 🇲🇲
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
            I'm a mechatronics student bridging the gap between the math and the metal. I build
            hardware, write the control logic, film the process, and teach others how systems work
            from the ground up.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              to="/projects"
              className="inline-flex items-center h-11 px-5 bg-primary text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5"
            >
              View Projects
              <ArrowUpRight className="ml-1.5 w-4 h-4" />
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center h-11 px-5 border border-border bg-card font-medium transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* Three section cards */}
      <section className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map(({ to, label, title, description, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-col gap-4 p-6 md:p-7 bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_50px_-20px_rgba(0,87,217,0.35)]"
            >
              <div className="flex items-start justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {label}
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
