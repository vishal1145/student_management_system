"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { ROLES, ROLE_LABELS, USER_STATUSES } from "@/lib/constants";
import type { Role } from "@/lib/constants";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { errorMessage } from "@/lib/http";
import { usersApi } from "../api";
import type { ManagedUser } from "../types";
import { UserRoleModal } from "./UserRoleModal";
import { UsersTable } from "./UsersTable";

type Pending = { user: ManagedUser; kind: "disable" | "delete" } | null;

export function UsersManager({ currentUserId }: { currentUserId: string }) {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState<Pending>(null);
  const [roleTarget, setRoleTarget] = useState<ManagedUser | null>(null);
  const [busy, setBusy] = useState(false);

  const { data, error, loading, reload } = useApiQuery(
    () => usersApi.list({ search, role, status, page }),
    `${search}|${role}|${status}|${page}`,
  );
  const filtered = Boolean(search || role || status);

  async function run(action: () => Promise<unknown>, success: string, after?: () => void) {
    setBusy(true);
    try {
      await action();
      toast.success(success);
      after?.();
      reload();
    } catch (failure) {
      toast.error(errorMessage(failure));
    } finally {
      setBusy(false);
    }
  }

  const filter = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <Card className="card-flush">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center md:p-5">
        <SearchInput onSearch={filter(setSearch)} placeholder="Search name or email" label="Search users" />
        <select aria-label="Filter by role" value={role} onChange={(event) => filter(setRole)(event.target.value)} className="field-control sm:w-40">
          <option value="">All roles</option>
          {ROLES.map((item) => <option key={item} value={item}>{ROLE_LABELS[item]}</option>)}
        </select>
        <select aria-label="Filter by status" value={status} onChange={(event) => filter(setStatus)(event.target.value)} className="field-control sm:w-40">
          <option value="">All statuses</option>
          {USER_STATUSES.map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}
        </select>
      </div>

      {error && (
        <div className="card-pad">
          <Alert tone="error" title="Could not load users">
            {error} <button type="button" onClick={reload} className="font-semibold underline">Try again</button>
          </Alert>
        </div>
      )}
      {!data && loading && <ListSkeleton />}
      {data && data.items.length === 0 && !loading && (
        <EmptyState icon="users" title="No users found" message={filtered ? "Try a different search or filter." : "Accounts will appear here after people sign up."} />
      )}
      {data && data.items.length > 0 && (
        <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"} aria-busy={loading}>
          <div>
            <UsersTable
              users={data.items}
              currentUserId={currentUserId}
              onApprove={(user) => run(() => usersApi.update(user.id, { status: "active" }), `${user.name} was approved.`)}
              onToggle={(user) =>
                user.status === "disabled"
                  ? run(() => usersApi.update(user.id, { status: "active" }), `${user.name} was enabled.`)
                  : setPending({ user, kind: "disable" })
              }
              onRole={setRoleTarget}
              onDelete={(user) => setPending({ user, kind: "delete" })}
            />
          </div>
          <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={setPage} />
        </div>
      )}

      <UserRoleModal
        user={roleTarget}
        saving={busy}
        onClose={() => setRoleTarget(null)}
        onSave={(next: Role) =>
          roleTarget && run(() => usersApi.update(roleTarget.id, { role: next }), "Role updated.", () => setRoleTarget(null))
        }
      />

      <ConfirmDialog
        open={Boolean(pending)}
        title={pending?.kind === "delete" ? "Delete this account?" : "Disable this account?"}
        message={
          pending?.kind === "delete"
            ? `${pending.user.name} will be removed permanently and lose access. This cannot be undone.`
            : `${pending?.user.name ?? "This user"} will no longer be able to log in until you enable the account again.`
        }
        confirmLabel={pending?.kind === "delete" ? "Delete account" : "Disable account"}
        destructive
        loading={busy}
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (!pending) return;
          const { user, kind } = pending;
          run(
            () => (kind === "delete" ? usersApi.remove(user.id) : usersApi.update(user.id, { status: "disabled" })),
            kind === "delete" ? `${user.name} was deleted.` : `${user.name} was disabled.`,
            () => setPending(null),
          );
        }}
      />
    </Card>
  );
}
