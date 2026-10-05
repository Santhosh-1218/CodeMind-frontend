'use client';

import React, { useState } from 'react';
import {
  Settings, Cpu, Brain, Github, ShieldCheck, CheckCircle2, Save, Sparkles,
  Sliders, Shield, FileCode, Check, Copy, RefreshCw, Key, ToggleLeft, ToggleRight
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const [scanCap, setScanCap] = useState('100');
  const [astEnabled, setAstEnabled] = useState(true);
  const [evidenceVerifier, setEvidenceVerifier] = useState(true);
  const [hindsightAutoRecall, setHindsightAutoRecall] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  const webhookUrl = "https://codemind-backend-sb3h.onrender.com/api/webhooks/github";

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono mb-2">
            <Sliders className="w-3.5 h-3.5" /> Platform Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono uppercase">
            Platform Settings & AI Models
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Configure Groq LLM reasoning models, Hindsight memory rules, and static analysis depth
          </p>
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between shadow-lg">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Platform settings saved successfully!
          </span>
          <span className="text-[10px] text-zinc-500 uppercase">Configuration Applied</span>
        </div>
      )}

      {/* 1. Integrations Status Cards */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-400" /> Active System Integrations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Groq Card */}
          <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">Groq LLM Engine</h3>
                <p className="text-[11px] font-mono text-zinc-400">Model: {model}</p>
              </div>
            </div>
            <Badge variant="success">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </Badge>
          </div>

          {/* Hindsight Card */}
          <div className="bg-[#121215] border border-purple-500/30 rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">Hindsight Vector Memory</h3>
                <p className="text-[11px] font-mono text-purple-300">Bank: codemind (34 Items)</p>
              </div>
            </div>
            <Badge variant="hindsight">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </Badge>
          </div>

          {/* GitHub OAuth Card */}
          <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#18181b] border border-zinc-700 rounded-xl text-white">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">GitHub OAuth & Archives</h3>
                <p className="text-[11px] font-mono text-zinc-400">Zip / Repo Ingestion Active</p>
              </div>
            </div>
            <Badge variant="success">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </Badge>
          </div>

          {/* Google OAuth Card */}
          <div className="bg-[#121215] border border-zinc-800/90 rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#18181b] border border-zinc-700 rounded-xl text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">Google OAuth 2.0</h3>
                <p className="text-[11px] font-mono text-zinc-400">Authentication Service</p>
              </div>
            </div>
            <Badge variant="success">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </Badge>
          </div>
        </div>

        {/* GitHub Webhook / CI/CD Card */}
        <div className="bg-[#121215] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  🔗 GitHub Webhook / CI/CD Integration
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Automatically trigger CodeMind scans whenever a Pull Request is opened or updated on GitHub
                </p>
              </div>
            </div>
            <Badge variant="success">
              <CheckCircle2 className="w-3 h-3" /> Endpoint Live
            </Badge>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4 space-y-2">
              <label className="text-[10px] text-zinc-400 uppercase font-bold block">
                GitHub Webhook Payload URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={webhookUrl}
                  className="w-full bg-[#09090b] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyWebhook}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shrink-0 transition-all flex items-center gap-1.5 shadow"
                >
                  {copiedWebhook ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedWebhook ? 'Copied' : 'Copy URL'}
                </button>
              </div>
            </div>

            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase">Step-by-Step GitHub Setup Guide:</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 text-[11px] leading-relaxed font-sans">
                <li>Go to your GitHub Repository ➔ <strong>Settings</strong> ➔ <strong>Webhooks</strong> ➔ Click <strong>Add webhook</strong>.</li>
                <li>Paste Payload URL: <code className="text-emerald-300 bg-emerald-950/40 px-1 py-0.5 rounded font-mono">{webhookUrl}</code></li>
                <li>Set Content type: <code className="text-emerald-300 bg-emerald-950/40 px-1 py-0.5 rounded font-mono">application/json</code></li>
                <li>Select events: Choose <strong>"Let me select individual events"</strong> ➔ Check <strong>Pull requests</strong> & <strong>Pushes</strong>.</li>
                <li>Click <strong>Add webhook</strong>. Every PR opened will now automatically trigger a zero-hallucination CodeMind code review!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AI Review & Model Preferences Form */}
      <form onSubmit={handleSave} className="bg-[#121215] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Review & AI Model Preferences
          </h2>
          <span className="text-[11px] font-mono text-zinc-500">Live Customization</span>
        </div>

        {/* LLM Model Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
            Default LLM Reasoning Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-700 text-white text-xs rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="llama-3.3-70b-versatile">Groq - llama-3.3-70b-versatile (Recommended / Fast)</option>
            <option value="llama3-70b-8192">Groq - llama3-70b-8192</option>
            <option value="mixtral-8x7b-32768">Groq - mixtral-8x7b-32768</option>
            <option value="gemma2-9b-it">Groq - gemma2-9b-it</option>
          </select>
          <p className="text-[11px] font-mono text-zinc-500">
            Selected model performs high-speed code reasoning staying under rate limits.
          </p>
        </div>

        {/* Scan Depth Limit */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
            Maximum File Scan Cap per Review
          </label>
          <select
            value={scanCap}
            onChange={(e) => setScanCap(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-700 text-white text-xs rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="50">50 Files (Fastest)</option>
            <option value="100">100 Files (Recommended Default)</option>
            <option value="150">150 Files (Deep Scan)</option>
          </select>
        </div>

        {/* Pipeline Safety Toggles */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
            Analysis Pipeline & Evidence Verification
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
              <div>
                <span className="text-white font-bold block">Python AST Static Analysis</span>
                <span className="text-[11px] text-zinc-400 block">Detects unparameterized SQL queries, eval/exec, and command injections via python `ast`.</span>
              </div>
              <button
                type="button"
                onClick={() => setAstEnabled(!astEnabled)}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${astEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'}`}
              >
                {astEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
              <div>
                <span className="text-white font-bold block">Zero-Hallucination Code Evidence Verifier</span>
                <span className="text-[11px] text-zinc-400 block">Verifies that every flagged finding exists at exact file & line number before reporting.</span>
              </div>
              <button
                type="button"
                onClick={() => setEvidenceVerifier(!evidenceVerifier)}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${evidenceVerifier ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'}`}
              >
                {evidenceVerifier ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
              <div>
                <span className="text-purple-300 font-bold block flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-purple-400" /> Hindsight Auto-Recall & Learning Loop
                </span>
                <span className="text-[11px] text-zinc-400 block">Automatically recalls past review memories and retains new security conventions.</span>
              </div>
              <button
                type="button"
                onClick={() => setHindsightAutoRecall(!hindsightAutoRecall)}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${hindsightAutoRecall ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-zinc-800 text-zinc-500'}`}
              >
                {hindsightAutoRecall ? 'Active' : 'Paused'}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" isLoading={saving} className="font-mono">
            <Save className="w-4 h-4 mr-2" /> Save Platform Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
