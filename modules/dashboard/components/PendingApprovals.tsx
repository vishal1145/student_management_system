"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { errorMessage } from "@/lib/http";
import { usersApi } from "@/modules/users/api";

/** Admin overview: teacher sign-ups waiting to be approved. */
export function PendingApprovals() {
  const toast = useToast();
  const [busyId, setBusyId] = useState<string | null>(null);
  const { data, error, loading, reload } = useApiQuery(
    () => usersApi.list({ role: "teacher", status: "pending", page: 1 }),
    "pending-teachers",
  );

  async function approve(id: string, name: string) {
    setBusyId(id);
    try {
      await usersApi.update(id, { status: "active" });
      toast.success(`${name} was approved.`);
      reload();
    } catch (failure) {
      toast.error(errorMessage(failure));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <Card className="card-flush">
      <div className="flex items-center justify-between gap-3 border-b border-line card-pad">
        <h2 className="text-h3">Teachers awaiting approval</h2>
        <Link href="/admin/users" className="shrink-0 whitespace-nowrap text-label font-semibold">Manage users</Link>
      </div>
      {error && <div className="card-pad"><Alert tone="error">{error}</Alert></div>}
      {!data && loading && <ListSkeleton rows={3} />}
      {data && data.items.length === 0 && (
        <EmptyState icon="checkCircle" title="All caught up" message="No teacher accounts are waiting for approval right now." />
      )}
      {data && data.items.length > 0 && (
        <ul className="divide-y divide-line">
          {data.items.map((user) => (
            <li key={user.id} className="flex flex-wrap items-center justify-between gap-3 card-row">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={user.name} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{user.name}</p>
                  <p className="truncate text-caption text-muted">{user.email}</p>
                </div>
              </div>
              <Button size="sm" onClick={() => approve(user.id, user.name)} loading={busyId === user.id} loadingText="Approving…">
                Approve
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
