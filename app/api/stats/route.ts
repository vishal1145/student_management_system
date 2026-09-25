import type { Stats } from "@/modules/dashboard/types";
import { ok } from "@/server/http";
import { resultsRepo } from "@/server/repositories/results";
import { studentsRepo } from "@/server/repositories/students";
import { usersRepo } from "@/server/repositories/users";
import { protectedRoute } from "@/server/route";

export const GET = protectedRoute(["admin", "teacher"], async ({ user }) => {
  const students = await studentsRepo.counts();
  if (user.role === "admin") {
    const accounts = await usersRepo.counts();
    const stats: Stats = { role: "admin", ...accounts, ...students };
    return ok(stats);
  }
  const stats: Stats = { role: "teacher", ...students, resultsRecorded: await resultsRepo.count() };
  return ok(stats);
});
