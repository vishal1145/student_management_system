"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { ROLE_LABELS, ROUTES } from "@/lib/constants";
import { errorMessage } from "@/lib/http";
import { authApi } from "@/modules/auth/api";
import type { SessionUser } from "@/modules/auth/types";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#roles", label: "Roles" },
  { href: "/#features", label: "Features" },
  { href: "/#faq", label: "FAQ" },
];

/** One header for every page: same height, logo position, nav spacing and theme toggle. */
export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  async function signOut() {
    try {
      await authApi.logout();
      toast.success("You have been signed out.");
      router.replace(ROUTES.login);
      router.refresh();
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  const links = user ? [{ href: ROUTES.dashboard(user.role), label: "Dashboard" }] : PUBLIC_LINKS;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && !href.includes("#"));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo href={user ? ROUTES.dashboard(user.role) : "/"} />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-10 items-center rounded-lg px-3 text-label font-semibold no-underline transition-colors hover:bg-sunken hover:text-ink",
                  isActive(link.href) ? "bg-sunken text-ink" : "text-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu
              triggerLabel="Open account menu"
              trigger={<Avatar name={user.name} size="sm" />}
              header={
                <div className="flex flex-col gap-1">
                  <p className="truncate text-label font-semibold text-ink">{user.name}</p>
                  <p className="truncate text-caption text-muted">{user.email}</p>
                  <div className="mt-1"><Badge tone="brand">{ROLE_LABELS[user.role]}</Badge></div>
                </div>
              }
              items={[
                { label: "Dashboard", icon: "home", href: ROUTES.dashboard(user.role) },
                { label: "Sign out", icon: "logout", onSelect: signOut },
              ]}
            />
          ) : (
            <>
              <div className="hidden items-center gap-2 md:flex">
                <LinkButton href={ROUTES.login} variant="ghost" size="sm">Log in</LinkButton>
                <LinkButton href={ROUTES.signup} size="sm">Sign up</LinkButton>
              </div>
              <Button
                variant="ghost"
                iconOnly
                className="md:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Icon name={menuOpen ? "x" : "menu"} />
              </Button>
            </>
          )}
        </div>
      </div>

      {!user && menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-paper md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-md px-3 text-body font-semibold text-ink no-underline hover:bg-sunken"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <LinkButton href={ROUTES.login} variant="secondary" onClick={() => setMenuOpen(false)}>Log in</LinkButton>
              <LinkButton href={ROUTES.signup} onClick={() => setMenuOpen(false)}>Sign up</LinkButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
