import { DashboardShell } from "@/components/layout/DashboardShell";
import { DASHBOARD_NAV } from "@/lib/navigation";
import { requirePageUser } from "@/server/auth/guard";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  await requirePageUser(["teacher"]);
  return <DashboardShell items={DASHBOARD_NAV.teacher} role="teacher">{children}</DashboardShell>;
}
