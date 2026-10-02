'use client';

import React from 'react';
import { Brain, Sparkles, Layers, Award } from 'lucide-react';
import { Card } from '../ui/Card';

interface MemoryStatsProps {
  totalMemories: number;
  totalReviews: number;
}

export const MemoryStats: React.FC<MemoryStatsProps> = ({ totalMemories, totalReviews }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <Card className="bg-[#121215] border-purple-500/30 p-6 glow-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-300">Hindsight Memories</span>
          <Brain className="w-5 h-5 text-purple-400" />
        </div>
        <p className="text-4xl font-black text-purple-300">{totalMemories}</p>
        <p className="text-xs text-purple-400 font-mono mt-1">Durable vector memory units</p>
      </Card>

      <Card className="bg-[#121215] border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Reviews Analyzed</span>
          <Layers className="w-5 h-5 text-zinc-400" />
        </div>
        <p className="text-4xl font-black text-white">{totalReviews}</p>
        <p className="text-xs text-zinc-500 font-mono mt-1">Total codebases reviewed</p>
      </Card>

      <Card className="bg-[#121215] border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Learning Status</span>
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>
        <p className="text-2xl font-bold text-emerald-400">Active Learning</p>
        <p className="text-xs text-zinc-500 font-mono mt-1">Continuous Memory Bank Sync</p>
      </Card>
    </div>
  );
};
