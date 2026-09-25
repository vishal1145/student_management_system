"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + hint + validation message. Every form uses this same structure. */
export function FieldShell({ id, label, required, error, hint, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-label font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-0.5 text-danger" aria-hidden="true">*</span>
        ) : (
          <span className="ml-1.5 text-caption font-medium text-faint">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-caption text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-caption font-medium text-danger">
          <Icon name="xCircle" size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  return hint ? `${id}-hint` : undefined;
}

type CommonProps = { label: string; error?: string; hint?: string; containerClassName?: string };

export function TextField({
  label, error, hint, containerClassName, required, className, ...rest
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={containerClassName}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn("field-control", className)}
        {...rest}
      />
    </FieldShell>
  );
}

export function PasswordField({
  label, error, hint, containerClassName, required, ...rest
}: CommonProps & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={containerClassName}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className="field-control pr-12"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted hover:text-ink"
        >
          <Icon name={visible ? "eyeOff" : "eye"} />
        </button>
      </div>
    </FieldShell>
  );
}

type Option = { value: string; label: string };

export function SelectField({
  label, error, hint, containerClassName, required, options, placeholder, ...rest
}: CommonProps & SelectHTMLAttributes<HTMLSelectElement> & { options: Option[]; placeholder?: string }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={containerClassName}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className="field-control"
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export function TextareaField({
  label, error, hint, containerClassName, required, ...rest
}: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={containerClassName}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className="field-control"
        {...rest}
      />
    </FieldShell>
  );
}
