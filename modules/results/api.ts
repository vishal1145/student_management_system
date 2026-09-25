import { apiFetch } from "@/lib/http";
import type { ResultInput } from "./schemas";
import type { Result } from "./types";

export const resultsApi = {
  forStudent: (studentId: string) => apiFetch<Result[]>(`/api/students/${studentId}/results`),
  add: (studentId: string, input: ResultInput) =>
    apiFetch<Result[]>(`/api/students/${studentId}/results`, { method: "POST", json: input }),
  remove: (id: string) => apiFetch<{ deleted: boolean }>(`/api/results/${id}`, { method: "DELETE" }),
  mine: () => apiFetch<Result[]>("/api/results/me"),
};
