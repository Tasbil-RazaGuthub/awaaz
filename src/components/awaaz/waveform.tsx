"use client";

import { cn } from "@/lib/utils";

function seededHeights(seed: number, bars: number): number[] {
  // deterministic pseudo-random heights so SSR and client match
  const heights: number[] = [];
  let x = seed;
  for (let i = 0; i < bars; i++) {
    x = (x * 9301 + 49297) % 233280;
    heights.push(30 + ((x / 233280) * 60));
  }
  return heights;
}

interface WaveformProps {
  bars?: number;
  active?: boolean;
  seed?: number;
  className?: string;
  barClassName?: string;
  label?: string;
}

/**
 * Animated voice waveform. `active` plays the bars; idle bars stay static.
 */
export function Waveform({
  bars = 24,
  active = false,
  seed = 7,
  className,
  barClassName,
  label,
}: WaveformProps) {
  const heights = seededHeights(seed, bars);
  return (
    <div
      className={cn("flex items-center gap-[3px]", !active && "wave-paused", className)}
      role="img"
      aria-label={label ?? "voice waveform"}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn("wave-bar w-[3px] rounded-full bg-primary/80", barClassName)}
          style={{
            height: `${h}%`,
            animationDelay: `${(i % 7) * 0.12}s`,
            animationDuration: `${0.9 + ((i % 5) * 0.1)}s`,
          }}
        />
      ))}
    </div>
  );
}
