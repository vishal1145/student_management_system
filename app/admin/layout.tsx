import { DashboardShell } from "@/components/layout/DashboardShell";
import { DASHBOARD_NAV } from "@/lib/navigation";
import { requirePageUser } from "@/server/auth/guard";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requirePageUser(["admin"]);
  return <DashboardShell items={DASHBOARD_NAV.admin} role="admin">{children}</DashboardShell>;
}
