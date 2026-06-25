import { Suspense } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
