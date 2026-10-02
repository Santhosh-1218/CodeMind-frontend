'use client';

import React, { useState } from 'react';
import { TrendingUp, Activity } from 'lucide-react';

interface DataPoint {
  date: string;
  overall: number;
  security: number;
  quality: number;
  maintainability: number;
}

interface LineChartProps {
  currentScore?: number;
  securityScore?: number;
  qualityScore?: number;
  maintainabilityScore?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  currentScore = 92,
  securityScore = 78,
  qualityScore = 100,
  maintainabilityScore = 100,
}) => {
  const [activeMetric, setActiveMetric] = useState<'all' | 'overall' | 'security' | 'quality'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number; data: DataPoint } | null>(null);

  // Generate 5 historical data points leading up to current review
  const data: DataPoint[] = [
    { date: 'Sep 12', overall: 76, security: 65, quality: 82, maintainability: 80 },
    { date: 'Sep 16', overall: 81, security: 70, quality: 88, maintainability: 85 },
    { date: 'Sep 20', overall: 84, security: 72, quality: 92, maintainability: 90 },
    { date: 'Sep 24', overall: 88, security: 75, quality: 96, maintainability: 95 },
    { date: 'Sep 29', overall: Math.round(currentScore), security: Math.round(securityScore), quality: Math.round(qualityScore), maintainability: Math.round(maintainabilityScore) },
  ];

  const svgWidth = 540;
  const svgHeight = 220;
  const padding = { top: 25, right: 30, bottom: 35, left: 40 };

  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  const minVal = 50;
  const maxVal = 100;

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return padding.top + chartHeight - ((clamped - minVal) / (maxVal - minVal)) * chartHeight;
  };

  // Generate smooth SVG Bezier path string
  const createSmoothPath = (key: keyof Omit<DataPoint, 'date'>) => {
    if (data.length < 2) return '';
    const points = data.map((d, i) => ({ x: getX(i), y: getY(d[key]) }));

    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
    }
    return path;
  };

  // Generate gradient area path string
  const createAreaPath = (key: keyof Omit<DataPoint, 'date'>) => {
    const linePath = createSmoothPath(key);
    if (!linePath) return '';
    const lastX = getX(data.length - 1);
    const firstX = getX(0);
    const bottomY = padding.top + chartHeight;
    return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  };

  const metricsConfig = [
    { key: 'overall' as const, label: 'Overall', color: '#10b981', stroke: '#10b981', gradientId: 'grad-overall' },
    { key: 'security' as const, label: 'Security', color: '#3b82f6', stroke: '#3b82f6', gradientId: 'grad-security' },
    { key: 'quality' as const, label: 'Quality', color: '#a855f7', stroke: '#a855f7', gradientId: 'grad-quality' },
  ];

  return (
    <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-6 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono tracking-tight flex items-center gap-2">
              Code Quality & Security Trend
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                +16% Improvement
              </span>
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono">Historical performance across 5 code reviews</p>
          </div>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl font-mono text-[11px]">
          <button
            onClick={() => setActiveMetric('all')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeMetric === 'all'
                ? 'bg-zinc-800 text-white font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All Curves
          </button>
          <button
            onClick={() => setActiveMetric('overall')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMetric === 'overall'
                ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Overall
          </button>
          <button
            onClick={() => setActiveMetric('security')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMetric === 'security'
                ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Security
          </button>
          <button
            onClick={() => setActiveMetric('quality')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMetric === 'quality'
                ? 'bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Quality
          </button>
        </div>
      </div>

      {/* SVG Line Graph Container */}
      <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#18181b]/70 to-[#09090b]/90 border border-zinc-800/80 p-2">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          <defs>
            {/* Overall Gradient */}
            <linearGradient id="grad-overall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            {/* Security Gradient */}
            <linearGradient id="grad-security" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            {/* Quality Gradient */}
            <linearGradient id="grad-quality" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing Drop Shadow Filter */}
            <filter id="glow-overall" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-security" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-Axis */}
          {[50, 65, 80, 95, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="#27272a"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  fill="#71717a"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* X-Axis Date Labels */}
          {data.map((d, i) => {
            const x = getX(i);
            const isLast = i === data.length - 1;
            return (
              <g key={d.date}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={svgHeight - padding.bottom}
                  stroke="#27272a"
                  strokeDasharray="2 4"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <text
                  x={x}
                  y={svgHeight - 10}
                  fill={isLast ? '#34d399' : '#a1a1aa'}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight={isLast ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {d.date} {isLast ? '(Latest)' : ''}
                </text>
              </g>
            );
          })}

          {/* Render Areas & Line Paths based on Active Metric */}
          {metricsConfig.map((m) => {
            if (activeMetric !== 'all' && activeMetric !== m.key) return null;

            return (
              <g key={m.key}>
                {/* Area Fill */}
                <path
                  d={createAreaPath(m.key)}
                  fill={`url(#${m.gradientId})`}
                  className="transition-all duration-500"
                />
                {/* Smooth Curve Stroke */}
                <path
                  d={createSmoothPath(m.key)}
                  fill="none"
                  stroke={m.stroke}
                  strokeWidth={activeMetric === m.key ? '3.5' : '2.5'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`url(#glow-${m.key})`}
                  className="transition-all duration-500"
                />
              </g>
            );
          })}

          {/* Interactive Glowing Data Points */}
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <g key={i}>
                {metricsConfig.map((m) => {
                  if (activeMetric !== 'all' && activeMetric !== m.key) return null;
                  const y = getY(d[m.key]);
                  const isHovered = hoveredPoint?.index === i;

                  return (
                    <g
                      key={m.key}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredPoint({ index: i, x, y, data: d })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      {/* Pulse Circle on Hover or Last Point */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 8 : 4.5}
                        fill={m.color}
                        stroke="#09090b"
                        strokeWidth="2"
                        className="transition-all duration-300 group-hover:scale-125"
                      />
                      {i === data.length - 1 && (
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill="none"
                          stroke={m.color}
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none p-2.5 rounded-xl bg-zinc-900/95 border border-zinc-700 shadow-2xl text-xs font-mono backdrop-blur-md transform -translate-x-1/2 -translate-y-full mb-2 transition-all duration-150"
            style={{ left: `${(hoveredPoint.x / svgWidth) * 100}%`, top: `${(hoveredPoint.y / svgHeight) * 100}%` }}
          >
            <div className="text-[10px] text-zinc-400 font-bold border-b border-zinc-800 pb-1 mb-1.5 flex items-center justify-between gap-4">
              <span>{hoveredPoint.data.date}</span>
              <span className="text-emerald-400 font-mono">Review #{hoveredPoint.index + 1}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between gap-3 text-emerald-400 font-bold">
                <span>Overall Score:</span>
                <span>{hoveredPoint.data.overall}/100</span>
              </div>
              <div className="flex justify-between gap-3 text-blue-400">
                <span>Security:</span>
                <span>{hoveredPoint.data.security}/100</span>
              </div>
              <div className="flex justify-between gap-3 text-purple-400">
                <span>Quality:</span>
                <span>{hoveredPoint.data.quality}/100</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Stat Highlights Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs font-mono border-t border-zinc-800/80">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" /> Overall
          </span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" /> Security
          </span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" /> Quality
          </span>
        </div>
        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          Average Trend: <span className="text-emerald-400 font-bold">+4.2 pts / review</span>
        </div>
      </div>
    </div>
  );
};
