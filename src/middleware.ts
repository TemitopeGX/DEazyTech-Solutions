import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  const publicPaths = ["/dashboard_deazytech/login"];

  // Check if the path starts with /dashboard_deazytech
  const isAdminPath = pathname.startsWith("/dashboard_deazytech");
  const isPublicPath = publicPaths.includes(pathname);

  // If trying to access admin page without token
  if (isAdminPath && !isPublicPath && !token) {
    const loginUrl = new URL("/dashboard_deazytech/login", request.url);
    // Only redirect if not already on the login page
    if (pathname !== loginUrl.pathname) {
      return NextResponse.redirect(loginUrl);
    }
  }

  // If trying to access login page with token
  if (isPublicPath && token) {
    const adminUrl = new URL("/dashboard_deazytech", request.url);
    // Only redirect if not already on the admin page
    if (pathname !== adminUrl.pathname) {
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run only on admin routes
export const config = {
  matcher: "/dashboard_deazytech/:path*",
};
