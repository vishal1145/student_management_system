import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type FeatureProps = { icon: IconName; title: string; text: string; className?: string; delay?: number; index?: number; children?: ReactNode };

function Feature({ icon, title, text, className, delay = 0, index = 0, children }: FeatureProps) {
  return (
    <article className={cn("reveal-item card card-interactive group flex flex-col gap-4", className)} style={{ ["--i" as string]: index }}>
      <span
        className="bob flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110"
        style={{ ["--d" as string]: `${delay}s` }}
      >
        <Icon name={icon} size={22} />
      </span>
      <div>
        <h3 className="text-h4">{title}</h3>
        <p className="mt-1 text-label text-muted">{text}</p>
      </div>
      {children && <div aria-hidden="true" className="mt-auto pt-2">{children}</div>}
    </article>
  );
}

/** Small roster preview so the wide "Student records" card feels alive, not empty. */
function RosterPreview() {
  const rows = [
    { initials: "AP", name: "Aarav Patel", meta: "Class 9", tag: "Active", tone: "mint" as const },
    { initials: "AI", name: "Ananya Iyer", meta: "Class 8", tag: "Active", tone: "mint" as const },
    { initials: "DR", name: "Diya Reddy", meta: "Class 10", tag: "Pending", tone: "warn" as const },
  ];
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line bg-paper p-2">
      {rows.map((r, i) => (
        <div key={r.name} className="fade-up flex items-center gap-3 rounded-lg px-2 py-1.5" style={{ ["--d" as string]: `${0.1 + i * 0.08}s` }}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-caption font-bold text-brand">{r.initials}</span>
          <span className="min-w-0 flex-1 truncate text-label font-semibold text-ink">{r.name}</span>
          <span className="hidden text-caption text-faint sm:block">{r.meta}</span>
          <span className={cn("rounded-full px-2.5 py-0.5 text-caption font-bold", r.tone === "mint" ? "bg-mint text-on-mint" : "bg-warning-soft text-warning")}>{r.tag}</span>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="section scroll-mt-20 border-y border-line bg-surface">
      <div className="container-page flex flex-col gap-10">
        <div className="reveal max-w-2xl">
          <p className="eyebrow mb-3">Features</p>
          <h2>Everything a school office needs, nothing it does not</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Feature icon="users" title="Student records" text="Name, class, guardian, contact and status for every student, editable in seconds." className="md:col-span-2" delay={0} index={0}>
            <RosterPreview />
          </Feature>
          <Feature icon="chart" title="Results and marks" text="Record marks per subject and term. Averages update on their own." delay={0.3} index={1}>
            <div className="flex h-20 items-end gap-1.5">
              {[45, 70, 55, 90, 65, 80].map((height, index) => (
                <span key={index} className="bar-loop flex-1 rounded-md bg-brand" style={{ height: `${height}%`, opacity: 0.45 + index * 0.1, ["--d" as string]: `${index * 0.12}s` }} />
              ))}
            </div>
          </Feature>
          <Feature icon="clipboard" title="Teacher approvals" text="New teachers wait for an admin to approve them before they can sign in." delay={0.6} index={2}>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-1.5 text-caption font-bold text-on-brand"><Icon name="check" size={13} /> Approve</span>
              <span className="inline-flex rounded-lg border border-line px-3.5 py-1.5 text-caption font-bold text-muted">Pending</span>
            </div>
          </Feature>
          <Feature icon="search" title="Search and filters" text="Find a student by name, email or ID, and narrow by class or status." delay={0.9} index={3}>
            <div className="scan flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 text-caption text-faint"><Icon name="search" size={14} /> Search name, email or ID</div>
          </Feature>
          <Feature icon="shield" title="Secure by design" text="Hashed passwords, signed sessions and a role check on every single request." delay={1.2} index={4}>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-sunken px-2.5 py-1 text-caption font-bold text-ink"><Icon name="lock" size={13} className="text-brand" /> 401 Unauthorized</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-sunken px-2.5 py-1 text-caption font-bold text-ink"><Icon name="shield" size={13} className="text-brand" /> 403 Forbidden</span>
            </div>
          </Feature>
        </div>
      </div>
    </section>
  );
}
