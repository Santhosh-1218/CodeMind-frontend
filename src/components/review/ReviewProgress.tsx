'use client';

import React from 'react';
import { CheckCircle2, Loader2, AlertCircle, Brain, Sparkles, Shield, FileSearch, Download } from 'lucide-react';
import { ReviewStatus } from '@/types/review';
import { Card } from '../ui/Card';

interface ReviewProgressProps {
  status: ReviewStatus;
}

const STAGES = [
  { id: 'Files Discovered', label: 'Repository Download & File Discovery', icon: FileSearch },
  { id: 'Static Analysis', label: 'Static Analysis & Security Scanning', icon: Shield },
  { id: 'Recall Hindsight Memory', label: 'Hindsight Memory Recall', icon: Brain },
  { id: 'AI Reasoning', label: 'Groq LLM Reasoning & Synthesis', icon: Sparkles },
  { id: 'Saving Review', label: 'Generating Findings & Report', icon: CheckCircle2 },
  { id: 'Retaining Learning', label: 'Retaining Learnings into Hindsight', icon: Brain },
  { id: 'Completed', label: 'Review Completed', icon: CheckCircle2 }
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

  return (
    <Card className="max-w-2xl mx-auto p-4 sm:p-8 border border-zinc-800 bg-[#121215]">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-purple-400 mb-3">
          <Brain className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Code Review in Progress</h2>
        <p className="text-xs text-zinc-400 mt-1 font-mono break-words px-2">{status.status_message}</p>
      </div>

      <div className="space-y-4">
        {STAGES.map((s) => {
          const st = getStageStatus(s.id);
          return (
            <div
              key={s.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                st === 'completed'
                  ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-400'
                  : st === 'active'
                  ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 shadow-md'
                  : st === 'failed'
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-[#18181b]/40 border-zinc-800/80 text-zinc-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {st === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : st === 'active' ? (
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin shrink-0" />
                ) : st === 'failed' ? (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-zinc-700 shrink-0" />
                )}
                <span className={`text-xs font-semibold ${st === 'pending' ? 'text-zinc-500' : 'text-zinc-200'}`}>
                  {s.label}
                </span>
              </div>

              {st === 'completed' && <span className="text-xs font-mono font-bold">✓</span>}
              {st === 'active' && (
                <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                  Processing...
                </span>
              )}
              {st === 'failed' && (
                <span className="text-[10px] font-mono uppercase bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                  Failed
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
