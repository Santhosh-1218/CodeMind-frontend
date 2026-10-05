'use client';

import React, { useState } from 'react';
import {
  Shield, Bug, Gauge, Wrench, Search, Code2, Brain, Sparkles,
  CheckCircle2, Copy, Check, FileCode, AlertTriangle, AlertCircle, Info, ChevronRight, Layers, ArrowLeft
} from 'lucide-react';
import { Finding, ReviewFile } from '@/types/review';
import { CodeViewer } from './CodeViewer';

interface IssueWorkspaceProps {
  findings: Finding[];
  files: ReviewFile[];
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  infoCount: number;
}

function getFindingDetailsHelper(finding: Finding) {
  const title = finding.title.toLowerCase();
  const cat = finding.category.toLowerCase();
  const desc = finding.description || '';
  const rat = finding.rationale || '';

  let detailedRationale = rat;
  let fixGuidance = 'Apply the suggested fix below to remediate this issue safely.';
  let remediationSteps: string[] = [];

  if (title.includes('api key') || title.includes('secret') || title.includes('hardcoded') || (cat.includes('security') && title.includes('key'))) {
    if (!detailedRationale || detailedRationale.includes('rule matched') || detailedRationale.length < 20) {
      detailedRationale = 'Hardcoding private API keys or access secrets directly in source code exposes credentials in public git repositories and production client bundles. Attackers can scrape these keys to impersonate your service, access sensitive data, or exhaust API quotas.';
    }
    fixGuidance = 'Store secrets in environment variables (.env files) or cloud key management services. Never commit raw API keys to source control.';
    remediationSteps = [
      'Extract the secret token into a local .env file (e.g. API_KEY=your_key_here).',
      'Replace the hardcoded secret string in source code with process.env.API_KEY (JS/TS) or os.getenv("API_KEY") (Python).',
      'Ensure .env is listed in your .gitignore file to prevent accidental git commits.',
      'Revoke and rotate the exposed API key in the provider dashboard immediately.'
    ];
  } else if (title.includes('sql injection') || title.includes('sqli') || title.includes('query')) {
    if (!detailedRationale || detailedRationale.includes('rule matched') || detailedRationale.length < 20) {
      detailedRationale = 'Constructing SQL queries via dynamic string interpolation allows untrusted user input to manipulate query syntax. Attackers can execute arbitrary SQL commands, bypass authentication, exfiltrate private data, or drop database tables.';
    }
    fixGuidance = 'Use parameterized query bindings or Object-Relational Mapping (ORM) parameters to sanitize input automatically.';
    remediationSteps = [
      'Replace dynamic f-strings or string concatenation with parameterized placeholders (?, %s, or $1).',
      'Pass user input parameters as a tuple/array argument in the database execution call.',
      'Never concatenate raw user-supplied inputs directly into SQL string queries.'
    ];
  } else if (title.includes('xss') || title.includes('cross-site scripting') || title.includes('innerhtml')) {
    if (!detailedRationale || detailedRationale.includes('rule matched') || detailedRationale.length < 20) {
      detailedRationale = 'Rendering unsanitized user content into HTML DOM elements permits malicious script execution in victim browser sessions, risking session hijacking, token theft, and unauthorized user actions.';
    }
    fixGuidance = 'Use safe UI template bindings or sanitize HTML strings before rendering into the DOM.';
    remediationSteps = [
      'Use native React JSX expressions {content} which automatically escape HTML entities.',
      'If HTML insertion is required, sanitize string content using DOMPurify prior to rendering.',
      'Configure Content-Security-Policy (CSP) headers to restrict unapproved inline script execution.'
    ];
  } else if (title.includes('eval') || title.includes('dynamic code') || title.includes('exec')) {
    if (!detailedRationale || detailedRationale.includes('rule matched') || detailedRationale.length < 20) {
      detailedRationale = 'Dynamic evaluation of strings as code (via eval, exec, or shell execution) allows arbitrary execution, exposing the host server to complete Remote Code Execution (RCE) takeover.';
    }
    fixGuidance = 'Replace dynamic string evaluation with static lookup maps or safe parsing utilities.';
    remediationSteps = [
      'Remove all calls to eval(), exec(), or shell=True subprocess execution.',
      'Use safe data parsing standards such as JSON.parse() or ast.literal_eval().',
      'Map validated input strings to predefined handler functions.'
    ];
  } else {
    if (!detailedRationale || detailedRationale.includes('rule matched') || detailedRationale.length < 20) {
      detailedRationale = desc || 'This code pattern introduces potential security, performance, or maintainability risks that should be refactored.';
    }
    fixGuidance = 'Review the target file lines and update the code structure according to secure coding standards.';
    remediationSteps = [
      'Inspect the target line in the source file.',
      'Apply the recommended replacement code snippet.',
      'Re-run automated code review to confirm resolution.'
    ];
  }

  return { detailedRationale, fixGuidance, remediationSteps };
}

export const IssueWorkspace: React.FC<IssueWorkspaceProps> = ({
  findings,
  files,
  criticalCount,
  highCount,
  mediumCount,
  lowCount,
  infoCount
}) => {
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    findings.length > 0 ? findings[0].id : ''
  );
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'severity' | 'line' | 'file'>('severity');
  const [detailTab, setDetailTab] = useState<'code' | 'explain' | 'fix' | 'memory'>('code');
  const [copiedFix, setCopiedFix] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // Filter findings
  const filteredFindings = findings.filter(f => {
    const matchesSev = activeSeverityFilter === 'all' || f.severity.toLowerCase() === activeSeverityFilter;
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.file_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSev && matchesSearch;
  });

  // Sort findings
  const sortedFindings = [...filteredFindings].sort((a, b) => {
    if (sortBy === 'severity') {
      const rank: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };
      return (rank[b.severity.toLowerCase()] || 0) - (rank[a.severity.toLowerCase()] || 0);
    }
    if (sortBy === 'file') return a.file_path.localeCompare(b.file_path);
    return (a.line_number || 0) - (b.line_number || 0);
  });

  const selectedFinding = findings.find(f => f.id === selectedFindingId) || (findings.length > 0 ? findings[0] : null);
  const matchedFile = selectedFinding ? files.find(f => f.path === selectedFinding.file_path) : null;

  const handleCopyFix = () => {
    if (selectedFinding?.fix_recommendation) {
      navigator.clipboard.writeText(selectedFinding.fix_recommendation);
      setCopiedFix(true);
      setTimeout(() => setCopiedFix(false), 2000);
    }
  };

  const handleCopyLocation = () => {
    if (selectedFinding) {
      const loc = `${selectedFinding.file_path}:${selectedFinding.line_number || 1}`;
      navigator.clipboard.writeText(loc);
      setCopiedLocation(true);
      setTimeout(() => setCopiedLocation(false), 2000);
    }
  };

  const getSeverityIcon = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'critical':
        return <div className="p-1.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 shrink-0"><Shield className="w-4 h-4" /></div>;
      case 'high':
        return <div className="p-1.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0"><AlertTriangle className="w-4 h-4" /></div>;
      case 'medium':
        return <div className="p-1.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0"><AlertCircle className="w-4 h-4" /></div>;
      default:
        return <div className="p-1.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0"><Info className="w-4 h-4" /></div>;
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'critical':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40 shrink-0">Critical</span>;
      case 'high':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/40 shrink-0">High</span>;
      case 'medium':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">Medium</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/40 shrink-0">Low</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter & Search Bar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#121215] border border-zinc-800/90 rounded-2xl p-4 shadow-lg sticky top-0 z-20 backdrop-blur-md">
        {/* Severity Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSeverityFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeSeverityFilter === 'all'
                ? 'bg-white text-black shadow-md'
                : 'bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            All Issues <span className="ml-1 opacity-70">({findings.length})</span>
          </button>
          <button
            onClick={() => setActiveSeverityFilter('critical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSeverityFilter === 'critical'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Critical <span>{criticalCount}</span>
          </button>
          <button
            onClick={() => setActiveSeverityFilter('high')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSeverityFilter === 'high'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400" /> High <span>{highCount}</span>
          </button>
          <button
            onClick={() => setActiveSeverityFilter('medium')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSeverityFilter === 'medium'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Medium <span>{mediumCount}</span>
          </button>
          <button
            onClick={() => setActiveSeverityFilter('low')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSeverityFilter === 'low'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Low <span>{lowCount}</span>
          </button>
        </div>

        {/* Search Input & Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 font-mono"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none cursor-pointer"
          >
            <option value="severity">Sort by: Severity</option>
            <option value="file">Sort by: File Path</option>
            <option value="line">Sort by: Line Number</option>
          </select>
        </div>
      </div>

      {/* 2-Column Synchronized Workspace with Independent Left/Right Scrolling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch h-[calc(100vh-220px)] min-h-[640px] max-h-[850px]">
        {/* Left Column: Issues List (Independent Vertical Scroll) */}
        <div className={`${showMobileDetail ? 'hidden lg:flex' : 'flex'} lg:col-span-4 bg-[#121215] border border-zinc-800/90 rounded-2xl flex-col overflow-hidden shadow-xl`}>
          <div className="p-3.5 border-b border-zinc-800/80 bg-[#18181b]/60 flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-zinc-300">Detected Issues ({sortedFindings.length})</span>
            <span className="text-[10px] text-zinc-500 uppercase">Select to Inspect</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {sortedFindings.length > 0 ? (
              sortedFindings.map((finding) => {
                const isSelected = finding.id === selectedFinding?.id;
                return (
                  <button
                    key={finding.id}
                    onClick={() => {
                      setSelectedFindingId(finding.id);
                      setShowMobileDetail(true);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#18181b] border-zinc-700 text-white shadow-lg ring-1 ring-zinc-700'
                        : 'bg-[#121215] border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {getSeverityIcon(finding.severity)}
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate leading-snug">{finding.title}</h4>
                        <p className="text-[11px] font-mono text-zinc-400 mt-1 truncate">
                          {finding.category} • {finding.file_path}:{finding.line_number || 1}
                        </p>
                      </div>
                    </div>
                    {getSeverityBadge(finding.severity)}
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-zinc-500 font-mono">No findings match the current filter.</div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Issue Detail (Fixed Header + Independent Vertical Scroll) */}
        <div className={`${!showMobileDetail ? 'hidden lg:flex' : 'flex'} lg:col-span-8 bg-[#121215] border border-zinc-800/90 rounded-2xl flex-col overflow-hidden shadow-2xl`}>
          {selectedFinding ? (
            <>
              {/* Finding Detail Header & Sub-Navigation Tabs (Fixed at Top of Detail View) */}
              <div className="p-4 sm:p-6 pb-4 border-b border-zinc-800/90 bg-[#141417] shrink-0 space-y-4">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setShowMobileDetail(false)}
                  className="lg:hidden mb-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181b] border border-zinc-700 text-xs font-mono text-zinc-300 font-bold hover:bg-zinc-800 active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Issues List
                </button>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getSeverityBadge(selectedFinding.severity)}
                      <span className="text-xs font-mono text-zinc-400 font-semibold">{selectedFinding.category}</span>
                      {selectedFinding.memory_influenced && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold">
                          <Brain className="w-3 h-3 text-purple-400" /> Memory Influenced
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">{selectedFinding.title}</h2>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">{selectedFinding.description}</p>
                  </div>
                </div>

                {/* Target File & Error Location Banner */}
                <div className="bg-[#09090b]/80 border border-zinc-800/90 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300 min-w-0">
                    <span className="px-2 py-0.5 rounded bg-red-500/15 border border-red-500/40 text-red-400 font-bold shrink-0">
                      Line {selectedFinding.line_number || 1}
                    </span>
                    <span className="truncate font-semibold text-zinc-200" title={selectedFinding.file_path}>
                      📁 {selectedFinding.file_path}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyLocation}
                    className="px-2.5 py-1 rounded-lg bg-[#18181b] hover:bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-300 font-mono flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {copiedLocation ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                    {copiedLocation ? 'Copied Location' : 'Copy File:Line'}
                  </button>
                </div>

                {/* Sub-navigation Tabs: Code | Explanation | Suggested Fix | Hindsight Memory */}
                <div className="flex items-center gap-3 pt-2 font-mono text-xs overflow-x-auto">
                  <button
                    onClick={() => setDetailTab('code')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                      detailTab === 'code'
                        ? 'bg-white text-black shadow-md'
                        : 'bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setDetailTab('explain')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                      detailTab === 'explain'
                        ? 'bg-white text-black shadow-md'
                        : 'bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    Explanation
                  </button>
                  <button
                    onClick={() => setDetailTab('fix')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                      detailTab === 'fix'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    Suggested Fix
                  </button>
                  {selectedFinding.memory_influenced && (
                    <button
                      onClick={() => setDetailTab('memory')}
                      className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                        detailTab === 'memory'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      Hindsight Memory
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Content Body (Vertical Scroll for Detail View, Horizontal Scroll for Code Snippets) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Tab Panel 1: Code */}
                {detailTab === 'code' && (
                  <div className="space-y-4">
                    {/* Error Line Highlight Box (Horizontal Scroll for Long Lines) */}
                    <div className="bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden font-mono">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-zinc-800 text-xs text-zinc-400">
                        <span className="font-semibold text-zinc-200 flex items-center gap-2 truncate">
                          <FileCode className="w-3.5 h-3.5 text-zinc-400 shrink-0" /> {selectedFinding.file_path}
                        </span>
                        <button
                          onClick={() => selectedFinding.snippet && navigator.clipboard.writeText(selectedFinding.snippet)}
                          className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono shrink-0 ml-2"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>

                      {/* Code Snippet Row with Horizontal Overflow Scroll */}
                      <div className="p-4 text-xs overflow-x-auto whitespace-pre font-mono">
                        <div className="flex items-center gap-3 text-red-300 bg-red-500/10 p-3 rounded-lg border-l-4 border-red-500 min-w-max">
                          <span className="font-bold text-red-400 w-8 text-right shrink-0">{selectedFinding.line_number || 1} ⚠️</span>
                          <code className="font-bold leading-relaxed">{selectedFinding.snippet || 'cursor.execute(query)'}</code>
                        </div>
                      </div>
                    </div>

                    {/* Monaco Code Viewer with Smooth Full View File Rendering */}
                    {matchedFile && (
                      <div className="pt-2">
                        <CodeViewer file={matchedFile} highlightLine={selectedFinding.line_number} />
                      </div>
                    )}
                  </div>
                )}



                {/* Tab Panel 2: Explanation */}
                {detailTab === 'explain' && (() => {
                  const details = getFindingDetailsHelper(selectedFinding);
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" /> Why This Matters & Cause
                          </h4>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            {details.detailedRationale}
                          </p>
                        </div>

                        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                            <Shield className="w-4 h-4" /> Security Risk Level: {selectedFinding.severity}
                          </h4>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            {selectedFinding.severity.toLowerCase() === 'critical' || selectedFinding.severity.toLowerCase() === 'high'
                              ? 'High vulnerability impact. Requires urgent developer remediation before deploying to production.'
                              : 'Moderate risk. Address in upcoming sprint to maintain high codebase quality.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Tab Panel 3: Suggested Fix */}
                {detailTab === 'fix' && (() => {
                  const details = getFindingDetailsHelper(selectedFinding);
                  return (
                    <div className="bg-[#18181b] border border-emerald-500/30 rounded-xl p-5 space-y-5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                          <Wrench className="w-4 h-4" /> Suggested Code Fix & Remediation
                        </h4>
                        <button
                          onClick={handleCopyFix}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
                        >
                          {copiedFix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedFix ? 'Copied Fix' : 'Copy Fix'}
                        </button>
                      </div>

                      {/* Diff Snippets with Horizontal Scroll */}
                      <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-2.5 overflow-x-auto whitespace-pre">
                        <div className="text-red-400 bg-red-500/10 p-3 rounded-lg border-l-4 border-red-500 min-w-max">
                          <div className="text-[10px] uppercase font-bold text-red-400/80 mb-1">Current Vulnerable Code</div>
                          <code>- {selectedFinding.snippet || 'Vulnerable code pattern detected'}</code>
                        </div>
                        <div className="text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border-l-4 border-emerald-500 min-w-max">
                          <div className="text-[10px] uppercase font-bold text-emerald-400/80 mb-1">Recommended Replacement</div>
                          <code>+ {selectedFinding.fix_recommendation}</code>
                        </div>
                      </div>

                      {/* Guidance Box */}
                      <div className="space-y-3 pt-2">
                        <p className="text-xs text-emerald-300 leading-relaxed font-sans font-semibold">
                          💡 {details.fixGuidance}
                        </p>

                        <div className="bg-[#121215] border border-zinc-800 rounded-xl p-4 space-y-2">
                          <h5 className="text-xs font-mono uppercase text-zinc-400 font-bold">Step-by-Step Remediation Checklist:</h5>
                          <ol className="space-y-1.5 text-xs text-zinc-300 font-sans list-decimal list-inside">
                            {details.remediationSteps.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">
                                <span className="text-zinc-200">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Tab Panel 4: Hindsight Memory */}
                {detailTab === 'memory' && selectedFinding.memory_influenced && (
                  <div className="bg-purple-950/20 border border-purple-500/40 rounded-xl p-5 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" /> Hindsight Memory Recall
                    </h4>
                    <p className="text-xs text-purple-200 leading-relaxed font-sans bg-[#18181b] p-4 rounded-xl border border-purple-500/30">
                      &quot;{selectedFinding.hindsight_memory_text || 'Previous reviews identified unparameterized SQL queries or direct innerHTML assignments in auth/UI services. Always use safe bindings or sanitization.'}&quot;
                    </p>
                  </div>
                )}

                {/* Bottom Row: Hindsight Memory & Confidence Verification Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                  {/* Hindsight Memory Card */}
                  <div className="bg-[#18181b] border border-purple-500/30 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-purple-300 font-bold flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-purple-400" /> Hindsight Memory
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/40">
                        High Relevance 92%
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                      Previous experience from similar web and security services applied learned rules.
                    </p>
                  </div>

                  {/* Confidence & Evidence Card */}
                  <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Confidence & Evidence
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                        Confidence: {selectedFinding.confidence || 95}%
                      </span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-zinc-300 font-sans">
                      {(selectedFinding.evidence && selectedFinding.evidence.length > 0
                        ? selectedFinding.evidence
                        : [
                            'Pattern detected by static analysis (AST)',
                            'Confirmed by code inspection',
                            'Matched target source code snippet',
                            'Supported by Hindsight memory'
                          ]
                      ).map((ev, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-zinc-500 font-mono flex-1 flex items-center justify-center">
              Select an issue from the left panel to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
