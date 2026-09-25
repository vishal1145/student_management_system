import { apiFetch } from "@/lib/http";
import type { LoginInput, SignupInput } from "./schemas";
import type { SessionUser, SignupResult } from "./types";

export const authApi = {
  login: (input: LoginInput) => apiFetch<{ user: SessionUser }>("/api/auth/login", { method: "POST", json: input }),
  signup: (input: SignupInput) => apiFetch<SignupResult>("/api/auth/signup", { method: "POST", json: input }),
  logout: () => apiFetch<{ signedOut: boolean }>("/api/auth/logout", { method: "POST" }),
};
