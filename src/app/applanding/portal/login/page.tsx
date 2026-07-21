import { Suspense } from "react";

import { LoginForm } from "@/components/forms/login-form";

export default function PortalLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Suspense>
        <LoginForm
          defaultCallbackUrl="/applanding/portal/tickets"
          registerHref="/applanding/portal/register"
          title="Portal sign in"
          description="Sign in to view and manage your support tickets."
        />
      </Suspense>
    </main>
  );
}
