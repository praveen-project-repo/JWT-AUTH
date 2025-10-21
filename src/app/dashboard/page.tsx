'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { CheckCircle, Shield } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) {
    // This will be handled by the layout, but as a fallback
    return null;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome to Your Dashboard</h1>
          <p className="mt-4 text-lg text-muted-foreground">Hello, {user.displayName || user.email}! Your session is active and secure.</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-primary" />
              <span>Authentication Status</span>
            </CardTitle>
            <CardDescription>You are authenticated with Firebase.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold">Session Active</p>
                  <p className="text-sm text-muted-foreground">Your session is managed by Firebase.</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.uid}</p>
                <p className="mt-2">This application demonstrates secure authentication using Firebase. Your session is automatically managed, providing a seamless and secure user experience.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
