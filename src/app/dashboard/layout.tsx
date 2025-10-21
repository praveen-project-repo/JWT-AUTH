'use client';
import { UserNav } from '@/components/auth/user-nav';
import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading, userError } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      redirect('/login');
    }
  }, [user, isUserLoading]);

  if (isUserLoading) {
    return (
       <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold text-primary">AuthRenew</h1>
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </header>
        <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-8">
             <div className="text-center">
                <Skeleton className="h-10 w-1/2 mx-auto" />
                <Skeleton className="h-6 w-1/3 mx-auto mt-4" />
             </div>
             <Skeleton className="h-64 w-full" />
          </div>
        </main>
      </div>
    );
  }
  
  if (userError) {
    return <div>Error loading user. Please try logging in again.</div>
  }

  if (!user) {
    return null; // Or a redirect component, though useEffect handles it
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-primary">AuthRenew</h1>
          <UserNav user={user} />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
