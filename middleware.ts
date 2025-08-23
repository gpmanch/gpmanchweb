import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./lib/auth-client";

export default async function middleware(request: NextRequest) {
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
  ];

  // Checking if the current route is public or should be ignored
  const isPublic = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isPublic) {
    return NextResponse.next();
  }

  // Ensuring user is authenticated
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ]
};