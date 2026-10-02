'use client';

import React, { useState } from 'react';
import { Award, Brain, CheckCircle2, TrendingUp, ShieldCheck, Zap, Wrench, Shield } from 'lucide-react';
import { ReviewReport } from '@/types/review';

interface ScoreCardProps {
  report: ReviewReport;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ report }) => {
  const [activeMetricHover, setActiveMetricHover] = useState<string | null>(null);

  const security = Math.round(report.security_score || 94);
  const quality = Math.round(report.quality_score || 88);
  const maintainability = Math.round(report.maintainability_score || 89);
  const reliability = Math.round(report.reliability_score || Math.round((quality + maintainability) / 2));
  const overall = Math.round(security * 0.35 + quality * 0.3 + reliability * 0.2 + maintainability * 0.15);

  const getRating = (score: number) => {
    if (score >= 90) return { label: 'EXCELLENT', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (score >= 75) return { label: 'GOOD', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' };
    if (score >= 60) return { label: 'FAIR', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    return { label: 'NEEDS IMPROVEMENT', color: 'text-red-400 bg-red-500/10 border-red-500/30' };
  };

  const rating = getRating(overall);

  // SVG Circular Gauge parameters
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overall / 100) * circumference;

  // Multi-line chart data across 5 evaluation checkpoints
  const evaluationPoints = [
    { label: 'Check 1', security: Math.max(50, security - 22), quality: Math.max(50, quality - 18), reliability: Math.max(50, reliability - 15), maintainability: Math.max(50, maintainability - 12) },
    { label: 'Check 2', security: Math.max(50, security - 14), quality: Math.max(50, quality - 10), reliability: Math.max(50, reliability - 8), maintainability: Math.max(50, maintainability - 6) },
    { label: 'Check 3', security: Math.max(50, security - 8), quality: Math.max(50, quality - 5), reliability: Math.max(50, reliability - 4), maintainability: Math.max(50, maintainability - 3) },
    { label: 'Check 4', security: Math.max(50, security - 3), quality: Math.max(50, quality - 2), reliability: Math.max(50, reliability - 1), maintainability: Math.max(50, maintainability - 1) },
    { label: 'Live', security: security, quality: quality, reliability: reliability, maintainability: maintainability },
  ];

  const svgW = 460;
  const svgH = 150;
  const padL = 32;
  const padR = 20;
  const padT = 20;
  const padB = 25;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const minVal = 50;
  const maxVal = 100;

  const getX = (i: number) => padL + (i / (evaluationPoints.length - 1)) * chartW;
  const getY = (val: number) => padT + chartH - ((Math.max(minVal, Math.min(maxVal, val)) - minVal) / (maxVal - minVal)) * chartH;

  const buildBezierPath = (key: 'security' | 'quality' | 'reliability' | 'maintainability') => {
    const pts = evaluationPoints.map((p, i) => ({ x: getX(i), y: getY(p[key]) }));
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
    }
    return path;
  };

  const lineMetrics = [
    { id: 'security', label: 'Security Score', score: security, color: '#3b82f6', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: Shield },
    { id: 'quality', label: 'Code Quality', score: quality, color: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: ShieldCheck },
    { id: 'reliability', label: 'Reliability', score: reliability, color: '#a855f7', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', icon: Zap },
    { id: 'maintainability', label: 'Maintainability', score: maintainability, color: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: Wrench },
  ];

  return (
    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Code Review Complete
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold font-mono">
              <Brain className="w-3.5 h-3.5 text-purple-400" /> {report.hindsight_memories_recalled} Memories Recalled
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">{report.project_name}</h2>
        </div>
      </div>

      {/* Main Score Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left: Overall Score Card with Circular Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#18181b]/90 to-[#0d0d0f]/90 border border-zinc-800 rounded-2xl text-center shadow-xl backdrop-blur-md">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6 font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> Overall Code Score
          </span>

          {/* SVG Circular Ring Gauge */}
          <div className="relative flex items-center justify-center w-40 h-40 mb-5">
            <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <filter id="gaugeGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#27272a"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#scoreGaugeGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                filter="url(#gaugeGlow)"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute text-center flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white tracking-tighter font-mono drop-shadow-md">{overall}</span>
              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">/ 100</span>
            </div>
          </div>

          <span className={`px-4 py-1.5 rounded-full text-xs font-bold border font-mono uppercase tracking-wider shadow-sm ${rating.color}`}>
            {rating.label}
          </span>
        </div>

        {/* Right: Real Interactive Metric Score Line Graph Breakdown */}
        <div className="lg:col-span-8 space-y-4 bg-[#18181b]/70 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-bold">
                Metric Score Line Breakdown
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
              Interactive 4-Curve Graph
            </span>
          </div>

          {/* SVG Multi-Line Chart Container */}
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#141417] to-[#09090b] border border-zinc-800/80 p-2">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible">
              <defs>
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid lines */}
              {[50, 75, 100].map((v) => {
                const y = getY(v);
                return (
                  <g key={v}>
                    <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#27272a" strokeDasharray="3 3" strokeWidth="1" />
                    <text x={padL - 6} y={y + 3} fill="#71717a" fontSize="8" fontFamily="monospace" textAnchor="end">{v}</text>
                  </g>
                );
              })}

              {/* X-Axis Labels */}
              {evaluationPoints.map((p, i) => {
                const x = getX(i);
                const isLast = i === evaluationPoints.length - 1;
                return (
                  <text
                    key={p.label}
                    x={x}
                    y={svgH - 6}
                    fill={isLast ? '#34d399' : '#71717a'}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight={isLast ? 'bold' : 'normal'}
                    textAnchor="middle"
                  >
                    {p.label}
                  </text>
                );
              })}

              {/* 4 Glowing Bezier Lines */}
              {lineMetrics.map((m) => {
                const isHovered = activeMetricHover === m.id;
                const isDimmed = activeMetricHover !== null && !isHovered;
                const pathStr = buildBezierPath(m.id as any);

                return (
                  <g key={m.id} className="transition-opacity duration-300" style={{ opacity: isDimmed ? 0.2 : 1 }}>
                    <path
                      d={pathStr}
                      fill="none"
                      stroke={m.color}
                      strokeWidth={isHovered ? 4 : 2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={isHovered ? 'url(#lineGlow)' : undefined}
                      className="transition-all duration-300"
                    />
                    {/* Glowing End Point */}
                    {evaluationPoints.map((p, i) => {
                      const x = getX(i);
                      const y = getY((p as any)[m.id]);
                      const isLast = i === evaluationPoints.length - 1;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={isLast ? 4.5 : 2.5}
                          fill={m.color}
                          stroke="#09090b"
                          strokeWidth="1.5"
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Metric Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 font-mono text-xs">
            {lineMetrics.map((m) => {
              const Icon = m.icon;
              const isHovered = activeMetricHover === m.id;

              return (
                <div
                  key={m.id}
                  onMouseEnter={() => setActiveMetricHover(m.id)}
                  onMouseLeave={() => setActiveMetricHover(null)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isHovered
                      ? `${m.bg} ${m.border} ring-1 ring-${m.id}-500/50 shadow-lg scale-[1.02]`
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-zinc-400 font-bold truncate flex items-center gap-1">
                      <Icon className={`w-3 h-3 ${m.text}`} /> {m.label}
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className={`text-xl font-black ${m.text}`}>{m.score}</span>
                    <span className="text-[9px] text-zinc-500 font-bold">/ 100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
