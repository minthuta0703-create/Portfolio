import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Gear } from "../components/Gear";
import { ArmNav } from "../components/ArmNav";
import { ProjectsPoster, StoryPoster, NotebookPoster } from "../components/CategoryPosters";
import { projects } from "../data/projects";
import { concepts } from "../data/concepts";

const EMAIL = "minthuta0703@gmail.com";

interface Entry {
  id: string;
  title: string;
  category: string;
  route: string;
  blurb: string;
  items: string[];
  Poster: () => JSX.Element;
}

const entries: Entry[] = [
  {
    id: "projects",
    title: "Projects",
    category: "01 — BUILDS",
    route: "/projects",
    blurb: "Builds taken from rough idea to something that runs — full case study inside each.",
    items: projects.map((p) => p.title),
    Poster: ProjectsPoster,
  },
  {
    id: "story",
    title: "My Story",
    category: "02 — CHAPTERS",
    route: "/story",
    blurb: "Six chapters on how I ended up building, teaching, and filming engineering.",
    items: ["Where it started", "What shaped it", "Where it's going"],
    Poster: StoryPoster,
  },
  {
    id: "notebook",
    title: "Engineering Notebook",
    category: "03 — LIBRARY",
    route: "/notebook",
    blurb: "Short explainers on the concepts I keep coming back to. One reel per idea.",
    items: concepts.slice(0, 3).map((c) => c.title).concat(`+${concepts.length - 3} more`),
    Poster: NotebookPoster,
  },
];

export function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [vp, setVp] = useState(() => ({ h: window.innerHeight, w: window.innerWidth }));
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
    };
    const onResize = () => setVp({ h: window.innerHeight, w: window.innerWidth });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Snap the document scroll to whole slides while the deck is mounted.
  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollSnapType = "y mandatory";
    return () => {
      root.style.scrollSnapType = "";
    };
  }, []);

  const vh = vp.h;
  const isMobile = vp.w < 1024;
  const slides = entries.length + 1; // hero + 3 categories
  const exact = Math.min(slides - 1, Math.max(0, scrollY / vh));
  const active = Math.round(exact);
  const entry = active > 0 ? entries[active - 1] : null;
  const progress = exact / (slides - 1);
  const gearRotation = scrollY * 0.12;

  // Filmstrip geometry: active card centred, next card peeking from below.
  const cardH = Math.min(vh * (isMobile ? 0.5 : 0.58), 600);
  const cardW = Math.min(cardH * 0.78, vp.w - 48);
  const gap = vh * 0.1;
  const stripY = -cardH / 2 - exact * (cardH + gap);

  const goTo = (slide: number) =>
    window.scrollTo({ top: slide * vh, behavior: "smooth" });

  const cards = [
    {
      id: "hero",
      render: () => (
        <div className="relative w-full h-full group/photo">
          <img
            src="/profile.jpg"
            alt="Min Thuta"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/profile.svg";
            }}
            className="w-full h-full object-cover object-[60%_30%] grayscale group-hover/photo:grayscale-0 transition-all duration-700"
          />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground tracking-widest bg-background/80 px-2 py-0.5 whitespace-nowrap">
            FIG. 01 — OPERATOR
          </span>
        </div>
      ),
    },
    ...entries.map((e) => ({
      id: e.id,
      render: () => <e.Poster />,
    })),
  ];

  return (
    // Heights in px from measured innerHeight so slide boundaries, snap
    // targets and the strip math all agree on mobile dynamic viewports.
    <div style={{ height: slides * vh }}>
      {/* Invisible snap targets — one per slide */}
      {Array.from({ length: slides }, (_, i) => (
        <div key={i} style={{ height: vh, scrollSnapAlign: "start", scrollSnapStop: "always" }} />
      ))}

      <div className="fixed inset-0 overflow-hidden bg-background text-foreground">
        {/* Backdrop */}
        <div className="glow-blue absolute inset-x-0 top-0 h-[70vh] pointer-events-none" aria-hidden />
        <div className="glow-amber absolute inset-0 pointer-events-none" aria-hidden />
        <div className="blueprint-grid absolute inset-0 opacity-[0.35] pointer-events-none" />

        {/* Mobile hero headline — crossfades into the gantry nav on scroll */}
        <div
          className="lg:hidden absolute top-8 inset-x-0 z-20 text-center px-6 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - exact * 1.6), pointerEvents: exact > 0.3 ? "none" : "auto" }}
        >
          <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mb-1.5">
            Mechatronics / Systems / Storytelling
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Hi, I'm Min. 🇲🇲</h1>
        </div>

        {/* Mobile/tablet gantry nav — the arm rides in once the hero leaves */}
        <div
          className="lg:hidden absolute top-5 inset-x-0 z-20 flex justify-center transition-opacity duration-300"
          style={{
            opacity: Math.max(0, Math.min(1, exact * 1.6 - 0.5)),
            pointerEvents: exact > 0.7 ? "auto" : "none",
          }}
        >
          <div className="bg-background/80 backdrop-blur-sm border border-border px-3 pt-2 pb-1">
            <ArmNav
              orientation="horizontal"
              items={entries.map((e, i) => ({
                label: e.id === "notebook" ? "Notebook" : e.id === "story" ? "Story" : "Projects",
                active: i === active - 1,
                onSelect: () => goTo(i + 1),
              }))}
              parked={active === 0}
            />
          </div>
        </div>

        {/* Main stage */}
        <div className="h-full grid lg:grid-cols-[300px_1fr_280px] px-5 md:px-8 gap-6">
          {/* Left rail */}
          <div className="hidden lg:flex items-center min-w-0 relative z-20">
            {active === 0 ? (
              <div key="hero-left" className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-4">
                  Mechatronics / Systems / Storytelling
                </div>
                <h1 className="text-5xl xl:text-6xl font-bold tracking-tight leading-[1.02] text-gradient">
                  Hi, I'm<br />Min. 🇲🇲
                </h1>
              </div>
            ) : (
              <div key="list-left" className="animate-in fade-in duration-500">
                <ArmNav
                  items={entries.map((e, i) => ({
                    label: e.title,
                    active: i === active - 1,
                    onSelect: () => goTo(i + 1),
                  }))}
                />
              </div>
            )}
          </div>

          {/* Centre filmstrip */}
          <div className="relative min-w-0 h-full">
            {/* Static viewfinder brackets around the active slot */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ width: cardW + 20, height: cardH + 20 }}
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-foreground/70" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-foreground/70" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-foreground/70" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-foreground/70" />
            </div>

            {/* Strip — position driven directly by scroll */}
            <div
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{ transform: `translate(-50%, ${stripY}px)` }}
            >
              <div className="flex flex-col items-center" style={{ gap }}>
                {cards.map((card, i) => {
                  const d = Math.min(1, Math.abs(i - exact));
                  const isActiveCard = i === active;
                  const linked = i > 0;
                  const inner = (
                    <div
                      className="border border-border bg-card shadow-sm overflow-hidden relative"
                      style={{
                        width: cardW,
                        height: cardH,
                        opacity: 1 - 0.55 * d,
                        filter: `grayscale(${d})`,
                        transform: `scale(${1 - 0.05 * d})`,
                      }}
                    >
                      <div className="blueprint-grid absolute inset-0 opacity-[0.5] [--grid-size:24px] pointer-events-none" />
                      {card.render()}
                    </div>
                  );
                  return linked ? (
                    <a
                      key={card.id}
                      href={entries[i - 1].route}
                      aria-label={isActiveCard ? `Open ${entries[i - 1].title}` : `Go to ${entries[i - 1].title}`}
                      onClick={(ev) => {
                        ev.preventDefault();
                        if (isActiveCard) navigate(entries[i - 1].route);
                        else goTo(i);
                      }}
                      className="block cursor-pointer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={card.id}>{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Caption for the active slide */}
            <div
              key={`caption-${active}`}
              className="absolute bottom-[4.5rem] md:bottom-14 inset-x-0 text-center z-20 animate-in fade-in slide-in-from-bottom-2 duration-500 pointer-events-none px-16 md:px-0"
            >
              {active === 0 ? (
                <p className="inline-block text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto px-4 py-1 bg-background/75 backdrop-blur-sm">
                  Mechatronics student bridging the gap between the math and the metal.
                </p>
              ) : (
                <div className="inline-block px-5 py-2 bg-background/75 backdrop-blur-sm">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mb-1">
                    {entry!.category}
                  </div>
                  <Link
                    to={entry!.route}
                    className="group pointer-events-auto inline-flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">{entry!.title}</h2>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right rail */}
          <div className="hidden lg:flex items-center min-w-0 relative z-20">
            {active === 0 ? (
              <div key="hero-right" className="animate-in fade-in slide-in-from-right-4 duration-500">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  I build hardware, write the control logic, film the process, and teach how systems
                  work from the ground up.
                </p>
                <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>— Mechatronics @ UTS Sydney</span>
                  <span>— Engineering educator</span>
                  <span>— Content creator</span>
                </div>
              </div>
            ) : (
              <div key={`meta-${entry!.id}`} className="animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                <ul className="font-mono text-[11px] text-muted-foreground flex flex-col gap-2 mb-5 pb-5 border-b border-border">
                  {entry!.items.map((item, i) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="text-[9px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <span className="uppercase tracking-wider">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{entry!.blurb}</p>
                <Link
                  to={entry!.route}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <footer className="absolute bottom-0 inset-x-0 z-30 flex items-end justify-between px-5 md:px-8 pb-4 pointer-events-none">
          <div className="flex items-end gap-3 text-foreground/80">
            <div className="relative w-[72px] h-[46px]" aria-hidden>
              <Gear size={46} rotation={gearRotation} className="absolute left-0 bottom-0" />
              <Gear size={32} rotation={-gearRotation * (46 / 32) + 18} teeth={8} className="absolute left-[38px] bottom-[22px]" />
            </div>
            <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground uppercase tracking-widest pb-1">
              SYS.SCROLL {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="pointer-events-auto font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors pb-1"
          >
            {EMAIL}
          </a>
        </footer>
      </div>
    </div>
  );
}
