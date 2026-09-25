export const APP_NAME = "Campus Ledger";
export const APP_TAGLINE = "Student management, kept simple.";

export const ROLES = ["admin", "teacher", "student"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  teacher: "Teacher",
  student: "Student",
};

/** Roles anyone may pick on the public signup form (admins are created by seed only). */
export const SIGNUP_ROLES = ["student", "teacher"] as const;

export const USER_STATUSES = ["active", "pending", "disabled"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const GENDERS = ["female", "male", "other"] as const;
export const STUDENT_STATUSES = ["active", "inactive"] as const;
export const GRADES = ["6", "7", "8", "9", "10", "11", "12"] as const;
export const TERMS = ["Term 1", "Term 2", "Term 3", "Final"] as const;

export const PAGE_SIZE = 8;

export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  dashboard: (role: Role) => `/${role}`,
} as const;
