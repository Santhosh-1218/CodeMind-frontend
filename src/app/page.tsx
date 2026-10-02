'use client';

import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/landing/Hero';
import { ProductPreview } from '@/components/landing/ProductPreview';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white relative">
      {/* Official Monochrome Background Animation */}
      <AnimatedBackground />

      {/* Main Page Layout Stack */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ProductPreview />
          <HowItWorks />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
