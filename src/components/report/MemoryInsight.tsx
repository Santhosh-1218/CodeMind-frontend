'use client';

import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

interface MemoryInsightProps {
  memoryText?: string;
}

export const MemoryInsight: React.FC<MemoryInsightProps> = ({ memoryText }) => {
  return (
    <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-4 text-xs text-purple-200 mt-3 flex items-start gap-3">
      <div className="p-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 shrink-0 mt-0.5">
        <Brain className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Hindsight Memory Recall Insight
        </div>
        <p className="text-zinc-300 leading-relaxed">
          {memoryText ||
            'Recalled prior review experience from Hindsight memory bank. Previous reviews identified similar vulnerabilities or coding conventions.'}
        </p>
      </div>
    </div>
  );
};
