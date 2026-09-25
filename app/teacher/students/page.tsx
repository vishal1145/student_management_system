import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentsManager } from "@/modules/students/components/StudentsManager";

export const metadata: Metadata = { title: "Students" };

export default function TeacherStudentsPage() {
  return (
    <>
      <PageHeader eyebrow="Teacher" title="Students" description="Add students, update their details and record their results." />
      <StudentsManager canDelete={false} />
    </>
  );
}
