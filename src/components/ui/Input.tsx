import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full bg-[#18181b] border border-[#27272a] text-zinc-100 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder:text-zinc-600',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};
