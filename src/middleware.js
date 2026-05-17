import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Protect Admin Routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    // Strict RBAC: Only Admins/Super Admins can access the CRM
    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/client/dashboard", nextUrl));
    }
  }

  // Protect Lawyer Panel
  if (nextUrl.pathname.startsWith("/lawyer")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    // Strict RBAC: Only Lawyers, Admins, and Super Admins can access the Lawyer Panel
    if (role !== "LAWYER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/client/dashboard", nextUrl));
    }
  }

  // Protect Client Portals
  if (nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/client")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/lawyer/:path*", "/dashboard/:path*", "/client/:path*"],
};
