import { EduBackdrop } from "@/components/effects/EduBackdrop";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: "user", title: "Create your account", text: "Sign up as a student or a teacher. Teacher accounts are approved by an admin first." },
  { icon: "chart", title: "Open your dashboard", text: "After you log in you land on the workspace built for your role, nothing more and nothing less." },
  { icon: "award", title: "Get things done", text: "Add and edit students, record marks, or check your own results and contact details." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section relative scroll-mt-20 overflow-clip">
      <EduBackdrop count={0} />
      <div className="container-page relative z-10 flex flex-col gap-12">
        <div className="reveal max-w-2xl">
          <p className="eyebrow mb-3">How it works</p>
          <h2>From sign up to a working dashboard in three steps</h2>
        </div>
        <ol className="relative grid gap-6 md:grid-cols-3">
          {/* animated dashed path linking the steps (desktop) */}
          <span aria-hidden="true" className="step-path absolute left-[16%] right-[16%] top-[3.1rem] hidden md:block" />
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className={`reveal-item ${index === 0 ? "reveal-left" : index === 2 ? "reveal-right" : ""}`}
              style={{ ["--i" as string]: index === 1 ? 2 : 0 }}
            >
              {/* outer li slides in from its side; inner card then floats gently */}
              <div className="card card-interactive group float-card flex h-full flex-col gap-4 bg-surface/90 backdrop-blur-sm" style={{ ["--d" as string]: `${index * -1.6}s` }}>
                <div className="flex items-center justify-between">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-on-brand shadow-md">
                    <Icon name={step.icon} size={26} />
                    <span className="pulse-dot absolute -right-1 -top-1 h-3 w-3 rounded-full bg-mint" />
                  </span>
                  <span className="text-display font-extrabold leading-none text-brand/25 transition-colors group-hover:text-brand/60">0{index + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p className="text-label text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
