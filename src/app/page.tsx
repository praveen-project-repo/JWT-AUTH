import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const hasSession = cookies().has('session-token');

  if (hasSession) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
