import { z } from "zod";
import { TERMS } from "@/lib/constants";
import { shortText } from "@/lib/validation/common";

export const resultSchema = z
  .object({
    subject: shortText("Subject", 60).min(2, "Enter the subject name"),
    term: z.enum(TERMS, { error: "Select a term" }),
    score: z.coerce.number({ error: "Enter the marks obtained" }).int("Use whole numbers").min(0, "Marks cannot be negative"),
    maxScore: z.coerce.number({ error: "Enter the maximum marks" }).int("Use whole numbers").min(1, "Must be at least 1").max(1000),
    remarks: shortText("Remarks", 200),
  })
  .refine((data) => data.score <= data.maxScore, {
    path: ["score"],
    message: "Marks cannot be higher than the maximum",
  });

export type ResultInput = z.infer<typeof resultSchema>;
