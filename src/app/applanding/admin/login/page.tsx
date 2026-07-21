import { Suspense } from "react";

import { LoginForm } from "@/components/forms/login-form";

export default function ApplandingAdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Suspense>
        <LoginForm
          defaultCallbackUrl="/applanding/admin"
          registerHref="/register"
          title="Admin sign in"
          description="Sign in with an administrator account to manage the applanding site."
        />
      </Suspense>
    </main>
  );
}
