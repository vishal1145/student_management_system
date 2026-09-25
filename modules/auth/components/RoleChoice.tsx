import { cn } from "@/lib/cn";
import { ROLE_LABELS, SIGNUP_ROLES } from "@/lib/constants";

const DESCRIPTIONS = {
  student: "See your profile and results.",
  teacher: "Manage students. Needs admin approval.",
} as const;

type RoleChoiceProps = { value: string; onChange: (value: string) => void; error?: string };

/** Radio cards for picking a role on signup (admins can only be created by seeding). */
export function RoleChoice({ value, onChange, error }: RoleChoiceProps) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-label font-semibold text-ink">
        I am a <span className="text-danger" aria-hidden="true">*</span>
      </legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SIGNUP_ROLES.map((role) => (
          <label
            key={role}
            className={cn(
              "flex min-h-16 cursor-pointer flex-col justify-center gap-0.5 rounded-xl border p-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
              value === role ? "border-brand bg-brand-soft ring-1 ring-brand" : "border-outline bg-surface hover:border-control",
            )}
          >
            <input
              type="radio"
              name="role"
              value={role}
              checked={value === role}
              onChange={() => onChange(role)}
              className="sr-only"
            />
            <span className="text-label font-bold text-ink">{ROLE_LABELS[role]}</span>
            <span className="text-caption text-muted">{DESCRIPTIONS[role]}</span>
          </label>
        ))}
      </div>
      {error && <p role="alert" className="text-caption font-medium text-danger">{error}</p>}
    </fieldset>
  );
}
