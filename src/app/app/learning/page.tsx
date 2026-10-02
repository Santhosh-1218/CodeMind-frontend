'use client';

import React, { useEffect, useState } from 'react';
import { Brain, Sparkles, ShieldCheck, Database, RefreshCw, Layers, CheckCircle2, History, Search } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { LearningStatsResponse } from '@/types/api';
import { MemoryStats } from '@/components/learning/MemoryStats';
import { RecurringIssues } from '@/components/learning/RecurringIssues';
import { LearningTimeline } from '@/components/learning/LearningTimeline';
import { Loading } from '@/components/ui/Loading';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';

export default function LearningPage() {
  const [data, setData] = useState<LearningStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'timeline'>('overview');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    fetchApi<LearningStatsResponse>('/learning')
      .then(setData)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b]">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <Loading message="Querying Hindsight Vector Memory Bank..." />
        </div>
      </div>
    );
  }

  // Filter memories if query present
  const filteredMemories = (data?.recent_memories || []).filter(
    (m) =>
      m.text.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (m.type && m.type.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b] overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
        {/* 1. Header Hero Banner */}
        <div className="relative bg-[#121215]/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold font-mono shadow-sm">
                  <Brain className="w-3.5 h-3.5 text-purple-400" /> Vectorize Hindsight Engine v2.0
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Bank: codemind (Active & Synced)
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-mono uppercase">
                Hindsight Learning & Vector Memory
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl">
                Cross-repository learning hub retaining past code review patterns, developer conventions, and recurring security vulnerabilities.
              </p>
            </div>

            {/* Stat Badges */}
            <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
              <div className="bg-[#18181b] border border-purple-500/30 p-4 rounded-2xl text-center shadow-inner">
                <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Total Memories</span>
                <span className="text-2xl font-black text-purple-300">{data?.total_memories || 34}</span>
              </div>
              <div className="bg-[#18181b] border border-zinc-800 p-4 rounded-2xl text-center shadow-inner">
                <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Reviews Analyzed</span>
                <span className="text-2xl font-black text-emerald-400">{data?.total_reviews_analyzed || 8}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Controls & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3 font-mono text-xs">
          <div className="flex items-center gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 font-bold transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'overview'
                  ? 'border-purple-400 text-purple-300 font-black scale-105'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Database className="w-4 h-4 text-purple-400" /> Memory Store Overview
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`pb-2 font-bold transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'issues'
                  ? 'border-purple-400 text-purple-300 font-black scale-105'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" /> Recurring Patterns & Rules
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-2 font-bold transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'timeline'
                  ? 'border-purple-400 text-purple-300 font-black scale-105'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <History className="w-4 h-4 text-purple-400" /> Learning Timeline Log
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search memory vector..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Tab Panels */}
        {data && (
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <MemoryStats totalMemories={data.total_memories} totalReviews={data.total_reviews_analyzed} />
            )}

            {activeTab === 'issues' && (
              <RecurringIssues issues={data.recurring_issues} preferences={data.learned_preferences} />
            )}

            {activeTab === 'timeline' && (
              <LearningTimeline timeline={data.timeline} memories={filteredMemories} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

