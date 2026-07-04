import { Outlet, Link, useLocation } from "react-router";
import { useEffect } from "react";

const EMAIL = "minthuta0703@gmail.com";

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Background blueprint grid pattern */}
      <div className="blueprint-grid fixed inset-0 pointer-events-none opacity-[0.35] z-0" />
      {/* Soft radial glow behind the hero */}
      <div
        className="fixed inset-x-0 top-0 h-[60vh] pointer-events-none z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, color-mix(in srgb, var(--primary) 12%, transparent), transparent)",
        }}
      />

      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center text-background font-mono font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              M
            </div>
            <span className="font-bold tracking-tight font-heading">Min Thuta</span>
            <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground uppercase tracking-widest border border-border px-1.5 py-0.5 ml-2">
              MECHATRONICS
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="hidden md:inline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm font-medium font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="hidden sm:inline">{EMAIL}</span>
              <span className="sm:hidden">Contact</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-border/60 mt-12">
        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Min Thuta — Sydney, Australia
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
            33.88°S / 151.20°E — Engineering Without Lanes
          </p>
        </div>
      </footer>
    </div>
  );
}
