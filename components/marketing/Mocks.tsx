import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

/** Small product previews used on the landing page. Sample data only, hidden from screen readers. */
export function MockWindow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
      <div className="flex items-center gap-2 border-b border-line bg-sunken px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-3 rounded-md bg-surface px-2.5 py-0.5 text-caption font-semibold text-muted">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={accent ? "rounded-xl bg-brand p-3 text-on-brand" : "rounded-xl bg-sunken p-3"}>
      <p className={accent ? "text-caption font-medium opacity-80" : "text-caption font-medium text-muted"}>{label}</p>
      <p className="text-h3 font-extrabold leading-tight">{value}</p>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-caption font-bold text-brand">
      {name.split(" ").map((part) => part[0]).join("")}
    </span>
  );
}

function Pill({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "mint" | "muted" }) {
  const styles = { brand: "bg-brand-soft text-brand", mint: "bg-mint text-on-mint", muted: "bg-sunken text-muted" };
  return <span className={`rounded-full px-2.5 py-0.5 text-caption font-bold ${styles[tone]}`}>{children}</span>;
}

const STUDENTS = [["Aarav Patel", "Class 8", "91%"], ["Ananya Iyer", "Class 9", "86%"], ["Diya Reddy", "Class 8", "78%"]];

export function TeacherMock() {
  return (
    <MockWindow title="Teacher / Students">
      <div className="grid grid-cols-3 gap-3">
        <Kpi label="Students" value="128" accent />
        <Kpi label="Active" value="121" />
        <Kpi label="Results" value="412" />
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {STUDENTS.map(([name, cls, score]) => (
          <li key={name} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2">
            <Avatar name={name} />
            <span className="text-label font-semibold text-ink">{name}</span>
            <span className="ml-auto text-caption text-muted">{cls}</span>
            <Pill tone="mint">{score}</Pill>
          </li>
        ))}
      </ul>
    </MockWindow>
  );
}

export function AdminMock() {
  return (
    <MockWindow title="Admin / Users">
      <div className="grid grid-cols-3 gap-3">
        <Kpi label="Accounts" value="152" accent />
        <Kpi label="Pending" value="3" />
        <Kpi label="Students" value="128" />
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {[["Neha Rao", "Teacher"], ["Vikram Joshi", "Teacher"], ["Rohan Mehta", "Teacher"]].map(([name, role], index) => (
          <li key={name} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2">
            <Avatar name={name} />
            <div className="min-w-0">
              <p className="text-label font-semibold text-ink">{name}</p>
              <p className="text-caption text-muted">{role}</p>
            </div>
            <span className="ml-auto">
              {index < 2 ? <span className="rounded-lg bg-brand px-3 py-1 text-caption font-bold text-on-brand">Approve</span> : <Pill tone="muted">Active</Pill>}
            </span>
          </li>
        ))}
      </ul>
    </MockWindow>
  );
}

export function StudentMock() {
  return (
    <MockWindow title="Student / Overview">
      <div className="flex items-center gap-4 rounded-xl bg-sunken p-4">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
          <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--line-strong)" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" strokeDasharray="86 100" className="ring-draw" />
          </svg>
          <span className="absolute text-h4 font-extrabold text-ink">86%</span>
        </div>
        <div>
          <p className="text-label font-bold text-ink">Priya Sharma</p>
          <p className="text-caption text-muted">Class 9 · STU-100000</p>
          <div className="mt-2"><Pill tone="mint">Best: English</Pill></div>
        </div>
      </div>
      <ul className="mt-4 flex flex-col gap-3">
        {[["English", 91], ["Mathematics", 88], ["Science", 78]].map(([subject, score]) => (
          <li key={subject}>
            <div className="mb-1 flex justify-between text-caption font-semibold"><span className="text-ink">{subject}</span><span className="text-muted">{score}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-sunken"><div className="bar-grow h-full rounded-full bg-brand" style={{ width: `${score}%` }} /></div>
          </li>
        ))}
      </ul>
    </MockWindow>
  );
}

export function FloatChip({ icon, title, text, className }: { icon: IconName; title: string; text: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`float-y flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-md ${className ?? ""}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-on-mint"><Icon name={icon} size={18} /></span>
      <div>
        <p className="text-label font-bold text-ink">{title}</p>
        <p className="text-caption text-muted">{text}</p>
      </div>
    </div>
  );
}

/** Student ID card, the signature visual of the landing page. Sample data only. */
export function IdCard({ name, className, tilt = -4 }: { name: string; className?: string; tilt?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`id-card w-64 overflow-hidden rounded-2xl border border-line bg-surface shadow-lg ${className ?? ""}`}
      style={{ ["--tilt" as string]: `${tilt}deg` } as React.CSSProperties}
    >
      <div className="brand-panel flex items-center justify-between px-4 py-2.5">
        <span className="text-caption font-bold uppercase tracking-[0.18em]">Campus Ledger</span>
        <Icon name="cap" size={18} />
      </div>
      <div className="flex gap-3 p-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-h3 font-extrabold text-brand ring-2 ring-mint">
          {name.split(" ").map((part) => part[0]).join("")}
        </span>
        <div className="min-w-0">
          <p className="truncate text-label font-extrabold text-ink">{name}</p>
          <p className="text-caption text-muted">Class 9 · Student</p>
          <p className="mt-1 text-caption font-bold text-brand">STU-100000</p>
        </div>
      </div>
      <div className="mx-4 mb-4 h-8 rounded-md opacity-80" style={{ background: "repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 5px, var(--ink) 5px 6px, transparent 6px 10px)" }} />
    </div>
  );
}
