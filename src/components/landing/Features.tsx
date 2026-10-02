'use client';

import React, { useState } from 'react';
import {
  Shield, Bug, Gauge, Code, FileArchive, Brain, History, Sparkles, Check, X,
  Layers, Lock, Terminal, Cpu, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Features: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'security' | 'memory' | 'performance'>('all');

  const features = [
    {
      category: 'memory',
      icon: <Brain className="w-5 h-5 text-white" />,
      title: 'Persistent Hindsight Memory',
      badge: 'Continuous AI Learning',
      desc: 'CodeMind doesn’t reset after every prompt. It recalls past review findings and architectural rules to eliminate recurring team mistakes.'
    },
    {
      category: 'security',
      icon: <Shield className="w-5 h-5 text-white" />,
      title: 'Security Vulnerability Analysis',
      badge: 'Zero False-Positives',
      desc: 'Detect unparameterized SQL execute calls, Cross-Site Scripting (XSS), hardcoded secrets, and unsafe dynamic execution.'
    },
    {
      category: 'security',
      icon: <Bug className="w-5 h-5 text-white" />,
      title: 'AST Static Analysis Engine',
      badge: 'Python AST Parser',
      desc: 'Runs AST static inspection to extract exact AST node trees before LLM reasoning for 100% line evidence verification.'
    },
    {
      category: 'performance',
      icon: <Gauge className="w-5 h-5 text-white" />,
      title: 'Deterministic Score Engine',
      badge: 'Empirical Metrics',
      desc: 'Calculates un-hackable deterministic scores across Security, Quality, Reliability, and Maintainability dimensions.'
    },
    {
      category: 'performance',
      icon: <Cpu className="w-5 h-5 text-white" />,
      title: 'Groq Cloud LLM Acceleration',
      badge: 'llama-3.3-70b-versatile',
      desc: 'High-speed structured LLM reasoning delivers actionable fix recommendations with file & line precision.'
    },
    {
      category: 'memory',
      icon: <FileArchive className="w-5 h-5 text-white" />,
      title: 'ZIP & GitHub Repositories',
      badge: 'Public & Local',
      desc: 'Instantly ingest public GitHub repositories via URL or drag & drop local ZIP archives for isolated analysis.'
    },
    {
      category: 'performance',
      icon: <History className="w-5 h-5 text-white" />,
      title: 'Review History & Storage',
      badge: 'Historical Trends',
      desc: 'Track previous reviews, project quality trends, score improvements, and individual finding reports over time.'
    },
    {
      category: 'security',
      icon: <Lock className="w-5 h-5 text-white" />,
      title: 'Code Evidence Verification',
      badge: 'Strict Verification',
      desc: 'Confirms file existence, line numbers, and snippet matching before including any finding in the final report.'
    }
  ];

  const filteredFeatures = features.filter(
    f => filter === 'all' || f.category === filter
  );

  const matrixComparison = [
    { feature: 'Persistent Vector Memory Across Reviews', codemind: true, static: false, chatgpt: false },
    { feature: 'Python AST Static Pre-Analysis Engine', codemind: true, static: true, chatgpt: false },
    { feature: 'Zero False-Positive Line Evidence Verifier', codemind: true, static: false, chatgpt: false },
    { feature: 'Deterministic Un-hackable Score Calculation', codemind: true, static: false, chatgpt: false },
    { feature: 'High-Speed Groq Cloud Reasoning', codemind: true, static: false, chatgpt: false },
    { feature: 'Local ZIP & Public GitHub Ingestion', codemind: true, static: false, chatgpt: false },
  ];

  return (
    <section className="py-16 md:py-24 relative z-10 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121215] border border-zinc-800 text-zinc-300 text-xs font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" /> Enterprise AI Code Audit Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Platform Capabilities & Features
          </h1>
          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            Built for developers, tech leads, and security engineers who demand continuous memory, zero false positives, and verified code evidence.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#121215] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Features
            </button>
            <button
              onClick={() => setFilter('security')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'security'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#121215] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Security & AST Analysis
            </button>
            <button
              onClick={() => setFilter('memory')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'memory'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#121215] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Hindsight AI Memory
            </button>
            <button
              onClick={() => setFilter('performance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'performance'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#121215] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Performance & Scoring
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((f, i) => (
            <div
              key={i}
              className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-6 shadow-xl hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#18181b] border border-zinc-700 rounded-xl group-hover:scale-105 transition-transform shadow-md">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 font-bold uppercase">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">{f.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Matrix Table */}
        <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Competitive Comparison</span>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Why Developers Choose CodeMind</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-3.5 px-4 font-bold uppercase">Capability / Feature</th>
                  <th className="py-3.5 px-4 font-bold uppercase text-center text-white bg-zinc-800/60 rounded-t-xl">CodeMind AI</th>
                  <th className="py-3.5 px-4 font-bold uppercase text-center">Static Linters</th>
                  <th className="py-3.5 px-4 font-bold uppercase text-center">Standard ChatGPT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {matrixComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-zinc-300">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-400 bg-zinc-800/30">
                      <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-400" /> Yes</span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-zinc-500">
                      {row.static ? <span className="text-zinc-300">Yes</span> : <X className="w-4 h-4 text-zinc-600 inline" />}
                    </td>
                    <td className="py-3.5 px-4 text-center text-zinc-500">
                      {row.chatgpt ? <span className="text-zinc-300">Yes</span> : <X className="w-4 h-4 text-zinc-600 inline" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">Ready to Audit Your Codebase?</h2>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto font-sans">
            Start a free AI code review now using any GitHub repository URL or ZIP archive.
          </p>
          <div className="pt-2">
            <Link href="/app">
              <Button size="lg" variant="primary" className="font-bold px-8 py-3 text-sm">
                Start Free Review Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
