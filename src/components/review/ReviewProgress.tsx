'use client';

import React from 'react';
import { CheckCircle2, Loader2, AlertCircle, Brain, Sparkles, Shield, FileSearch, Download } from 'lucide-react';
import { ReviewStatus } from '@/types/review';
import { Card } from '../ui/Card';

interface ReviewProgressProps {
  status: ReviewStatus;
}

const STAGES = [
  { id: 'Files Discovered', label: 'Repository Download & File Discovery', icon: FileSearch, detail: 'Downloading source code tree & extracting files...' },
  { id: 'Static Analysis', label: 'Static Analysis & Security Scanning', icon: Shield, detail: 'Parsing AST, checking syntax & scanning vulnerabilities...' },
  { id: 'Recall Hindsight Memory', label: 'Hindsight Memory Recall', icon: Brain, detail: 'Recalling past architectural & security memory patterns...' },
  { id: 'AI Reasoning', label: 'Groq LLM Reasoning & Synthesis', icon: Sparkles, detail: 'Analyzing code semantics with Llama 3.3 70B model...' },
  { id: 'Saving Review', label: 'Generating Findings & Report', icon: CheckCircle2, detail: 'Structuring line-by-line snippets & score breakdown...' },
  { id: 'Retaining Learning', label: 'Retaining Learnings into Hindsight', icon: Brain, detail: 'Persisting new project insights into Hindsight memory...' },
  { id: 'Completed', label: 'Review Completed', icon: CheckCircle2, detail: 'Full AI Review Report ready for inspection!' }
];

export const ReviewProgress: React.FC<ReviewProgressProps> = ({ status }) => {
  const getStageStatus = (stageId: string) => {
    let currentStatus = status.status;
    if (currentStatus === 'Completed') return 'completed';
    if (currentStatus === 'Failed') return 'failed';

    if (currentStatus === 'Queued' || currentStatus === 'Downloading' || currentStatus === 'Extracting') {
      currentStatus = 'Files Discovered';
    }

    const order = STAGES.map(s => s.id);
    const currentIndex = order.indexOf(currentStatus);
    const stageIndex = order.indexOf(stageId);

    if (currentIndex === -1) return 'pending';
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getProgressPercentage = () => {
    let currentStatus = status.status;
    if (currentStatus === 'Completed') return 100;
    if (currentStatus === 'Failed') return 0;
    if (currentStatus === 'Queued' || currentStatus === 'Downloading' || currentStatus === 'Extracting') {
      currentStatus = 'Files Discovered';
    }

    const order = STAGES.map(s => s.id);
    const currentIndex = order.indexOf(currentStatus);
    if (currentIndex === -1) return 5;
    return Math.round(((currentIndex + 1) / STAGES.length) * 100);
  };

  const percentage = getProgressPercentage();
  const currentStageIndex = STAGES.findIndex(s => getStageStatus(s.id) === 'active');
  const activeStageNumber = currentStageIndex !== -1 ? currentStageIndex + 1 : (status.status === 'Completed' ? 7 : 1);

  return (
    <Card className="max-w-3xl mx-auto p-5 sm:p-8 border border-zinc-800/90 bg-[#121215] shadow-2xl rounded-3xl relative overflow-hidden font-mono">
      {/* Ambient Ambient Glow Backgrounds */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="text-center mb-8 relative z-10 space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-purple-500/40 text-purple-300 mb-2 shadow-lg">
          <Brain className="w-8 h-8 animate-pulse" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">AI Code Review in Progress</h2>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
            Live Scan
          </span>
        </div>
        <p className="text-xs text-zinc-400 font-mono break-words max-w-lg mx-auto">
          {status.status_message || 'Analyzing codebase architecture, security vulnerabilities, and memory patterns...'}
        </p>

        {/* Top Progress Bar & Percentage Gauge */}
        <div className="pt-4 max-w-lg mx-auto space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold font-mono">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Step {activeStageNumber} of {STAGES.length}
            </span>
            <span className="text-emerald-400 font-black">{percentage}%</span>
          </div>
          <div className="w-full bg-[#18181b] h-2.5 rounded-full overflow-hidden border border-zinc-800 p-0.5">
            <div
              className="bg-gradient-to-r from-purple-500 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stage Steps Container */}
      <div className="space-y-3 relative z-10">
        {STAGES.map((s, idx) => {
          const st = getStageStatus(s.id);
          const Icon = s.icon;
          const stepNum = idx + 1;

          return (
            <div
              key={s.id}
              className={`p-4 rounded-2xl border transition-all duration-300 transform ${
                st === 'completed'
                  ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-400'
                  : st === 'active'
                  ? 'bg-gradient-to-r from-purple-500/15 via-emerald-500/10 to-purple-500/5 border-purple-500/60 text-purple-200 shadow-xl scale-[1.02] ring-1 ring-purple-500/30'
                  : st === 'failed'
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-[#18181b]/40 border-zinc-800/80 text-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Step Status Badge Icon */}
                  {st === 'completed' ? (
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : st === 'active' ? (
                    <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      <Loader2 className="w-4 h-4 text-purple-300 animate-spin" />
                    </div>
                  ) : st === 'failed' ? (
                    <div className="w-7 h-7 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-600 flex items-center justify-center text-xs font-bold shrink-0">
                      {stepNum}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold truncate ${st === 'pending' ? 'text-zinc-500' : st === 'active' ? 'text-white' : 'text-zinc-200'}`}>
                        {s.label}
                      </span>
                    </div>
                    <p className={`text-[11px] truncate pt-0.5 ${st === 'active' ? 'text-purple-300 font-medium' : st === 'completed' ? 'text-emerald-400/80' : 'text-zinc-500'}`}>
                      {s.detail}
                    </p>
                  </div>
                </div>

                {/* Right Status Badge */}
                <div className="shrink-0">
                  {st === 'completed' && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      ✓ Done
                    </span>
                  )}
                  {st === 'active' && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/25 text-purple-200 border border-purple-500/50 animate-pulse flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" /> Processing...
                    </span>
                  )}
                  {st === 'failed' && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40">
                      Failed
                    </span>
                  )}
                  {st === 'pending' && (
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider px-2">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
