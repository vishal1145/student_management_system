import type { LoginInput, SignupInput } from "@/modules/auth/schemas";
import type { SessionUser, SignupResult } from "@/modules/auth/types";
import { assertNotLocked, clearFailures, recordFailure } from "@/server/auth/attempts";
import { fakeVerify, hashPassword, verifyPassword } from "@/server/auth/password";
import { setSessionCookie } from "@/server/auth/session";
import { HttpError } from "@/server/http";
import { studentsRepo } from "@/server/repositories/students";
import { toSessionUser, usersRepo } from "@/server/repositories/users";

const BAD_LOGIN = "Incorrect email or password.";

export async function signup(input: SignupInput): Promise<SignupResult> {
  if (await usersRepo.findByEmail(input.email)) {
    throw new HttpError(409, "email_taken", "An account with this email already exists.", {
      email: "An account with this email already exists",
    });
  }

  // Students are active straight away; teachers wait for an admin to approve them.
  const status = input.role === "teacher" ? "pending" : "active";
  const id = await usersRepo.create({
    name: input.name,
    email: input.email,
    passwordHash: await hashPassword(input.password),
    role: input.role,
    status,
  });

  if (input.role === "student") {
    // Attach to a record a teacher may already have created for this email, else start a new one.
    const existing = await studentsRepo.findByEmail(input.email);
    if (existing && !existing.userId) await studentsRepo.linkUser(existing.id, id);
    else if (!existing) await studentsRepo.create({ fullName: input.name, email: input.email }, id);
    await setSessionCookie(id);
  }

  const row = await usersRepo.findById(id);
  return { user: toSessionUser(row!), needsApproval: status === "pending" };
}

export async function login(input: LoginInput): Promise<SessionUser> {
  await assertNotLocked(input.email);
  const row = await usersRepo.findByEmail(input.email);

  if (!row) {
    await fakeVerify(input.password);
    await recordFailure(input.email);
    throw new HttpError(401, "bad_credentials", BAD_LOGIN);
  }
  if (!(await verifyPassword(input.password, row.password_hash))) {
    await recordFailure(input.email);
    throw new HttpError(401, "bad_credentials", BAD_LOGIN);
  }

  // Status is only revealed after the password is proven correct.
  if (row.status === "pending") {
    throw new HttpError(403, "pending", "Your teacher account is waiting for admin approval. You can sign in once it is approved.");
  }
  if (row.status === "disabled") {
    throw new HttpError(403, "disabled", "This account has been disabled. Please contact the administrator.");
  }

  await clearFailures(input.email);
  await setSessionCookie(row.id);
  return toSessionUser(row);
}
