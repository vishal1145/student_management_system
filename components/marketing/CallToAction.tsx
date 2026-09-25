import { EduBackdrop } from "@/components/effects/EduBackdrop";
import { Icon } from "@/components/ui/Icon";
import { LinkButton } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export function CallToAction() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="reveal relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl brand-panel px-6 py-12 sm:px-12 sm:py-16 md:flex-row md:items-center md:justify-between">
          <EduBackdrop tone="dark" count={8} />
          <div className="relative z-10 max-w-xl">
            <h2 className="text-h1 font-extrabold">Ready to bring your student records together?</h2>
            <p className="mt-3 text-body text-white/80">Create an account and open your dashboard in under a minute.</p>
          </div>
          <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <LinkButton href={ROUTES.signup} size="lg" variant="mint">
              Create an account <Icon name="arrowRight" size={18} />
            </LinkButton>
            <LinkButton href={ROUTES.login} size="lg" variant="ghost" className="!border !border-white/30 !text-white hover:!bg-white/10">Log in</LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
