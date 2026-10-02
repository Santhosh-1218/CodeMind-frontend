'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, FileArchive, Brain, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Hindsight Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-zinc-800 text-xs text-zinc-300 mb-8 animate-in fade-in slide-in-from-bottom-2 shadow-lg">
          <Brain className="w-4 h-4 text-white" />
          <span className="font-semibold text-white">Hindsight Memory Powered</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">Continuous AI Learning</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto uppercase leading-[1.08] mb-6">
          AI Code Review <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            That Learns.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          CodeMind reviews your codebase, remembers past security vulnerabilities and developer conventions, and improves future reviews using persistent Hindsight vector memory.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 font-mono">
          <Link href="/app">
            <Button size="lg" variant="primary" className="w-full sm:w-auto font-bold px-8 py-4 text-base shadow-xl">
              Start Free Review <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-base font-semibold border-zinc-700 hover:bg-zinc-800">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Supported Inputs Badges */}
        <div className="pt-8 border-t border-zinc-800/60 max-w-3xl mx-auto font-mono">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-bold">Supported Input Methods & Integrations</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2 bg-[#121215] border border-zinc-800 px-4 py-2.5 rounded-xl shadow-md">
              <Github className="w-4 h-4 text-white" />
              <span>Public GitHub Repositories</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121215] border border-zinc-800 px-4 py-2.5 rounded-xl shadow-md">
              <FileArchive className="w-4 h-4 text-zinc-300" />
              <span>ZIP Code Uploads</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121215] border border-zinc-800 px-4 py-2.5 rounded-xl shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Groq LLM Reasoning</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121215] border border-zinc-800 px-4 py-2.5 rounded-xl shadow-md">
              <Brain className="w-4 h-4 text-white" />
              <span>Hindsight Vector Bank</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
