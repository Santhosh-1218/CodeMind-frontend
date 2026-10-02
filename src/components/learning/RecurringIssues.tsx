'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, Award } from 'lucide-react';
import { RecurringIssueItem, LearnedPreferenceItem } from '@/types/api';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface RecurringIssuesProps {
  issues: RecurringIssueItem[];
  preferences: LearnedPreferenceItem[];
}

export const RecurringIssues: React.FC<RecurringIssuesProps> = ({ issues, preferences }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Recurring Issues Box */}
      <Card className="bg-[#121215] border-zinc-800 p-6">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" /> Recurring Vulnerabilities & Bugs
        </h3>
        <p className="text-xs text-zinc-400 mb-6">Patterns identified across multiple code reviews</p>

        <div className="space-y-4">
          {issues.length > 0 ? (
            issues.map((item, idx) => (
              <div key={idx} className="bg-[#18181b] border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <Badge variant="critical">Flagged {item.count}x</Badge>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-zinc-500">
              No recurring issues recorded yet. Complete reviews to populate recurring issue patterns.
            </div>
          )}
        </div>
      </Card>

      {/* Learned Preferences Box */}
      <Card className="bg-[#121215] border-purple-500/30 p-6 glow-border">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" /> Learned Coding Preferences
        </h3>
        <p className="text-xs text-purple-300 mb-6">Durable conventions retained in Hindsight memory</p>

        <div className="space-y-4">
          {preferences.map((item, idx) => (
            <div key={idx} className="bg-[#18181b] border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-white">{item.preference}</span>
                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                  {Math.round(item.confidence * 100)}% Confidence
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{item.example}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
