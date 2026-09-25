import type { Role, UserStatus } from "@/lib/constants";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
};

export type SignupResult = { user: SessionUser; needsApproval: boolean };
