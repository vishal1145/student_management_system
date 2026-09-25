import { userQuerySchema } from "@/modules/users/schemas";
import { ok } from "@/server/http";
import { usersRepo } from "@/server/repositories/users";
import { protectedRoute } from "@/server/route";

export const GET = protectedRoute(["admin"], async ({ request }) => {
  const query = userQuerySchema.parse(Object.fromEntries(new URL(request.url).searchParams));
  return ok(await usersRepo.list(query));
});
