import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { TeacherMock } from "./Mocks";

/** Two small floating cards beside the dashboard preview. Sample data only. */
function Floater({ className, motion, delay = 0, children }: { className?: string; motion: "a" | "c"; delay?: number; children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className={cn("absolute z-10", className)}>
      <div className={cn("drift", `drift-${motion}`, "rounded-2xl border border-line bg-surface shadow-lg")} style={{ ["--d" as string]: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}

function IconTile({ icon }: { icon: IconName }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mint text-on-mint">
      <Icon name={icon} size={16} />
    </span>
  );
}

export function HeroCards() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none lg:py-10 lg:pl-6">
      <span aria-hidden="true" className="absolute -right-6 top-0 h-44 w-44 rounded-full bg-mint/60 sm:h-56 sm:w-56" />

      <div className="relative"><TeacherMock /></div>

      {/* attendance */}
      <Floater motion="a" className="-top-2 right-4 hidden w-44 sm:block lg:-top-4 lg:-right-2">
        <div className="p-3">
          <p className="text-[0.6875rem] font-semibold text-muted">Attendance today</p>
          <p className="mt-0.5 text-h4 font-extrabold leading-tight text-ink">96%</p>
          <div className="mt-2 flex h-8 items-end gap-1">
            {[55, 70, 60, 85, 75, 95, 88].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-brand" style={{ height: `${h}%`, opacity: 0.4 + i * 0.09 }} />
            ))}
          </div>
        </div>
      </Floater>

      {/* result saved */}
      <Floater motion="c" delay={-4} className="-bottom-8 -left-4 hidden sm:block lg:-left-8">
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <IconTile icon="checkCircle" />
          <div>
            <p className="text-[0.75rem] font-bold text-ink">Result saved</p>
            <p className="text-[0.6875rem] text-muted">Priya Sharma · Maths 90/100</p>
          </div>
        </div>
      </Floater>
    </div>
  );
}
