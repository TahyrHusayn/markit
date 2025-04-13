import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect authenticated users from login and signup based on their role
  if (
    token &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))
  ) {
    const role = token?.role as string | undefined;
    if (role === "STUDENT") {
      return NextResponse.redirect(new URL("/home", request.url));
    } else if (role === "ADMIN" || role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Handle other roles or cases if needed, perhaps redirecting to a default page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Handle access to /home (for students only)
  if (url.pathname.startsWith("/home")) {
    if (token) {
      const role = token?.role as string | undefined;
      if (role === "STUDENT") {
        return NextResponse.next();
      } else {
        // Redirect admins and super admins from /home to /dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else {
      // Redirect unauthenticated users from /home to /login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Handle access to /dashboard (for admins and super admins only)
  if (url.pathname.startsWith("/dashboard")) {
    if (token) {
      const role = token?.role as string | undefined;
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return NextResponse.next();
      } else {
        // Redirect students from /dashboard to /home
        return NextResponse.redirect(new URL("/home", request.url));
      }
    } else {
      // Redirect unauthenticated users from /dashboard to /login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next(); // Allow access to other routes by default
}

export const config = {
  matcher: ["/login", "/signup", "/home", "/dashboard"],
};