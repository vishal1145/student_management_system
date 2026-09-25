import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LinkButton } from "@/components/ui/Button";
import { RecentStudents } from "@/modules/dashboard/components/RecentStudents";
import { StatsGrid } from "@/modules/dashboard/components/StatsGrid";
import { requirePageUser } from "@/server/auth/guard";

export const metadata: Metadata = { title: "Teacher dashboard" };

export default async function TeacherPage() {
  const user = await requirePageUser(["teacher"]);
  return (
    <>
      <PageHeader
        banner
        eyebrow="Teacher dashboard"
        title={`Welcome, ${user.name.split(" ")[0]}`}
        description="Keep student records up to date and record marks after each term."
        actions={<LinkButton href="/teacher/students" variant="mint">Manage students</LinkButton>}
      />
      <StatsGrid />
      <RecentStudents href="/teacher/students" />
    </>
  );
}
