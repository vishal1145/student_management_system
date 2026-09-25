import type { ReactNode } from "react";
import { EduBackdrop } from "@/components/effects/EduBackdrop";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type AuthShellProps = { eyebrow: string; title: string; description: string; children: ReactNode; wide?: boolean };

const POINTS = ["One dashboard for each role", "Permissions checked on every request", "Works on phone, tablet and desktop"];

/** Login and signup: clean form on the left, product preview on the right (desktop only). No decorative backgrounds. */
export function AuthShell({ eyebrow, title, description, children, wide }: AuthShellProps) {
  return (
    <div className="grid flex-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-hidden lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="auth-left flex items-center justify-center px-4 py-10 sm:px-8 lg:overflow-y-auto lg:py-6">
        <div className={cn("fade-up w-full", wide ? "max-w-xl" : "max-w-md")}>
          <p className="auth-eyebrow eyebrow mb-3">{eyebrow}</p>
          <h1 className="auth-title text-h1">{title}</h1>
          <p className="auth-desc mb-6 mt-3 text-body text-muted">{description}</p>
          {children}
        </div>
      </div>

      <aside className="brand-panel relative hidden overflow-hidden p-10 lg:flex lg:items-center xl:p-12">
        <EduBackdrop tone="dark" count={0} blobs={false} />
        <div className="auth-aside relative z-10 flex w-full max-w-md flex-col gap-8">
          <h2 className="fade-up text-h1 font-extrabold text-[inherit] [--d:0.1s]">Your school, organised in one place.</h2>
          <p className="fade-up text-body text-white/80 [--d:0.2s]">Records, results and approvals in one calm workspace, with a dashboard built for each role.</p>
          <ul className="auth-points fade-up flex flex-col gap-2.5 text-label font-medium [--d:0.3s]">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-on-mint"><Icon name="check" size={12} /></span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
