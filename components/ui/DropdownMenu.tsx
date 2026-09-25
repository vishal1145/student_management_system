"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

export type MenuItem =
  | { label: string; icon?: IconName; href: string }
  | { label: string; icon?: IconName; onSelect: () => void };

type DropdownMenuProps = { trigger: ReactNode; triggerLabel: string; items: MenuItem[]; header?: ReactNode };

const ITEM_CLASS =
  "flex w-full min-h-11 items-center gap-3 rounded-md px-3 text-left text-label font-medium text-ink hover:bg-sunken";

export function DropdownMenu({ trigger, triggerLabel, items, header }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={triggerLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 items-center gap-2 rounded-md px-1.5 hover:bg-sunken"
      >
        {trigger}
        <Icon name="chevronDown" size={16} className="text-muted" />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-line bg-surface p-2 shadow-lg"
        >
          {header && <div className="mb-1 border-b border-line px-3 pb-3 pt-2">{header}</div>}
          {items.map((item) =>
            "href" in item ? (
              <Link key={item.label} href={item.href} role="menuitem" className={ITEM_CLASS} onClick={() => setOpen(false)}>
                {item.icon && <Icon name={item.icon} size={18} />}
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={ITEM_CLASS}
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
              >
                {item.icon && <Icon name={item.icon} size={18} />}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
