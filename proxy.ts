import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  if (isDashboardPage && !sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignInPage || isSignUpPage) && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
