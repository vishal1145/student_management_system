import type { ReactNode } from "react";
import { EduBackdrop } from "@/components/effects/EduBackdrop";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  /** Solid brand banner used on each role's overview page. */
  banner?: boolean;
};

/** Title block used at the top of every dashboard page. */
export function PageHeader({ eyebrow, title, description, actions, banner }: PageHeaderProps) {
  if (banner) {
    return (
      <div className="brand-panel fade-up relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10">
        <EduBackdrop tone="dark" count={7} />
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            {eyebrow && <p className="mb-2 text-caption font-bold uppercase tracking-[0.12em] text-[#8cf0d9]">{eyebrow}</p>}
            <h1>{title}</h1>
            {description && <p className="mt-2 max-w-xl text-body text-white/80">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    );
  }
  return (
    <div className="fade-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-body text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
