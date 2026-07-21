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
      const role = auth?.user?.role;

      const isGlobalAuthRoute =
        pathname.startsWith("/login") || pathname.startsWith("/register");
      const isPortalAuthRoute =
        pathname === "/applanding/portal/login" ||
        pathname === "/applanding/portal/register";
      const isApplandingAdminLogin = pathname === "/applanding/admin/login";
      const isAuthRoute =
        isGlobalAuthRoute || isPortalAuthRoute || isApplandingAdminLogin;

      const isPortalProtected =
        pathname.startsWith("/applanding/portal") && !isPortalAuthRoute;

      const isShopAdminRoute = pathname.startsWith("/admin");
      const isApplandingAdminRoute =
        pathname.startsWith("/applanding/admin") && !isApplandingAdminLogin;

      const isProtectedRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/orders") ||
        isPortalProtected;

      const isAdminRoute = isShopAdminRoute || isApplandingAdminRoute;

      if (isLoggedIn && isAuthRoute) {
        if (isPortalAuthRoute) {
          return Response.redirect(
            new URL("/applanding/portal/tickets", nextUrl),
          );
        }

        if (isApplandingAdminLogin && role === "ADMIN") {
          return Response.redirect(new URL("/applanding/admin", nextUrl));
        }

        if (isGlobalAuthRoute) {
          const destination =
            role === "ADMIN" ? "/admin" : "/dashboard";
          return Response.redirect(new URL(destination, nextUrl));
        }
      }

      if (!isLoggedIn && (isProtectedRoute || isAdminRoute)) {
        let loginUrl: URL;

        if (isApplandingAdminRoute) {
          loginUrl = new URL("/applanding/admin/login", nextUrl);
        } else if (isPortalProtected) {
          loginUrl = new URL("/applanding/portal/login", nextUrl);
        } else {
          loginUrl = new URL("/login", nextUrl);
        }

        loginUrl.searchParams.set("callbackUrl", pathname);
        return Response.redirect(loginUrl);
      }

      if (isAdminRoute && isLoggedIn && role !== "ADMIN") {
        if (isApplandingAdminRoute) {
          return Response.redirect(
            new URL("/applanding/portal/tickets", nextUrl),
          );
        }

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
