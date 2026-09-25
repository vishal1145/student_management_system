import Link from "next/link";
import { APP_NAME, APP_TAGLINE, ROUTES } from "@/lib/constants";
import { Logo } from "./Logo";

const LINK_CLASS = "text-label text-[#cdb9ab] no-underline transition-colors hover:text-white";
const HEAD_CLASS = "mb-1 text-caption font-bold uppercase tracking-[0.12em] text-white";

/** Same structure on every page, including dashboards. Dark in both themes. */
export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[var(--footer-bg)] text-[#cdb9ab]">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo onDark />
          <p className="max-w-xs text-label">
            {APP_TAGLINE} One place for admins, teachers and students, with each role seeing only what it needs.
          </p>
        </div>
        <nav aria-label="Product" className="flex flex-col gap-2.5">
          <p className={HEAD_CLASS}>Product</p>
          <Link href="/#roles" className={LINK_CLASS}>Roles</Link>
          <Link href="/#features" className={LINK_CLASS}>Features</Link>
          <Link href="/#how-it-works" className={LINK_CLASS}>How it works</Link>
        </nav>
        <nav aria-label="Support" className="flex flex-col gap-2.5">
          <p className={HEAD_CLASS}>Support</p>
          <Link href="/#faq" className={LINK_CLASS}>FAQ</Link>
          <Link href="/" className={LINK_CLASS}>Home</Link>
        </nav>
        <nav aria-label="Account" className="flex flex-col gap-2.5">
          <p className={HEAD_CLASS}>Account</p>
          <Link href={ROUTES.login} className={LINK_CLASS}>Log in</Link>
          <Link href={ROUTES.signup} className={LINK_CLASS}>Create an account</Link>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-1 py-5 text-caption sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Built as a student project.</p>
          <p>Passwords are hashed and every request is checked against the user&apos;s role.</p>
        </div>
      </div>
    </footer>
  );
}
