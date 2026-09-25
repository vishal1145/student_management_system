import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { IdCard, TeacherMock } from "./Mocks";

/** Small floating cards around the dashboard preview. Sample data only. Each drifts on its own path. */
function Floater({ className, motion, delay = 0, children }: { className?: string; motion: "a" | "b" | "c"; delay?: number; children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className={cn("absolute z-10", className)}>
      <div className={cn("drift", `drift-${motion}`, "rounded-2xl border border-line bg-surface shadow-lg")} style={{ ["--d" as string]: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}

function IconTile({ icon, tone = "mint" }: { icon: IconName; tone?: "mint" | "brand" }) {
  return (
    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", tone === "mint" ? "bg-mint text-on-mint" : "bg-brand text-on-brand")}>
      <Icon name={icon} size={18} />
    </span>
  );
}

export function HeroCards() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none lg:py-10 lg:pl-6">
      <span aria-hidden="true" className="absolute -right-6 top-0 h-44 w-44 rounded-full bg-mint sm:h-56 sm:w-56" />
      <svg aria-hidden="true" viewBox="0 0 200 200" className="ring-spin absolute -left-4 top-2 hidden h-40 w-40 text-brand/40 sm:block">
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 9" />
        <circle cx="100" cy="4" r="6" fill="currentColor" />
      </svg>

      <div className="relative"><TeacherMock /></div>

      {/* attendance */}
      <Floater motion="a" className="-top-2 right-4 hidden w-52 sm:block lg:-top-4 lg:-right-2">
        <div className="p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-caption font-semibold text-muted">Attendance today</p>
            <span className="pulse-dot h-2 w-2 rounded-full bg-mint" />
          </div>
          <p className="mt-0.5 text-h3 font-extrabold leading-tight text-ink">96%</p>
          <div className="mt-2 flex h-8 items-end gap-1">
            {[55, 70, 60, 85, 75, 95, 88].map((h, i) => (
              <span key={i} className="bar-loop flex-1 rounded-sm bg-brand" style={{ height: `${h}%`, opacity: 0.4 + i * 0.09, ["--d" as string]: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </Floater>

      {/* top performer */}
      <Floater motion="b" delay={-2} className="-left-10 -top-1 hidden w-56 xl:block">
        <div className="flex items-center gap-3 p-3.5">
          <IconTile icon="award" tone="brand" />
          <div>
            <p className="text-label font-bold text-ink">Top of Class 9</p>
            <p className="text-caption text-muted">Meera Nair · 93%</p>
          </div>
        </div>
      </Floater>

      {/* result saved */}
      <Floater motion="c" delay={-4} className="-bottom-8 -left-4 hidden sm:block lg:-left-8">
        <div className="flex items-center gap-3 px-4 py-3">
          <IconTile icon="checkCircle" />
          <div>
            <p className="text-label font-bold text-ink">Result saved</p>
            <p className="text-caption text-muted">Priya Sharma · Maths 90/100</p>
          </div>
        </div>
      </Floater>

      {/* teacher approved */}
      <Floater motion="b" delay={-1} className="-right-8 top-[46%] hidden w-56 xl:block">
        <div className="flex items-center gap-3 p-3.5">
          <IconTile icon="users" />
          <div>
            <p className="text-label font-bold text-ink">Teacher approved</p>
            <p className="text-caption text-muted">Neha Rao can now log in</p>
          </div>
        </div>
      </Floater>

      {/* id card */}
      <div aria-hidden="true" className="absolute -bottom-14 -right-4 z-10 hidden xl:block">
        <div className="drift drift-a" style={{ ["--d" as string]: "-3s" }}><IdCard name="Priya Sharma" tilt={5} /></div>
      </div>
    </div>
  );
}
