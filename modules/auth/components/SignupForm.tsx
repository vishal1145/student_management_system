"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button, LinkButton } from "@/components/ui/Button";
import { PasswordField, TextField } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { ROUTES } from "@/lib/constants";
import { useZodForm } from "@/lib/hooks/useZodForm";
import { ApiError, errorMessage } from "@/lib/http";
import { authApi } from "../api";
import { signupSchema } from "../schemas";
import { RoleChoice } from "./RoleChoice";

export function SignupForm() {
  const router = useRouter();
  const toast = useToast();
  const form = useZodForm(signupSchema, { name: "", email: "", password: "", confirmPassword: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [awaitingApproval, setAwaitingApproval] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    const input = form.validate();
    if (!input) return;

    setLoading(true);
    try {
      const result = await authApi.signup(input);
      if (result.needsApproval) {
        setAwaitingApproval(true);
        toast.success("Account created. An admin will review it shortly.");
        return;
      }
      toast.success("Account created. Welcome aboard!");
      router.replace(ROUTES.dashboard(result.user.role));
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && Object.keys(error.fields).length) form.setErrors(error.fields);
      else setFormError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  if (awaitingApproval) {
    return (
      <div className="flex flex-col gap-4">
        <Alert tone="success" title="Thanks for signing up">
          Your teacher account is waiting for admin approval. You will be able to log in as soon as it is approved.
        </Alert>
        <LinkButton href={ROUTES.login} variant="secondary" block>
          Back to log in
        </LinkButton>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2 sm:gap-x-5">
      {formError && (
        <div className="sm:col-span-2">
          <Alert tone="error">{formError}</Alert>
        </div>
      )}
      <div className="sm:col-span-2">
        <RoleChoice value={form.values.role} onChange={(role) => form.setField("role", role)} error={form.errors.role} />
      </div>
      <TextField label="Full name" autoComplete="name" placeholder="e.g. Priya Sharma" required {...form.bind("name")} />
      <TextField label="Email" type="email" autoComplete="email" inputMode="email" placeholder="name@example.com" required {...form.bind("email")} />
      <PasswordField
        label="Password"
        autoComplete="new-password"
        hint="At least 8 characters with an uppercase letter, a lowercase letter and a number."
        required
        {...form.bind("password")}
      />
      <PasswordField label="Confirm password" autoComplete="new-password" required {...form.bind("confirmPassword")} />
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" block loading={loading} loadingText="Creating account…">
          Create account
        </Button>
      </div>
      <p className="text-center text-label text-muted sm:col-span-2">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="font-semibold">
          Log in
        </Link>
      </p>
    </form>
  );
}
