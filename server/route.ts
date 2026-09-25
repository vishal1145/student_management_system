import { ROLES } from "@/lib/constants";
import type { Role } from "@/lib/constants";
import type { SessionUser } from "@/modules/auth/types";
import { requireApiUser } from "@/server/auth/guard";
import { assertSameOrigin, failure } from "@/server/http";

type Context<P> = { params: Promise<P> };
type Handler<P, U> = (args: { request: Request; user: U; params: P }) => Promise<Response>;

/** Public endpoint (signup / login / logout): still gets origin checks and error mapping. */
export function publicRoute<P = Record<string, never>>(handler: Handler<P, null>) {
  return async (request: Request, context: Context<P>): Promise<Response> => {
    try {
      assertSameOrigin(request);
      return await handler({ request, user: null, params: await context.params });
    } catch (error) {
      return failure(error);
    }
  };
}

/** Protected endpoint: the role check runs on EVERY request before the handler. */
export function protectedRoute<P = Record<string, never>>(roles: readonly Role[], handler: Handler<P, SessionUser>) {
  return async (request: Request, context: Context<P>): Promise<Response> => {
    try {
      assertSameOrigin(request);
      const user = await requireApiUser(roles.length ? roles : ROLES);
      return await handler({ request, user, params: await context.params });
    } catch (error) {
      return failure(error);
    }
  };
}
