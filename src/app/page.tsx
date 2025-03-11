'use client';

import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';
import { signInWithGoogle } from '@/lib/firebase/firebaseUtils';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    try {
      // If user is already logged in, just navigate to dashboard
      if (user) {
        router.push('/dashboard');
        return;
      }
      
      // Otherwise sign in with Google
      await signInWithGoogle();
      // After successful login, redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
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

      {/* Updated Main Content with better centering */}
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl">
          {/* Replace placeholder with Plato SVG */}
          <div className="w-64 h-64 flex-shrink-0 relative">
            <Image
              src="/images/plato_6.svg"
              alt="Plato illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Text content - centered */}
          <div className="max-w-xl text-center md:text-left">
            <div className="mb-6">
              <p className="mb-4">
                Tollere odium autem in nostra potestate sint, ab omnibus et
                contra naturam transferre in nobis. Sed interim tuo
                desiderio supprimenti: si vis aliqua quae in manu tua tibi
                necesse confudentur et quae, quod laudabile esset, nihil
                tamen possides.
              </p>
              <p className="mb-4">
                Oportet uti solum de actibus prosequionem et fugam, haec
                leniter et blandus et reservato.
              </p>
              <p className="mb-4">
                Quae tibi placent quicunq prosunt aut diligebat multum, quod
                memor sis ad communis sunt ab initio minima. Quod si,
                exempli gratia, cupidam rerum in propria sunt ceramic
                calices, admoneris te saxum Ceramic, quod sit generalis
                nocuit, in puius es tu cupidium. Deinde, si exempli, non
                turbarentur.
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
