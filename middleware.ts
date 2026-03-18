import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED = ["/_next", "/favicon", "/api"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow static assets
    const isAllowed = ALLOWED.some(p => pathname.startsWith(p));
    if (isAllowed) return NextResponse.next();

    // Allow only root "/" — everything else redirects to "/"
    if (pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.mp4|.*\\.webp).*)",
    ],
};