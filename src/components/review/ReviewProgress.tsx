'use client';

import React from 'react';
import {
  CheckCircle2, Loader2, AlertCircle, Brain, Sparkles, Shield, FileSearch,
  RefreshCw, Github, FileArchive, ArrowRight, Lock
} from 'lucide-react';
import { ReviewStatus } from '@/types/review';
import { Card } from '../ui/Card';

interface ReviewProgressProps {
  status: ReviewStatus;
  onReset?: () => void;
  onSelectTab?: (tab: 'github' | 'zip') => void;
  onViewReport?: () => void;
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

export const ReviewProgress: React.FC<ReviewProgressProps> = ({
  status,
  onReset,
  onSelectTab,
  onViewReport
}) => {
  const normalizeStatus = (rawStatus: string): string => {
    if (rawStatus === 'Queued' || rawStatus === 'Downloading' || rawStatus === 'Extracting') {
      return 'Files Discovered';
    }
    if (rawStatus === 'Evidence Verification' || rawStatus === 'Deduplication' || rawStatus === 'Scoring' || rawStatus === 'Saving Review') {
      return 'Saving Review';
    }
    if (rawStatus === 'Retaining Learning') {
      return 'Retaining Learning';
    }
    return rawStatus;
  };

  const getFailedStageIndex = (rawStatus: string, msg: string): number => {
    const msgLower = (msg || '').toLowerCase();
    if (
      msgLower.includes('could not access') ||
      msgLower.includes('download') ||
      msgLower.includes('zip') ||
      msgLower.includes('repository') ||
      msgLower.includes('no readable source') ||
      msgLower.includes('permission') ||
      msgLower.includes('private')
    ) {
      return 0; // Stage 0 (Files Discovered)
    }
    if (msgLower.includes('ast') || msgLower.includes('static analysis')) {
      return 1; // Stage 1 (Static Analysis)
    }
    if (msgLower.includes('hindsight') || msgLower.includes('recall')) {
      return 2; // Stage 2 (Recall Hindsight Memory)
    }
    if (msgLower.includes('groq') || msgLower.includes('llm') || msgLower.includes('reasoning')) {
      return 3; // Stage 3 (AI Reasoning)
    }
    if (msgLower.includes('finding') || msgLower.includes('scoring') || msgLower.includes('saving') || msgLower.includes('evidence')) {
      return 4; // Stage 4 (Generating Findings & Report)
    }
    return 0;
  };

  const getStageStatus = (stageId: string) => {
    const currentStatus = normalizeStatus(status.status);
    const order = STAGES.map(s => s.id);
    const stageIndex = order.indexOf(stageId);

    if (status.status === 'Completed') return 'completed';

    if (status.status === 'Failed') {
      const failedIndex = getFailedStageIndex(status.status, status.status_message || '');
      if (stageIndex < failedIndex) return 'completed';
      if (stageIndex === failedIndex) return 'failed';
      return 'skipped';
    }

    const currentIndex = order.indexOf(currentStatus);
    if (currentIndex === -1) return 'pending';
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getProgressPercentage = () => {
    if (status.status === 'Completed') return 100;
    if (status.status === 'Failed') {
      const failedIndex = getFailedStageIndex(status.status, status.status_message || '');
      return Math.round(((failedIndex + 1) / STAGES.length) * 100);
    }

    const currentStatus = normalizeStatus(status.status);
    const order = STAGES.map(s => s.id);
    const currentIndex = order.indexOf(currentStatus);
    if (currentIndex === -1) return 14;
    return Math.round(((currentIndex + 1) / STAGES.length) * 100);
  };

  const percentage = getProgressPercentage();
  const currentStageIndex = STAGES.findIndex(s => getStageStatus(s.id) === 'active');
  const activeStageNumber = currentStageIndex !== -1 ? currentStageIndex + 1 : (status.status === 'Completed' ? 7 : 1);

  const isFailed = status.status === 'Failed';
  const isCompleted = status.status === 'Completed';
  const isPrivateRepoError = (status.status_message || '').toLowerCase().includes('private') || (status.status_message || '').toLowerCase().includes('access');

  return (
    <Card className="max-w-3xl mx-auto p-5 sm:p-8 border border-zinc-800/90 bg-[#121215] shadow-2xl rounded-3xl relative overflow-hidden font-mono">
      {/* Ambient Glow Backgrounds */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="text-center mb-8 relative z-10 space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-purple-500/40 text-purple-300 mb-2 shadow-lg">
          <Brain className={`w-8 h-8 ${isCompleted ? 'text-emerald-400' : isFailed ? 'text-red-400' : 'animate-pulse'}`} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isFailed ? 'AI Code Review Interrupted' : isCompleted ? 'AI Code Review Complete' : 'AI Code Review in Progress'}
          </h2>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            isFailed
              ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse'
          }`}>
            {isFailed ? 'Failed' : isCompleted ? 'Complete' : 'Live Scan'}
          </span>
        </div>
        <p className="text-xs text-zinc-400 font-mono break-words max-w-lg mx-auto">
          {status.status_message || 'Analyzing codebase architecture, security vulnerabilities, and memory patterns...'}
        </p>

        {/* Top Progress Bar & Percentage Gauge */}
        <div className="pt-4 max-w-lg mx-auto space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold font-mono">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isFailed ? 'bg-red-500' : isCompleted ? 'bg-emerald-400' : 'bg-emerald-400 animate-ping'}`} />
              Step {activeStageNumber} of {STAGES.length}
            </span>
            <span className={`font-black ${isFailed ? 'text-red-400' : 'text-emerald-400'}`}>{percentage}%</span>
          </div>
          <div className="w-full bg-[#18181b] h-2.5 rounded-full overflow-hidden border border-zinc-800 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isFailed
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                  : 'bg-gradient-to-r from-purple-500 via-emerald-400 to-teal-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error Callout Banner when Failed */}
      {isFailed && (
        <div className="mb-6 p-5 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-300 font-mono space-y-4 shadow-xl relative z-10 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                Repository Access & Scanning Issue
              </h3>
              <p className="text-xs text-red-300/90 leading-relaxed font-mono break-words">
                {status.status_message}
              </p>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-red-500/20">
            {isPrivateRepoError && (
              <button
                type="button"
                onClick={() => {
                  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
                  window.location.href = `${apiBase}/auth/github`;
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> Continue with GitHub (Grant Access)
              </button>
            )}

            {onSelectTab && (
              <button
                type="button"
                onClick={() => onSelectTab('zip')}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all border border-zinc-700 flex items-center gap-2"
              >
                <FileArchive className="w-4 h-4 text-emerald-400" /> Upload ZIP Archive Instead
              </button>
            )}

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold transition-all border border-zinc-800 flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Try Another Repo / Start Over
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completed Banner */}
      {isCompleted && (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-mono space-y-3 shadow-xl relative z-10 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
                <CheckCircle2 className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Review Completed Successfully!</h3>
                <p className="text-xs text-emerald-400/80">Full AI Code Review Report is ready for inspection.</p>
              </div>
            </div>
            {onViewReport && (
              <button
                type="button"
                onClick={onViewReport}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
              >
                View Full Report <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Stage Steps Container */}
      <div className="space-y-3 relative z-10">
        {STAGES.map((s, idx) => {
          const st = getStageStatus(s.id);
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
                  ? 'bg-red-500/10 border-red-500/40 text-red-400'
                  : st === 'skipped'
                  ? 'bg-[#18181b]/20 border-zinc-800/40 text-zinc-600 opacity-60'
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
                      <span className={`text-xs font-bold truncate ${st === 'pending' || st === 'skipped' ? 'text-zinc-500' : st === 'active' ? 'text-white' : 'text-zinc-200'}`}>
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
                  {st === 'skipped' && (
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider px-2">
                      — Skipped
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

