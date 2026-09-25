import { z } from "zod";

/** Field rules used by both the browser forms and the API, so messages always match. */
export const nameField = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name must be 80 characters or fewer")
  .regex(/^[\p{L}][\p{L}\s.'-]*$/u, "Name can only contain letters, spaces, . ' and -");

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email is too long")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email, like name@example.com");

export const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be 72 characters or fewer")
  .regex(/[a-z]/, "Add at least one lowercase letter")
  .regex(/[A-Z]/, "Add at least one uppercase letter")
  .regex(/\d/, "Add at least one number");

export const phoneField = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number");

export function dateField(label: string, opts: { minAge?: number; maxAge?: number } = {}) {
  return z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, `${label} is required`)
    .refine((value) => !Number.isNaN(Date.parse(value)), `Enter a valid ${label.toLowerCase()}`)
    .refine((value) => {
      const years = (Date.now() - Date.parse(value)) / (365.25 * 24 * 3600 * 1000);
      return years >= (opts.minAge ?? 0) && years <= (opts.maxAge ?? 120);
    }, `${label} is outside the allowed range`);
}

export const shortText = (label: string, max = 120) =>
  z.string().trim().max(max, `${label} must be ${max} characters or fewer`);

/** Turns a zod error into `{ fieldName: firstMessage }` for form display. */
export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
