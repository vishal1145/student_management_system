import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/layout/AuthShell";
import { ROUTES } from "@/lib/constants";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { getCurrentUser } from "@/server/auth/guard";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect(ROUTES.dashboard(user.role));

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to your account"
      description="Use the email and password you signed up with."
    >
      <LoginForm />
    </AuthShell>
  );
}
