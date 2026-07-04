import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionItem } from "../components/Accordion";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { concepts, notebookSections } from "../data/concepts";

export function ConceptDetail() {
  const { id } = useParams();
  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 max-w-2xl text-center">
        <p className="text-muted-foreground mb-6">Concept not found.</p>
        <Link to="/notebook" className="text-primary hover:underline">
          ← Back to notebook
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 max-w-3xl">
      <Link
        to="/notebook"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to notebook
      </Link>

      <header className="mb-10 pb-8 border-b border-border">
        <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-3">
          {concept.tag}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{concept.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{concept.hook}</p>
      </header>

      <div className="mb-10">
        <InstagramEmbed url={concept.reelUrl} caption={`Reel for ${concept.title}`} />
      </div>

      <Accordion>
        {notebookSections.map((title, i) => (
          <AccordionItem
            key={title}
            title={title}
            label={String(i + 1).padStart(2, "0")}
            defaultOpen={i === 0}
          >
            <p>
              Placeholder for <em>{title}</em>. A short paragraph or two goes here — this is the
              lab-note version, not a textbook chapter.
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
