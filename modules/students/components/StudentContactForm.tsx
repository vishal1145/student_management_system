"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TextareaField, TextField } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { useZodForm } from "@/lib/hooks/useZodForm";
import { ApiError, errorMessage } from "@/lib/http";
import { studentsApi } from "../api";
import { studentSelfSchema } from "../schemas";
import type { Student } from "../types";

/** The only fields a student may edit. Class, status and email are managed by staff. */
export function StudentContactForm({ student, onSaved }: { student: Student; onSaved: (student: Student) => void }) {
  const toast = useToast();
  const form = useZodForm(studentSelfSchema, {
    phone: student.phone,
    guardianName: student.guardianName,
    guardianPhone: student.guardianPhone,
    address: student.address,
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    const input = form.validate();
    if (!input) return;

    setSaving(true);
    try {
      onSaved(await studentsApi.updateMine(input));
      toast.success("Your details were updated.");
    } catch (error) {
      if (error instanceof ApiError && Object.keys(error.fields).length) form.setErrors(error.fields);
      else setFormError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div>
          <h2 className="text-h3">Contact details</h2>
          <p className="mt-1 text-label text-muted">Keep these up to date so your school can reach you and your guardian.</p>
        </div>
        {formError && <Alert tone="error">{formError}</Alert>}
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Mobile number" type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit number" required {...form.bind("phone")} />
          <TextField label="Guardian name" placeholder="Parent or guardian" required {...form.bind("guardianName")} />
          <TextField label="Guardian mobile" type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit number" required {...form.bind("guardianPhone")} />
          <TextareaField label="Address" containerClassName="sm:col-span-2" rows={3} maxLength={200} required {...form.bind("address")} />
        </div>
        <div className="flex justify-end border-t border-line pt-5">
          <Button type="submit" loading={saving} loadingText="Saving…">Save changes</Button>
        </div>
      </form>
    </Card>
  );
}
