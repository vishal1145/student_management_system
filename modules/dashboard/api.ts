import { apiFetch } from "@/lib/http";
import type { Stats } from "./types";

export const dashboardApi = {
  stats: () => apiFetch<Stats>("/api/stats"),
};
