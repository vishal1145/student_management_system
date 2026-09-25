import type { Metadata } from "next";
import { EduBackdrop } from "@/components/effects/EduBackdrop";
import { LinkButton } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { getCurrentUser } from "@/server/auth/guard";

export const metadata: Metadata = { title: "Page not found" };

export default async function NotFound() {
  const user = await getCurrentUser();
  return (
    <div className="relative flex flex-1 overflow-hidden">
      <EduBackdrop />
      <div className="container-page relative z-10 flex flex-1 flex-col items-center justify-center gap-6 py-20 text-center md:py-28">
        <div className="relative">
          <p className="fade-up text-[clamp(6rem,4rem+12vw,11rem)] font-extrabold leading-none tracking-tighter text-brand" aria-hidden="true">
            404
          </p>
          <span aria-hidden="true" className="absolute -right-4 top-2 h-8 w-8 rounded-full bg-mint" />
        </div>
        <h1 className="fade-up text-h2 [--d:0.1s]">We couldn&apos;t find that page</h1>
        <p className="fade-up max-w-md text-body text-muted [--d:0.18s]">
          The page you are looking for does not exist or has been moved. Check the address, or head back to the main page.
        </p>
        <div className="fade-up flex flex-col gap-3 sm:flex-row [--d:0.26s]">
          <LinkButton href={ROUTES.home} size="lg">
            Back to home
          </LinkButton>
          {user && (
            <LinkButton href={ROUTES.dashboard(user.role)} size="lg" variant="secondary">
              Go to my dashboard
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
}
