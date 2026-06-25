import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  const user = session!.user;

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-4xl space-y-6 px-4 py-16 sm:px-6">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back{user.name ? `, ${user.name}` : ""}
            </h1>
            <p className="text-muted-foreground">
              This is the signed-in home for end users. Admins are redirected to
              the admin area after login.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your account</CardTitle>
                <CardDescription>Profile details from your session.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">Role:</span> {user.role}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick links</CardTitle>
                <CardDescription>Explore the template routes.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" render={<Link href="/content" />}>
                  Content
                </Button>
                <Button variant="outline" render={<Link href="/contact" />}>
                  Contact
                </Button>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button type="submit" variant="ghost">
                    Sign out
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
