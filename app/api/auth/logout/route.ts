import { clearSessionCookie } from "@/server/auth/session";
import { ok } from "@/server/http";
import { publicRoute } from "@/server/route";

export const POST = publicRoute(async () => {
  await clearSessionCookie();
  return ok({ signedOut: true });
});
