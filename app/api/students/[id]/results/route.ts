import { resultSchema } from "@/modules/results/schemas";
import { HttpError, ok, readJson } from "@/server/http";
import { resultsRepo } from "@/server/repositories/results";
import { studentsRepo } from "@/server/repositories/students";
import { protectedRoute } from "@/server/route";

type Params = { id: string };

async function assertStudent(id: string) {
  if (!(await studentsRepo.findById(id))) throw new HttpError(404, "not_found", "Student not found.");
}

export const GET = protectedRoute<Params>(["admin", "teacher"], async ({ params }) => {
  await assertStudent(params.id);
  return ok(await resultsRepo.listForStudent(params.id));
});

export const POST = protectedRoute<Params>(["admin", "teacher"], async ({ request, params, user }) => {
  await assertStudent(params.id);
  await resultsRepo.create(params.id, await readJson(request, resultSchema), user.id);
  return ok(await resultsRepo.listForStudent(params.id), 201);
});
