import { Outlet, Link, useLocation } from "react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const EMAIL = "minthuta0703@gmail.com";

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col relative">
      {/* Ambient gradient patches */}
      <div className="glow-blue fixed inset-x-0 top-0 h-[70vh] pointer-events-none z-0" aria-hidden />
      <div className="glow-amber fixed inset-0 pointer-events-none z-0" aria-hidden />
      {/* Blueprint grid */}
      <div className="blueprint-grid fixed inset-0 pointer-events-none opacity-[0.35] z-0" />

      {/* Floating back-out button — returns to the landing deck */}
      <Link
        to="/"
        aria-label="Back to home"
        className="fixed top-5 left-5 z-50 inline-flex items-center gap-2 h-10 px-4 bg-card/90 backdrop-blur-sm border border-border font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground hover:border-primary/50 hover:-translate-x-0.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </Link>

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
