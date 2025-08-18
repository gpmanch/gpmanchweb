import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import SignInForm from "./sign-in-form";

export const metadata: Metadata = {
  title: "Login | GP Manch",
  description: "Login to your GP Manch account",
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Sign in to your account"
      alternateHref="/sign-up"
      alternateText="Or"
      alternateCta="create a new account"
    >
      <SignInForm />
    </AuthShell>
  );
}