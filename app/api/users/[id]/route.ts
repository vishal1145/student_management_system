import { userUpdateSchema } from "@/modules/users/schemas";
import { HttpError, ok, readJson } from "@/server/http";
import { usersRepo } from "@/server/repositories/users";
import { protectedRoute } from "@/server/route";

type Params = { id: string };

async function target(id: string, actorId: string) {
  if (id === actorId) throw new HttpError(400, "self_change", "You cannot change or delete your own account here.");
  const row = await usersRepo.findById(id);
  if (!row) throw new HttpError(404, "not_found", "User not found.");
  return row;
}

export const PATCH = protectedRoute<Params>(["admin"], async ({ request, params, user }) => {
  await target(params.id, user.id);
  await usersRepo.update(params.id, await readJson(request, userUpdateSchema));
  return ok({ updated: true });
});

export const DELETE = protectedRoute<Params>(["admin"], async ({ params, user }) => {
  await target(params.id, user.id);
  await usersRepo.remove(params.id);
  return ok({ deleted: true });
});
