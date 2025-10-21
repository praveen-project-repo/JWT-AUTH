import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}

export async function createSession(userId: string, name: string, email: string) {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const session = await encrypt({ userId, name, email, expiresAt });

  cookies().set('session-token', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const sessionCookie = cookies().get('session-token')?.value;
  const session = await decrypt(sessionCookie);
  
  if (!session) {
    return null;
  }
  
  return session;
}

export function deleteSession() {
  cookies().delete('session-token');
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session-token")?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 15 * 60 * 1000);
    const newSession = await encrypt({ ...payload, expires });
    
    const res = new Response(null);
    res.cookies.set({
        name: "session-token",
        value: newSession,
        httpOnly: true,
        expires,
    });
    return res;
}
