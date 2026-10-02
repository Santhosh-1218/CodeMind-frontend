'use client';

import React from 'react';
import { ReviewWorkspace } from '@/components/review/ReviewWorkspace';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';

export default function AppPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b] overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <ReviewWorkspace />
      </div>
    </div>
  );
}

