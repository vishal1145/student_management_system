"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = { value: number; duration?: number; suffix?: string };

/** Counts a whole number up from 0 when it scrolls into view. Skips the animation for reduced-motion users. */
export function CountUp({ value, duration = 1100, suffix = "" }: CountUpProps) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = reduce ? 1 : Math.min(1, (now - start) / duration);
        setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { observer.disconnect(); run(); }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);

  return <span ref={ref}>{shown}{suffix}</span>;
}
