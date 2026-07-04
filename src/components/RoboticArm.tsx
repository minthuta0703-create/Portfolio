import { useEffect, useRef, useState } from "react";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const deg = (rad: number) => (rad * 180) / Math.PI;

/** Standard two-link inverse kinematics (elbow-up). */
function solveIK(dx: number, dy: number, l1: number, l2: number) {
  const dist = clamp(Math.hypot(dx, dy), Math.abs(l1 - l2) + 1, l1 + l2 - 1);
  const base = Math.atan2(dy, dx);
  const cosShoulder = clamp((l1 * l1 + dist * dist - l2 * l2) / (2 * l1 * dist), -1, 1);
  const cosElbow = clamp((l1 * l1 + l2 * l2 - dist * dist) / (2 * l1 * l2), -1, 1);
  return {
    shoulder: base - Math.acos(cosShoulder),
    elbow: Math.PI - Math.acos(cosElbow),
  };
}

interface RoboticArmProps {
  /** Index of the list row to reach for; -1 parks the arm. */
  targetIndex: number;
  rows: number;
  rowHeight: number;
  width?: number;
}

const L1 = 64;
const L2 = 56;

/**
 * Wall-mounted 2-link arm that reaches toward a vertical list row.
 * Angles are smoothed each frame so the arm glides between targets.
 */
export function RoboticArm({ targetIndex, rows, rowHeight, width = 96 }: RoboticArmProps) {
  const height = rows * rowHeight;
  const baseX = 10;
  const baseY = height / 2;

  const target =
    targetIndex >= 0
      ? { x: width - 8, y: targetIndex * rowHeight + rowHeight / 2 }
      : { x: baseX + 30, y: baseY - (L1 + L2) * 0.55 };

  const goal = solveIK(target.x - baseX, target.y - baseY, L1, L2);
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
      className="text-muted-foreground overflow-visible shrink-0"
      aria-hidden
    >
      {/* Base mount */}
      <rect x={baseX - 7} y={baseY - 10} width={8} height={20} fill="none" stroke="currentColor" />
      <circle cx={baseX} cy={baseY} r={5.5} fill="var(--background)" stroke="currentColor" strokeWidth={1.5} />

      <g transform={`translate(${baseX} ${baseY}) rotate(${deg(angles.shoulder)})`}>
        <line x1={0} y1={0} x2={L1} y2={0} stroke="currentColor" strokeWidth={2.5} />
        <line x1={6} y1={0} x2={L1 - 6} y2={0} stroke="var(--background)" strokeWidth={0.75} strokeDasharray="3 3" />
        <circle cx={0} cy={0} r={3} fill="currentColor" />

        <g transform={`translate(${L1} 0) rotate(${deg(angles.elbow)})`}>
          <circle cx={0} cy={0} r={4.5} fill="var(--background)" stroke="currentColor" strokeWidth={1.5} />
          <line x1={0} y1={0} x2={L2 - 8} y2={0} stroke="currentColor" strokeWidth={2} />
          <g transform={`translate(${L2 - 8} 0)`} className="text-primary">
            <circle cx={0} cy={0} r={2.5} fill="currentColor" />
            <path d="M 1 -1.5 L 8 -5 M 1 1.5 L 8 5" stroke="currentColor" strokeWidth={1.75} fill="none" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}

interface GantryArmProps {
  /** Index of the column to reach for; -1 parks in the middle. */
  targetIndex: number;
  cols: number;
  colWidth: number;
}

const GL1 = 20;
const GL2 = 16;
const G_H = 50;

/**
 * Horizontal variant: a carriage slides along a linear rail and a small
 * 2-link arm on top reaches up to the active column — same IK, gantry form.
 */
export function GantryArm({ targetIndex, cols, colWidth }: GantryArmProps) {
  const W = cols * colWidth;
  const railY = 42;
  const shoulderY = railY - 9;
  const targetX = targetIndex >= 0 ? targetIndex * colWidth + colWidth / 2 : W / 2;
  const targetY = 7;

  const [pose, setPose] = useState(() => ({
    cx: targetX,
    ...solveIK(0, targetY - shoulderY, GL1, GL2),
  }));
  const poseRef = useRef(pose);
  poseRef.current = pose;
  const targetRef = useRef(targetX);
  targetRef.current = targetX;

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const cur = poseRef.current;
      const tx = targetRef.current;
      const cx = cur.cx + (tx - cur.cx) * 0.14;
      // Arm always solves toward the real target from wherever the
      // carriage currently is, so it leans into the motion.
      const goal = solveIK(tx - cx, targetY - shoulderY, GL1, GL2);
      const next = {
        cx,
        shoulder: cur.shoulder + (goal.shoulder - cur.shoulder) * 0.2,
        elbow: cur.elbow + (goal.elbow - cur.elbow) * 0.2,
      };
      const done =
        Math.abs(tx - cx) < 0.4 &&
        Math.abs(next.shoulder - goal.shoulder) < 0.002 &&
        Math.abs(next.elbow - goal.elbow) < 0.002;
      setPose(done ? { cx: tx, ...goal } : next);
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetX]);

  return (
    <svg
      width={W}
      height={G_H}
      viewBox={`0 0 ${W} ${G_H}`}
      className="text-muted-foreground overflow-visible"
      aria-hidden
    >
      {/* Rail + end stops */}
      <line x1={4} y1={railY} x2={W - 4} y2={railY} stroke="currentColor" strokeWidth={2} />
      <line x1={4} y1={railY + 4} x2={W - 4} y2={railY + 4} stroke="currentColor" strokeWidth={0.75} strokeDasharray="2 4" />
      <rect x={2} y={railY - 5} width={4} height={10} fill="currentColor" />
      <rect x={W - 6} y={railY - 5} width={4} height={10} fill="currentColor" />

      {/* Carriage */}
      <g transform={`translate(${pose.cx} 0)`}>
        <rect x={-10} y={railY - 8} width={20} height={8} fill="var(--background)" stroke="currentColor" strokeWidth={1.5} />
        <circle cx={-5} cy={railY + 1} r={2.25} fill="currentColor" />
        <circle cx={5} cy={railY + 1} r={2.25} fill="currentColor" />

        {/* Mini arm */}
        <g transform={`translate(0 ${shoulderY}) rotate(${deg(pose.shoulder)})`}>
          <line x1={0} y1={0} x2={GL1} y2={0} stroke="currentColor" strokeWidth={2.25} />
          <circle cx={0} cy={0} r={2.5} fill="currentColor" />
          <g transform={`translate(${GL1} 0) rotate(${deg(pose.elbow)})`}>
            <circle cx={0} cy={0} r={2.75} fill="var(--background)" stroke="currentColor" strokeWidth={1.25} />
            <line x1={0} y1={0} x2={GL2 - 5} y2={0} stroke="currentColor" strokeWidth={1.75} />
            <g transform={`translate(${GL2 - 5} 0)`} className="text-primary">
              <circle cx={0} cy={0} r={1.75} fill="currentColor" />
              <path d="M 0.5 -1 L 5.5 -3.5 M 0.5 1 L 5.5 3.5" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
