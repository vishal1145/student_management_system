import type { ReactNode } from "react";

/** Bottom row of every form: consistent spacing and button order (secondary first, primary last). */
export function FormActions({ children }: { children: ReactNode }) {
  return <div className="mt-2 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">{children}</div>;
}
