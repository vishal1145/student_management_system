import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "mint";
type Size = "sm" | "md" | "lg";

type StyleOptions = { variant?: Variant; size?: Size; block?: boolean; iconOnly?: boolean; className?: string };

/** Single source of truth for button styling; also used by <LinkButton />. */
export function buttonClass({ variant = "primary", size = "md", block, iconOnly, className }: StyleOptions = {}) {
  return cn(
    "btn",
    `btn-${variant}`,
    size !== "md" && `btn-${size}`,
    block && "btn-block",
    iconOnly && "btn-icon",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  StyleOptions & { loading?: boolean; loadingText?: string };

export function Button({
  variant, size, block, iconOnly, className, loading, loadingText, disabled, children, type = "button", ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, block, iconOnly, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Icon name="loader" size={18} className="spin" />}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & StyleOptions;

export function LinkButton({ variant, size, block, iconOnly, className, ...rest }: LinkButtonProps) {
  return <Link className={buttonClass({ variant, size, block, iconOnly, className })} {...rest} />;
}
