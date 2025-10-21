
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Loader2, Mail } from 'lucide-react';
import { useFirebase } from '@/firebase';
import { 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const resetSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type View = 'signIn' | 'signUp' | 'resetPassword';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<View>('signIn');
  const { auth } = useFirebase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (view === 'signUp') {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: 'Sign Up Successful',
          description: "You've created a new account. Please sign in.",
        });
        setView('signIn'); 
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
      let description = 'An unexpected error occurred.';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            description = 'Invalid email or password. Please try again or sign up.';
            break;
          case 'auth/email-already-in-use':
            description = 'This email is already in use. Please sign in.';
            break;
          default:
            description = error.message;
        }
      }
      toast({
        variant: 'destructive',
        title: view === 'signUp' ? 'Sign Up Failed' : 'Login Failed',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onResetPassword(values: z.infer<typeof resetSchema>) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your inbox for a link to reset your password.',
      });
      setView('signIn');
    } catch (error) {
      console.error(error);
      let description = "We couldn't send a reset link. Please check the email address.";
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found') {
          description = "No account found with this email. Please sign up instead.";
        }
      }
      toast({
        variant: 'destructive',
        title: 'Failed to Send Reset Email',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (view === 'resetPassword') {
    return (
      <Form {...resetForm}>
        <form onSubmit={resetForm.handleSubmit(onResetPassword)} className="space-y-6">
          <FormField
            control={resetForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Send Password Reset Link
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => setView('signIn')}
          >
            Back to Sign In
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {view === 'signIn' && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-sm"
              onClick={() => setView('resetPassword')}
            >
              Forgot Password?
            </Button>
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          {view === 'signUp' ? 'Sign Up' : 'Sign In'}
        </Button>

        <Button
          type="button"
          variant="link"
          className="w-full"
          onClick={() => setView(view === 'signIn' ? 'signUp' : 'signIn')}
        >
          {view === 'signIn'
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </Button>
      </form>
    </Form>
  );
}
