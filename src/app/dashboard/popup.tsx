'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { logoutUser } from '@/lib/firebase/firebaseUtils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button 
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
        
        {user && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <div className="mb-4">
              <p><strong>Name:</strong> {user.displayName || 'N/A'}</p>
              <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            </div>
            <p className="text-sm text-gray-400">
              You are now logged in with your Google account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 