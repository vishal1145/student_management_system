import { EduBackdrop } from "@/components/effects/EduBackdrop";
import { cn } from "@/lib/cn";

type Card = { name: string; detail: string; score: number; tag: string };

const CARDS: Card[] = [
  { name: "Aarav Patel", detail: "Class 9 · Mathematics", score: 91, tag: "Distinction" },
  { name: "Ananya Iyer", detail: "Class 8 · English", score: 88, tag: "Distinction" },
  { name: "Diya Reddy", detail: "Class 10 · Science", score: 79, tag: "Merit" },
  { name: "Kabir Shah", detail: "Class 7 · History", score: 84, tag: "Merit" },
  { name: "Meera Nair", detail: "Class 9 · Geography", score: 93, tag: "Distinction" },
  { name: "Rohan Gupta", detail: "Class 6 · Computer", score: 76, tag: "Merit" },
];

function ResultCard({ card, rank }: { card: Card; rank: number }) {
  return (
    <div className="w-64 shrink-0 rounded-3xl border border-line bg-surface p-5 text-center shadow-md">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-h4 font-extrabold text-on-mint shadow-inner">{card.score}%</span>
      <p className="mt-3 text-h4 font-bold text-ink">{card.name}</p>
      <p className="text-caption text-muted">{card.detail}</p>
      <span className="mt-3 inline-flex rounded-full border border-line px-3 py-0.5 text-caption font-bold uppercase tracking-wider text-brand">{card.tag}</span>
      <span className="sr-only">Rank {rank}</span>
    </div>
  );
}

function Lane({ reverse, back, offset }: { reverse?: boolean; back?: boolean; offset: number }) {
  const list = [...CARDS.slice(offset), ...CARDS.slice(0, offset)];
  return (
    <div className={cn("wall-lane", back && "wall-back")} aria-hidden={back || undefined}>
      <div className={cn("wall-track", reverse && "wall-reverse")}>
        {[0, 1].flatMap((copy) => list.map((card, i) => (
          <div key={`${copy}-${i}`} className={cn(i % 2 ? "translate-y-4 -rotate-2" : "rotate-2")}>
            <ResultCard card={card} rank={i + 1} />
          </div>
        )))}
      </div>
    </div>
  );
}

/** Two tilted lanes of result cards drifting in opposite directions; the back lane is smaller and softly blurred for depth. */
export function ResultsWall() {
  return (
    <section aria-label="Sample student result cards" className="relative overflow-clip border-y border-line bg-paper py-16 md:py-24">
      <EduBackdrop count={4} />
      <div className="container-page relative z-10 mb-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Results</p>
          <h2>Every student&apos;s marks, always one glance away</h2>
        </div>
      </div>
      <div className="wall relative z-10">
        <Lane back offset={2} />
        <Lane reverse offset={0} />
      </div>
    </section>
  );
}
