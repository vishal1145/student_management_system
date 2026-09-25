import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

const SIZES = { sm: "h-8 w-8 text-caption", md: "h-10 w-10 text-label", lg: "h-14 w-14 text-h4" } as const;

export function Avatar({ name, size = "md" }: { name: string; size?: keyof typeof SIZES }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand",
        SIZES[size],
      )}
    >
      {initials(name)}
    </span>
  );
}
