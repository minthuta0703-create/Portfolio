import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Gear } from "../components/Gear";
import { ArmNav } from "../components/ArmNav";
import { projects, statusStyles } from "../data/projects";
import { concepts } from "../data/concepts";
import { useReveal } from "../hooks/useReveal";

const EMAIL = "minthuta0703@gmail.com";

const chapters = [
  { title: "Growing up in Myanmar", line: "Curiosity first — taking things apart long before knowing how to put them back." },
  { title: "Engineering in the UK", line: "New country, new system. Engineering became a language, not a subject." },
  { title: "University of Bristol", line: "The theory years. The maths got hard; the intuition got real." },
  { title: "Mechatronics at UTS", line: "Sydney — where the theory finally meets hardware in my hands." },
  { title: "Making content", line: "Started filming what I was learning. Explaining it made it stick." },
  { title: "Now", line: "Building, teaching, and documenting where the disciplines overlap." },
];

const navSections = [
  { id: "projects", label: "Projects" },
  { id: "story", label: "Story" },
  { id: "notebook", label: "Notebook" },
];

const hashTargets: Record<string, number> = {
  "#projects": 1,
  "#story": 2,
  "#notebook": 3,
};

export function Landing() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [vp, setVp] = useState(() => ({ h: window.innerHeight, w: window.innerWidth }));
  const [active, setActive] = useState(0); // 0 = hero, 1..3 = sections
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const projectsReveal = useReveal();
  const storyReveal = useReveal();
  const notebookReveal = useReveal();

  // Coming back from a detail page: jump straight to the section the
  // visitor left from (/#projects, /#story, /#notebook) instead of the top.
  useLayoutEffect(() => {
    const target = hashTargets[hash];
    if (target == null) return;
    const jump = () =>
      sectionRefs.current[target]?.scrollIntoView({ behavior: "instant", block: "start" });
    // On full page loads the browser's async scroll restoration can fire
    // after our jump and drag the page back up — suppress it briefly.
    window.history.scrollRestoration = "manual";
    jump();
    requestAnimationFrame(jump);
    const restore = setTimeout(() => {
      window.history.scrollRestoration = "auto";
    }, 500);
    return () => clearTimeout(restore);
  }, [hash]);

  // Then strip the hash from the address bar (via the router, which owns
  // the URL) — otherwise reloading or re-opening the saved link lands
  // mid-page instead of on the hero.
  useEffect(() => {
    if (hashTargets[hash] != null) {
      navigate("/", { replace: true });
    }
  }, [hash, navigate]);

  useEffect(() => {
    const measure = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrollY(y);
      let idx = 0;
      sectionRefs.current.forEach((el, i) => {
        if (el && el.offsetTop <= y + vh * 0.45) idx = i;
      });
      setActive(idx);
      const max = document.documentElement.scrollHeight - vh;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        measure();
        ticking.current = false;
      });
    };
    const onResize = () => {
      setVp({ h: window.innerHeight, w: window.innerWidth });
      measure();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Snap to whole sections on desktop only — mobile sections can be taller
  // than the viewport, and mandatory snap would trap the content.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      document.documentElement.style.scrollSnapType = mq.matches ? "y mandatory" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.documentElement.style.scrollSnapType = "";
    };
  }, []);

  const gearRotation = scrollY * 0.12;
  const gantryVisible = scrollY > vp.h * 0.4;

  const goTo = (sectionIdx: number) =>
    sectionRefs.current[sectionIdx]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const navItems = navSections.map((s, i) => ({
    label: s.label,
    active: active === i + 1,
    onSelect: () => goTo(i + 1),
  }));

  const setRef = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div className="bg-background text-foreground">
      {/* Fixed backdrop */}
      <div className="glow-blue fixed inset-x-0 top-0 h-[70vh] pointer-events-none" aria-hidden />
      <div className="glow-amber fixed inset-0 pointer-events-none" aria-hidden />
      <div className="blueprint-grid fixed inset-0 pointer-events-none opacity-[0.35]" />

      {/* Wall-mounted arm nav — desktop; hidden on the hero so it never
          overlaps the headline, rides in on the first scroll */}
      <div
        className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-500"
        style={{ opacity: active > 0 ? 1 : 0, pointerEvents: active > 0 ? "auto" : "none" }}
      >
        <ArmNav items={navItems} />
      </div>

      {/* Gantry arm nav — mobile/tablet, rides in after the hero */}
      <div
        className="lg:hidden fixed top-4 inset-x-0 z-40 flex justify-center transition-opacity duration-300"
        style={{ opacity: gantryVisible ? 1 : 0, pointerEvents: gantryVisible ? "auto" : "none" }}
      >
        <div className="bg-background/85 backdrop-blur-sm border border-border px-3 pt-2 pb-1">
          <ArmNav orientation="horizontal" items={navItems} parked={active === 0} />
        </div>
      </div>

      {/* Fixed bottom bar */}
      <footer className="fixed bottom-0 inset-x-0 z-40 flex items-end justify-between px-5 md:px-8 pb-4 pointer-events-none">
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

      {/* ——— 00 · HERO ——— */}
      <section
        ref={setRef(0)}
        className="min-h-screen lg:h-screen flex items-center relative"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="w-full grid lg:grid-cols-[300px_1fr_300px] items-center gap-8 lg:gap-6 px-6 md:px-10 py-16 lg:py-0">
          <div className="text-center lg:text-left order-1">
            <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-4">
              Mechatronics / Systems / Storytelling
            </div>
            {/* Flag lives outside the gradient span — background-clip:text
                turns colour emoji into a dark silhouette */}
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05]">
              <span className="text-gradient">
                Hi, I'm
                <br className="hidden lg:block" /> Min.
              </span>{" "}
              🇲🇲
            </h1>
          </div>

          <div className="flex justify-center order-2">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-foreground/70 z-10" />
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-foreground/70 z-10" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-foreground/70 z-10" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-foreground/70 z-10" />
              <div className="w-64 md:w-72 lg:w-[19rem] aspect-[4/5] border border-border bg-card shadow-sm overflow-hidden relative group/photo">
                <div className="blueprint-grid absolute inset-0 opacity-[0.5] [--grid-size:24px] pointer-events-none" />
                <img
                  src="/profile.jpg"
                  alt="Min Thuta"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/profile.svg";
                  }}
                  className="w-full h-full object-cover object-[55%_45%] grayscale group-hover/photo:grayscale-0 transition-all duration-700"
                />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground tracking-widest bg-background/80 px-2 py-0.5 whitespace-nowrap">
                  FIG. 01 — OPERATOR
                </span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left order-3">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              I'm a mechatronics student bridging the gap between the math and the metal. I build
              hardware, write the control logic, film the process, and teach how systems work from
              the ground up.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground items-center lg:items-start">
              <span>— Mechatronics @ UTS Sydney</span>
              <span>— Engineering educator</span>
              <span>— Content creator</span>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 01 · PROJECTS ——— */}
      <section
        ref={setRef(1)}
        className="min-h-screen flex items-center"
        style={{ scrollSnapAlign: "start" }}
      >
        <div
          ref={projectsReveal.ref}
          className={`w-full max-w-5xl mx-auto px-6 md:px-10 pt-28 pb-20 lg:py-16 ${projectsReveal.className}`}
        >
          <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-3">
            01 — Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Builds, from idea to running hardware
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                to={`/projects/${project.id}`}
                key={project.id}
                className="group flex flex-col p-5 bg-card border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${statusStyles[project.status]}`}
                  >
                    {project.status}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
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

          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mt-6">
            Open a project for the build log — reels coming to Instagram
          </p>
        </div>
      </section>

      {/* ——— 02 · STORY ——— */}
      <section
        ref={setRef(2)}
        className="min-h-screen flex items-center"
        style={{ scrollSnapAlign: "start" }}
      >
        <div
          ref={storyReveal.ref}
          className={`w-full max-w-4xl mx-auto px-6 md:px-10 pt-28 pb-20 lg:py-16 ${storyReveal.className}`}
        >
          <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-3">
            02 — Story
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">How I got here</h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {chapters.map((chapter, i) => (
              <div key={chapter.title} className="flex gap-4">
                <span className="font-mono text-xs text-secondary font-semibold pt-0.5 w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-base mb-1">{chapter.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{chapter.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 03 · NOTEBOOK ——— */}
      <section
        ref={setRef(3)}
        className="min-h-screen flex items-center"
        style={{ scrollSnapAlign: "start" }}
      >
        <div
          ref={notebookReveal.ref}
          className={`w-full max-w-4xl mx-auto px-6 md:px-10 pt-28 pb-28 lg:py-16 ${notebookReveal.className}`}
        >
          <div className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase mb-3">
            03 — Engineering Notebook
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Concepts I keep coming back to
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {concepts.map((concept) => (
              <Link
                to={`/notebook/${concept.id}`}
                key={concept.id}
                className="group p-4 bg-card border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="flex items-start justify-between mb-2">
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

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Want to talk engineering, content, or a build?
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              {EMAIL} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
