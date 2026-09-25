import { ok } from "@/server/http";
import { resultsRepo } from "@/server/repositories/results";
import { studentsRepo } from "@/server/repositories/students";
import { protectedRoute } from "@/server/route";

/** A student only ever receives results linked to their own record. */
export const GET = protectedRoute(["student"], async ({ user }) => {
  const student = await studentsRepo.findByUserId(user.id);
  return ok(student ? await resultsRepo.listForStudent(student.id) : []);
});
