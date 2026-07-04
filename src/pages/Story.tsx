import { Accordion, AccordionItem } from "../components/Accordion";
import { InstagramEmbed } from "../components/InstagramEmbed";

const chapters = [
  {
    title: "Growing up in Myanmar",
    body: "Placeholder. A few paragraphs on early life, family, the first sparks of curiosity.",
  },
  {
    title: "Engineering in the UK",
    body: "Placeholder. Moving countries, first exposure to engineering as a way of thinking.",
  },
  {
    title: "University of Bristol",
    body: "Placeholder. The theory-heavy years — the maths, the rigour, what stuck.",
  },
  {
    title: "Mechatronics at UTS",
    body: "Placeholder. The switch to Sydney, hands-on building, why UTS made sense.",
  },
  {
    title: "Making engineering content",
    body: "Placeholder. Why I started explaining what I was learning, and who it's for.",
  },
  {
    title: "Where I am now",
    body: "Placeholder. Current projects, current questions, what I'm chasing next.",
  },
];

export function Story() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-3xl">
      <div className="mb-12">
        <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-3">
          02 — Story
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">How I got here</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A short version of the long story — six chapters, one per major shift. Open any one to
          read more.
        </p>
      </div>

      <div className="mb-10">
        <InstagramEmbed caption="A short intro reel — coming soon." />
      </div>

      <Accordion>
        {chapters.map((chapter, i) => (
          <AccordionItem
            key={chapter.title}
            title={chapter.title}
            label={String(i + 1).padStart(2, "0")}
            defaultOpen={i === 0}
          >
            <p>{chapter.body}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
