import { RoboticArm, GantryArm } from "./RoboticArm";

export interface ArmNavItem {
  label: string;
  active: boolean;
  onSelect: () => void;
}

interface ArmNavProps {
  items: ArmNavItem[];
  orientation?: "vertical" | "horizontal";
  /** Park the arm (no active target) — used on the landing hero. */
  parked?: boolean;
  colWidth?: number;
  className?: string;
}

/**
 * The site's signature navigation: a schematic robotic arm that reaches
 * for the active section. Vertical = wall-mounted arm beside a list;
 * horizontal = gantry carriage sliding under a label row.
 */
export function ArmNav({
  items,
  orientation = "vertical",
  parked = false,
  colWidth = 78,
  className = "",
}: ArmNavProps) {
  const activeIndex = parked ? -1 : items.findIndex((i) => i.active);

  if (orientation === "vertical") {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <RoboticArm targetIndex={activeIndex} rows={items.length} rowHeight={48} />
        <ul>
          {items.map((item, i) => (
            <li key={item.label} style={{ height: 48 }} className="flex items-center">
              <button
                onClick={item.onSelect}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary text-left whitespace-nowrap ${
                  i === activeIndex ? "text-foreground translate-x-1" : "text-muted-foreground/50"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={item.onSelect}
            style={{ width: colWidth }}
            className={`font-mono text-[10px] uppercase tracking-wider text-center pb-1 transition-colors ${
              i === activeIndex
                ? "text-foreground font-semibold"
                : "text-muted-foreground/60 hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <GantryArm targetIndex={activeIndex} cols={items.length} colWidth={colWidth} />
    </div>
  );
}
