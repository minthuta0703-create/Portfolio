import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { projects, statusStyles } from "../data/projects";

export function Projects() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-4xl">
      <div className="mb-12">
        <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-3">
          01 — Projects
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Selected work</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Builds I've taken from a rough idea to something that runs. Open any project for the full
          case study.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="group flex flex-col p-6 bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_50px_-20px_rgba(0,87,217,0.35)]"
          >
            <div className="flex items-start justify-between mb-4">
              <span
                className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <h2 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono border border-border bg-muted/50 px-1.5 py-0.5 text-muted-foreground uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
