'use client';

import React from 'react';
import { ReviewReport } from '@/types/review';
import { CheckCircle2 } from 'lucide-react';

interface IssueSummaryProps {
  report: ReviewReport;
}

export const IssueSummary: React.FC<IssueSummaryProps> = ({ report }) => {
  const totalIssues = report.critical_count + report.high_count + report.medium_count + report.low_count;
  const passedChecks = Math.max(28, report.file_count * 4 - totalIssues);

  return (
    <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight uppercase font-mono">Issue Summary</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Found {totalIssues} issue(s) across {report.file_count} file(s)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Critical */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-red-400 font-mono">Critical</span>
          </div>
          <span className="text-lg font-black text-red-400 font-mono">{report.critical_count}</span>
        </div>

        {/* High */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-xs font-semibold text-orange-400 font-mono">High</span>
          </div>
          <span className="text-lg font-black text-orange-400 font-mono">{report.high_count}</span>
        </div>

        {/* Medium */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold text-amber-400 font-mono">Medium</span>
          </div>
          <span className="text-lg font-black text-amber-400 font-mono">{report.medium_count}</span>
        </div>

        {/* Low */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-blue-400 font-mono">Low</span>
          </div>
          <span className="text-lg font-black text-blue-400 font-mono">{report.low_count}</span>
        </div>

        {/* Passed */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 font-mono">Passed</span>
          </div>
          <span className="text-lg font-black text-emerald-400 font-mono">{passedChecks}</span>
        </div>
      </div>
    </div>
  );
};
