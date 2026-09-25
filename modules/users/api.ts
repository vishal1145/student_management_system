import { apiFetch, toQuery } from "@/lib/http";
import type { Page } from "@/modules/students/types";
import type { UserUpdateInput } from "./schemas";
import type { ManagedUser, UserQuery } from "./types";

export const usersApi = {
  list: (query: UserQuery) => apiFetch<Page<ManagedUser>>(`/api/users${toQuery({ ...query })}`),
  update: (id: string, input: UserUpdateInput) =>
    apiFetch<{ updated: boolean }>(`/api/users/${id}`, { method: "PATCH", json: input }),
  remove: (id: string) => apiFetch<{ deleted: boolean }>(`/api/users/${id}`, { method: "DELETE" }),
};
