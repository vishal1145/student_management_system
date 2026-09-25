"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Role } from "@/lib/constants";
import { ROLE_LABELS } from "@/lib/constants";
import type { NavItem } from "@/lib/navigation";

/** Vertical menu on desktop, scrolling pill bar on phones. Active item has a clear state. */
export function DashboardSidebar({ items, role }: { items: NavItem[]; role: Role }) {
  const pathname = usePathname();
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <p className="eyebrow mb-3 hidden px-3 lg:block">{ROLE_LABELS[role]} workspace</p>
      <nav aria-label="Section">
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
          {items.map((item, index) => {
            const active = index === 0 ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-xl px-4 text-label font-semibold no-underline transition-colors",
                    active
                      ? "bg-brand text-on-brand shadow-sm"
                      : "bg-surface text-muted ring-1 ring-line hover:text-ink hover:ring-outline lg:bg-transparent lg:ring-0 lg:hover:bg-sunken",
                  )}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
