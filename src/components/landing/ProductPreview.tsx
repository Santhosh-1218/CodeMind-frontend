'use client';

import React from 'react';
import { ShieldAlert, Brain, CheckCircle2, AlertTriangle, Terminal, Code2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const ProductPreview: React.FC = () => {
  return (
    <section className="py-12 border-y border-zinc-800/80 bg-[#0d0d10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">Real-Time Review Report & Memory Recall</h2>
          <p className="text-xs text-zinc-400 mt-1">Live application interface preview showing Hindsight memory influence</p>
        </div>

        {/* Mock Report Window */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#18181b] border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <span className="text-xs font-mono text-zinc-300">octocat / payment-gateway-service</span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">Python • TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="hindsight">
                <Brain className="w-3 h-3 text-purple-400" /> 4 Memories Recalled
              </Badge>
              <Badge variant="success">Review Complete</Badge>
            </div>
          </div>

          {/* Report Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-zinc-800/80 bg-[#0d0d10]">
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400">Code Quality</p>
              <p className="text-2xl font-black text-white mt-1">88 / 100</p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400">Security Score</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">94 / 100</p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400">Critical Issues</p>
              <p className="text-2xl font-black text-red-400 mt-1">1</p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400">Memories Retained</p>
              <p className="text-2xl font-black text-purple-400 mt-1">2 New</p>
            </div>
          </div>

          {/* Finding Cards Preview */}
          <div className="p-6 space-y-4">
            {/* Finding Card 1 with Hindsight Badge */}
            <div className="bg-[#18181b] border border-purple-500/30 rounded-xl p-5 relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Badge variant="critical">Critical</Badge>
                    <span className="text-xs font-mono text-zinc-400">Security • app/api/checkout.py:L42</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Unsanitized SQL String Interpolation</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  Memory Influenced
                </div>
              </div>

              <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                Direct concatenation into raw SQL execution creates a severe SQL injection vulnerability in user lookup logic.
              </p>

              {/* Code Snippet */}
              <div className="bg-[#09090b] p-3 rounded-lg border border-zinc-800 font-mono text-xs text-red-300 mb-3 overflow-x-auto">
                <code>- cursor.execute(f&quot;SELECT * FROM users WHERE id = &#123;user_id&#125;&quot;)</code>
              </div>

              {/* Hindsight Insight Box */}
              <div className="bg-purple-950/20 border border-purple-500/20 rounded-lg p-3 text-xs text-purple-200 flex items-start gap-2.5">
                <Brain className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-purple-300 block mb-0.5">Recalled Hindsight Learning:</span>
                  Recalled prior experience from past review: Developer previously used unparameterized queries in auth services. Applied persistent rule dictating SQLAlchemy bound parameters.
                </div>
              </div>
            </div>

            {/* Finding Card 2 */}
            <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Badge variant="medium">Medium</Badge>
                    <span className="text-xs font-mono text-zinc-400">Quality • app/services/payment.ts:L88</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Missing Exception Logging in Payment Catch Block</h3>
                </div>
              </div>
              <p className="text-xs text-zinc-300">
                Catch block swallows network exceptions without logging standard error tracebacks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
