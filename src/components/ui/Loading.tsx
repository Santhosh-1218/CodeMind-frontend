import React from 'react';

export const Loading: React.FC<{ message?: string }> = ({ message = 'Loading CodeMind data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
        <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-medium text-zinc-400">{message}</p>
    </div>
  );
};
