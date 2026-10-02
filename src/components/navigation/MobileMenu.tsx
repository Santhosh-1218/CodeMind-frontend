'use client';

import React from 'react';
import Link from 'next/link';
import { X, Code2, Brain, History, User, Settings, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAppNav?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isAppNav = false }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden animate-in fade-in">
      <div className="flex flex-col h-full p-6 bg-[#09090b] border-r border-zinc-800 max-w-sm w-full">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">CodeMind</span>
          </Link>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-4">
          {isAppNav ? (
            <>
              <Link
                href="/app"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              >
                <Code2 className="w-5 h-5 text-white" />
                Review Workspace
              </Link>
              <Link
                href="/app/history"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              >
                <History className="w-5 h-5 text-zinc-400" />
                History
              </Link>
              <Link
                href="/app/learning"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              >
                <Brain className="w-5 h-5 text-purple-400" />
                Learning Memory
              </Link>
              <Link
                href="/app/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              >
                <User className="w-5 h-5 text-zinc-400" />
                Profile
              </Link>
              <Link
                href="/app/settings"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              >
                <Settings className="w-5 h-5 text-zinc-400" />
                Settings
              </Link>
            </>
          ) : (
            <>
              <Link href="/how-it-works" onClick={onClose} className="block text-base font-medium text-zinc-300 hover:text-white py-2">
                How It Works
              </Link>
              <Link href="/features" onClick={onClose} className="block text-base font-medium text-zinc-300 hover:text-white py-2">
                Features
              </Link>
              <Link href="/about" onClick={onClose} className="block text-base font-medium text-zinc-300 hover:text-white py-2">
                About
              </Link>
            </>
          )}
        </nav>

        <div className="pt-6 border-t border-zinc-800 space-y-3">
          {user ? (
            <Link href="/app" onClick={onClose}>
              <Button variant="primary" className="w-full">
                Open App Workspace
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={onClose}>
                <Button variant="outline" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={onClose}>
                <Button variant="primary" className="w-full justify-center">
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
