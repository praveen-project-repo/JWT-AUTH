import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    isAuthenticated: true,
    user: {
      name: session.name,
      email: session.email,
    },
  });
}
