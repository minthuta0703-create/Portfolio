import { Outlet, NavLink, Link, useLocation } from "react-router";
import { useEffect } from "react";

const EMAIL = "minthuta0703@gmail.com";

const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/story", label: "Story" },
  { to: "/notebook", label: "Notebook" },
];

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

      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-16 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center text-background font-mono font-bold text-lg group-hover:bg-primary transition-colors">
              M
            </div>
            <span className="font-bold tracking-tight font-heading">Min Thuta</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2 text-sm">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "px-2 sm:px-3 py-1.5 font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="hidden md:inline ml-2 text-sm font-medium font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              {EMAIL}
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-border/60 mt-16">
        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Min Thuta — Sydney, Australia
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
            Engineering Without Lanes
          </p>
        </div>
      </footer>
    </div>
  );
}
