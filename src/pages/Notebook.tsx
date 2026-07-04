import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { concepts } from "../data/concepts";

export function Notebook() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-4xl">
      <div className="mb-12">
        <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-3">
          03 — Engineering Notebook
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Concepts I keep coming back to
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          One-line explainers and a reel for each idea. Open a card for the longer note.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {concepts.map((concept) => (
          <Link
            key={concept.id}
            to={`/notebook/${concept.id}`}
            className="group flex flex-col p-4 bg-card border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                {concept.tag}
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="font-heading font-bold text-sm mb-1 group-hover:text-primary transition-colors">
              {concept.title}
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">{concept.hook}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
