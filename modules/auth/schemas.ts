import { z } from "zod";
import { SIGNUP_ROLES } from "@/lib/constants";
import { emailField, nameField, passwordField } from "@/lib/validation/common";

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required").max(72),
});

export const signupSchema = z
  .object({
    name: nameField,
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(SIGNUP_ROLES, { error: "Choose how you will use the system" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
