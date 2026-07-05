import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

const EMAIL = "minthuta0703@gmail.com";

/** Shared chrome for project/concept detail pages: backdrop + footer. */
export function DetailLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <div className="glow-blue fixed inset-x-0 top-0 h-[70vh] pointer-events-none z-0" aria-hidden />
      <div className="glow-amber fixed inset-0 pointer-events-none z-0" aria-hidden />
      <div className="blueprint-grid fixed inset-0 pointer-events-none opacity-[0.35] z-0" />

      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-border/60 mt-16">
        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Min Thuta — Sydney, Australia
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            {EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}
