'use client';

import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';
import { signInWithGoogle } from '@/lib/firebase/firebaseUtils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    try {
      // If user is already logged in, navigate to chat
      if (user) {
        router.push('/chat');
        return;
      }
      
      // Otherwise sign in with Google
      const result = await signInWithGoogle();
      
      // Only redirect if authentication succeeded
      if (result && result.user) {
        // Add a small delay to ensure Firebase auth state is updated
        setTimeout(() => {
          router.push('/chat');
        }, 500);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-200">
      {/* Header */}
      <header className="bg-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo placeholder */}
          <div className="h-8 w-8 bg-indigo-500 rounded-full"></div>
        </div>
        
        <div className="flex-1 text-center">
          <h1 className="text-gray-800 font-medium text-xl">Welcome to Philosopher's Mosaic</h1>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleAuth}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button 
            onClick={handleAuth}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl">
          {/* Plato SVG */}
          <div className="w-64 h-64 flex-shrink-0 relative">
            <Image
              src="/images/plato_6.svg"
              alt="Plato illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Text content */}
          <div className="max-w-xl text-center md:text-left">
            <div className="mb-6">
              <p className="mb-4">
                Engage in profound discussions with history's greatest philosophical minds.
                Explore complex ideas, challenge your thinking, and gain insights from the
                wisdom of the ages.
              </p>
              <p className="mb-4">
                Philosopher's Mosaic brings the brilliance of Plato, Aristotle, Socrates,
                and many more directly to your conversations.
              </p>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <button 
                onClick={handleAuth}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>Brought to you by StudyMeister</p>
      </footer>
    </main>
  );
}
