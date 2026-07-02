import type { NextAuthConfig } from "next-auth";

import type { Role } from "@/lib/generated/prisma/client";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const pathname = nextUrl.pathname;
      const isLoggedIn = !!auth?.user;
      const isAuthRoute =
        pathname.startsWith("/login") || pathname.startsWith("/register");
      const isProtectedRoute =
        pathname.startsWith("/dashboard") || pathname.startsWith("/orders");
      const isAdminRoute = pathname.startsWith("/admin");

      if (isLoggedIn && isAuthRoute) {
        const destination =
          auth.user.role === "ADMIN" ? "/admin" : "/dashboard";
        return Response.redirect(new URL(destination, nextUrl));
      }

      if (!isLoggedIn && (isProtectedRoute || isAdminRoute)) {
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return Response.redirect(loginUrl);
      }

      if (isAdminRoute && isLoggedIn && auth.user.role !== "ADMIN") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
