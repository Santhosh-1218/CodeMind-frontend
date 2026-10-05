'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, Plus, FileCode2, ShieldAlert, Layers, Search, Filter, Github, FileArchive, Sparkles, Trash2 } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { ReviewTable } from '@/components/history/ReviewTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';

interface HistoryData {
  total_reviews: number;
  total_projects: number;
  total_files: number;
  total_issues: number;
  recent_reviews: any[];
}

export default function HistoryPage() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'github' | 'zip'>('all');
  const [isClearing, setIsClearing] = useState(false);

  const loadHistory = () => {
    fetchApi<HistoryData>('/history')
      .then(setData)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await fetchApi(`/history/${reviewId}`, { method: 'DELETE' });
      setData(prev => {
        if (!prev) return null;
        const updated = prev.recent_reviews.filter(r => r.id !== reviewId);
        return {
          ...prev,
          total_reviews: updated.length,
          recent_reviews: updated
        };
      });
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const handleClearAllHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all past review history and old database records?')) return;
    setIsClearing(true);
    try {
      await fetchApi('/history/clear', { method: 'DELETE' });
      setData({
        total_reviews: 0,
        total_projects: 0,
        total_files: 0,
        total_issues: 0,
        recent_reviews: []
      });
    } catch (err) {
      console.error('Error clearing history:', err);
    } finally {
      setIsClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b]">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <Loading message="Loading code review history & metrics..." />
        </div>
      </div>
    );
  }

  const filteredReviews = (data?.recent_reviews || []).filter((review) => {
    const matchesSearch = review.project_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'all'
        ? true
        : selectedType === 'github'
        ? review.source_type?.toLowerCase().includes('github')
        : review.source_type?.toLowerCase().includes('zip');
    return matchesSearch && matchesType;
  });

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b] overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-xs font-mono font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Audit Log & Historical Metrics
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-mono flex items-center gap-3">
              <History className="w-8 h-8 text-zinc-300" /> Review History & Analytics
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
              Track past static analysis runs, quality score evolution, and verified security reports
            </p>
          </div>

          <div className="flex items-center gap-3">
            {data && data.recent_reviews.length > 0 && (
              <button
                onClick={handleClearAllHistory}
                disabled={isClearing}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95"
                title="Clear old review history from Render database"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All History
              </button>
            )}
            <Link href="/app">
              <Button variant="primary" size="md" className="font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-white/5">
                <Plus className="w-4 h-4 mr-1.5" /> Start New Review
              </Button>
            </Link>
          </div>
        </div>

        {data && data.recent_reviews.length > 0 ? (
          <>
            {/* Aggregated Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <Card className="bg-[#121215]/90 backdrop-blur-xl border-zinc-800 p-5 hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] uppercase tracking-wider">Total Reviews</span>
                  <History className="w-4 h-4 text-zinc-400" />
                </div>
                <p className="text-3xl font-black text-white">{data.total_reviews}</p>
                <span className="text-[10px] text-zinc-500 mt-1 block">Completed analyses</span>
              </Card>

              <Card className="bg-[#121215]/90 backdrop-blur-xl border-zinc-800 p-5 hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] uppercase tracking-wider">Projects</span>
                  <Layers className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-3xl font-black text-white">{data.total_projects}</p>
                <span className="text-[10px] text-zinc-500 mt-1 block">Repositories & ZIPs</span>
              </Card>

              <Card className="bg-[#121215]/90 backdrop-blur-xl border-zinc-800 p-5 hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] uppercase tracking-wider">Files Parsed</span>
                  <FileCode2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-black text-white">{data.total_files}</p>
                <span className="text-[10px] text-zinc-500 mt-1 block">AST verified files</span>
              </Card>

              <Card className="bg-[#121215]/90 backdrop-blur-xl border-red-500/30 p-5 hover:border-red-500/50 transition-all bg-red-500/5">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-red-300">Issues Flagged</span>
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-3xl font-black text-red-400">{data.total_issues}</p>
                <span className="text-[10px] text-red-400/80 mt-1 block">Verified line findings</span>
              </Card>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-[#121215]/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter by project name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#18181b] border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Type:
                </span>
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                    selectedType === 'all'
                      ? 'bg-zinc-800 border-white text-white font-bold'
                      : 'bg-[#18181b] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  All ({data.recent_reviews.length})
                </button>
                <button
                  onClick={() => setSelectedType('github')}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
                    selectedType === 'github'
                      ? 'bg-zinc-800 border-white text-white font-bold'
                      : 'bg-[#18181b] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </button>
                <button
                  onClick={() => setSelectedType('zip')}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
                    selectedType === 'zip'
                      ? 'bg-zinc-800 border-white text-white font-bold'
                      : 'bg-[#18181b] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileArchive className="w-3.5 h-3.5" /> ZIP Archive
                </button>
              </div>
            </div>

            {/* Table */}
            <ReviewTable reviews={filteredReviews} onDelete={handleDeleteReview} />
          </>
        ) : (
          <EmptyState
            icon={<History className="w-8 h-8 text-zinc-400" />}
            title="No Reviews Found"
            description="You haven't run any code reviews yet. Start by entering a public GitHub URL or uploading a ZIP code archive."
            actionText="Start First Code Review"
            onAction={() => (window.location.href = '/app')}
          />
        )}
      </div>
    </div>
  );
}

