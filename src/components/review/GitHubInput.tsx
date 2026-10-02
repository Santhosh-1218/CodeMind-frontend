'use client';

import React, { useState } from 'react';
import { Github, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface GitHubInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const PRESET_REPOS = [
  { name: 'facebook/react', url: 'https://github.com/facebook/react' },
  { name: 'pallets/flask', url: 'https://github.com/pallets/flask' },
  { name: 'fastapi/fastapi', url: 'https://github.com/fastapi/fastapi' },
  { name: 'expressjs/express', url: 'https://github.com/expressjs/express' },
];

export const GitHubInput: React.FC<GitHubInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a GitHub repository URL.');
      return;
    }

    if (!url.includes('github.com/')) {
      setError('URL must be a valid public GitHub repository (e.g. https://github.com/owner/repo)');
      return;
    }

    onSubmit(url.trim());
  };

  const handleSelectPreset = (presetUrl: string) => {
    setUrl(presetUrl);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Public GitHub Repository URL"
          placeholder="https://github.com/owner/repository"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={error}
          disabled={isLoading}
        />
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-2">
          <span>Supports public repositories. No access token required.</span>
          {url && (
            <button
              type="button"
              onClick={() => setUrl('')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Preset Repositories Quick Selector */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mb-2 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Quick Select Sample Repository:
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_REPOS.map((preset) => {
            const isSelected = url === preset.url;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleSelectPreset(preset.url)}
                disabled={isLoading}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-800 border-white text-white shadow-lg'
                    : 'bg-[#18181b] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                {preset.name}
                {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-white/5 transition-all hover:scale-[1.01]"
        isLoading={isLoading}
      >
        <Github className="w-4 h-4 mr-2" />
        Start Automated AST Review <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>
    </form>
  );
};

