'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, ShieldCheck, Zap, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { SignupForm } from '@/components/auth/SignupForm';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';

export default function SignupPage() {
  return (
    <div className="relative min-h-screen bg-[#09090b] flex flex-col justify-between overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Column: Official Branding & Feature Tiles */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-12 lg:p-16 border-r border-zinc-800/80 bg-[#0c0c0e]/60 backdrop-blur-xl relative">
          {/* Top Brand Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-black shadow-lg group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white font-mono group-hover:text-emerald-400 transition-colors">
                  CodeMind
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Enterprise AI Review</span>
              </div>
            </Link>
          </div>

          {/* Center Content & Feature Tiles */}
          <div className="space-y-8 max-w-lg my-auto">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Start Free Trial
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight font-mono uppercase leading-tight">
                Join 10,000+ Developers Elevating Code Quality
              </h1>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                Build better software faster with persistent vector memory, AST-verified code findings, and instant static analysis reports.
              </p>
            </div>

            {/* Feature Tiles Grid */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#121215]/90 border border-zinc-800/90 space-y-1.5 shadow-xl hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" /> AST Verification
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">Zero false-positives with line-level AST evidence checking.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121215]/90 border border-zinc-800/90 space-y-1.5 shadow-xl hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Brain className="w-4 h-4" /> Memory Store
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">Continuous learning retained in Hindsight vector memory bank.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121215]/90 border border-zinc-800/90 space-y-1.5 shadow-xl hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Zap className="w-4 h-4" /> Real-Time Analytics
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">Multi-curve score progression graphs across 4 dimensions.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121215]/90 border border-zinc-800/90 space-y-1.5 shadow-xl hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Instant Reports
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">Interactive issue workspace with line code diff & fix recommendations.</p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="text-[11px] font-mono text-zinc-500">
            © 2026 CodeMind AI Inc. All rights reserved.
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 min-h-screen">
          {/* Mobile Top Logo Bar */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-black">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-lg text-white font-mono">CodeMind</span>
            </Link>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}


