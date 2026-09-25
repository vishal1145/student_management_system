const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDate(value: string | number | null | undefined): string {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : dateFormatter.format(date);
}

/** SQLite stores UTC timestamps as "YYYY-MM-DD HH:MM:SS"; this turns them into a readable date. */
export function formatDbDate(value: string | null | undefined): string {
  return value ? formatDate(`${value.replace(" ", "T")}Z`) : "-";
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function percent(score: number, max: number): number {
  return max > 0 ? Math.round((score / max) * 100) : 0;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
