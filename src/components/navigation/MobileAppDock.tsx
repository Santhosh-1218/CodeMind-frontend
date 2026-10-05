'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, History, Brain, User, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const MobileAppDock: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user || !pathname?.startsWith('/app')) return null;

  const items = [
    { href: '/app', label: 'Review', icon: Code2, exact: true },
    { href: '/app/history', label: 'History', icon: History, exact: false },
    { href: '/app/learning', label: 'Memory', icon: Brain, exact: false, color: 'text-purple-400' },
    { href: '/app/profile', label: 'Profile', icon: User, exact: false },
  ];

  const checkIsActive = (href: string, exact: boolean) => {
    if (!pathname) return false;
    if (exact) return pathname === '/app';
    return pathname.startsWith(href);
  };

  return (
    <nav aria-label="Mobile app navigation" className="fixed bottom-3 left-3 right-3 z-50 md:hidden pointer-events-auto">
      <div className="bg-[#09090b]/95 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl px-2 py-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.95)] ring-1 ring-white/10 flex items-center justify-around font-mono">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = checkIsActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-zinc-800/90 text-white font-bold border border-zinc-700/80 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${item.color || (isActive ? 'text-emerald-400' : 'text-zinc-400')}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
