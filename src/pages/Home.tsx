import { useState, useRef } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowUpRight, Activity, Cpu, Code, Settings } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useReveal } from "../hooks/useReveal";

const EMAIL = "minthuta0703@gmail.com";

const projects = [
  {
    id: "robotic-arm",
    title: "Robotic Arm Motion Tracking",
    description:
      "Translating human movement into robotic response using IMUs and inverse kinematics.",
    tags: ["Robotics", "Sensors", "C++"],
    status: "COMPLETED",
    statusClass: "border-primary/40 text-primary bg-primary/10",
  },
  {
    id: "audio-dsp",
    title: "Audio DSP / ANC System",
    description:
      "Real-time signal processing and adaptive audio systems for active noise cancellation.",
    tags: ["DSP", "Audio", "MATLAB"],
    status: "IN PROGRESS",
    statusClass: "border-secondary/40 text-secondary bg-secondary/10",
  },
  {
    id: "robotic-hand",
    title: "Mechatronic Hand Build",
    description: "Mechanical motion controlled through custom electronics and software.",
    tags: ["Mechanical", "Arduino", "Python"],
    status: "PROTOTYPING",
    statusClass: "border-border text-muted-foreground bg-muted/40",
  },
];

const concepts = [
  { title: "Buck Converter", tag: "Power Electronics" },
  { title: "Laplace Transform", tag: "Maths" },
  { title: "Fourier Series", tag: "Signals" },
  { title: "EV Inverter", tag: "Power Systems" },
  { title: "PID Tuning", tag: "Control Systems" },
  { title: "Eigenvalues", tag: "Maths" },
];

const thesisPoints = [
  { icon: Settings, label: "Mechanical is software" },
  { icon: Activity, label: "Software is control" },
  { icon: Code, label: "Control is maths" },
  { icon: Cpu, label: "AI is optimisation" },
];

export function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const projectsRef = useRef<HTMLElement>(null);
  const story = useReveal();
  const notebook = useReveal();

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShowProjects = () => {
    setShowProjects(true);
    setTimeout(scrollToProjects, 100);
  };

  return (
    <div className="flex flex-col pb-20">
      {/* Intro Section */}
      <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-28 max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 mb-24 md:mb-32">
        <div className="shrink-0 w-40 h-40 md:w-56 md:h-56 relative border border-border p-2 bg-card">
          <div className="w-full h-full relative overflow-hidden bg-muted">
            <ImageWithFallback
              src="/profile.svg"
              alt="Min Thuta"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Decorative corners + measurement tick */}
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

          <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight text-foreground leading-[1.05]">
            Hi, I'm Min. 🇲🇲
          </h1>

          <div className="font-mono text-xs md:text-sm tracking-wider text-muted-foreground uppercase mb-6 flex flex-wrap justify-center md:justify-start items-center gap-3">
            <span>Mechatronics Engineering</span>
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span>Teacher</span>
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span>Content Creator</span>
          </div>

          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
            I'm a mechatronics student bridging the gap between the math and the metal. I build
            hardware, write the control logic, film the process, and teach others how systems work
            from the ground up.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {!showProjects ? (
              <button
                onClick={handleShowProjects}
                className="group inline-flex items-center justify-center h-12 px-6 bg-primary text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_var(--primary)]"
              >
                View Projects
                <ArrowDown className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            ) : (
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center justify-center h-12 px-6 border border-border bg-muted/30 text-muted-foreground font-medium transition-colors hover:text-foreground hover:border-primary/50"
              >
                Jump to Projects
                <ArrowDown className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            )}
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center h-12 px-6 border border-border bg-card text-foreground font-medium transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Story & Thesis Section */}
      <section
        ref={story.ref}
        className={`container mx-auto px-4 md:px-6 mb-24 md:mb-32 max-w-4xl ${story.className}`}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary" />
              The Story
            </h2>
            <div className="flex flex-col gap-0 border-l border-border ml-2 pl-6 relative">
              <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
              <div className="pb-8">
                <h4 className="font-bold text-sm">Mechatronics at UTS</h4>
                <p className="text-xs text-muted-foreground font-mono mt-1 mb-2 uppercase tracking-wider">
                  Sydney, Australia
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Where the hands-on building happens. Translating theory into actual hardware.
                </p>
              </div>
              <div className="absolute top-[35%] -left-[5px] w-2.5 h-2.5 rounded-full bg-border ring-4 ring-background" />
              <div className="pb-8 opacity-80">
                <h4 className="font-bold text-sm">University of Bristol</h4>
                <p className="text-xs text-muted-foreground font-mono mt-1 mb-2 uppercase tracking-wider">
                  Bristol, UK
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deep theoretical foundations and mathematical rigour.
                </p>
              </div>
              <div className="absolute top-[75%] -left-[5px] w-2.5 h-2.5 rounded-full bg-border ring-4 ring-background" />
              <div className="opacity-60">
                <h4 className="font-bold text-sm">Early Foundations</h4>
                <p className="text-xs text-muted-foreground font-mono mt-1 uppercase tracking-wider">
                  Myanmar
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent text-accent-foreground p-8 border border-border relative overflow-hidden">
            <div className="blueprint-grid absolute inset-0 opacity-[0.25] [--grid-size:24px] pointer-events-none" />
            <div className="absolute top-0 right-0 p-3 font-mono text-[10px] text-muted-foreground/60 border-b border-l border-border/60 tracking-widest">
              SYS-THESIS
            </div>
            <h2 className="relative text-xl md:text-2xl font-medium leading-snug mb-6 pt-4">
              "Engineering stopped having clean lanes before I even started. The interesting work
              happens where the disciplines overlap."
            </h2>
            <div className="relative flex flex-col gap-3 font-mono text-xs tracking-widest uppercase text-muted-foreground mt-8">
              {thesisPoints.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="w-3 h-3 text-secondary shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section
        ref={notebook.ref}
        className={`container mx-auto px-4 md:px-6 mb-24 md:mb-32 max-w-4xl ${notebook.className}`}
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-secondary" />
          Engineering Notebook
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className="bg-card border border-border p-4 transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 group relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 w-1 h-1 bg-border rounded-full group-hover:bg-secondary transition-colors" />
              <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-2">
                {concept.tag}
              </div>
              <div className="text-sm font-medium group-hover:text-primary transition-colors pr-4">
                {concept.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hidden Projects Section */}
      {showProjects && (
        <section
          ref={projectsRef}
          className="container mx-auto px-4 md:px-6 max-w-4xl animate-in fade-in slide-in-from-top-8 duration-700 pt-10 border-t border-border border-dashed scroll-mt-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="w-2 h-2 bg-primary" />
              Selected Work
            </h2>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1">
              ARCHIVE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                to={`/projects/${project.id}`}
                key={project.id}
                className="group flex flex-col bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8)] p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />

                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${project.statusClass}`}
                  >
                    {project.status}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors pr-6">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono border border-border bg-muted/30 px-1.5 py-0.5 text-muted-foreground uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
