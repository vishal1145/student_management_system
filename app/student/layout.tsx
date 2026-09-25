import { DashboardShell } from "@/components/layout/DashboardShell";
import { DASHBOARD_NAV } from "@/lib/navigation";
import { requirePageUser } from "@/server/auth/guard";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  await requirePageUser(["student"]);
  return <DashboardShell items={DASHBOARD_NAV.student} role="student">{children}</DashboardShell>;
}
