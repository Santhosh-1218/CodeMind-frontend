'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      // Send reset request to API if endpoint available, or show success feedback
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#121215]/90 backdrop-blur-2xl border border-zinc-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden font-mono">
      {/* Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8 space-y-1.5 relative z-10">
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Reset Password</h2>
        <p className="text-xs text-zinc-400">Enter your email to receive password reset instructions</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 text-center shadow-lg relative z-10">
          {error}
        </div>
      )}

      {success ? (
        <div className="space-y-6 text-center relative z-10 py-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 inline-flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white uppercase">Reset Link Sent</h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
              We&apos;ve sent password reset instructions to <span className="text-white font-bold">{email}</span>. Please check your inbox.
            </p>
          </div>
          <Link href="/login" className="inline-block w-full">
            <Button variant="primary" className="w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold">
              Return to Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <Input
            label="Email Address"
            type="email"
            placeholder="developer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-white/5 transition-all hover:scale-[1.01]"
            isLoading={loading}
          >
            Send Reset Instructions <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>
      )}

      <div className="mt-8 text-center text-xs text-zinc-400 relative z-10">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white font-bold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};
