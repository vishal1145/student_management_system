import { z } from "zod";
import { GENDERS, GRADES, STUDENT_STATUSES } from "@/lib/constants";
import { dateField, emailField, nameField, phoneField, shortText } from "@/lib/validation/common";

/** Full record edited by admins and teachers. */
export const studentSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  dateOfBirth: dateField("Date of birth", { minAge: 3, maxAge: 40 }),
  gender: z.enum(GENDERS, { error: "Select a gender" }),
  grade: z.enum(GRADES, { error: "Select a class" }),
  guardianName: nameField,
  guardianPhone: phoneField,
  address: shortText("Address", 200).min(5, "Enter the full address"),
  status: z.enum(STUDENT_STATUSES),
});

/** The only fields a student may change about themselves. */
export const studentSelfSchema = z.object({
  phone: phoneField,
  guardianName: nameField,
  guardianPhone: phoneField,
  address: shortText("Address", 200).min(5, "Enter the full address"),
});

export const studentQuerySchema = z.object({
  search: z.string().trim().max(80).optional(),
  grade: z.enum(GRADES).optional(),
  status: z.enum(STUDENT_STATUSES).optional(),
  page: z.coerce.number().int().min(1).default(1),
});

export type StudentInput = z.infer<typeof studentSchema>;
export type StudentSelfInput = z.infer<typeof studentSelfSchema>;
