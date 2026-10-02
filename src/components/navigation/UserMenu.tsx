'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, History, Brain, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 p-1.5 px-3 rounded-xl border transition-all text-xs font-mono font-medium ${
          isOpen
            ? 'border-zinc-600 bg-zinc-800 text-white shadow-lg ring-1 ring-white/10'
            : 'border-zinc-800 bg-[#121215]/90 hover:border-zinc-700 text-zinc-200'
        }`}
      >
        {user.avatar_url ? (
          <img src={user.avatar_url} alt={user.full_name || 'User'} className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 text-white flex items-center justify-center font-bold text-[10px] shadow-inner">
            {initials}
          </div>
        )}
        <span className="hidden sm:inline-block max-w-[120px] truncate text-xs font-bold text-white">
          {user.full_name || user.email.split('@')[0]}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-[#121215]/95 backdrop-blur-2xl border border-zinc-700/80 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] py-2.5 z-[100] animate-in fade-in slide-in-from-top-2 font-mono">
          <div className="px-4 py-3 border-b border-zinc-800/80 space-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white truncate">{user.full_name || 'CodeMind User'}</p>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
          </div>

          <div className="py-1.5 space-y-0.5 px-1.5">
            <Link
              href="/app/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
            >
              <User className="w-4 h-4 text-zinc-400" />
              <span>Profile</span>
            </Link>
            <Link
              href="/app/learning"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Hindsight Memory</span>
            </Link>
            <Link
              href="/app/history"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
            >
              <History className="w-4 h-4 text-zinc-400" />
              <span>Review History</span>
            </Link>
            <Link
              href="/app/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="border-t border-zinc-800/80 pt-1.5 mt-1 px-1.5">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

