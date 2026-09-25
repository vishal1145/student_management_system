import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { UsersManager } from "@/modules/users/components/UsersManager";
import { requirePageUser } from "@/server/auth/guard";

export const metadata: Metadata = { title: "Manage users" };

export default async function AdminUsersPage() {
  const user = await requirePageUser(["admin"]);
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Users"
        description="Approve teachers, change roles, and disable or remove accounts."
      />
      <UsersManager currentUserId={user.id} />
    </>
  );
}
