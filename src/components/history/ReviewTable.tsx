'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Github, FileArchive, ArrowRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatDate } from '@/lib/utils';

interface ReviewItem {
  id: string;
  project_name: string;
  source_type: string;
  status: string;
  quality_score: number;
  security_score: number;
  file_count: number;
  total_issues: number;
  created_at: string;
}

interface ReviewTableProps {
  reviews: ReviewItem[];
}

export const ReviewTable: React.FC<ReviewTableProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-[#121215]/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 text-center text-xs font-mono text-zinc-500">
        No code reviews match your current search or filter criteria.
      </div>
    );
  }

  return (
    <div className="bg-[#121215]/90 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-[#18181b] border-b border-zinc-800 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Quality Score</th>
              <th className="px-6 py-4">Security Score</th>
              <th className="px-6 py-4">Files</th>
              <th className="px-6 py-4">Issues Found</th>
              <th className="px-6 py-4">Analyzed Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-mono">
            {reviews.map((r) => {
              const isGithub = r.source_type?.toLowerCase().includes('github');
              const quality = Math.round(r.quality_score || 0);
              const security = Math.round(r.security_score || 0);

              return (
                <tr key={r.id} className="hover:bg-zinc-800/40 transition-colors group">
                  <td className="px-6 py-4 font-bold text-white truncate max-w-[220px]">
                    <div className="flex items-center gap-2">
                      {isGithub ? (
                        <Github className="w-4 h-4 text-zinc-400 shrink-0" />
                      ) : (
                        <FileArchive className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <span className="truncate group-hover:text-emerald-400 transition-colors">
                        {r.project_name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-zinc-800/60 text-zinc-400 border border-zinc-700/50">
                      {isGithub ? 'GitHub Repo' : 'ZIP Archive'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            quality >= 80 ? 'bg-emerald-400' : quality >= 60 ? 'bg-amber-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${quality}%` }}
                        />
                      </div>
                      <span className="font-bold text-white text-xs">{quality}/100</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-400"
                          style={{ width: `${security}%` }}
                        />
                      </div>
                      <span className="font-bold text-emerald-400 text-xs">{security}/100</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-zinc-400 font-semibold">{r.file_count}</td>

                  <td className="px-6 py-4">
                    {r.total_issues > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-bold">
                        <ShieldAlert className="w-3 h-3" /> {r.total_issues} issues
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                        <ShieldCheck className="w-3 h-3" /> 0 issues
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-zinc-400 text-[11px]">{formatDate(r.created_at)}</td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/app/reviews/${r.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-zinc-800 hover:bg-white hover:text-black px-3 py-1.5 rounded-lg border border-zinc-700 transition-all shadow-sm"
                    >
                      Report <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

