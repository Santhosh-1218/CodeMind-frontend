import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'critical' | 'high' | 'medium' | 'low' | 'default' | 'hindsight' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants = {
    critical: 'bg-red-500/10 text-red-400 border-red-500/30',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    default: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    hindsight: 'bg-purple-500/10 text-purple-300 border-purple-500/30 glow-border',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
