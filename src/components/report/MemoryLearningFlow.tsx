'use client';

import React from 'react';
import { Brain, Sparkles, ArrowRight, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

interface MemoryLearningFlowProps {
  memoriesRecalled: number;
  learningsRetained: number;
}

export const MemoryLearningFlow: React.FC<MemoryLearningFlowProps> = ({
  memoriesRecalled,
  learningsRetained
}) => {
  return (
    <div className="bg-[#121215] border border-purple-500/30 rounded-2xl p-6 shadow-xl mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Brain className="w-48 h-48 text-purple-400" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            Hindsight Memory & Learning Loop
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">AI Persistent Memory Analysis</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            CodeMind utilizes persistent Hindsight vector memory to recall prior codebase issues and record new durable learnings for future reviews.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#18181b] border border-zinc-800 rounded-xl p-4 shrink-0">
          <div className="text-center px-3 border-r border-zinc-800">
            <span className="text-2xl font-black text-purple-400 font-mono">{memoriesRecalled}</span>
            <span className="block text-[10px] font-mono text-zinc-400 uppercase mt-0.5">Memories Recalled</span>
          </div>
          <div className="text-center px-3">
            <span className="text-2xl font-black text-emerald-400 font-mono">+{learningsRetained}</span>
            <span className="block text-[10px] font-mono text-zinc-400 uppercase mt-0.5">New Learnings</span>
          </div>
        </div>
      </div>

      {/* Memory Flow Diagram */}
      <div className="mt-6 pt-6 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="bg-[#18181b]/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Step 1</span>
            <span className="text-zinc-200 font-bold">Previous Reviews</span>
            <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{memoriesRecalled} prior rule patterns recalled</p>
          </div>
        </div>

        <div className="bg-[#18181b]/60 border border-purple-500/40 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 shrink-0">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] text-purple-400 uppercase block font-semibold">Step 2</span>
            <span className="text-purple-200 font-bold">Current Review</span>
            <p className="text-[11px] text-zinc-300 font-sans mt-0.5">Applied learned memory to code analysis</p>
          </div>
        </div>

        <div className="bg-[#18181b]/60 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-emerald-400 uppercase block font-semibold">Step 3</span>
            <span className="text-emerald-200 font-bold">New Learning</span>
            <p className="text-[11px] text-zinc-400 font-sans mt-0.5">+{learningsRetained} new rule retained into memory</p>
          </div>
        </div>
      </div>
    </div>
  );
};
