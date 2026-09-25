import { z } from "zod";
import { ROLES, USER_STATUSES } from "@/lib/constants";

export const userUpdateSchema = z
  .object({ role: z.enum(ROLES), status: z.enum(USER_STATUSES) })
  .partial()
  .refine((data) => data.role || data.status, { message: "Nothing to update" });

export const userQuerySchema = z.object({
  search: z.string().trim().max(80).optional(),
  role: z.enum(ROLES).optional(),
  status: z.enum(USER_STATUSES).optional(),
  page: z.coerce.number().int().min(1).default(1),
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
