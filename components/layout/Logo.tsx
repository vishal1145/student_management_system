import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

/** Teal tile with a mint dot + wordmark. Same size and placement in every header and footer. */
export function Logo({ href = "/", onDark }: { href?: string; onDark?: boolean }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-2.5 no-underline" aria-label={`${APP_NAME} home`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-on-brand transition-transform duration-300 group-hover:-rotate-6">
        <Icon name="cap" size={20} />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-mint ring-2 ring-paper" />
      </span>
      <span className={onDark ? "text-h4 font-extrabold tracking-tight text-white" : "text-h4 font-extrabold tracking-tight text-ink"}>{APP_NAME}</span>
    </Link>
  );
}
