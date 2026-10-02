'use client';

import React, { useState } from 'react';
import {
  Upload, Cpu, Brain, TrendingUp, ArrowRight, ShieldCheck, CheckCircle2,
  FileCode, Play, Sparkles, Database, Layers, Check, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const HowItWorks: React.FC = () => {
  const [simulating, setSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const pipelineStages = [
    { label: 'Ingest Code', detail: 'Public GitHub repository or ZIP archive' },
    { label: 'AST Static Scan', detail: 'Python ast static security analyzer' },
    { label: 'Hindsight Memory Recall', detail: 'Vector recall for team conventions' },
    { label: 'Groq LLM Reasoning', detail: 'llama-3.3-70b-versatile deep reasoning' },
    { label: 'Evidence Verification', detail: '100% file & line number verification' },
    { label: 'Deterministic Scoring', detail: 'Weighted scores across 4 dimensions' },
    { label: 'Memory Retention', detail: 'Durable learnings saved to Hindsight' },
  ];

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= pipelineStages.length) {
        clearInterval(interval);
        setSimulating(false);
      } else {
        setCurrentStep(step);
      }
    }, 700);
  };

  const steps = [
    {
      num: '01',
      icon: <Upload className="w-6 h-6 text-white" />,
      title: 'Upload Codebase',
      subtitle: 'ZIP & GitHub Support',
      desc: 'Enter any public GitHub repository URL or upload a local ZIP archive containing your source code.'
    },
    {
      num: '02',
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: 'AST Static Analysis',
      subtitle: 'Zero False-Positives',
      desc: 'FastAPI python ast analyzers scan code structures for unparameterized SQL, dynamic execution, and secret leaks.'
    },
    {
      num: '03',
      icon: <Brain className="w-6 h-6 text-white" />,
      title: 'Hindsight Recall',
      subtitle: 'Persistent Memory',
      desc: 'Hindsight vector bank recalls prior review experiences, recurring security vulnerabilities, and team conventions.'
    },
    {
      num: '04',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: 'Report & Learning Loop',
      subtitle: 'Continuous Improvement',
      desc: 'Calculates un-hackable deterministic scores, verifies evidence, and retains new learnings into Hindsight.'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative z-10 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121215] border border-zinc-800 text-zinc-300 text-xs font-semibold shadow-lg">
            <Layers className="w-3.5 h-3.5 text-white" /> 9-Stage Zero-Hallucination Pipeline
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            How CodeMind Works
          </h1>
          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            From raw repository ingestion to persistent Hindsight vector recall and verified line-by-line evidence reports.
          </p>
        </div>

        {/* 4 Connected Cards Grid with Directional Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-6 relative group hover:border-zinc-600 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#18181b] border border-zinc-700 rounded-xl shadow-md">{s.icon}</div>
                  <span className="text-3xl font-black font-mono text-zinc-600 group-hover:text-white transition-colors">
                    {s.num}
                  </span>
                </div>
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">{s.subtitle}</span>
                  <h3 className="text-lg font-bold text-white tracking-tight">{s.title}</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{s.desc}</p>
              </div>

              {/* Arrow Connector Indicator for Desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 shadow-lg">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Live Interactive Pipeline Simulation Widget */}
        <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" /> Interactive Review Pipeline Simulation
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Test the 9-stage execution sequence from zip ingestion to vector memory storing
              </p>
            </div>
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black font-bold text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {simulating ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Play className="w-4 h-4 text-black" />}
              {simulating ? 'Executing Pipeline...' : 'Run Live Simulation'}
            </button>
          </div>

          {/* Interactive Stage Flow Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {pipelineStages.map((stage, idx) => {
              const isActive = idx === currentStep && simulating;
              const isPassed = idx < currentStep || (!simulating && currentStep === pipelineStages.length - 1);

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all duration-300 flex flex-col justify-between min-h-[90px] ${
                    isActive
                      ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/50 scale-105 shadow-xl'
                      : isPassed
                      ? 'bg-zinc-900 border-zinc-700 text-white'
                      : 'bg-[#18181b]/50 border-zinc-800 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span>Stage 0{idx + 1}</span>
                    {isPassed ? <Check className="w-3 h-3 text-emerald-400" /> : <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />}
                  </div>
                  <div className="font-bold text-xs text-white leading-snug">{stage.label}</div>
                  <span className="text-[9px] text-zinc-400 leading-tight block mt-1">{stage.detail}</span>
                </div>
              );
            })}
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
