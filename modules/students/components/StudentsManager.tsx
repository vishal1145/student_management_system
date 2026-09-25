"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { useToast } from "@/components/ui/Toast";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { errorMessage } from "@/lib/http";
import { StudentResultsModal } from "@/modules/results/components/StudentResultsModal";
import { studentsApi } from "../api";
import type { Student } from "../types";
import { StudentFilters } from "./StudentFilters";
import { StudentForm } from "./StudentForm";
import { StudentTable } from "./StudentTable";

/** Student list + add / edit / results / delete. Admins can delete; teachers cannot. */
export function StudentsManager({ canDelete }: { canDelete: boolean }) {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [resultsFor, setResultsFor] = useState<Student | null>(null);
  const [toDelete, setToDelete] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { data, error, loading, reload } = useApiQuery(
    () => studentsApi.list({ search, grade, status, page }),
    `${search}|${grade}|${status}|${page}`,
  );

  const filtered = Boolean(search || grade || status);
  const change = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  function openForm(student: Student | null) {
    setEditing(student);
    setFormOpen(true);
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await studentsApi.remove(toDelete.id);
      toast.success(`${toDelete.fullName} was deleted.`);
      setToDelete(null);
      reload();
    } catch (failure) {
      toast.error(errorMessage(failure));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Card className="card-flush">
      <div className="flex flex-col gap-4 border-b border-line card-pad lg:flex-row lg:items-center lg:justify-between">
        <StudentFilters
          grade={grade}
          status={status}
          onSearch={change(setSearch)}
          onGrade={change(setGrade)}
          onStatus={change(setStatus)}
        />
        <Button onClick={() => openForm(null)}>
          <Icon name="plus" size={18} /> Add student
        </Button>
      </div>

      {error && (
        <div className="card-pad">
          <Alert tone="error" title="Could not load students">
            {error} <button type="button" onClick={reload} className="font-semibold underline">Try again</button>
          </Alert>
        </div>
      )}

      {!data && loading && <ListSkeleton />}

      {data && data.items.length === 0 && !loading && (
        <EmptyState
          icon="users"
          title={filtered ? "No students match your search" : "No students yet"}
          message={filtered ? "Try a different name, class or status." : "Add your first student to start keeping records."}
          action={!filtered && <Button onClick={() => openForm(null)}><Icon name="plus" size={18} /> Add student</Button>}
        />
      )}

      {data && data.items.length > 0 && (
        <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"} aria-busy={loading}>
          <div>
            <StudentTable
              students={data.items}
              canDelete={canDelete}
              onEdit={openForm}
              onResults={setResultsFor}
              onDelete={setToDelete}
            />
          </div>
          <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={setPage} />
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        wide
        title={editing ? "Edit student" : "Add student"}
        description="Fields marked with * are required."
      >
        <StudentForm
          student={editing}
          onCancel={() => setFormOpen(false)}
          onSaved={(saved, created) => {
            toast.success(created ? `${saved.fullName} was added.` : "Student details were updated.");
            setFormOpen(false);
            reload();
          }}
        />
      </Modal>

      <StudentResultsModal student={resultsFor} onClose={() => setResultsFor(null)} />

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this student?"
        message={`This permanently removes ${toDelete?.fullName ?? "the student"} and all of their results. This cannot be undone.`}
        confirmLabel="Delete student"
        destructive
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </Card>
  );
}
