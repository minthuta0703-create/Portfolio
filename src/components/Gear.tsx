interface GearProps {
  size: number;
  rotation: number;
  teeth?: number;
  className?: string;
}

/** Schematic SVG gear. Rotation is driven externally (scroll-linked). */
export function Gear({ size, rotation, teeth = 10, className }: GearProps) {
  const step = 360 / teeth;
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden
    >
      {Array.from({ length: teeth }, (_, i) => (
        <rect
          key={i}
          x={-5.5}
          y={-48}
          width={11}
          height={16}
          rx={1.5}
          fill="currentColor"
          transform={`rotate(${i * step})`}
        />
      ))}
      <circle r={36} fill="currentColor" />
      <circle r={26} fill="var(--background)" />
      <circle r={7} fill="currentColor" />
      {Array.from({ length: 4 }, (_, i) => (
        <rect
          key={i}
          x={-2.5}
          y={-27}
          width={5}
          height={20}
          fill="currentColor"
          transform={`rotate(${i * 90 + 45})`}
        />
      ))}
    </svg>
  );
}
