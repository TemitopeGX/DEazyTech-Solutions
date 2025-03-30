import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    // Create a response object that we can modify
    const res = NextResponse.next();

    // Create a Supabase client with the request and response
    const supabase = createMiddlewareClient({ req, res });

    // Refresh the session if needed
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log(
      "Middleware - Session check:",
      session ? "Session exists" : "No session"
    );

    // If accessing admin routes without session, redirect to login
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextUrl.pathname !== "/admin/login"
    ) {
      if (!session) {
        console.log("Middleware - No session, redirecting to login");
        const loginUrl = new URL("/admin/login", req.url);
        const response = NextResponse.redirect(loginUrl);

        // Add cache control headers
        response.headers.set(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");

        return response;
      }
    }

    // If accessing login page with session, redirect to admin dashboard
    if (req.nextUrl.pathname === "/admin/login" && session) {
      console.log("Middleware - Session exists, redirecting to admin");
      const adminUrl = new URL("/admin", req.url);
      const response = NextResponse.redirect(adminUrl);

      // Add cache control headers
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");

      return response;
    }

    // Add cache control headers to all responses
    res.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");

    return res;
  } catch (error) {
    console.error("Middleware - Auth error:", error);

    // On error, redirect to login for admin routes
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextUrl.pathname !== "/admin/login"
    ) {
      const loginUrl = new URL("/admin/login", req.url);
      const response = NextResponse.redirect(loginUrl);

      // Add cache control headers
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");

      return response;
    }

    // Return the original response with cache control headers
    const res = NextResponse.next();
    res.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
    return res;
  }
}

// Update matcher to include all admin routes
export const config = {
  matcher: ["/admin", "/admin/(.*)"],
};
