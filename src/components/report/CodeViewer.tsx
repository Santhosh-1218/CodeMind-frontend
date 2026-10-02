'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FileCode, X } from 'lucide-react';
import { ReviewFile } from '@/types/review';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeViewerProps {
  file: ReviewFile;
  highlightLine?: number;
  onClose?: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ file, highlightLine, onClose }) => {
  const getLanguage = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.includes('python')) return 'python';
    if (l.includes('javascript') || l.includes('js')) return 'javascript';
    if (l.includes('typescript') || l.includes('ts')) return 'typescript';
    if (l.includes('java')) return 'java';
    if (l.includes('go')) return 'go';
    if (l.includes('rust')) return 'rust';
    if (l.includes('c++') || l.includes('cpp')) return 'cpp';
    if (l.includes('c')) return 'c';
    if (l.includes('json')) return 'json';
    if (l.includes('sql')) return 'sql';
    return 'plaintext';
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    if (highlightLine && highlightLine > 0) {
      editor.revealLineInCenter(highlightLine);
      editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(highlightLine, 1, highlightLine, 1),
            options: {
              isWholeLine: true,
              className: 'bg-red-500/20 border-l-4 border-red-500',
              glyphMarginClassName: 'myGlyphMarginClass'
            }
          }
        ]
      );
    }
  };

  return (
    <div className="bg-[#121215] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
          <FileCode className="w-4 h-4 text-zinc-400" />
          <span className="font-semibold text-white">{file.path}</span>
          <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">
            {file.language}
          </span>
          {highlightLine && (
            <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded font-mono">
              Line {highlightLine}
            </span>
          )}
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="h-96 w-full">
        <MonacoEditor
          height="100%"
          language={getLanguage(file.language)}
          theme="vs-dark"
          value={file.content}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 12,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};
