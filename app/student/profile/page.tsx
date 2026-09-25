import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentProfileEditor } from "@/modules/students/components/StudentProfileEditor";

export const metadata: Metadata = { title: "My profile" };

export default function StudentProfilePage() {
  return (
    <>
      <PageHeader eyebrow="Student" title="My profile" description="You can update your contact details. Other fields are managed by your school." />
      <StudentProfileEditor />
    </>
  );
}
