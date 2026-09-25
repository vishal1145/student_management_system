"use client";

import { Alert } from "@/components/ui/Alert";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { studentsApi } from "../api";
import { StudentContactForm } from "./StudentContactForm";
import { StudentProfileCard } from "./StudentProfileCard";

export function StudentProfileEditor() {
  const { data, error, reload } = useApiQuery(studentsApi.mine, "my-profile-edit");

  if (error) return <Alert tone="error" title="Could not load your profile">{error}</Alert>;
  if (!data) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="flex flex-col gap-6">
      <StudentProfileCard student={data} />
      <StudentContactForm key={data.updatedAt} student={data} onSaved={reload} />
    </div>
  );
}
