import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Register | GP Manch",
  description: "Create your GP Manch account",
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      alternateHref="/sign-in"
      alternateText="Or"
      alternateCta="Sign in to your account"
    >
      <SignUpForm />
    </AuthShell>
  );
}