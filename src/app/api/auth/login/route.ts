import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Hardcoded user for demonstration
const FAKE_USER = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { email, password } = parsed.data;

    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      await createSession(FAKE_USER.id, FAKE_USER.name, FAKE_USER.email);
      return NextResponse.json({ success: true, user: { name: FAKE_USER.name, email: FAKE_USER.email } }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
