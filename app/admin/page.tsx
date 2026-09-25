import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendingApprovals } from "@/modules/dashboard/components/PendingApprovals";
import { StatsGrid } from "@/modules/dashboard/components/StatsGrid";
import { requirePageUser } from "@/server/auth/guard";

export const metadata: Metadata = { title: "Admin dashboard" };

export default async function AdminPage() {
  const user = await requirePageUser(["admin"]);
  return (
    <>
      <PageHeader
        banner
        eyebrow="Admin dashboard"
        title={`Welcome, ${user.name.split(" ")[0]}`}
        description="Keep an eye on accounts and student records across the whole system."
      />
      <StatsGrid />
      <PendingApprovals />
    </>
  );
}
