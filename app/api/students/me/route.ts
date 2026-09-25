import { studentSelfSchema } from "@/modules/students/schemas";
import { HttpError, ok, readJson } from "@/server/http";
import { studentsRepo } from "@/server/repositories/students";
import { protectedRoute } from "@/server/route";

async function ownRecord(userId: string) {
  const student = await studentsRepo.findByUserId(userId);
  if (!student) throw new HttpError(404, "not_found", "Your student record has not been created yet.");
  return student;
}

export const GET = protectedRoute(["student"], async ({ user }) => ok(await ownRecord(user.id)));

/** Students can only edit their own contact details, never grade, status or email. */
export const PATCH = protectedRoute(["student"], async ({ request, user }) => {
  const student = await ownRecord(user.id);
  await studentsRepo.updateSelf(student.id, await readJson(request, studentSelfSchema));
  return ok(await studentsRepo.findById(student.id));
});
