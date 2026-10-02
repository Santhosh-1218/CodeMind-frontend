'use client';

import React from 'react';
import { TrendingUp, Brain, CheckCircle2 } from 'lucide-react';
import { LearningTimelineItem, MemoryItem } from '@/types/api';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface LearningTimelineProps {
  timeline: LearningTimelineItem[];
  memories: MemoryItem[];
}

export const LearningTimeline: React.FC<LearningTimelineProps> = ({ timeline, memories }) => {
  return (
    <div className="space-y-8">
      {/* Timeline of Reviews */}
      <Card className="bg-[#121215] border-zinc-800 p-6">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Review Score Improvement Timeline
        </h3>
        <p className="text-xs text-zinc-400 mb-6">Historical quality and security score progression across reviews</p>

        <div className="space-y-4">
          {timeline.length > 0 ? (
            timeline.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#18181b] border border-zinc-800 rounded-xl gap-4"
              >
                <div>
                  <span className="text-[10px] font-mono text-zinc-500">{item.date}</span>
                  <h4 className="text-sm font-bold text-white">{item.project_name}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Recalled {item.memories_recalled} memories • Retained {item.learnings_retained} new learnings
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Quality</span>
                    <span className="text-base font-bold text-white">{Math.round(item.quality_score)}/100</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Security</span>
                    <span className="text-base font-bold text-emerald-400">{Math.round(item.security_score)}/100</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-zinc-500">
              No review history recorded yet. Run your first review to build score timeline data.
            </div>
          )}
        </div>
      </Card>

      {/* Live Hindsight Memory Bank List */}
      <Card className="bg-[#121215] border-purple-500/30 p-6 glow-border">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" /> Live Hindsight Vector Memories
        </h3>
        <p className="text-xs text-purple-300 mb-6">Direct memories retrieved from Hindsight API bank &apos;codemind&apos;</p>

        <div className="space-y-3">
          {memories.length > 0 ? (
            memories.map((m, idx) => (
              <div key={idx} className="bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="hindsight">{m.type || 'observation'}</Badge>
                  {m.context && <span className="text-[10px] font-mono text-zinc-500">{m.context}</span>}
                </div>
                <p className="font-mono text-xs text-zinc-200">{m.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-zinc-500 font-mono">
              Hindsight memory bank connected. Initializing stored learnings...
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
