import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionItem } from "../components/Accordion";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { projects, projectSections, statusStyles } from "../data/projects";

export function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 max-w-2xl text-center">
        <p className="text-muted-foreground mb-6">Project not found.</p>
        <Link to="/projects" className="text-primary hover:underline">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 max-w-3xl">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to projects
      </Link>

      <header className="mb-10 pb-8 border-b border-border">
        <div className="flex items-center gap-3 mb-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {project.tags.map((tag, i) => (
            <span key={tag}>
              {tag}
              {i < project.tags.length - 1 && <span className="ml-3">·</span>}
            </span>
          ))}
          <span
            className={`ml-auto font-bold border px-2 py-0.5 ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{project.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{project.tagline}</p>
      </header>

      <div className="mb-10">
        <InstagramEmbed url={project.reelUrl} caption={`Reel for ${project.title}`} />
      </div>

      <Accordion>
        {projectSections.map((title, i) => (
          <AccordionItem
            key={title}
            title={title}
            label={String(i + 1).padStart(2, "0")}
            defaultOpen={i === 0}
          >
            <p>
              Placeholder text for <em>{title}</em>. Replace with the real write-up when the project
              log is ready — a few short paragraphs, links, or an image is enough.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
