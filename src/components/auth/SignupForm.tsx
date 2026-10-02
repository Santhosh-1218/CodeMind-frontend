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

export const SignupForm: React.FC = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register(fullName, email, password);
      router.push('/app');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
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
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Create Account</h2>
        <p className="text-xs text-zinc-400">Start reviewing code with persistent Hindsight AI memory</p>
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
          OR REGISTRATION
        </span>
        <div className="border-t border-zinc-800 w-full" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <Input
          label="Full Name"
          type="text"
          placeholder="Alex Developer"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="alex@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-white/5 transition-all hover:scale-[1.01] mt-2"
          isLoading={loading}
        >
          Create Developer Account <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-zinc-400 relative z-10">
        Already have an account?{' '}
        <Link href="/login" className="text-white font-bold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};


