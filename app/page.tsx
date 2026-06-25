import Link from "next/link";

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

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Exori template
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Next.js starter with auth, admin, and content pages
            </h1>
            <p className="text-lg text-muted-foreground">
              A reusable foundation for Exori-generated projects: public
              marketing pages, user registration, role-based access, and an
              admin area to manage users.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/register" />}>Get started</Button>
              <Button variant="outline" render={<Link href="/content" />}>
                View content page
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Public site</CardTitle>
                <CardDescription>
                  Homepage, content, and contact form out of the box.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" render={<Link href="/contact" />}>
                  Contact us
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>End users</CardTitle>
                <CardDescription>
                  Register, log in, and land on a personal dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" render={<Link href="/dashboard" />}>
                  User dashboard
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Admins</CardTitle>
                <CardDescription>
                  Separate admin area with user management tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" render={<Link href="/admin" />}>
                  Admin area
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
