"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { SelectField, TextareaField, TextField } from "@/components/ui/Field";
import { FormActions } from "@/components/ui/FormActions";
import { GENDERS, GRADES, STUDENT_STATUSES } from "@/lib/constants";
import { useZodForm } from "@/lib/hooks/useZodForm";
import { ApiError, errorMessage } from "@/lib/http";
import { todayISO } from "@/lib/format";
import { studentsApi } from "../api";
import { studentSchema } from "../schemas";
import type { StudentInput } from "../schemas";
import type { Student } from "../types";

const GRADE_OPTIONS = GRADES.map((grade) => ({ value: grade, label: `Class ${grade}` }));
const GENDER_OPTIONS = GENDERS.map((gender) => ({ value: gender, label: gender[0].toUpperCase() + gender.slice(1) }));
const STATUS_OPTIONS = STUDENT_STATUSES.map((status) => ({ value: status, label: status[0].toUpperCase() + status.slice(1) }));

function initialValues(student: Student | null) {
  return {
    fullName: student?.fullName ?? "",
    email: student?.email ?? "",
    phone: student?.phone ?? "",
    dateOfBirth: student?.dateOfBirth ?? "",
    gender: student?.gender ?? "",
    grade: student?.grade ?? "",
    guardianName: student?.guardianName ?? "",
    guardianPhone: student?.guardianPhone ?? "",
    address: student?.address ?? "",
    status: student?.status ?? "active",
  };
}

type StudentFormProps = { student: Student | null; onSaved: (student: Student, created: boolean) => void; onCancel: () => void };

export function StudentForm({ student, onSaved, onCancel }: StudentFormProps) {
  const form = useZodForm(studentSchema, initialValues(student));
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState<StudentInput | null>(null);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    const input = form.validate();
    if (input) setPending(input); // ask for confirmation before saving
  }

  async function save(input: StudentInput) {
    setSaving(true);
    try {
      const saved = student ? await studentsApi.update(student.id, input) : await studentsApi.create(input);
      onSaved(saved, !student);
    } catch (error) {
      if (error instanceof ApiError && Object.keys(error.fields).length) form.setErrors(error.fields);
      else setFormError(errorMessage(error));
      setSaving(false);
      setPending(null);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        {formError && <Alert tone="error">{formError}</Alert>}
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Full name" autoComplete="off" placeholder="e.g. Aarav Patel" required {...form.bind("fullName")} />
          <TextField label="Email" type="email" inputMode="email" placeholder="name@example.com" required {...form.bind("email")} />
          <TextField
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit number"
            required
            {...form.bind("phone")}
          />
          <TextField label="Date of birth" type="date" max={todayISO()} required {...form.bind("dateOfBirth")} />
          <SelectField label="Gender" placeholder="Select gender" options={GENDER_OPTIONS} required {...form.bind("gender")} />
          <SelectField label="Class" placeholder="Select class" options={GRADE_OPTIONS} required {...form.bind("grade")} />
          <TextField label="Guardian name" placeholder="Parent or guardian" required {...form.bind("guardianName")} />
          <TextField
            label="Guardian mobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit number"
            required
            {...form.bind("guardianPhone")}
          />
          <TextareaField label="Address" containerClassName="sm:col-span-2" rows={3} maxLength={200} required {...form.bind("address")} />
          <SelectField label="Status" options={STATUS_OPTIONS} required {...form.bind("status")} />
        </div>
        <FormActions>
          <Button variant="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {student ? "Save changes" : "Add student"}
          </Button>
        </FormActions>
      </form>
      <ConfirmDialog
        open={Boolean(pending)}
        title={student ? "Save these changes?" : "Add this student?"}
        message={`${student ? "Update the record for" : "Create a new record for"} ${pending?.fullName ?? "this student"}? You can edit it again later.`}
        confirmLabel={student ? "Save changes" : "Add student"}
        loading={saving}
        onCancel={() => setPending(null)}
        onConfirm={() => pending && save(pending)}
      />
    </>
  );
}
