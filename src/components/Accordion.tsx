import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface AccordionItemProps {
  title: string;
  label?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Zero-dependency accordion using native <details>. Accessible by default,
 * keyboard-friendly, works without JS.
 */
export function AccordionItem({ title, label, defaultOpen, children }: AccordionItemProps) {
  return (
    <details
      className="acc group border border-border bg-card transition-colors hover:border-primary/30"
      open={defaultOpen}
    >
      <summary className="flex items-center gap-4 px-5 py-4 select-none">
        <ChevronRight className="acc-chev w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 hidden sm:inline">
            {label}
          </span>
        )}
        <span className="font-heading font-bold text-base md:text-lg">{title}</span>
      </summary>
      <div className="px-5 pb-5 pt-1 pl-13 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </details>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
