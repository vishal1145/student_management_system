import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import type { BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import { Icon } from "@/components/ui/Icon";
import { ROLE_LABELS } from "@/lib/constants";
import type { UserStatus } from "@/lib/constants";
import { formatDbDate } from "@/lib/format";
import type { ManagedUser } from "../types";

const STATUS_TONE: Record<UserStatus, BadgeTone> = { active: "success", pending: "warning", disabled: "danger" };

type UsersTableProps = {
  users: ManagedUser[];
  currentUserId: string;
  onApprove: (user: ManagedUser) => void;
  onToggle: (user: ManagedUser) => void;
  onRole: (user: ManagedUser) => void;
  onDelete: (user: ManagedUser) => void;
};

export function UsersTable({ users, currentUserId, onApprove, onToggle, onRole, onDelete }: UsersTableProps) {
  const columns: Column<ManagedUser>[] = [
    {
      key: "user",
      header: "User",
      cell: (user) => (
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={user.name} />
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink" title={user.name}>
              {user.name}
              {user.id === currentUserId && <span className="ml-2 text-caption font-medium text-muted">(you)</span>}
            </p>
            <p className="truncate text-caption text-muted" title={user.email}>{user.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", header: "Role", cell: (user) => <Badge tone="brand">{ROLE_LABELS[user.role]}</Badge> },
    { key: "status", header: "Status", cell: (user) => <Badge tone={STATUS_TONE[user.status]}>{user.status}</Badge> },
    { key: "joined", header: "Joined", className: "md:max-lg:hidden md:whitespace-nowrap", cell: (user) => formatDbDate(user.createdAt) },
    {
      key: "actions",
      header: "",
      className: "md:whitespace-nowrap md:text-right",
      cell: (user) =>
        user.id === currentUserId ? (
          <span className="text-caption text-faint">Your account</span>
        ) : (
          <div className="flex flex-wrap gap-2 md:flex-nowrap md:justify-end">
            {user.status === "pending" && (
              <Button size="sm" onClick={() => onApprove(user)}><Icon name="check" size={16} /> Approve</Button>
            )}
            {user.status !== "pending" && (
              <Button size="sm" variant="secondary" onClick={() => onToggle(user)}>
                {user.status === "disabled" ? "Enable" : "Disable"}
              </Button>
            )}
            <Button size="sm" variant="secondary" onClick={() => onRole(user)}>Role</Button>
            <Button size="sm" variant="secondary" iconOnly onClick={() => onDelete(user)} aria-label={`Delete ${user.name}`} title="Delete">
              <Icon name="trash" size={16} className="text-danger" />
            </Button>
          </div>
        ),
    },
  ];

  return <DataTable caption="Users" columns={columns} rows={users} rowKey={(user) => user.id} />;
}
