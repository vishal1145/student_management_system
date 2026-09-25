import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

type Tone = "error" | "success" | "info" | "warning";

const TONES: Record<Tone, { icon: IconName; className: string }> = {
  error: { icon: "xCircle", className: "border-danger bg-danger-soft text-danger" },
  success: { icon: "checkCircle", className: "border-success bg-success-soft text-success" },
  info: { icon: "info", className: "border-brand bg-brand-soft text-brand" },
  warning: { icon: "alert", className: "border-warning bg-warning-soft text-warning" },
};

export function Alert({ tone = "info", title, children }: { tone?: Tone; title?: string; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("flex items-start gap-3 rounded-xl border p-4", TONES[tone].className)}
    >
      <Icon name={TONES[tone].icon} className="mt-0.5 shrink-0" />
      <div className="min-w-0 text-label text-ink">
        {title && <p className="mb-0.5 font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
