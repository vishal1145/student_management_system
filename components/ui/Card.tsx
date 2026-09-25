import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, interactive, ...rest }: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return <div className={cn("card", interactive && "card-interactive", className)} {...rest} />;
}
