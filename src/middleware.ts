import { type NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix));

  const sessionCookie = req.cookies.get('session-token')?.value;
  const session = await decrypt(sessionCookie);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (
    publicRoutes.some((prefix) => path.startsWith(prefix)) &&
    session
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
