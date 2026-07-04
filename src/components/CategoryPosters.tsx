/**
 * Full-bleed schematic posters for the landing filmstrip cards.
 * Drawn as SVG so they stay crisp, on-brand, and need no image assets —
 * swap for real photos/renders later by replacing the card contents.
 */

const ink = "var(--foreground)";
const faint = "var(--border)";
const dim = "var(--muted-foreground)";
const blue = "var(--primary)";
const amber = "var(--secondary)";
const mono = "var(--font-mono)";
const heading = "var(--font-heading)";

function Crosshair({ x, y, color = dim }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={1}>
      <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
      <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
      <circle cx={x} cy={y} r={3} fill="none" />
    </g>
  );
}

export function ProjectsPoster() {
  return (
    <svg viewBox="0 0 320 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <text x={22} y={96} fontSize={88} fontFamily={heading} fontWeight={700} fill="none" stroke={faint} strokeWidth={1.5}>
        01
      </text>

      {/* End-effector path with targets */}
      <path d="M 240 268 Q 288 190 236 118" fill="none" stroke={dim} strokeWidth={1} strokeDasharray="4 5" />
      <Crosshair x={240} y={268} />
      <Crosshair x={266} y={192} color={blue} />
      <Crosshair x={236} y={118} />

      {/* Ground + base */}
      <line x1={30} y1={338} x2={130} y2={338} stroke={ink} strokeWidth={2} />
      {[40, 58, 76, 94, 112].map((x) => (
        <line key={x} x1={x} y1={338} x2={x - 8} y2={348} stroke={dim} strokeWidth={1} />
      ))}
      <rect x={56} y={322} width={28} height={16} fill={ink} />

      {/* Arm linkage */}
      <line x1={70} y1={322} x2={148} y2={222} stroke={ink} strokeWidth={6} strokeLinecap="round" />
      <line x1={148} y1={222} x2={228} y2={186} stroke={ink} strokeWidth={4.5} strokeLinecap="round" />
      <circle cx={70} cy={322} r={8} fill="var(--card)" stroke={ink} strokeWidth={2.5} />
      <circle cx={148} cy={222} r={6.5} fill="var(--card)" stroke={ink} strokeWidth={2.5} />

      {/* Gripper reaching the blue target */}
      <g stroke={blue} strokeWidth={3} strokeLinecap="round" fill="none">
        <path d="M 228 186 L 250 178" />
        <path d="M 250 178 L 262 170 M 250 178 L 260 188" />
      </g>
      <circle cx={228} cy={186} r={4} fill={blue} />

      {/* Dimension line */}
      <line x1={70} y1={368} x2={228} y2={368} stroke={dim} strokeWidth={1} />
      <line x1={70} y1={363} x2={70} y2={373} stroke={dim} strokeWidth={1} />
      <line x1={228} y1={363} x2={228} y2={373} stroke={dim} strokeWidth={1} />
      <text x={149} y={384} fontSize={10} fontFamily={mono} fill={dim} textAnchor="middle">
        REACH 450mm
      </text>

      <text x={22} y={130} fontSize={10} fontFamily={mono} fill={dim} letterSpacing={2}>
        BUILD LOGS — ROBOTICS / DSP / MECHANICAL
      </text>
    </svg>
  );
}

export function StoryPoster() {
  return (
    <svg viewBox="0 0 320 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* Book spine */}
      <rect x={0} y={0} width={14} height={400} fill={ink} />
      <line x1={7} y1={10} x2={7} y2={390} stroke="var(--card)" strokeWidth={0.75} strokeDasharray="2 4" opacity={0.5} />

      {/* Cover frame — double rule */}
      <rect x={28} y={24} width={268} height={352} fill="none" stroke={ink} strokeWidth={1.5} />
      <rect x={36} y={32} width={252} height={336} fill="none" stroke={faint} strokeWidth={1} />

      {/* Corner protectors */}
      <path d="M 28 24 L 52 24 L 28 48 Z" fill={ink} />
      <path d="M 296 24 L 272 24 L 296 48 Z" fill={ink} />
      <path d="M 28 376 L 52 376 L 28 352 Z" fill={ink} />
      <path d="M 296 376 L 272 376 L 296 352 Z" fill={ink} />

      {/* Series label */}
      <text x={162} y={72} fontSize={10} fontFamily={mono} fill={dim} letterSpacing={3} textAnchor="middle">
        FIELD LOG — VOL. 02
      </text>
      <line x1={100} y1={86} x2={224} y2={86} stroke={dim} strokeWidth={1} />

      {/* Title */}
      <text x={162} y={158} fontSize={46} fontFamily={heading} fontWeight={700} fill={ink} textAnchor="middle" letterSpacing={1}>
        MY
      </text>
      <text x={162} y={206} fontSize={46} fontFamily={heading} fontWeight={700} fill={ink} textAnchor="middle" letterSpacing={1}>
        STORY
      </text>

      {/* Subtitle */}
      <line x1={100} y1={230} x2={224} y2={230} stroke={dim} strokeWidth={1} />
      <text x={162} y={250} fontSize={10} fontFamily={mono} fill={dim} letterSpacing={3} textAnchor="middle">
        SIX CHAPTERS
      </text>

      {/* Gear emblem */}
      <g transform="translate(162 302)">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={-2.5} y={-21} width={5} height={7} fill={amber} transform={`rotate(${i * 45})`} />
        ))}
        <circle r={15} fill="none" stroke={amber} strokeWidth={2} />
        <circle r={5} fill="none" stroke={amber} strokeWidth={1.5} />
      </g>

      {/* Author */}
      <text x={162} y={352} fontSize={11} fontFamily={mono} fontWeight={600} fill={ink} letterSpacing={3} textAnchor="middle">
        MIN THUTA
      </text>

      {/* Elastic band */}
      <rect x={262} y={0} width={7} height={400} fill={amber} opacity={0.75} />
    </svg>
  );
}

export function NotebookPoster() {
  // Two-cycle sine wave, hand-plotted
  const wave = "M 48 240 C 66 200 84 200 102 240 S 138 280 156 240 S 192 200 210 240 S 246 280 264 240";
  return (
    <svg viewBox="0 0 320 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* Ruled page */}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={0} y1={64 + i * 30} x2={320} y2={64 + i * 30} stroke={faint} strokeWidth={0.75} />
      ))}
      <line x1={40} y1={0} x2={40} y2={400} stroke={amber} strokeWidth={1} opacity={0.7} />

      <text x={52} y={96} fontSize={88} fontFamily={heading} fontWeight={700} fill="none" stroke={faint} strokeWidth={1.5}>
        03
      </text>

      {/* Fourier note */}
      <text x={52} y={158} fontSize={15} fontFamily={mono} fill={ink}>
        f(t) = Σ aₙ·sin(nωt)
      </text>
      <text x={52} y={178} fontSize={9.5} fontFamily={mono} fill={dim}>
        any signal is a sum of sines —
      </text>

      {/* Axis + wave */}
      <line x1={48} y1={240} x2={272} y2={240} stroke={dim} strokeWidth={1} />
      <path d={wave} fill="none" stroke={blue} strokeWidth={2.25} strokeLinecap="round" />
      {/* First harmonic, fainter */}
      <path d="M 48 240 C 84 172 120 172 156 240 S 228 308 264 240" fill="none" stroke={dim} strokeWidth={1.25} strokeDasharray="3 4" />

      {/* Period annotation */}
      <line x1={48} y1={296} x2={156} y2={296} stroke={dim} strokeWidth={1} />
      <line x1={48} y1={291} x2={48} y2={301} stroke={dim} strokeWidth={1} />
      <line x1={156} y1={291} x2={156} y2={301} stroke={dim} strokeWidth={1} />
      <text x={102} y={312} fontSize={10} fontFamily={mono} fill={dim} textAnchor="middle">
        T = 2π/ω
      </text>

      <text x={52} y={366} fontSize={10} fontFamily={mono} fill={dim} letterSpacing={2}>
        NOTEBOOK — 6 ENTRIES
      </text>
    </svg>
  );
}
