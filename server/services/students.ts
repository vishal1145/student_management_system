import type { StudentInput } from "@/modules/students/schemas";
import { HttpError } from "@/server/http";
import { studentsRepo } from "@/server/repositories/students";
import { usersRepo } from "@/server/repositories/users";

const emailTaken = () =>
  new HttpError(409, "email_taken", "Another student already uses this email.", {
    email: "Another student already uses this email",
  });

export async function createStudent(input: StudentInput) {
  if (await studentsRepo.findByEmail(input.email)) throw emailTaken();

  // If this person already signed up as a student, connect the two so they see their own record.
  const account = await usersRepo.findByEmail(input.email);
  let userId: string | null = null;
  if (account?.role === "student" && !(await studentsRepo.findByUserId(account.id))) userId = account.id;

  const id = await studentsRepo.create(input, userId);
  return studentsRepo.findById(id);
}

export async function updateStudent(id: string, input: StudentInput) {
  const current = await studentsRepo.findById(id);
  if (!current) throw new HttpError(404, "not_found", "Student not found.");

  const clash = await studentsRepo.findByEmail(input.email);
  if (clash && clash.id !== id) throw emailTaken();

  await studentsRepo.update(id, input);
  return studentsRepo.findById(id);
}
