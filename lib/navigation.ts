import type { Role } from "@/lib/constants";
import type { IconName } from "@/components/ui/Icon";

export type NavItem = { href: string; label: string; icon: IconName };

/** Sidebar links shown on each role's dashboard. */
export const DASHBOARD_NAV: Record<Role, NavItem[]> = {
  admin: [
    { href: "/admin", label: "Overview", icon: "chart" },
    { href: "/admin/users", label: "Users", icon: "users" },
    { href: "/admin/students", label: "Students", icon: "book" },
  ],
  teacher: [
    { href: "/teacher", label: "Overview", icon: "chart" },
    { href: "/teacher/students", label: "Students", icon: "book" },
  ],
  student: [
    { href: "/student", label: "Overview", icon: "chart" },
    { href: "/student/profile", label: "My profile", icon: "user" },
  ],
};
