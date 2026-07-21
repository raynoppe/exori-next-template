import { RegisterForm } from "@/components/forms/register-form";

export default function PortalRegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <RegisterForm
        loginHref="/applanding/portal/login"
        successRedirect="/applanding/portal/login?registered=1"
      />
    </main>
  );
}
