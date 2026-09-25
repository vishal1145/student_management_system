"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { TERMS } from "@/lib/constants";
import { useZodForm } from "@/lib/hooks/useZodForm";
import { ApiError, errorMessage } from "@/lib/http";
import { resultsApi } from "../api";
import { resultSchema } from "../schemas";
import type { Result } from "../types";

const TERM_OPTIONS = TERMS.map((term) => ({ value: term, label: term }));
const EMPTY = { subject: "", term: "", score: "", maxScore: "100", remarks: "" };

type ResultFormProps = { studentId: string; onSaved: (results: Result[]) => void };

export function ResultForm({ studentId, onSaved }: ResultFormProps) {
  const form = useZodForm(resultSchema, EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    const input = form.validate();
    if (!input) return;

    setSaving(true);
    try {
      onSaved(await resultsApi.add(studentId, input));
      form.reset(EMPTY);
    } catch (error) {
      if (error instanceof ApiError && Object.keys(error.fields).length) form.setErrors(error.fields);
      else setFormError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 rounded-xl border border-line bg-sunken p-4">
      <h3 className="text-h4">Add a result</h3>
      {formError && <Alert tone="error">{formError}</Alert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Subject" placeholder="e.g. Mathematics" required {...form.bind("subject")} />
        <SelectField label="Term" placeholder="Select term" options={TERM_OPTIONS} required {...form.bind("term")} />
        <TextField label="Marks obtained" type="number" inputMode="numeric" min={0} required {...form.bind("score")} />
        <TextField label="Out of" type="number" inputMode="numeric" min={1} required {...form.bind("maxScore")} />
        <TextField label="Remarks" containerClassName="sm:col-span-2" maxLength={200} placeholder="Short note for the student" {...form.bind("remarks")} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={saving} loadingText="Saving…">Save result</Button>
      </div>
    </form>
  );
}
