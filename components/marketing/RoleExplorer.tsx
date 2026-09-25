"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { AdminMock, StudentMock, TeacherMock } from "./Mocks";

const ROLES = [
  {
    id: "admin",
    label: "Admin",
    title: "Run the whole system",
    text: "See every account and every student. Approve new teachers, change roles, and disable or remove accounts.",
    can: ["Approve, disable or delete accounts", "Change a user's role", "View and manage every student record"],
    cannot: "Cannot edit their own role or delete their own account.",
    Mock: AdminMock,
  },
  {
    id: "teacher",
    label: "Teacher",
    title: "Keep records up to date",
    text: "Add students, update their details and record marks after every term, with search and filters to find anyone fast.",
    can: ["Add and edit student records", "Record marks and remarks per term", "Search and filter by class or status"],
    cannot: "Cannot delete students or manage user accounts.",
    Mock: TeacherMock,
  },
  {
    id: "student",
    label: "Student",
    title: "See your own progress",
    text: "Check your profile, your marks and your average in one place, and keep your contact details current.",
    can: ["See their profile and results", "Update phone, guardian and address", "Track their average across terms"],
    cannot: "Cannot see other students or change their class and status.",
    Mock: StudentMock,
  },
] as const;

export function RoleExplorer() {
  const [active, setActive] = useState<(typeof ROLES)[number]["id"]>("teacher");
  const role = ROLES.find((item) => item.id === active) ?? ROLES[1];

  return (
    <section id="roles" className="section scroll-mt-20">
      <div className="container-page flex flex-col gap-10">
        <div className="reveal max-w-2xl">
          <p className="eyebrow mb-3">Roles</p>
          <h2>Each role sees and does only what makes sense</h2>
          <p className="mt-3 text-body text-muted">Permissions are checked on the server for every request, not just hidden in the interface.</p>
        </div>

        <div role="tablist" aria-label="Choose a role" className="inline-flex w-full gap-1 self-start rounded-2xl bg-sunken p-1.5 sm:w-auto">
          {ROLES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={active === item.id}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                "min-h-11 flex-1 rounded-xl px-5 text-label font-bold transition-colors sm:flex-none",
                active === item.id ? "bg-brand text-on-brand shadow-sm" : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div key={role.id} id={`panel-${role.id}`} role="tabpanel" aria-labelledby={`tab-${role.id}`} className="fade-up grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <h3 className="text-h2">{role.title}</h3>
            <p className="text-body text-muted">{role.text}</p>
            <ul className="flex flex-col gap-3">
              {role.can.map((line) => (
                <li key={line} className="flex items-start gap-3 text-body text-ink">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-on-mint"><Icon name="check" size={14} /></span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="rounded-xl border border-line bg-surface px-4 py-3 text-label text-muted">
              <strong className="text-ink">Limits:</strong> {role.cannot}
            </p>
          </div>
          <role.Mock />
        </div>
      </div>
    </section>
  );
}
