"use client";

import { Button, LinkButton } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page flex flex-col items-center gap-6 py-16 text-center md:py-24">
      <h1 className="text-h2">Something went wrong</h1>
      <p className="max-w-md text-body text-muted">
        We could not load this page. Please try again, and if the problem stays, come back a little later.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}>Try again</Button>
        <LinkButton href={ROUTES.home} size="lg" variant="secondary">Back to home</LinkButton>
      </div>
    </div>
  );
}
