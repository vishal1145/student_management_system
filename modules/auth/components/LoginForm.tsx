"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { PasswordField, TextField } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { ROUTES } from "@/lib/constants";
import { useZodForm } from "@/lib/hooks/useZodForm";
import { ApiError, errorMessage } from "@/lib/http";
import { authApi } from "../api";
import { loginSchema } from "../schemas";

export function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const form = useZodForm(loginSchema, { email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    const input = form.validate();
    if (!input) return;

    setLoading(true);
    try {
      const { user } = await authApi.login(input);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      router.replace(ROUTES.dashboard(user.role));
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && Object.keys(error.fields).length) form.setErrors(error.fields);
      else setFormError(errorMessage(error));
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {formError && <Alert tone="error">{formError}</Alert>}
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="name@example.com"
        required
        {...form.bind("email")}
      />
      <PasswordField label="Password" autoComplete="current-password" placeholder="Your password" required {...form.bind("password")} />
      <Button type="submit" size="lg" block loading={loading} loadingText="Signing in…">Log in</Button>
      <p className="text-center text-label text-muted">
        New here? <Link href={ROUTES.signup} className="font-semibold">Create an account</Link>
      </p>
    </form>
  );
}
