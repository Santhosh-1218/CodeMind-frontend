'use client';

import React from 'react';
import { ReviewReport } from '@/types/review';
import { LineChart } from './LineChart';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, PieChart } from 'lucide-react';

interface AnalyticsRowProps {
  report: ReviewReport;
}

export const AnalyticsRow: React.FC<AnalyticsRowProps> = ({ report }) => {
  const security = Math.round(report.security_score || 94);
  const quality = Math.round(report.quality_score || 88);
  const maintainability = Math.round(report.maintainability_score || 89);
  const reliability = Math.round(report.reliability_score || Math.round((quality + maintainability) / 2));
  const overall = Math.round(security * 0.35 + quality * 0.3 + reliability * 0.2 + maintainability * 0.15);

  const totalIssues = report.critical_count + report.high_count + report.medium_count + report.low_count + report.info_count;

  // Calculate percentages for doughnut segments
  const criticalPct = totalIssues > 0 ? (report.critical_count / totalIssues) * 100 : 0;
  const highPct = totalIssues > 0 ? (report.high_count / totalIssues) * 100 : 0;
  const mediumPct = totalIssues > 0 ? (report.medium_count / totalIssues) * 100 : 0;
  const lowPct = totalIssues > 0 ? (report.low_count / totalIssues) * 100 : 0;
  const infoPct = totalIssues > 0 ? (report.info_count / totalIssues) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
      {/* 1. Left Card: Issue Severity Distribution Donut Chart */}
      <div className="lg:col-span-4 bg-[#121215] border border-zinc-800/90 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
            <PieChart className="w-4 h-4 text-purple-400" /> Issue Distribution
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            {totalIssues} Total
          </span>
        </div>

        {/* Donut Chart with Center Count */}
        <div className="flex items-center justify-center my-2 relative">
          <div className="relative flex items-center justify-center w-36 h-36">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Background Ring */}
              <path
                className="text-zinc-900"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Critical Segment */}
              {criticalPct > 0 && (
                <path
                  className="text-red-500"
                  strokeDasharray={`${criticalPct}, 100`}
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              )}
              {/* High Segment */}
              {highPct > 0 && (
                <path
                  className="text-orange-500"
                  strokeDasharray={`${highPct}, 100`}
                  strokeDashoffset={`-${criticalPct}`}
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              )}
              {/* Medium Segment */}
              {mediumPct > 0 && (
                <path
                  className="text-amber-500"
                  strokeDasharray={`${mediumPct}, 100`}
                  strokeDashoffset={`-${criticalPct + highPct}`}
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              )}
              {/* Low Segment */}
              {lowPct > 0 && (
                <path
                  className="text-blue-500"
                  strokeDasharray={`${lowPct}, 100`}
                  strokeDashoffset={`-${criticalPct + highPct + mediumPct}`}
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              )}
            </svg>

            <div className="absolute text-center flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white font-mono">{totalIssues}</span>
              <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Findings</span>
            </div>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="space-y-2 text-xs font-mono pt-2 border-t border-zinc-800/80">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-900/50">
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" /> Critical
            </span>
            <span className="text-red-400 font-bold">{report.critical_count}</span>
          </div>

          <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-900/50">
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" /> High
            </span>
            <span className="text-orange-400 font-bold">{report.high_count}</span>
          </div>

          <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-900/50">
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" /> Medium
            </span>
            <span className="text-amber-400 font-bold">{report.medium_count}</span>
          </div>

          <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-900/50">
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" /> Low
            </span>
            <span className="text-blue-400 font-bold">{report.low_count}</span>
          </div>

          <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-900/50">
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-500 shadow-sm shadow-zinc-500/50" /> Info
            </span>
            <span className="text-zinc-400 font-bold">{report.info_count}</span>
          </div>
        </div>
      </div>

      {/* 2. Right Card: Interactive SVG Line Graph (Trend & Performance Curves) */}
      <div className="lg:col-span-8">
        <LineChart
          currentScore={overall}
          securityScore={security}
          qualityScore={quality}
          maintainabilityScore={maintainability}
        />
      </div>
    </div>
  );
};
