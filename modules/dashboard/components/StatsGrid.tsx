"use client";

import { Alert } from "@/components/ui/Alert";
import { StatSkeleton } from "@/components/ui/Skeleton";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { dashboardApi } from "../api";
import { StatCard } from "./StatCard";

const ADMIN_GRID = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
const TEACHER_GRID = "grid gap-4 sm:grid-cols-3";

/** Role-aware headline numbers: admins see users + students, teachers see students + results. */
export function StatsGrid() {
  const { data, error, loading } = useApiQuery(dashboardApi.stats, "stats");

  if (error) return <Alert tone="error" title="Could not load the numbers">{error}</Alert>;
  if (!data || loading) {
    return (
      <div className={ADMIN_GRID}>
        {Array.from({ length: 4 }, (_, index) => <StatSkeleton key={index} />)}
      </div>
    );
  }

  if (data.role === "admin") {
    return (
      <div className={ADMIN_GRID}>
        <StatCard label="Total accounts" value={data.users} icon="users" />
        <StatCard label="Awaiting approval" value={data.pendingTeachers} icon="clock" hint="Teacher sign-ups" />
        <StatCard label="Student records" value={data.students} icon="book" />
        <StatCard label="Active students" value={data.activeStudents} icon="check" />
      </div>
    );
  }
  return (
    <div className={TEACHER_GRID}>
      <StatCard label="Student records" value={data.students} icon="users" />
      <StatCard label="Active students" value={data.activeStudents} icon="check" />
      <StatCard label="Results recorded" value={data.resultsRecorded} icon="clipboard" />
    </div>
  );
}
