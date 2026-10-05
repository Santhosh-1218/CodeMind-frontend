'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, ShieldCheck, Sparkles, Brain, FileCode,
  Download, ExternalLink, RefreshCw, GitBranch, GitCommit, Clock, CheckCircle2, Share2, Check
} from 'lucide-react';
import { ReviewReport as ReviewReportType, ReviewFile } from '@/types/review';
import { formatDate } from '@/lib/utils';
import { ScoreCard } from './ScoreCard';
import { AnalyticsRow } from './AnalyticsRow';
import { IssueWorkspace } from './IssueWorkspace';
import { MemoryLearningFlow } from './MemoryLearningFlow';
import { CodeViewer } from './CodeViewer';
import { Button } from '../ui/Button';

interface ReviewReportProps {
  report: ReviewReportType;
}

export const ReviewReport: React.FC<ReviewReportProps> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'memory' | 'files'>('workspace');
  const [selectedFile, setSelectedFile] = useState<ReviewFile | null>(
    report.files.length > 0 ? report.files[0] : null
  );
  const [copiedLink, setCopiedLink] = useState(false);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `codemind_review_${report.project_name.replace(/[/\\?%*:|"<>]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="space-y-1">
          <Link href="/app/history" className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reviews
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">{report.project_name}</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300">
              <GitBranch className="w-3 h-3 text-zinc-400" /> main
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400">
              <GitCommit className="w-3 h-3 text-zinc-400" /> {report.id.substring(0, 7)}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Review Complete
            </span>
          </div>
          <p className="text-xs text-zinc-400 flex items-center gap-2 pt-1 font-mono">
            <Calendar className="w-3.5 h-3.5" /> Reviewed on {formatDate(report.created_at)}
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" /> Export PDF Report
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono font-semibold transition-colors flex items-center gap-2"
          >
            <FileCode className="w-3.5 h-3.5 text-zinc-400" /> Export JSON
          </button>
          {report.repo_url && (
            <a
              href={report.repo_url}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-semibold transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View on GitHub
            </a>
          )}
          <Link href="/app">
            <Button variant="primary" size="sm" className="font-mono text-xs uppercase tracking-wider font-bold">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Review Again
            </Button>
          </Link>
        </div>
      </div>

      {/* Section 1: 5 Score Ring Gauges */}
      <ScoreCard report={report} />

      {/* Section 2: Analytics Row (Breakdown, Donut, Trend Graph) */}
      <AnalyticsRow report={report} />

      {/* Section 3: Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-zinc-800 pb-px font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`pb-3 font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
            activeTab === 'workspace'
              ? 'border-white text-white font-black scale-105'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Interactive Issue Workspace ({report.findings.length})
        </button>
        <button
          onClick={() => setActiveTab('memory')}
          className={`pb-3 font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
            activeTab === 'memory'
              ? 'border-purple-400 text-purple-300 font-black scale-105'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-400" /> Hindsight Memory Loop ({report.hindsight_memories_recalled})
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`pb-3 font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
            activeTab === 'files'
              ? 'border-white text-white font-black scale-105'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FileCode className="w-4 h-4" /> Code Inspector ({report.files.length})
        </button>
      </div>

      {/* Tab Panel 1: Interactive Workspace */}
      {activeTab === 'workspace' && (
        <IssueWorkspace
          findings={report.findings}
          files={report.files}
          criticalCount={report.critical_count}
          highCount={report.high_count}
          mediumCount={report.medium_count}
          lowCount={report.low_count}
          infoCount={report.info_count}
        />
      )}

      {/* Tab Panel 2: Memory Loop */}
      {activeTab === 'memory' && (
        <div className="space-y-6">
          <MemoryLearningFlow
            memoriesRecalled={report.hindsight_memories_recalled}
            learningsRetained={report.hindsight_learnings_retained}
          />
        </div>
      )}

      {/* Tab Panel 3: Code Inspector */}
      {activeTab === 'files' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* File Picker Sidebar */}
          <div className="bg-[#121215]/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 space-y-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3 px-2 font-bold">Project Files</h4>
            {report.files.map((file) => (
              <button
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono truncate transition-colors flex items-center justify-between ${
                  selectedFile?.id === file.id
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <span className="truncate">{file.path}</span>
                <span className="text-[10px] text-zinc-500 uppercase">{file.language}</span>
              </button>
            ))}
          </div>

          {/* Monaco Viewer */}
          <div className="lg:col-span-3">
            {selectedFile ? (
              <CodeViewer file={selectedFile} />
            ) : (
              <div className="p-12 text-center text-zinc-500 text-xs font-mono">Select a file to inspect source code</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

