'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, Github, Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-800 text-zinc-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">CodeMind</span>
            </Link>
            <p className="text-zinc-400 max-w-sm mb-4 leading-relaxed">
              AI-powered code review agent that remembers previous review findings and learns continuously using Hindsight vector memory.
            </p>
            <div className="flex items-center gap-2 text-zinc-500">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Hindsight Vector Engine Connected</span>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Project</Link></li>
              <li><Link href="/app" className="hover:text-white transition-colors">Review Workspace</Link></li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
              <li><a href="https://api.hindsight.vectorize.io/docs" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Hindsight API Docs</a></li>
              <li><a href="https://groq.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Groq LLM Engine</a></li>
              <li><Link href="/app/learning" className="hover:text-white transition-colors">Hindsight Learning Bank</Link></li>
            </ul>
          </div>

          {/* Navigation Column 3 */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Security Practices</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <p>© {new Date().getFullYear()} CodeMind AI Inc. All rights reserved. Hackathon Production Edition.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
