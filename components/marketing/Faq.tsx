"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const QUESTIONS = [
  ["Who can create an admin account?", "Admin accounts cannot be created from the sign-up page. They are created by the person who sets up the system, so nobody can make themselves an admin."],
  ["How do teachers get access?", "A teacher signs up and waits. An admin reviews the request in the Users page and approves it, and then the teacher can log in."],
  ["Can a student see other students?", "No. A student only ever receives their own profile and results. This is enforced on the server, not just hidden in the screen."],
  ["Is the data safe?", "Passwords are hashed with a salt, sessions are signed and stored in secure cookies, and repeated wrong passwords lock the account for a while."],
  ["Does it work on my phone?", "Yes. Every page adapts to phones, tablets and desktops, and tables turn into cards on small screens. Light and dark themes are both supported."],
] as const;

/** FAQ as a chat: pick a question, the assistant "types" and then answers. */
export function Faq() {
  const [active, setActive] = useState(0);
  const [typing, setTyping] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  function choose(index: number) {
    if (index === active) return;
    clearTimeout(timer.current);
    setActive(index);
    setTyping(true);
    timer.current = setTimeout(() => setTyping(false), 800);
  }

  const [question, answer] = QUESTIONS[active];

  return (
    <section id="faq" className="section relative scroll-mt-20 overflow-clip border-t border-line bg-surface">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="reveal-item reveal-left">
          <p className="eyebrow mb-3">FAQ</p>
          <h2>Ask away. We already have the answers.</h2>
          <p className="mt-3 text-body text-muted">Pick a question and get a straight reply.</p>
          <div className="mt-6 flex flex-wrap gap-2.5" role="group" aria-label="Choose a question">
            {QUESTIONS.map(([q], index) => (
              <button
                key={q}
                type="button"
                aria-pressed={index === active}
                onClick={() => choose(index)}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-left text-label font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
                  index === active ? "border-brand bg-brand text-on-brand shadow-md" : "border-line bg-paper text-ink hover:border-brand",
                )}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal-item reveal-right card-pad rounded-3xl border border-line bg-paper shadow-md" style={{ ["--card-pad" as string]: "1.25rem" }}>
          <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand text-on-brand"><Icon name="cap" size={20} /></span>
            <div>
              <p className="text-label font-bold text-ink">Campus Ledger help</p>
              <p className="flex items-center gap-1.5 text-caption text-muted"><span className="pulse-dot h-2 w-2 rounded-full bg-mint" /> Online now</p>
            </div>
          </div>
          <div className="flex min-h-64 flex-col gap-4" aria-live="polite">
            <div key={`q-${active}`} className="fade-up ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-3 text-label font-medium text-on-brand">{question}</div>
            {typing ? (
              <div className="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-bl-md bg-sunken px-4 py-4" aria-label="Typing">
                {[0, 1, 2].map((dot) => <span key={dot} className="bob h-2 w-2 rounded-full bg-faint" style={{ ["--d" as string]: `${dot * 0.15}s` }} />)}
              </div>
            ) : (
              <div key={`a-${active}`} className="fade-up max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 text-body text-muted">{answer}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
