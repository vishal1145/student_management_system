import { studentSchema } from "@/modules/students/schemas";
import { HttpError, ok, readJson } from "@/server/http";
import { studentsRepo } from "@/server/repositories/students";
import { protectedRoute } from "@/server/route";
import { updateStudent } from "@/server/services/students";

type Params = { id: string };

export const GET = protectedRoute<Params>(["admin", "teacher"], async ({ params }) => {
  const student = await studentsRepo.findById(params.id);
  if (!student) throw new HttpError(404, "not_found", "Student not found.");
  return ok(student);
});

export const PATCH = protectedRoute<Params>(["admin", "teacher"], async ({ request, params }) => {
  return ok(await updateStudent(params.id, await readJson(request, studentSchema)));
});

/** Deleting a student record is an admin-only action. */
export const DELETE = protectedRoute<Params>(["admin"], async ({ params }) => {
  if (!(await studentsRepo.findById(params.id))) throw new HttpError(404, "not_found", "Student not found.");
  await studentsRepo.remove(params.id);
  return ok({ deleted: true });
});
