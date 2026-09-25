import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Piece = { icon: IconName; x: string; y: string; size: number; dx: number; dy: number; r: number; dur: number; delay: number; o?: number };

/** Positions are percentages so the pattern scales with the section. */
const PIECES: Piece[] = [
  { icon: "book", x: "3%", y: "68%", size: 40, dx: 16, dy: -22, r: -12, dur: 19, delay: 0 },
  { icon: "pencil", x: "49%", y: "84%", size: 32, dx: -14, dy: -20, r: 20, dur: 22, delay: -4 },
  { icon: "cap", x: "46%", y: "6%", size: 42, dx: 14, dy: 20, r: -6, dur: 24, delay: -8 },
  { icon: "star", x: "60%", y: "88%", size: 24, dx: 16, dy: -14, r: 10, dur: 17, delay: -3, o: 0.3 },
  { icon: "atom", x: "91%", y: "7%", size: 40, dx: -16, dy: 18, r: 0, dur: 26, delay: -11 },
  { icon: "calculator", x: "94%", y: "80%", size: 34, dx: -12, dy: -22, r: 8, dur: 21, delay: -6 },
  { icon: "ruler", x: "4%", y: "88%", size: 30, dx: 14, dy: 12, r: -20, dur: 23, delay: -9, o: 0.18 },
  { icon: "award", x: "52%", y: "46%", size: 28, dx: 10, dy: -16, r: 6, dur: 20, delay: -2, o: 0.14 },
  { icon: "star", x: "8%", y: "6%", size: 20, dx: 12, dy: -12, r: 0, dur: 15, delay: -5, o: 0.3 },
  { icon: "pencil", x: "96%", y: "44%", size: 28, dx: -12, dy: 14, r: 32, dur: 25, delay: -12, o: 0.16 },
];

type EduBackdropProps = {
  /** "dark" is for orange gradient panels (white icons), "light" for normal pages (orange icons). */
  tone?: "light" | "dark";
  /** Fewer icons for small areas such as dashboard banners. */
  count?: number;
  /** Adds two slow, soft colour blobs behind the icons. */
  blobs?: boolean;
  className?: string;
};

/** Decorative only: drifting school icons + optional soft blobs. Hidden from screen readers. */
export function EduBackdrop({ tone = "light", count = PIECES.length, blobs = true, className }: EduBackdropProps) {
  const dark = tone === "dark";
  return (
    <div aria-hidden="true" className={cn("edu-layer", className)}>
      {blobs && (
        <>
          <span
            className="blob -left-24 -top-24 h-80 w-80"
            style={{ background: dark ? "#fb923c" : "var(--mint)", opacity: dark ? 0.35 : 0.5, ["--bx" as string]: "60px", ["--by" as string]: "40px" } as CSSProperties}
          />
          <span
            className="blob -bottom-32 right-0 h-96 w-96"
            style={{ background: dark ? "#9a3412" : "var(--brand)", opacity: dark ? 0.5 : 0.1, ["--bx" as string]: "-50px", ["--by" as string]: "-40px", animationDelay: "-7s" } as CSSProperties}
          />
        </>
      )}
      {PIECES.slice(0, count).map((piece, index) => (
        <span
          key={index}
          className="edu-icon"
          style={{
            ["--x" as string]: piece.x,
            ["--y" as string]: piece.y,
            ["--dx" as string]: `${piece.dx}px`,
            ["--dy" as string]: `${piece.dy}px`,
            ["--r" as string]: `${piece.r}deg`,
            ["--dur" as string]: `${piece.dur}s`,
            ["--delay" as string]: `${piece.delay}s`,
            ["--o" as string]: dark ? (piece.o ?? 0.22) * 0.75 : piece.o ?? 0.22,
            ["--edu-color" as string]: dark ? "#ffffff" : "var(--brand)",
          } as CSSProperties}
        >
          <Icon name={piece.icon} size={piece.size} strokeWidth={1.4} />
        </span>
      ))}
    </div>
  );
}
