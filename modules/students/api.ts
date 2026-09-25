import { apiFetch, toQuery } from "@/lib/http";
import type { StudentInput, StudentSelfInput } from "./schemas";
import type { Page, Student, StudentQuery } from "./types";

export const studentsApi = {
  list: (query: StudentQuery) => apiFetch<Page<Student>>(`/api/students${toQuery({ ...query })}`),
  create: (input: StudentInput) => apiFetch<Student>("/api/students", { method: "POST", json: input }),
  update: (id: string, input: StudentInput) => apiFetch<Student>(`/api/students/${id}`, { method: "PATCH", json: input }),
  remove: (id: string) => apiFetch<{ deleted: boolean }>(`/api/students/${id}`, { method: "DELETE" }),
  mine: () => apiFetch<Student>("/api/students/me"),
  updateMine: (input: StudentSelfInput) => apiFetch<Student>("/api/students/me", { method: "PATCH", json: input }),
};
