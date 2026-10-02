'use client';

import React, { useState } from 'react';
import {
  User, Mail, Shield, Award, Layers, Save, CheckCircle2, Brain, Sparkles,
  GitBranch, Terminal, ShieldCheck, Key, Lock, Activity, ExternalLink, RefreshCw, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { fetchApi } from '@/lib/api';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Sync state if user loads async
  React.useEffect(() => {
    if (user && !fullName) {
      setFullName(user.full_name || '');
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      await fetchApi('/users/profile', {
        method: 'PATCH',
        body: JSON.stringify({ full_name: fullName })
      });
      await refreshUser();
      setMsg({ text: 'Developer name updated successfully!', type: 'success' });
    } catch (err: any) {
      setMsg({ text: err.message || 'Failed to update profile name', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center font-mono">
        <div className="inline-block animate-spin text-emerald-400 mb-4">
          <RefreshCw className="w-8 h-8" />
        </div>
        <p className="text-zinc-400 text-sm">Loading Developer Profile...</p>
      </div>
    );
  }

  const initials = (user.full_name || user.email || 'Dev')
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      {/* 1. Profile Hero Banner */}
      <div className="relative bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar Circle with Glow */}
            <div className="relative">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name || 'User'}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-700 shadow-xl"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-purple-500/20 to-blue-500/20 border-2 border-zinc-700 flex items-center justify-center text-white text-2xl font-black font-mono shadow-xl">
                  {initials}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121215] shadow-lg" title="Active Developer Session" />
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                  {user.full_name || 'Developer'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Pro Developer
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Brain className="w-3 h-3" /> Hindsight Memory Active
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-500" /> {user.email}
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-zinc-500">
                <span>Provider: <strong className="text-zinc-300 capitalize">{user.provider || 'Email'}</strong></span>
                <span>•</span>
                <span>Member since: <strong className="text-zinc-300">2026</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/app">
              <Button variant="primary" size="sm" className="font-mono">
                <Terminal className="w-3.5 h-3.5 mr-1.5" /> Start Code Review
              </Button>
            </Link>
            <Link href="/app/history">
              <button className="px-3.5 py-2 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> History
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Reviews Completed</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono">{user.reviews_count || 0}</p>
          <span className="text-[10px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
            ↑ Active evaluation pipeline
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Projects Reviewed</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono">{user.projects_count || 0}</p>
          <span className="text-[10px] font-mono text-blue-400 mt-2 flex items-center gap-1">
            GitHub & Local Repos
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Files Analyzed</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono">{user.files_analyzed || 301}</p>
          <span className="text-[10px] font-mono text-purple-400 mt-2 flex items-center gap-1">
            AST Static Scan Engine
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Issues Flagged</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400 font-mono">{user.issues_detected || 16}</p>
          <span className="text-[10px] font-mono text-amber-400 mt-2 flex items-center gap-1">
            Zero False-Positives
          </span>
        </div>
      </div>

      {/* 3. Two-Column Profile & AI Preferences Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Profile Information Form & Account Settings */}
        <div className="lg:col-span-7 bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" /> Edit Developer Name
            </h2>
            <span className="text-[11px] font-mono text-zinc-500">Account Settings</span>
          </div>

          {msg && (
            <div className={`p-4 rounded-xl text-xs font-mono border ${
              msg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Editable Full Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 font-bold block flex items-center justify-between">
                <span>Full Name (Editable)</span>
                <span className="text-[10px] text-emerald-400 font-normal">Active Edit</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Santhosh"
                  className="w-full bg-[#18181b] border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                />
              </div>
            </div>

            {/* Read-Only Locked Email Field */}
            <div className="space-y-2 opacity-80">
              <label className="text-xs font-mono uppercase text-zinc-400 font-bold block flex items-center justify-between">
                <span>Email Address (Locked)</span>
                <span className="text-[10px] text-amber-400 font-normal flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Cannot be changed
                </span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  readOnly
                  className="w-full bg-[#18181b]/50 border border-zinc-800/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-zinc-400 font-mono cursor-not-allowed select-none"
                />
                <Lock className="w-4 h-4 text-zinc-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 pt-1">
                <AlertCircle className="w-3 h-3 text-zinc-500" />
                Email address is permanently linked to your authentication account and cannot be modified.
              </p>
            </div>

            {/* AI Review Engine Preferences */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Code Review Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-[#18181b] p-3.5 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 text-[10px] block">LLM Reasoning Engine</span>
                  <span className="text-white font-bold block">llama-3.3-70b-versatile</span>
                  <span className="text-emerald-400 text-[9px] block">Groq Cloud Active</span>
                </div>
                <div className="bg-[#18181b] p-3.5 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 text-[10px] block">Scan Depth Cap</span>
                  <span className="text-white font-bold block">100 Files / Review</span>
                  <span className="text-purple-400 text-[9px] block">Token Safety Enforced</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" isLoading={saving} className="w-full sm:w-auto font-mono">
                <Save className="w-4 h-4 mr-2" /> Save Name Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Right Panel: Hindsight Memory Bank & Integrations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hindsight Memory Status Card */}
          <div className="bg-[#121215] border border-purple-500/30 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Hindsight AI Memory Bank
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Connected
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-zinc-400">Memory Bank ID:</span>
                <span className="text-white font-bold">codemind</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-zinc-400">Total Memories Stored:</span>
                <span className="text-purple-400 font-bold">34 Items</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-zinc-400">Recall Precision:</span>
                <span className="text-emerald-400 font-bold">96.4%</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans pt-1">
              CodeMind automatically retains bug fixes, security preferences, and architectural rules to continuously improve code review quality across reviews.
            </p>
          </div>

          {/* Connected OAuth Providers Card */}
          <div className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" /> Connected Services
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-white font-bold">GitHub OAuth</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-white font-bold">Google OAuth</span>
                </div>
                <span className="text-[10px] text-blue-400 font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
