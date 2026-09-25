"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon } from "./Icon";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  wide?: boolean;
  footer?: ReactNode;
  children: ReactNode;
};

/** Built on the native <dialog>: focus trap, Esc to close and inert background come for free. */
export function Modal({ open, onClose, title, description, wide, footer, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={cn("modal", wide && "modal-wide")}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {open && (
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line p-5">
            <div className="min-w-0">
              <h2 id={titleId} className="text-h3">{title}</h2>
              {description && <p className="mt-1 text-label text-muted">{description}</p>}
            </div>
            <Button variant="ghost" size="sm" iconOnly onClick={onClose} aria-label="Close dialog">
              <Icon name="x" />
            </Button>
          </div>
          <div className="p-5">{children}</div>
          {footer && <div className="flex flex-wrap justify-end gap-3 border-t border-line p-5">{footer}</div>}
        </div>
      )}
    </dialog>
  );
}
