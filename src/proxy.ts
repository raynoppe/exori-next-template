import type { NextRequest } from "next/server";

import { auth } from "@/auth";

export async function proxy(request: NextRequest) {
  return auth(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/orders/:path*",
    "/login",
    "/register",
    "/applanding/portal",
    "/applanding/portal/:path*",
    "/applanding/admin",
    "/applanding/admin/:path*",
  ],
};
