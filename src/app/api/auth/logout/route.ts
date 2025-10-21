import { deleteSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    deleteSession();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
