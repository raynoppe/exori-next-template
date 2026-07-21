import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <RegisterForm />
      </main>
      <SiteFooter />
    </>
  );
}
