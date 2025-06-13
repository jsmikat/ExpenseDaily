import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard"]);

export default clerkMiddleware((auth, req) => {
  const { sessionId } = auth();
  const { pathname } = req.nextUrl;

  if (isProtectedRoute(req) && !sessionId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (pathname === "/" && sessionId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if ((pathname === "/sign-in" || pathname === "/sign-up") && sessionId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
