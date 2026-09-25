import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentsManager } from "@/modules/students/components/StudentsManager";

export const metadata: Metadata = { title: "Manage students" };

export default function AdminStudentsPage() {
  return (
    <>
      <PageHeader eyebrow="Admin" title="Students" description="Every student record in the system. Admins can also delete records." />
      <StudentsManager canDelete />
    </>
  );
}
