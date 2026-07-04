import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Gear } from "../components/Gear";
import { RoboticArm } from "../components/RoboticArm";
import { projects } from "../data/projects";
import { concepts } from "../data/concepts";

const EMAIL = "minthuta0703@gmail.com";
const ROW_H = 48;

interface Entry {
  id: string;
  title: string;
  category: string;
  route: string;
  blurb: string;
  meta: string;
}

const entries: Entry[] = [
  ...projects.map((p, i) => ({
    id: p.id,
    title: p.title,
    category: `PROJECT ${String(i + 1).padStart(2, "0")}`,
    route: `/projects/${p.id}`,
    blurb: p.tagline,
    meta: p.tags.join(" · "),
  })),
  {
    id: "story",
    title: "My Story",
    category: "CHAPTERS",
    route: "/story",
    blurb: "Myanmar → Bristol → Sydney. Six chapters, one per major shift.",
    meta: "6 chapters",
  },
  {
    id: "notebook",
    title: "Engineering Notebook",
    category: "LIBRARY",
    route: "/notebook",
    blurb: "Short explainers on the concepts I keep coming back to.",
    meta: `${concepts.length} concepts`,
  },
];

function useSydneyTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Australia/Sydney",
  });
}

/** Per-entry preview rendered inside the central frame. */
function FramePreview({ entry, index }: { entry: Entry; index: number }) {
  if (entry.id === "story") {
    return (
      <div className="relative w-full h-full flex flex-col justify-center gap-3 p-8">
        {["Myanmar", "Engineering in the UK", "University of Bristol", "Mechatronics at UTS", "Making content", "Now"].map(
          (step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-secondary w-5">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{step}</span>
            </div>
          ),
        )}
      </div>
    );
  }

  if (entry.id === "notebook") {
    return (
      <div className="relative w-full h-full grid grid-cols-2 gap-2 p-6 content-center">
        {concepts.map((c) => (
          <div key={c.id} className="border border-border bg-background/60 px-2.5 py-2">
            <div className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest mb-0.5">{c.tag}</div>
            <div className="font-heading text-[11px] font-bold">{c.title}</div>
          </div>
        ))}
      </div>
    );
  }

  // Project schematic placeholder
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span className="absolute top-4 left-4 font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest">
        FIG. {String(index + 2).padStart(2, "0")} — SCHEMATIC
      </span>
      <span className="absolute top-4 right-4 font-mono text-[24px] text-border font-bold">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="w-28 h-28 border-2 border-border border-dashed rounded-full flex items-center justify-center relative">
        <div className="absolute w-full h-px bg-primary/60 rotate-45" />
        <div className="absolute w-full h-px bg-primary/60 -rotate-45" />
        <div className="w-3 h-3 bg-secondary rounded-full z-10" />
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-1/2 flex flex-col items-center">
        <div className="w-full h-px bg-foreground/25 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/40" />
        </div>
        <span className="font-mono text-[9px] text-muted-foreground mt-1">450mm</span>
      </div>
    </div>
  );
}

export function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(() => window.innerHeight);
  const ticking = useRef(false);
  const time = useSydneyTime();

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
    };
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const slides = entries.length + 1; // hero + entries
  const active = Math.min(slides - 1, Math.max(0, Math.round(scrollY / vh)));
  const entry = active > 0 ? entries[active - 1] : null;
  const maxScroll = (slides - 1) * vh;
  const progress = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0;
  const gearRotation = useMemo(() => scrollY * 0.12, [scrollY]);

  return (
    <div style={{ height: `${slides * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-background text-foreground">
        {/* Backdrop */}
        <div className="glow-blue absolute inset-x-0 top-0 h-[70vh] pointer-events-none" aria-hidden />
        <div className="glow-amber absolute inset-0 pointer-events-none" aria-hidden />
        <div className="blueprint-grid absolute inset-0 opacity-[0.35] pointer-events-none" />

        {/* Top bar */}
        <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-5 md:px-8 h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center text-background font-mono font-bold text-lg group-hover:bg-primary transition-colors">
              M
            </div>
            <span className="font-bold tracking-tight font-heading">Min Thuta</span>
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <nav className="hidden md:flex items-center gap-5">
              <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Projects</Link>
              <Link to="/story" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Story</Link>
              <Link to="/notebook" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Notebook</Link>
            </nav>
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground">SYD {time}</span>
            <a href={`mailto:${EMAIL}`} className="font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </header>

        {/* Main stage */}
        <div className="h-full grid lg:grid-cols-[300px_1fr_280px] items-center px-5 md:px-8 pt-16 pb-14 gap-6">
          {/* Left rail — hero headline OR arm + category list */}
          <div className="hidden lg:flex items-center min-w-0">
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
              <div key="list-left" className="flex items-center gap-1 animate-in fade-in duration-500">
                <RoboticArm targetIndex={active - 1} rows={entries.length} rowHeight={ROW_H} />
                <ul>
                  {entries.map((e, i) => {
                    const isActive = i === active - 1;
                    return (
                      <li key={e.id} style={{ height: ROW_H }} className="flex items-center">
                        <Link
                          to={e.route}
                          className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                            isActive ? "text-foreground translate-x-1" : "text-muted-foreground/50"
                          }`}
                        >
                          {e.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Center frame */}
          <div className="flex flex-col items-center justify-center min-w-0 gap-4">
            {/* Mobile hero headline */}
            {active === 0 && (
              <div className="lg:hidden text-center animate-in fade-in duration-500">
                <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mb-2">
                  Mechatronics / Systems / Storytelling
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gradient">Hi, I'm Min. 🇲🇲</h1>
              </div>
            )}

            <div className="relative w-full max-w-[340px] md:max-w-[380px]">
              {/* Corner brackets */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-foreground/70 z-10" />
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-foreground/70 z-10" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-foreground/70 z-10" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-foreground/70 z-10" />

              <div className="aspect-[4/5] border border-border bg-card shadow-sm overflow-hidden relative">
                <div className="blueprint-grid absolute inset-0 opacity-[0.5] [--grid-size:24px] pointer-events-none" />
                {active === 0 ? (
                  <div key="hero-frame" className="relative w-full h-full animate-in fade-in zoom-in-95 duration-500">
                    <ImageWithFallback
                      src="/profile.svg"
                      alt="Min Thuta"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground tracking-widest bg-background/80 px-2 py-0.5">
                      FIG. 01 — OPERATOR
                    </span>
                  </div>
                ) : (
                  <Link
                    key={entry!.id}
                    to={entry!.route}
                    className="block relative w-full h-full animate-in fade-in zoom-in-95 duration-500 hover:bg-accent/40 transition-colors"
                    aria-label={`Open ${entry!.title}`}
                  >
                    <FramePreview entry={entry!} index={active - 1} />
                  </Link>
                )}
              </div>
            </div>

            {/* Caption under frame */}
            <div key={`caption-${active}`} className="text-center animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-md">
              {active === 0 ? (
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-4">
                  Mechatronics student bridging the gap between the math and the metal.
                </p>
              ) : (
                <>
                  <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mb-1.5">
                    {entry!.category} — {String(active).padStart(2, "0")}/{String(entries.length).padStart(2, "0")}
                  </div>
                  <Link to={entry!.route} className="group inline-flex items-center gap-2 hover:text-primary transition-colors">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{entry!.title}</h2>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right rail — hero intro OR entry meta */}
          <div className="hidden lg:block min-w-0">
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
              <div key={`meta-${entry!.id}`} className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 pb-3 border-b border-border">
                  {entry!.meta}
                </div>
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
        <footer className="absolute bottom-0 inset-x-0 z-30 flex items-end justify-between px-5 md:px-8 pb-4">
          <div className="flex items-end gap-3 text-foreground/80">
            <div className="relative w-[72px] h-[46px]" aria-hidden>
              <Gear size={46} rotation={gearRotation} className="absolute left-0 bottom-0" />
              <Gear size={32} rotation={-gearRotation * (46 / 32) + 18} teeth={8} className="absolute left-[38px] bottom-[22px]" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest pb-1">
              SYS.SCROLL {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
          </div>

          {active === 0 && (
            <div className="hidden sm:flex flex-col items-center gap-1 text-muted-foreground animate-bounce pb-1">
              <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          )}

          <span className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest pb-1 text-right">
            33.88°S / 151.20°E<br className="sm:hidden" />
            <span className="hidden sm:inline"> — </span>Engineering Without Lanes
          </span>
        </footer>
      </div>
    </div>
  );
}
