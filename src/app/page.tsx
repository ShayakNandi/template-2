'use client';

import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';
import { signInWithGoogle } from '@/lib/firebase/firebaseUtils';
import { useRouter } from 'next/navigation';
import ImageSlider from './components/ImageSlider';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (user) {
        router.push('/chat');
        return;
      }
      
      const result = await signInWithGoogle();
      if (result && result.user) {
        setTimeout(() => {
          router.push('/chat');
        }, 500);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  // Define the images for the slider
  const images = [
    '/images/image-1.jpg',
    '/images/image-2.jpg',
    '/images/image-3.jpg',
    '/images/image-4.jpg',
    '/images/image-5.jpg',
    '/images/image-6.jpg',
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-900 pt-16">
      {/* Header - Improved styling */}
      <header className="bg-gray-950 shadow-xl p-4 flex items-center w-full fixed top-0 left-0 z-10 rounded-b-lg border-b border-gray-800">
        <div className="flex items-center">
          {/* Improved logo */}
          <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">PM</span>
          </div>
          {/* Title removed */}
          {/* <h1 className="text-white font-bold text-2xl ml-2">Philosopher's Mosaic</h1> */}
        </div>
        
        <div className="flex gap-3 ml-auto">
          <button 
            onClick={handleAuth}
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2 rounded-md transition duration-300 font-medium"
          >
            Login
          </button>
          <button 
            onClick={handleAuth}
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2 rounded-md transition duration-300 font-medium"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content - Only Image Slider */}
      <div className="container mx-auto max-w-6xl my-8 flex flex-col justify-center items-center">
        {/* Added title above the image slider */}
        <h1 className="text-4xl font-bold text-white mb-6">Welcome to Philosopher's Mosaic</h1>
        
        {/* Image Slider */}
        <ImageSlider images={images} autoPlayInterval={5000} />
        
        {/* Added description text */}
        <div className="text-center mt-12 mb-16 max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-white">Dialogue Across Time</h2>
          <p className="text-lg mb-4 text-gray-300">
            Welcome to Philosopher's Mosaic, where you can engage in meaningful conversations with 
            history's greatest philosophical minds through advanced AI technology.
          </p>
          <p className="text-lg mb-4 text-gray-300">
            Our platform allows you to chat with Plato, Aristotle, Socrates, Kant, and many other 
            influential thinkers as if they were here today. Ask questions, debate ideas, and gain 
            insights from centuries of philosophical wisdom.
          </p>
          <p className="text-lg text-gray-300">
            Explore different perspectives and deepen your understanding of complex ideas through 
            these AI-powered philosophical conversations.
          </p>
        </div>
      </div>

      {/* Footer - Updated attribution */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>Brought to you by Shaykey Meister</p>
      </footer>
    </main>
  );
}
