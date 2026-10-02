'use client';

import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/landing/Footer';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';
import { Brain, Code2, ShieldCheck, Sparkles, Cpu, Layers, GitBranch, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white relative">
      {/* Black & White Background Canvas Animation */}
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-in fade-in">
          {/* Hero Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto font-mono">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              About CodeMind AI
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              The AI Code Reviewer Agent that Remembers, Learns, and Verifies Every Single Finding with Zero Hallucination.
            </p>
          </div>

          {/* 3 Core Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Problem with Stateless Reviewers */}
            <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl flex flex-col justify-between hover:border-zinc-600 transition-colors">
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-[#18181b] border border-zinc-700 text-white w-fit shadow-md">
                  <Brain className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-white font-mono">
                  The Problem with Stateless AI Reviewers
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Traditional AI code review tools operate in a stateless vacuum. Every time you submit a repository or pull request, the model evaluates your code from scratch. It forgets past architectural decisions, repeatedly flags false positives your team already addressed, and fails to learn from past security vulnerabilities.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400 flex items-center gap-1 font-bold">
                ✕ High False-Positives & Repeats
              </div>
            </div>

            {/* Card 2: The CodeMind Innovation */}
            <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl flex flex-col justify-between hover:border-zinc-600 transition-colors">
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-[#18181b] border border-zinc-700 text-white w-fit shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-white font-mono">
                  The CodeMind Hindsight Innovation
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  CodeMind solves this fundamental flaw by coupling Groq Cloud LLM reasoning with Hindsight persistent vector memory. Every review recalls relevant memories from prior code reviews before analysis. After the review completes, durable learnings, security preferences, and architectural conventions are retained back into Hindsight.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                ✓ Continuous Learning Loop
              </div>
            </div>

            {/* Card 3: Zero Hallucination Evidence Pipeline */}
            <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl flex flex-col justify-between hover:border-zinc-600 transition-colors">
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-[#18181b] border border-zinc-700 text-white w-fit shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-white font-mono">
                  Zero-Hallucination Verification
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  CodeMind runs a 9-stage analysis pipeline combining Python AST static analysis, an explicit Code Evidence Verifier, deduplication, and deterministic scoring. Every reported finding must be traceable to exact source code lines or it is strictly discarded.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                ✓ 100% Traceable Code Evidence
              </div>
            </div>
          </div>

          {/* Tech Stack Banner */}
          <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-8 space-y-6 text-center shadow-2xl">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Built with Modern High-Performance Technologies
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#18181b] border border-zinc-700 text-white font-bold">Next.js 14</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#18181b] border border-zinc-700 text-white font-bold">TypeScript</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#18181b] border border-zinc-700 text-white font-bold">FastAPI</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#18181b] border border-zinc-700 text-white font-bold">Groq LLM</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#18181b] border border-zinc-700 text-white font-bold">Hindsight Vector Memory</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#18181b] border border-zinc-700 text-white font-bold">SQLite DB</span>
            </div>
            <div className="pt-4 flex justify-center font-mono">
              <Link href="/app">
                <Button variant="primary" className="font-bold px-8 py-3 text-sm">
                  Launch Code Review Engine <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
