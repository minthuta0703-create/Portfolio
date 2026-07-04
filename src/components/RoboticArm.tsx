import { useEffect, useRef, useState } from "react";

interface RoboticArmProps {
  /** Index of the list row to reach for; -1 parks the arm. */
  targetIndex: number;
  rows: number;
  rowHeight: number;
  width?: number;
}

const L1 = 64;
const L2 = 56;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const deg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Schematic 2-link robotic arm that reaches toward a list row using real
 * two-link inverse kinematics. Angles are smoothed each frame so the arm
 * glides between targets instead of snapping.
 */
function solveIK(dx: number, dy: number) {
  const dist = clamp(Math.hypot(dx, dy), Math.abs(L1 - L2) + 1, L1 + L2 - 1);
  const base = Math.atan2(dy, dx);
  const cosShoulder = clamp((L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist), -1, 1);
  const cosElbow = clamp((L1 * L1 + L2 * L2 - dist * dist) / (2 * L1 * L2), -1, 1);
  return {
    shoulder: base - Math.acos(cosShoulder),
    elbow: Math.PI - Math.acos(cosElbow),
  };
}

export function RoboticArm({ targetIndex, rows, rowHeight, width = 96 }: RoboticArmProps) {
  const height = rows * rowHeight;
  const baseX = 10;
  const baseY = height / 2;

  // Park position: gripper tucked up near the base.
  const target =
    targetIndex >= 0
      ? { x: width - 8, y: targetIndex * rowHeight + rowHeight / 2 }
      : { x: baseX + 30, y: baseY - (L1 + L2) * 0.55 };

  const goal = solveIK(target.x - baseX, target.y - baseY);
  const [angles, setAngles] = useState(goal);
  const anglesRef = useRef(angles);
  anglesRef.current = angles;
  const goalRef = useRef(goal);
  goalRef.current = goal;

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const cur = anglesRef.current;
      const g = goalRef.current;
      const next = {
        shoulder: cur.shoulder + (g.shoulder - cur.shoulder) * 0.12,
        elbow: cur.elbow + (g.elbow - cur.elbow) * 0.12,
      };
      const done =
        Math.abs(next.shoulder - g.shoulder) < 0.002 && Math.abs(next.elbow - g.elbow) < 0.002;
      setAngles(done ? g : next);
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetIndex, rows, rowHeight]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="text-muted-foreground overflow-visible"
      aria-hidden
    >
      {/* Base mount */}
      <rect x={baseX - 7} y={baseY - 10} width={8} height={20} fill="none" stroke="currentColor" />
      <circle cx={baseX} cy={baseY} r={5.5} fill="var(--background)" stroke="currentColor" strokeWidth={1.5} />

      <g transform={`translate(${baseX} ${baseY}) rotate(${deg(angles.shoulder)})`}>
        {/* Upper arm */}
        <line x1={0} y1={0} x2={L1} y2={0} stroke="currentColor" strokeWidth={2.5} />
        <line x1={6} y1={0} x2={L1 - 6} y2={0} stroke="var(--background)" strokeWidth={0.75} strokeDasharray="3 3" />
        <circle cx={0} cy={0} r={3} fill="currentColor" />

        <g transform={`translate(${L1} 0) rotate(${deg(angles.elbow)})`}>
          {/* Elbow joint */}
          <circle cx={0} cy={0} r={4.5} fill="var(--background)" stroke="currentColor" strokeWidth={1.5} />
          {/* Forearm */}
          <line x1={0} y1={0} x2={L2 - 8} y2={0} stroke="currentColor" strokeWidth={2} />

          {/* Gripper */}
          <g transform={`translate(${L2 - 8} 0)`} className="text-primary">
            <circle cx={0} cy={0} r={2.5} fill="currentColor" />
            <path d="M 1 -1.5 L 8 -5 M 1 1.5 L 8 5" stroke="currentColor" strokeWidth={1.75} fill="none" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}
