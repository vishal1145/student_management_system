import type { Role, UserStatus } from "@/lib/constants";

export type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
};

export type UserQuery = { search?: string; role?: string; status?: string; page?: number };
