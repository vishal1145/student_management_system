"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type SearchInputProps = { onSearch: (value: string) => void; placeholder?: string; label?: string; delay?: number };

/** Debounced search box: calls onSearch only after the user pauses typing. */
export function SearchInput({ onSearch, placeholder = "Search…", label = "Search", delay = 350 }: SearchInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => onSearch(value.trim()), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay, onSearch]);

  return (
    <div role="search" className="relative w-full sm:max-w-xs">
      <Icon name="search" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={80}
        className="field-control pl-10"
      />
    </div>
  );
}
