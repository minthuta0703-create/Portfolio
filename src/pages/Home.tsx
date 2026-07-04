import { useState, useRef } from "react";
import { Link } from "react-router";
import { ArrowDown, ExternalLink, Activity, Cpu, Code, Settings } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const projects = [
  {
    id: "robotic-arm",
    title: "Robotic Arm Motion Tracking",
    description:
      "Translating human movement into robotic response using IMUs and inverse kinematics.",
    tags: ["Robotics", "Sensors", "C++"],
    status: "COMPLETED",
  },
  {
    id: "audio-dsp",
    title: "Audio DSP / ANC System",
    description:
      "Real-time signal processing and adaptive audio systems for active noise cancellation.",
    tags: ["DSP", "Audio", "MATLAB"],
    status: "IN PROGRESS",
  },
  {
    id: "robotic-hand",
    title: "Mechatronic Hand Build",
    description: "Mechanical motion controlled through custom electronics and software.",
    tags: ["Mechanical", "Arduino", "Python"],
    status: "PROTOTYPING",
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

export function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const projectsRef = useRef<HTMLElement>(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShowProjects = () => {
    setShowProjects(true);
    setTimeout(scrollToProjects, 100);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Intro Section */}
      <section className="container mx-auto px-4 pt-20 md:pt-32 max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-24">
        <div className="shrink-0 w-40 h-40 md:w-56 md:h-56 relative border border-border p-2 bg-card">
          <div className="w-full h-full relative overflow-hidden bg-muted">
            <ImageWithFallback
              src="/profile.svg"
              alt="Min Thuta"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          {/* Decorative corners */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Hi, I'm Min. 🇲🇲
          </h1>

          <div className="font-mono text-sm tracking-wider text-muted-foreground uppercase mb-6 flex flex-wrap justify-center md:justify-start items-center gap-3">
            <span>Mechatronics Engineering</span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <span>Teacher</span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <span>Content Creator</span>
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
            I'm a mechatronics student bridging the gap between the math and the metal. I build
            hardware, write the control logic, film the process, and teach others how systems work
            from the ground up.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {!showProjects ? (
              <button
                onClick={handleShowProjects}
                className="inline-flex items-center justify-center h-12 px-6 bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90"
              >
                View Projects
                <ArrowDown className="ml-2 w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center h-12 px-6 border border-border bg-muted/30 text-muted-foreground font-medium"
              >
                Jump to Projects
                <ArrowDown className="ml-2 w-4 h-4" />
              </button>
            )}
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center justify-center h-12 px-6 border border-border bg-card text-foreground font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Story & Thesis Section */}
      <section className="container mx-auto px-4 mb-24 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary" />
              The Story
            </h2>
            <div className="flex flex-col gap-0 border-l border-border ml-2 pl-6 relative">
              <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
              <div className="pb-8">
                <h4 className="font-bold text-sm">Mechatronics at UTS</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Sydney, Australia</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Where the hands-on building happens. Translating theory into actual hardware.
                </p>
              </div>
              <div className="absolute top-[35%] -left-[5px] w-2.5 h-2.5 rounded-full bg-border ring-4 ring-background" />
              <div className="pb-8 opacity-80">
                <h4 className="font-bold text-sm">University of Bristol</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Bristol, UK</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deep theoretical foundations and mathematical rigour.
                </p>
              </div>
              <div className="absolute top-[75%] -left-[5px] w-2.5 h-2.5 rounded-full bg-border ring-4 ring-background" />
              <div className="opacity-60">
                <h4 className="font-bold text-sm">Early Foundations</h4>
                <p className="text-xs text-muted-foreground mt-1">Myanmar</p>
              </div>
            </div>
          </div>

          <div className="bg-accent text-accent-foreground p-8 border border-border relative">
            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-muted-foreground/30 border-b border-l border-border/30">
              SYS-THESIS
            </div>
            <h2 className="text-xl font-medium leading-snug mb-6 pt-4">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            </h2>
            <div className="flex flex-col gap-3 font-mono text-xs tracking-widest uppercase text-muted-foreground/80 mt-8">
              <div className="flex items-center gap-3">
                <Settings className="w-3 h-3 text-secondary" /> <span>Placeholder 01</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-3 h-3 text-secondary" /> <span>Placeholder 02</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-3 h-3 text-secondary" /> <span>Placeholder 03</span>
              </div>
              <div className="flex items-center gap-3">
                <Cpu className="w-3 h-3 text-secondary" /> <span>Placeholder 04</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section className="container mx-auto px-4 mb-24 max-w-4xl">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-secondary" />
          Engineering Notebook
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className="bg-card border border-border p-4 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 w-1 h-1 bg-border rounded-full group-hover:bg-primary/50 transition-colors" />
              <div className="font-mono text-[9px] text-muted-foreground uppercase mb-2">
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
          className="container mx-auto px-4 max-w-4xl animate-in fade-in slide-in-from-top-8 duration-700 pt-8 border-t border-border border-dashed"
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
                className="group flex flex-col bg-card border border-border hover:border-primary/50 transition-colors p-6 relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-primary/10 transition-colors" />

                <div className="flex justify-between items-start mb-4">
                  <div className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-border bg-background text-muted-foreground">
                    {project.status}
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors pr-6">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono border border-border bg-muted/30 px-1.5 py-0.5 text-muted-foreground uppercase"
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
