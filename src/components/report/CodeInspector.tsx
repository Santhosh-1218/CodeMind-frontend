'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  FileCode, Search, Copy, Check, Download, AlertTriangle,
  Folder, Code2, FileText, Cpu, Layers, Sparkles, Filter, FileCheck
} from 'lucide-react';
import { ReviewFile, Finding } from '@/types/review';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeInspectorProps {
  files: ReviewFile[];
  findings?: Finding[];
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ files, findings = [] }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>(
    files.length > 0 ? files[0].id : ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');
  const [onlyWithIssues, setOnlyWithIssues] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Map findings per file path
  const fileIssuesMap = useMemo(() => {
    const map: Record<string, { count: number; critical: number; high: number }> = {};
    findings.forEach(f => {
      if (!map[f.file_path]) {
        map[f.file_path] = { count: 0, critical: 0, high: 0 };
      }
      map[f.file_path].count += 1;
      if (f.severity.toLowerCase() === 'critical') map[f.file_path].critical += 1;
      if (f.severity.toLowerCase() === 'high') map[f.file_path].high += 1;
    });
    return map;
  }, [findings]);

  // Unique languages
  const availableLanguages = useMemo(() => {
    const set = new Set<string>();
    files.forEach(f => set.add(f.language.toLowerCase()));
    return Array.from(set);
  }, [files]);

  // Filtered files list
  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.path.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLang = filterLanguage === 'all' || file.language.toLowerCase() === filterLanguage;
      const issues = fileIssuesMap[file.path]?.count || 0;
      const matchesIssues = !onlyWithIssues || issues > 0;
      return matchesSearch && matchesLang && matchesIssues;
    });
  }, [files, searchQuery, filterLanguage, onlyWithIssues, fileIssuesMap]);

  const selectedFile = files.find(f => f.id === selectedFileId) || (files.length > 0 ? files[0] : null);
  const selectedFileIssues = selectedFile ? fileIssuesMap[selectedFile.path] : null;

  const handleCopyCode = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadFile = () => {
    if (selectedFile) {
      const filename = selectedFile.path.split('/').pop() || 'file.txt';
      const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getLanguageMonaco = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.includes('python') || l.includes('py')) return 'python';
    if (l.includes('typescript') || l.includes('ts') || l.includes('tsx')) return 'typescript';
    if (l.includes('javascript') || l.includes('js') || l.includes('jsx')) return 'javascript';
    if (l.includes('json')) return 'json';
    if (l.includes('yaml') || l.includes('yml')) return 'yaml';
    if (l.includes('docker') || l.includes('dockerfile')) return 'dockerfile';
    if (l.includes('html')) return 'html';
    if (l.includes('css')) return 'css';
    if (l.includes('sql')) return 'sql';
    if (l.includes('go')) return 'go';
    if (l.includes('rust')) return 'rust';
    if (l.includes('java')) return 'java';
    if (l.includes('c++') || l.includes('cpp')) return 'cpp';
    if (l.includes('c')) return 'c';
    return 'plaintext';
  };

  const getFileIcon = (filePath: string, lang: string) => {
    const l = lang.toLowerCase();
    const name = filePath.toLowerCase();
    if (name.includes('docker') || name.includes('container')) {
      return <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />;
    }
    if (l.includes('python')) return <FileCode className="w-4 h-4 text-amber-400 shrink-0" />;
    if (l.includes('typescript') || l.includes('ts')) return <Code2 className="w-4 h-4 text-blue-400 shrink-0" />;
    if (l.includes('javascript') || l.includes('js')) return <Code2 className="w-4 h-4 text-yellow-400 shrink-0" />;
    if (l.includes('json') || l.includes('yaml')) return <FileText className="w-4 h-4 text-emerald-400 shrink-0" />;
    return <FileCode className="w-4 h-4 text-zinc-400 shrink-0" />;
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const countLines = (str: string) => {
    if (!str) return 0;
    return str.split('\n').length;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[640px] max-h-[850px] h-[calc(100vh-220px)]">
      {/* Left Column: Project Files Explorer (Independent Vertical Scroll) */}
      <div className="lg:col-span-4 bg-[#121215] border border-zinc-800/90 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        {/* Header & Search Bar */}
        <div className="p-3.5 border-b border-zinc-800/80 bg-[#18181b]/60 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-zinc-200 flex items-center gap-2">
              <Folder className="w-3.5 h-3.5 text-emerald-400" /> Project Files ({filteredFiles.length})
            </span>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Total {files.length}</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search file path..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 font-mono"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between gap-2 pt-1 font-mono text-[11px]">
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="bg-[#18181b] border border-zinc-800 rounded-lg px-2.5 py-1 text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
              ))}
            </select>

            <button
              onClick={() => setOnlyWithIssues(!onlyWithIssues)}
              className={`px-2.5 py-1 rounded-lg border transition-colors font-semibold flex items-center gap-1 ${
                onlyWithIssues
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-[#18181b] text-zinc-400 hover:text-zinc-200 border-zinc-800'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-amber-400" /> Issues Only
            </button>
          </div>
        </div>

        {/* Files List Scroll Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => {
              const isSelected = selectedFile?.id === file.id;
              const issues = fileIssuesMap[file.path];
              const lineCount = countLines(file.content);

              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-150 flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#18181b] border-emerald-500/40 text-white shadow-lg ring-1 ring-emerald-500/30'
                      : 'bg-[#121215] border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    {getFileIcon(file.path, file.language)}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono font-bold text-zinc-200 truncate leading-snug" title={file.path}>
                        {file.path}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-500">
                        <span className="uppercase font-semibold text-zinc-400">{file.language}</span>
                        <span>•</span>
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{lineCount} lines</span>
                      </div>
                    </div>
                  </div>

                  {/* Issues Count Badge */}
                  {issues && issues.count > 0 ? (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 flex items-center gap-1 ${
                      issues.critical > 0 || issues.high > 0
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      <AlertTriangle className="w-2.5 h-2.5" /> {issues.count}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-600 border border-zinc-800/60 shrink-0">
                      Clean
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-zinc-500 font-mono">
              No files match the current search or filters.
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Monaco Code Viewer Panel */}
      <div className="lg:col-span-8 bg-[#121215] border border-zinc-800/90 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {selectedFile ? (
          <>
            {/* Inspector Top Header Bar */}
            <div className="p-4 bg-[#141417] border-b border-zinc-800/90 shrink-0 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* File Path & Language */}
                <div className="flex items-center gap-2.5 min-w-0">
                  {getFileIcon(selectedFile.path, selectedFile.language)}
                  <div className="min-w-0">
                    <h3 className="text-sm font-mono font-bold text-white truncate" title={selectedFile.path}>
                      {selectedFile.path}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-0.5">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase">
                        {selectedFile.language}
                      </span>
                      <span>•</span>
                      <span>{formatFileSize(selectedFile.size)}</span>
                      <span>•</span>
                      <span>{countLines(selectedFile.content)} lines</span>
                    </div>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold transition-colors active:scale-95"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                    {copiedCode ? 'Copied' : 'Copy Code'}
                  </button>
                  <button
                    onClick={handleDownloadFile}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold transition-colors active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" /> Download
                  </button>
                </div>
              </div>

              {/* Finding Alert Banner if File Has Findings */}
              {selectedFileIssues && selectedFileIssues.count > 0 && (
                <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs font-mono text-amber-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>This file contains <strong>{selectedFileIssues.count} detected issue(s)</strong> ({selectedFileIssues.critical} Critical, {selectedFileIssues.high} High).</span>
                  </div>
                </div>
              )}
            </div>

            {/* Monaco Editor Container with Full Height */}
            <div className="flex-1 w-full bg-[#09090b]">
              <MonacoEditor
                height="100%"
                language={getLanguageMonaco(selectedFile.language)}
                theme="vs-dark"
                value={selectedFile.content}
                options={{
                  readOnly: true,
                  minimap: { enabled: true },
                  fontSize: 12,
                  fontFamily: 'JetBrains Mono, Fira Code, Menlo, monospace',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  lineDecorationsWidth: 12,
                  lineNumbersMinChars: 3,
                  renderLineHighlight: 'all',
                  scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible',
                    useShadows: false,
                    verticalScrollbarSize: 10,
                    horizontalScrollbarSize: 10
                  }
                }}
              />
            </div>
          </>
        ) : (
          <div className="p-12 text-center text-xs text-zinc-500 font-mono flex-1 flex items-center justify-center">
            Select a project file from the left sidebar to inspect source code.
          </div>
        )}
      </div>
    </div>
  );
};
