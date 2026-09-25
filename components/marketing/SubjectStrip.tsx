const ITEMS = ["Student records", "Marks and results", "Class filters", "Guardian details", "Teacher approvals", "Role dashboards", "Term reports", "Secure sign in", "Search by name or ID", "Light and dark mode"];

/** Slow scrolling strip of what the system covers. Pauses on hover. */
export function SubjectStrip() {
  return (
    <div aria-hidden="true" className="border-b border-line bg-surface py-4">
      <div className="marquee">
        <div className="marquee-track">
          {[...ITEMS, ...ITEMS].map((item, index) => (
            <span key={index} className="flex items-center gap-10 whitespace-nowrap text-label font-bold text-muted">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
