"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Light Gray */}
      <header className="bg-gray-200 p-4">
        {/* Empty header as requested */}
      </header>

      {/* Main Body - Black with centered text */}
      <main className="flex-grow bg-black flex items-center justify-center text-white">
        <p className="text-xl">You have logged in successfully</p>
      </main>
    </div>
  );
};

export default Dashboard; 