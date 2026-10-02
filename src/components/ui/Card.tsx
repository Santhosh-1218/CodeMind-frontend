import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverable = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-[#121215] border border-[#27272a] rounded-xl p-6 transition-all duration-200 shadow-lg',
        hoverable && 'hover:border-zinc-500 hover:bg-[#18181d] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
