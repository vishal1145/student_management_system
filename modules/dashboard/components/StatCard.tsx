import { CountUp } from "@/components/effects/CountUp";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

type StatCardProps = { label: string; value: string | number; icon: IconName; hint?: string };

export function StatCard({ label, value, icon, hint }: StatCardProps) {
  return (
    <Card className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-label font-semibold text-muted">{label}</p>
        <p className="mt-2 truncate text-h1 font-extrabold leading-none tracking-tight text-ink tabular-nums" title={String(value)}>
          {typeof value === "number" ? <CountUp value={value} /> : value}
        </p>
        {hint && <p className="mt-2 text-caption text-muted">{hint}</p>}
      </div>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon name={icon} size={22} />
      </span>
    </Card>
  );
}
