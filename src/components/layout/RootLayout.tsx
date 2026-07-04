import { Outlet, Link } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white flex flex-col">
      {/* Background blueprint grid pattern */}
      <div className="blueprint-grid fixed inset-0 pointer-events-none opacity-[0.15] z-0" />

      <header className="w-full relative z-10 p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center text-background font-mono font-bold text-lg group-hover:bg-primary transition-colors">
            M
          </div>
          <span className="font-bold tracking-tight font-heading">Min Thuta</span>
        </Link>
        <a
          href="mailto:contact@example.com"
          className="text-sm font-medium font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          contact@example.com
        </a>
      </header>

      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      <footer className="py-8 mt-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Min Thuta
          </p>
        </div>
      </footer>
    </div>
  );
}
