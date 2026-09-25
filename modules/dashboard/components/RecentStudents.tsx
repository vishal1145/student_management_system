"use client";

import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/Button";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { studentsApi } from "@/modules/students/api";

const SHOWN = 5;

/** Teacher overview: the latest student records with a shortcut to the full list. */
export function RecentStudents({ href }: { href: string }) {
  const { data, error, loading } = useApiQuery(() => studentsApi.list({ page: 1 }), "recent-students");

  return (
    <Card className="card-flush">
      <div className="flex items-center justify-between gap-3 border-b border-line card-pad">
        <h2 className="text-h3">Recently added students</h2>
        <Link href={href} className="shrink-0 whitespace-nowrap text-label font-semibold">View all</Link>
      </div>
      {error && <div className="card-pad"><Alert tone="error">{error}</Alert></div>}
      {!data && loading && <ListSkeleton rows={3} />}
      {data && data.items.length === 0 && (
        <EmptyState
          icon="users"
          title="No students yet"
          message="Add your first student to start keeping records."
          action={<LinkButton href={href}>Go to students</LinkButton>}
        />
      )}
      {data && data.items.length > 0 && (
        <ul className="divide-y divide-line">
          {data.items.slice(0, SHOWN).map((student) => (
            <li key={student.id} className="flex flex-wrap items-center justify-between gap-3 card-row">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={student.fullName} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{student.fullName}</p>
                  <p className="truncate text-caption text-muted">{student.studentCode}{student.grade && ` · Class ${student.grade}`}</p>
                </div>
              </div>
              <Badge tone={student.status === "active" ? "success" : "neutral"}>{student.status}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
