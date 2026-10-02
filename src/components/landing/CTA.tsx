'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Brain } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0d0d10] to-[#09090b] border-t border-zinc-800 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex p-3 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6">
          <Brain className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
          Ready to review your code?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8">
          Join developers using CodeMind to review code, eliminate security flaws, and retain persistent AI review memory.
        </p>
        <Link href="/app">
          <Button size="lg" variant="primary" className="px-8 py-4 text-base font-semibold">
            Start Reviewing Now <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
