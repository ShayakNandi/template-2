'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after auth has finished loading
    if (!loading && !user) {
      console.log('No user found, redirecting to home');
      router.push('/');
    }
  }, [user, loading, router]);

  // Show loading until auth is determined
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Show children only if authenticated
  if (!loading && user) {
    return (
      <div className="h-screen">
        {children}
      </div>
    );
  }

  // Show fallback while redirecting
  return (
    <div className="h-screen flex items-center justify-center">
      <div>Redirecting to login...</div>
    </div>
  );
} 