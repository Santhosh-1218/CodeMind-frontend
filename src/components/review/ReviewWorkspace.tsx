'use client';

import React, { useState } from 'react';
import { Github, FileArchive, Brain, Sparkles, ShieldCheck, Zap, Code2, Terminal } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { ReviewStatus, ReviewReport as ReviewReportType } from '@/types/review';
import { useReviewStatus } from '@/hooks/useReviewStatus';
import { GitHubInput } from './GitHubInput';
import { ZipUploader } from './ZipUploader';
import { ReviewProgress } from './ReviewProgress';
import { ReviewReport } from '../report/ReviewReport';

export const ReviewWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'github' | 'zip'>('github');
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [fullReport, setFullReport] = useState<ReviewReportType | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { status: currentStatus } = useReviewStatus(activeReviewId);

  // When status transitions to Completed, fetch full report and schedule smooth transition
  React.useEffect(() => {
    if (currentStatus && currentStatus.status === 'Completed' && activeReviewId && !fullReport) {
      fetchApi<ReviewReportType>(`/reviews/${activeReviewId}`)
        .then((report) => {
          setFullReport(report);
          // Briefly display completed 100% progress screen before opening report
          const timer = setTimeout(() => {
            setShowReport(true);
          }, 1500);
          return () => clearTimeout(timer);
        })
        .catch((err) => setError(err.message));
    }
  }, [currentStatus, activeReviewId, fullReport]);

  const handleGitHubSubmit = async (repo_url: string) => {
    setLoading(true);
    setError(null);
    setFullReport(null);
    setShowReport(false);

    try {
      const res = await fetchApi<ReviewStatus>('/reviews/github', {
        method: 'POST',
        body: JSON.stringify({ repo_url })
      });
      setActiveReviewId(res.id);
    } catch (err: any) {
      setError(err.message || 'Failed to start GitHub repository review.');
    } finally {
      setLoading(false);
    }
  };

  const handleZipSubmit = async (file: File) => {
    setLoading(true);
    setError(null);
    setFullReport(null);
    setShowReport(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetchApi<ReviewStatus>('/reviews/upload', {
        method: 'POST',
        body: formData
      });
      setActiveReviewId(res.id);
    } catch (err: any) {
      setError(err.message || 'Failed to process ZIP upload.');
    } finally {
      setLoading(false);
    }
  };

  if (fullReport && showReport) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewReport report={fullReport} />
      </div>
    );
  }

  if (activeReviewId && currentStatus) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ReviewProgress
          status={currentStatus}
          onReset={() => {
            setActiveReviewId(null);
            setFullReport(null);
            setShowReport(false);
          }}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setActiveReviewId(null);
            setFullReport(null);
            setShowReport(false);
          }}
          onViewReport={() => setShowReport(true)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Header */}
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
          <Brain className="w-3.5 h-3.5 text-purple-400" />
          Hindsight Vector Memory v2.0 & AST Engine Active
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono uppercase">
          Code Analysis Workspace
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-mono leading-relaxed">
          Automated zero-hallucination code reviews powered by Python AST static analysis, Groq Llama 3.3, and persistent memory learning loops.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18181b] border border-zinc-800 text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero False-Positives
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18181b] border border-zinc-800 text-zinc-300">
            <Code2 className="w-3.5 h-3.5 text-blue-400" /> Line-Level Verification
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18181b] border border-zinc-800 text-zinc-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Deterministic Scoring
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-400 text-center shadow-lg">
          {error}
        </div>
      )}

      {/* Input Workspace Card */}
      <div className="bg-[#121215]/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex border-b border-zinc-800 mb-8 font-mono">
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'github'
                ? 'border-white text-white bg-zinc-800/40 rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Github className="w-4 h-4" /> Option A: GitHub Repository
          </button>
          <button
            onClick={() => setActiveTab('zip')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'zip'
                ? 'border-white text-white bg-zinc-800/40 rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <FileArchive className="w-4 h-4" /> Option B: ZIP Archive Upload
          </button>
        </div>

        {activeTab === 'github' ? (
          <GitHubInput onSubmit={handleGitHubSubmit} isLoading={loading} />
        ) : (
          <ZipUploader onSubmit={handleZipSubmit} isLoading={loading} />
        )}
      </div>
    </div>
  );
};

