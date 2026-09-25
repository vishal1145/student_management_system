import { EduBackdrop } from "@/components/effects/EduBackdrop";
import { Icon } from "@/components/ui/Icon";
import { LinkButton } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { HeroCards } from "./HeroCards";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <EduBackdrop count={0} />
      <div className="container-page relative z-10 grid items-center gap-14 py-14 md:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="fade-up inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-caption font-bold text-ink shadow-sm">
            <span className="pulse-dot h-2 w-2 rounded-full bg-brand" /> Student management system
          </span>
          <h1 className="fade-up text-display font-extrabold [--d:0.06s]">
            One system for <span className="underline-draw">every</span>
            <span className="word-rotator font-extrabold" aria-label="admin, teacher and student">
              <span>admin.</span>
              <span>teacher.</span>
              <span>student.</span>
            </span>
          </h1>
          <p className="fade-up max-w-xl text-lead text-muted [--d:0.14s]">
            Manage accounts, student records and results in one place. Every role gets its own dashboard and sees only what it needs.
          </p>
          <div className="fade-up flex w-full flex-col gap-3 sm:w-auto sm:flex-row [--d:0.22s]">
            <LinkButton href={ROUTES.signup} size="lg" className="btn-shine">
              Get started free <Icon name="arrowRight" size={18} />
            </LinkButton>
            <LinkButton href={ROUTES.login} size="lg" variant="secondary">Log in</LinkButton>
          </div>
          <ul className="fade-up mt-1 flex flex-wrap gap-x-6 gap-y-2 text-label font-medium text-muted [--d:0.3s]">
            {["Three role dashboards", "Light and dark themes", "Works on every screen"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="checkCircle" size={18} className="text-brand" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="fade-up [--d:0.18s]"><HeroCards /></div>
      </div>
    </section>
  );
}
