import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

type EmptyStateProps = { icon?: IconName; title: string; message: string; action?: ReactNode };

/** Shown instead of a blank area: says what is missing and offers the next step. */
export function EmptyState({ icon = "inbox", title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="text-h4">{title}</h3>
      <p className="max-w-sm text-label text-muted">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
