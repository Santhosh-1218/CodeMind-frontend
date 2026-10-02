'use client';

import React, { useState } from 'react';
import { Shield, Bug, Gauge, Wrench, ChevronDown, ChevronUp, FileCode, Brain, Sparkles, Check, Copy } from 'lucide-react';
import { Finding, ReviewFile } from '@/types/review';
import { CodeViewer } from './CodeViewer';

interface FindingCardProps {
  finding: Finding;
  files: ReviewFile[];
}

export const FindingCard: React.FC<FindingCardProps> = ({ finding, files }) => {
  const [activeTab, setActiveTab] = useState<'explain' | 'fix' | 'code'>('explain');
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const matchedFile = files.find(f => f.path === finding.file_path);

  const getSeverityBadge = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> CRITICAL
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> MEDIUM
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> LOW
          </span>
        );
    }
  };

  const handleCopyFix = () => {
    if (finding.fix_recommendation) {
      navigator.clipboard.writeText(finding.fix_recommendation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`bg-[#121215] border rounded-2xl p-6 transition-all duration-200 shadow-lg ${
      finding.memory_influenced ? 'border-purple-500/40 shadow-purple-950/20' : 'border-zinc-800'
    }`}>
      {/* Top Issue Title & Location */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {getSeverityBadge(finding.severity)}
            <span className="text-xs font-mono text-zinc-400 font-semibold flex items-center gap-1">
              <span>{finding.category}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300 font-mono">{finding.file_path}:{finding.line_number || 1}</span>
            </span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">{finding.title}</h3>
        </div>

        {/* Toggle Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-start p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-5">
          {/* Action Tabs: [View Code] [Explain] [Show Fix] */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <button
              onClick={() => setActiveTab('explain')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors ${
                activeTab === 'explain'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              Explain Issue
            </button>
            <button
              onClick={() => setActiveTab('fix')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors ${
                activeTab === 'fix'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              Show Fix
            </button>
            {matchedFile && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors flex items-center gap-1.5 ${
                  activeTab === 'code'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" /> View Code
              </button>
            )}
          </div>

          {/* Tab Content: Explain */}
          {activeTab === 'explain' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold">Description</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{finding.description}</p>
              </div>

              {finding.rationale && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold">Why This Matters</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{finding.rationale}</p>
                </div>
              )}

              {finding.snippet && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold">Flagged Code Snippet</h4>
                  <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-3.5 font-mono text-xs text-red-300 overflow-x-auto">
                    <code>{finding.snippet}</code>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Show Fix */}
          {activeTab === 'fix' && (
            <div className="bg-[#18181b] border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Suggested Fix</h4>
                <button
                  onClick={handleCopyFix}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono hover:bg-emerald-500/20 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy Recommendation'}
                </button>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap font-mono bg-[#09090b] p-3 rounded-lg border border-zinc-800">
                {finding.fix_recommendation}
              </p>
            </div>
          )}

          {/* Tab Content: View Code */}
          {activeTab === 'code' && matchedFile && (
            <div className="mt-2">
              <CodeViewer file={matchedFile} highlightLine={finding.line_number} />
            </div>
          )}

          {/* 🧠 HINDSIGHT LEARNING Box */}
          {finding.memory_influenced && (
            <div className="bg-purple-950/20 border border-purple-500/40 rounded-xl p-4 text-xs text-purple-200 flex items-start gap-3 shadow-inner">
              <div className="p-2 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-300 shrink-0 mt-0.5">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-1 font-mono uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  🧠 Hindsight Memory Learning
                </div>
                <p className="text-zinc-300 leading-relaxed font-sans">
                  {finding.hindsight_memory_text ||
                    'Previous reviews identified the same vulnerability pattern in prior analysis. Applied learned rule: parameterized SQL queries.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
