import { Link, useParams } from "react-router";
import { ArrowLeft, Download } from "lucide-react";
import { Accordion, AccordionItem } from "../components/Accordion";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { projectContents, projectSections, statusStyles } from "../data/projects";

export function ProjectDetail() {
  const { id } = useParams();
  const project = projectContents.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 max-w-2xl text-center">
        <p className="text-muted-foreground mb-6">Project not found.</p>
        <Link to="/#projects" className="text-primary hover:underline">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 max-w-3xl">
      <Link
        to="/#projects"
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
          <span className={`ml-auto font-bold border px-2 py-0.5 ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{project.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{project.tagline}</p>
        {project.date && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-4">
            {project.date}
          </p>
        )}
      </header>

      <div className="mb-10">
        <InstagramEmbed
          url={project.reelUrl}
          caption={`Build reel for ${project.title} — coming soon.`}
        />
      </div>

      {project.images.length > 0 && (
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.images.map((img, i) => (
            <figure key={img.src} className="border border-border bg-card p-1.5">
              <img
                src={img.src}
                alt={img.caption || project.title}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground px-1 pt-1.5 pb-0.5">
                FIG. {String(i + 2).padStart(2, "0")}
                {img.caption ? ` — ${img.caption}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <Accordion>
        {projectSections.map((title, i) => {
          const paras = project.sections[title] ?? [];
          const isFiles = title === "Project Files";
          const files = isFiles ? project.files : [];
          const hasContent = paras.length > 0 || files.length > 0;
          return (
            <AccordionItem
              key={title}
              title={title}
              label={String(i + 1).padStart(2, "0")}
              defaultOpen={i === 0}
            >
              {paras.map((p, j) => (
                <p key={j} className={j > 0 ? "mt-3" : ""}>
                  {p}
                </p>
              ))}
              {files.length > 0 && (
                <ul className={`flex flex-col gap-2 ${paras.length > 0 ? "mt-4" : ""}`}>
                  {files.map((f) => (
                    <li key={f.href}>
                      <a
                        href={f.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
                      >
                        <Download className="w-3.5 h-3.5" /> {f.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {!hasContent && (
                <p>
                  Placeholder for <em>{title}</em> — the write-up for this build is on its way.
                </p>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
