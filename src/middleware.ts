import { type NextRequest, NextResponse } from 'next/server';

// This middleware is now simplified as client-side logic will handle redirects.
// It can be kept for future server-side logic or removed if not needed.

export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
