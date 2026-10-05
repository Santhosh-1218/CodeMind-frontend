'use client';

import React from 'react';
import { Github } from 'lucide-react';
import { getApiBaseUrl } from '@/lib/api';

export const GitHubButton: React.FC = () => {
  const handleGitHubLogin = () => {
    const apiBase = getApiBaseUrl();
    window.location.href = `${apiBase}/auth/github`;
  };

  return (
    <button
      type="button"
      onClick={handleGitHubLogin}
      className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md"
    >
      <Github className="w-4 h-4 fill-current" />
      Continue with GitHub
    </button>
  );
};
