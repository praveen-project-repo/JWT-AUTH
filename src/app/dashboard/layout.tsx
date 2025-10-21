'use client';
import { UserNav } from '@/components/auth/user-nav';
import { useUser } from '@/firebase';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Settings,
  Activity,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading, userError } = useUser();
  const { auth } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user) {
      redirect('/login');
    }
  }, [user, isUserLoading]);

  async function handleLogout() {
    try {
      await auth.signOut();
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An error occurred during logout.',
      });
    }
  }

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen">
        <Skeleton className="hidden md:block w-64" />
        <div className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-card">
            <div className="container mx-auto flex h-16 items-center justify-end px-4 sm:px-6 lg:px-8">
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </header>
          <main className="p-4 sm:p-6 lg:p-8">
            <Skeleton className="h-96 w-full" />
          </main>
        </div>
      </div>
    );
  }

  if (userError) {
    return <div>Error loading user. Please try logging in again.</div>;
  }

  if (!user) {
    return null; // Or a redirect component, though useEffect handles it
  }

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/activity', label: 'Activity', icon: Activity },
    { href: '/dashboard/users', label: 'Users', icon: Users },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <span>
                      <item.icon />
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1" />
            <UserNav user={user} />
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
