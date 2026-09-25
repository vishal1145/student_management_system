import { CountUp } from "@/components/effects/CountUp";

const ITEMS = [
  { value: 3, suffix: "", label: "role dashboards" },
  { value: 100, suffix: "%", label: "of requests permission-checked" },
  { value: 2, suffix: "", label: "themes: light and dark" },
  { value: 1, suffix: "", label: "codebase for phone, tablet and desktop" },
];

export function TrustStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-line bg-surface">
      <dl className="container-page grid grid-cols-2 gap-y-6 py-8 lg:grid-cols-4">
        {ITEMS.map((item, index) => (
          <div key={item.label} className="reveal-item px-2 lg:border-l lg:border-line lg:px-8 lg:first:border-l-0 lg:first:pl-0" style={{ ["--i" as string]: index }}>
            <dt className="text-h1 font-extrabold leading-none text-brand"><CountUp value={item.value} suffix={item.suffix} /></dt>
            <dd className="mt-1 text-label text-muted">{item.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
