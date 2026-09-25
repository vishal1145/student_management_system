import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentOverview } from "@/modules/dashboard/components/StudentOverview";
import { requirePageUser } from "@/server/auth/guard";

export const metadata: Metadata = { title: "My dashboard" };

export default async function StudentPage() {
  const user = await requirePageUser(["student"]);
  return (
    <>
      <PageHeader
        banner
        eyebrow="Student dashboard"
        title={`Hello, ${user.name.split(" ")[0]}`}
        description="Your profile and results in one place. You can only see your own information."
      />
      <StudentOverview />
    </>
  );
}
