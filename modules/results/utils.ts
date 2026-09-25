import { percent } from "@/lib/format";
import type { Result } from "./types";

export function summarize(results: Result[]) {
  const totalScore = results.reduce((sum, item) => sum + item.score, 0);
  const totalMax = results.reduce((sum, item) => sum + item.maxScore, 0);
  const best = results.reduce<Result | null>(
    (top, item) => (!top || percent(item.score, item.maxScore) > percent(top.score, top.maxScore) ? item : top),
    null,
  );
  return { count: results.length, average: percent(totalScore, totalMax), best };
}

export function resultTone(score: number, max: number): "success" | "warning" | "danger" {
  const value = percent(score, max);
  if (value >= 75) return "success";
  return value >= 40 ? "warning" : "danger";
}
