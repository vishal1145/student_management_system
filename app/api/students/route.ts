import { studentQuerySchema, studentSchema } from "@/modules/students/schemas";
import { ok, readJson } from "@/server/http";
import { studentsRepo } from "@/server/repositories/students";
import { protectedRoute } from "@/server/route";
import { createStudent } from "@/server/services/students";

export const GET = protectedRoute(["admin", "teacher"], async ({ request }) => {
  const query = studentQuerySchema.parse(Object.fromEntries(new URL(request.url).searchParams));
  return ok(await studentsRepo.list(query));
});

export const POST = protectedRoute(["admin", "teacher"], async ({ request }) => {
  const input = await readJson(request, studentSchema);
  return ok(await createStudent(input), 201);
});
