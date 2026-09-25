import { HttpError, ok } from "@/server/http";
import { resultsRepo } from "@/server/repositories/results";
import { protectedRoute } from "@/server/route";

export const DELETE = protectedRoute<{ id: string }>(["admin", "teacher"], async ({ params }) => {
  if (!(await resultsRepo.remove(params.id))) throw new HttpError(404, "not_found", "Result not found.");
  return ok({ deleted: true });
});
