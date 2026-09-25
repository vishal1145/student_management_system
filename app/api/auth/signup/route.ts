import { signupSchema } from "@/modules/auth/schemas";
import { ok, readJson } from "@/server/http";
import { publicRoute } from "@/server/route";
import { signup } from "@/server/services/auth";

export const POST = publicRoute(async ({ request }) => {
  const input = await readJson(request, signupSchema);
  return ok(await signup(input), 201);
});
