"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { SiteFooter } from "./SiteFooter";

const HIDDEN_ON: string[] = [ROUTES.login, ROUTES.signup];

/** The footer shows on every page except login and signup, which fill the whole screen. */
export function AppFooter() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <SiteFooter />;
}
