import { ROLES } from "@/lib/constants";
import { ok } from "@/server/http";
import { protectedRoute } from "@/server/route";

export const GET = protectedRoute(ROLES, async ({ user }) => ok({ user }));
