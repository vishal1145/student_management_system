import type { ReactNode } from "react";
import type { Role } from "@/lib/constants";
import type { NavItem } from "@/lib/navigation";
import { DashboardSidebar } from "./DashboardSidebar";

/** Wraps every dashboard page: sidebar + content on the shared container. */
export function DashboardShell({ items, role, children }: { items: NavItem[]; role: Role; children: ReactNode }) {
  return (
    <div className="container-page py-6 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:gap-10">
        <DashboardSidebar items={items} role={role} />
        <div className="flex min-w-0 flex-col gap-8">{children}</div>
      </div>
    </div>
  );
}
