"use client";

import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import type { ZodType } from "zod";
import type { FieldErrors } from "@/lib/http";
import { fieldErrorsFrom } from "@/lib/validation/common";

type Values = Record<string, string>;

/** Tiny form helper: values + per-field errors + zod validation, shared by every form. */
export function useZodForm<TOutput>(schema: ZodType<TOutput>, initial: Values) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setField = useCallback((name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  /** Props for TextField / SelectField / TextareaField / PasswordField. */
  const bind = (name: string) => ({
    name,
    value: values[name] ?? "",
    error: errors[name],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setField(name, event.target.value),
  });

  /** Returns parsed data, or null after showing the errors on the form. */
  const validate = (): TOutput | null => {
    const parsed = schema.safeParse(values);
    if (parsed.success) {
      setErrors({});
      return parsed.data;
    }
    setErrors(fieldErrorsFrom(parsed.error));
    return null;
  };

  const reset = useCallback((next: Values) => {
    setValues(next);
    setErrors({});
  }, []);

  return { values, errors, setField, setErrors, bind, validate, reset };
}
