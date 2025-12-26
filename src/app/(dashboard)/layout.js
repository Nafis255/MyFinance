'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Jika belum login, tendang ke login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
  }

  // Jika user belum login (sedang redirect), jangan tampilkan apapun dulu
  if (!user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <main className="py-6">
        {children}
      </main>
    </div>
  );
}