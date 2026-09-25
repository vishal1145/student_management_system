import { loginSchema } from "@/modules/auth/schemas";
import { ok, readJson } from "@/server/http";
import { publicRoute } from "@/server/route";
import { login } from "@/server/services/auth";

export const POST = publicRoute(async ({ request }) => {
  const input = await readJson(request, loginSchema);
  return ok({ user: await login(input) });
});
