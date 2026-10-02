'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GitHubButton } from './GitHubButton';
import { GoogleButton } from './GoogleButton';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const err = params.get('error');
      if (err === 'github_oauth_missing_config') {
        setError('GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in backend .env.');
      } else if (err === 'google_oauth_missing_config') {
        setError('Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in backend .env.');
      } else if (err === 'github_oauth_failed') {
        setError('GitHub OAuth authentication failed. Please check credentials or try again.');
      } else if (err === 'google_oauth_failed') {
        setError('Google OAuth authentication failed. Please check credentials or try again.');
      } else if (err === 'github_oauth_cancelled') {
        setError('GitHub sign-in was cancelled.');
      } else if (err === 'google_oauth_cancelled') {
        setError('Google sign-in was cancelled.');
      } else if (err) {
        setError(`Authentication error: ${err}`);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/app');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md bg-[#121215]/90 backdrop-blur-2xl border border-zinc-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden font-mono">
      {/* Ambient Radial Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Clean Card Header */}
      <div className="text-center mb-8 space-y-1.5 relative z-10">
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Sign In</h2>
        <p className="text-xs text-zinc-400">Access your CodeMind developer workspace</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 text-center shadow-lg relative z-10">
          {error}
        </div>
      )}

      <div className="space-y-3 mb-6 relative z-10">
        <GitHubButton />
        <GoogleButton />
      </div>

      <div className="relative flex items-center justify-center mb-6 z-10">
        <div className="border-t border-zinc-800 w-full" />
        <span className="bg-[#121215] px-3 text-[10px] font-mono text-zinc-500 uppercase font-semibold whitespace-nowrap shrink-0">
          OR EMAIL SIGN IN
        </span>
        <div className="border-t border-zinc-800 w-full" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <Input
          label="Email Address"
          type="email"
          placeholder="developer@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#18181b] border border-[#27272a] text-zinc-100 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder:text-zinc-600 font-mono"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-white/5 transition-all hover:scale-[1.01] mt-2"
          isLoading={loading}
        >
          Sign In to Workspace <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-zinc-400 relative z-10">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-white font-bold hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
};


