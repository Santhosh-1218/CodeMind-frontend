'use client';

import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white relative">
      {/* Black & White Background Canvas Animation */}
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
}
