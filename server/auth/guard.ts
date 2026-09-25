import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import type { Role } from "@/lib/constants";
import type { SessionUser } from "@/modules/auth/types";
import { HttpError } from "@/server/http";
import { toSessionUser, usersRepo } from "@/server/repositories/users";
import { SESSION_COOKIE, readSession } from "./session";

/** Loads the signed-in user fresh from the DB, so role/status changes apply immediately. */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const userId = await readSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!userId) return null;
  const row = await usersRepo.findById(userId);
  return row && row.status === "active" ? toSessionUser(row) : null;
});

/** API guard: 401 when signed out, 403 when the role is not allowed. */
export async function requireApiUser(roles: readonly Role[]): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new HttpError(401, "unauthenticated", "Please sign in to continue.");
  if (!roles.includes(user.role)) throw new HttpError(403, "forbidden", "You do not have permission to do that.");
  return user;
}

/** Page guard: sends signed-out users to login and wrong-role users to their own dashboard. */
export async function requirePageUser(roles: readonly Role[]): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.login);
  if (!roles.includes(user.role)) redirect(ROUTES.dashboard(user.role));
  return user;
}
