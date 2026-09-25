"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/Field";
import { FormActions } from "@/components/ui/FormActions";
import { Modal } from "@/components/ui/Modal";
import { ROLES, ROLE_LABELS } from "@/lib/constants";
import type { Role } from "@/lib/constants";
import type { ManagedUser } from "../types";

const OPTIONS = ROLES.map((role) => ({ value: role, label: ROLE_LABELS[role] }));

type UserRoleModalProps = { user: ManagedUser | null; saving: boolean; onSave: (role: Role) => void; onClose: () => void };

export function UserRoleModal({ user, saving, onSave, onClose }: UserRoleModalProps) {
  return (
    <Modal open={Boolean(user)} onClose={onClose} title="Change role" description={user ? `${user.name} (${user.email})` : ""}>
      {user && <RoleForm key={user.id} user={user} saving={saving} onSave={onSave} onCancel={onClose} />}
    </Modal>
  );
}

function RoleForm({ user, saving, onSave, onCancel }: { user: ManagedUser; saving: boolean; onSave: (role: Role) => void; onCancel: () => void }) {
  const [role, setRole] = useState<Role>(user.role);
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(role);
      }}
    >
      <SelectField label="Role" required options={OPTIONS} value={role} onChange={(event) => setRole(event.target.value as Role)} hint="The change applies the next time the user opens a page." />
      <FormActions>
        <Button variant="secondary" onClick={onCancel} disabled={saving}>Cancel</Button>
        <Button type="submit" loading={saving} loadingText="Saving…" disabled={role === user.role}>Save role</Button>
      </FormActions>
    </form>
  );
}
