import { useParams, Link } from "react-router";
import { ArrowLeft, ExternalLink, Github, ChevronRight } from "lucide-react";

const sections = [
  "Project overview",
  "System architecture",
  "What failed",
  "What I learned",
];

const tools = ["C++", "ROS", "STM32", "SolidWorks", "PID"];

const sectionId = (section: string) => section.toLowerCase().replace(/\s+/g, "-");

export function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        <article className="min-w-0">
          <header className="mb-12 border-b border-border pb-8 relative">
            <div className="absolute top-0 right-0 p-2 border border-border bg-card font-mono text-[10px] text-muted-foreground uppercase hidden sm:block">
              DOC-ID: {id?.toUpperCase() || "ROBOTIC-ARM"}
              <br />
              REV: 1.0
              <br />
              STATUS: RELEASED
            </div>

            <div className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span>Robotics</span>
              <ChevronRight className="w-3 h-3" />
              <span>Control</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary font-bold border border-primary/40 px-2 py-0.5 bg-primary/10">
                COMPLETED
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight sm:pr-32">
              Robotic Arm Motion Tracking
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Translating human movement into robotic response. A full mechatronic build exploring
              sensor fusion, kinematics, and real-time control.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border border-dashed">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4" /> Video Demo
              </a>
            </div>
          </header>

          <div className="max-w-none text-foreground">
            <h2 id="project-overview" className="text-2xl font-bold mt-12 mb-4 scroll-mt-24 flex items-center gap-3">
              <span className="w-4 h-4 bg-primary inline-block" />
              Project Overview
            </h2>
            <p className="text-muted-foreground">
              This system tracks the human arm's joints in 3D space using IMUs, solves the inverse
              kinematics in real-time, and actuates a 6-DOF robotic arm to mirror the movement. It
              requires tightly coupled mechanical, electrical, and software engineering.
            </p>

            <div className="my-8 aspect-video bg-muted border border-border flex items-center justify-center relative overflow-hidden group">
              {/* Blueprint grid for schematic */}
              <div className="blueprint-grid absolute inset-0 opacity-20 [--grid-size:20px]" />

              <span className="font-mono text-muted-foreground/50 text-xs absolute top-4 left-4 z-10 bg-background/80 px-2 py-1 border border-border">
                [SCHEMATIC PLACEHOLDER]
              </span>
              <div className="w-24 h-24 border-2 border-border border-dashed rounded-full flex items-center justify-center opacity-70 relative z-10">
                <div className="absolute w-full h-px bg-primary rotate-45" />
                <div className="absolute w-full h-px bg-primary -rotate-45" />
                <div className="w-3 h-3 bg-secondary rounded-full z-20" />
              </div>

              {/* Measurement lines */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 flex flex-col items-center">
                <div className="w-full h-px bg-foreground/30 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/50" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/50" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground mt-1">450mm</span>
              </div>
            </div>

            <h2 id="system-architecture" className="text-2xl font-bold mt-12 mb-4 scroll-mt-24 flex items-center gap-3">
              <span className="w-4 h-4 bg-primary inline-block" />
              System Architecture
            </h2>
            <p className="text-muted-foreground">The architecture is split into three domains:</p>
            <ul className="text-muted-foreground list-disc pl-5 mt-4 space-y-2 marker:text-primary">
              <li>
                <strong>Sensing:</strong> Wearable MPU6050 sensors over I2C sending quaternion data.
              </li>
              <li>
                <strong>Processing:</strong> An STM32 microcontroller running an RTOS for
                predictable timing.
              </li>
              <li>
                <strong>Actuation:</strong> Custom-designed 3D printed joints driven by high-torque
                servos.
              </li>
            </ul>

            <h2 id="what-failed" className="text-2xl font-bold mt-12 mb-4 scroll-mt-24 flex items-center gap-3 text-destructive">
              <span className="w-4 h-4 bg-destructive inline-block" />
              What Failed
            </h2>
            <p className="text-muted-foreground border-l-2 border-destructive bg-destructive/5 p-4 rounded-r-md">
              Initially, I attempted to use cheap potentiometers for absolute positioning. The noise
              and hysteresis made precise PID control impossible. The system would oscillate
              violently at the setpoint.
            </p>

            <h2 id="what-i-learned" className="text-2xl font-bold mt-12 mb-4 scroll-mt-24 flex items-center gap-3">
              <span className="w-4 h-4 bg-secondary inline-block" />
              What I Learned
            </h2>
            <p className="text-muted-foreground">
              Software is only as good as the mechanical compliance allows it to be. A rigid
              structure makes control theory work; a sloppy structure breaks all the math.
            </p>
          </div>
        </article>

        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block relative">
          <div className="sticky top-24 bg-card border border-border p-6 shadow-sm">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary" />
              Table of Contents
            </h3>
            <nav className="flex flex-col gap-2">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${sectionId(section)}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium border-l-2 border-transparent hover:border-primary pl-3 py-1"
                >
                  {section}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-mono text-[10px] uppercase text-muted-foreground mb-2">
                Tools Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono border border-border bg-background px-1.5 py-0.5 text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
