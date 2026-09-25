"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { errorMessage } from "@/lib/http";
import type { Student } from "@/modules/students/types";
import { resultsApi } from "../api";
import type { Result } from "../types";
import { ResultForm } from "./ResultForm";
import { ResultsTable } from "./ResultsTable";

/** Teacher / admin view of one student's results, with an add form. */
export function StudentResultsModal({ student, onClose }: { student: Student | null; onClose: () => void }) {
  return (
    <Modal open={Boolean(student)} onClose={onClose} wide title={`Results: ${student?.fullName ?? ""}`} description="Marks are saved per subject and term.">
      {student && <ResultsBody key={student.id} student={student} />}
    </Modal>
  );
}

function ResultsBody({ student }: { student: Student }) {
  const toast = useToast();
  const { data, error, loading, reload } = useApiQuery(() => resultsApi.forStudent(student.id), student.id);
  const [toDelete, setToDelete] = useState<Result | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await resultsApi.remove(toDelete.id);
      toast.success("Result deleted.");
      setToDelete(null);
      reload();
    } catch (failure) {
      toast.error(errorMessage(failure));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <ResultForm
        studentId={student.id}
        onSaved={() => {
          toast.success("Result saved.");
          reload();
        }}
      />
      {error && <Alert tone="error">{error}</Alert>}
      {!data && loading && <ListSkeleton rows={3} />}
      {data && data.length === 0 && (
        <EmptyState icon="clipboard" title="No results yet" message="Use the form above to record the first result for this student." />
      )}
      {data && data.length > 0 && <ResultsTable results={data} onDelete={setToDelete} />}
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this result?"
        message={`Remove the ${toDelete?.subject ?? ""} result (${toDelete?.term ?? ""})? This cannot be undone.`}
        confirmLabel="Delete result"
        destructive
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
