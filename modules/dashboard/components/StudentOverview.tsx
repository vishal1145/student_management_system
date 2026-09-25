"use client";

import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/Button";
import { Skeleton, StatSkeleton } from "@/components/ui/Skeleton";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { resultsApi } from "@/modules/results/api";
import { ResultsTable } from "@/modules/results/components/ResultsTable";
import { summarize } from "@/modules/results/utils";
import { studentsApi } from "@/modules/students/api";
import { StudentProfileCard } from "@/modules/students/components/StudentProfileCard";
import { StatCard } from "./StatCard";

/** Everything a student sees: own profile, own numbers, own results. */
export function StudentOverview() {
  const profile = useApiQuery(studentsApi.mine, "my-profile");
  const results = useApiQuery(resultsApi.mine, "my-results");

  if (profile.error) return <Alert tone="error" title="Could not load your profile">{profile.error}</Alert>;
  if (!profile.data || !results.data) {
    return (
      <div className="flex flex-col gap-6" role="status" aria-label="Loading">
        <Skeleton className="h-48 w-full" />
        <div className="grid gap-4 sm:grid-cols-3"><StatSkeleton /><StatSkeleton /><StatSkeleton /></div>
      </div>
    );
  }

  const summary = summarize(results.data);
  const incomplete = !profile.data.grade || !profile.data.phone;

  return (
    <>
      {incomplete && (
        <Alert tone="info" title="Your profile is not complete yet">
          Add your contact details on the profile page. Your class will be set by a teacher.
        </Alert>
      )}
      <StudentProfileCard student={profile.data} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Overall average" value={summary.count ? `${summary.average}%` : "-"} icon="chart" />
        <StatCard label="Results recorded" value={summary.count} icon="clipboard" />
        <StatCard label="Best subject" value={summary.best?.subject ?? "-"} icon="check" hint={summary.best?.term} />
      </div>
      <Card className="card-flush">
        <div className="border-b border-line card-pad"><h2 className="text-h3">My results</h2></div>
        {results.data.length === 0 ? (
          <EmptyState
            icon="clipboard"
            title="No results yet"
            message="Your teachers will add your marks here after each term."
            action={<LinkButton href="/student/profile" variant="secondary">Update my details</LinkButton>}
          />
        ) : (
          <div><ResultsTable results={results.data} /></div>
        )}
      </Card>
    </>
  );
}
