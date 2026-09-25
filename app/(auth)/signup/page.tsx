import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/layout/AuthShell";
import { ROUTES } from "@/lib/constants";
import { SignupForm } from "@/modules/auth/components/SignupForm";
import { getCurrentUser } from "@/server/auth/guard";

export const metadata: Metadata = { title: "Create an account" };

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect(ROUTES.dashboard(user.role));

  return (
    <AuthShell
      wide
      eyebrow="Get started"
      title="Create your account"
      description="Students get access right away. Teacher accounts are approved by an admin."
    >
      <SignupForm />
    </AuthShell>
  );
}
