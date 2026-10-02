'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/landing/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/ui/Loading';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#09090b] items-center justify-center">
        <Loading message="Authenticating session..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b]">
      {/* Top horizontal navigation bar. NO PERMANENT LEFT SIDEBAR */}
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
