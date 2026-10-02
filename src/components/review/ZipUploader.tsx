'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileArchive, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface ZipUploaderProps {
  onSubmit: (file: File) => void;
  isLoading: boolean;
}

export const ZipUploader: React.FC<ZipUploaderProps> = ({ onSubmit, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.endsWith('.zip')) {
        setError('Only .zip files are supported.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError('');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.name.endsWith('.zip')) {
        setError('Only .zip files are supported.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select or drop a ZIP archive.');
      return;
    }
    onSubmit(selectedFile);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 relative ${
          selectedFile
            ? 'border-emerald-500/60 bg-emerald-500/5 shadow-lg shadow-emerald-500/5'
            : isDragging
            ? 'border-white bg-zinc-800/80 scale-[1.01]'
            : 'border-zinc-800 hover:border-zinc-600 bg-[#18181b]/50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".zip"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />

        {selectedFile ? (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 mb-3 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm font-mono font-bold text-white mb-1">{selectedFile.name}</p>
            <p className="text-xs font-mono text-emerald-400/90">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • ZIP Archive Ready for Static Analysis
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-300 mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8 text-zinc-300" />
            </div>
            <p className="text-sm font-mono font-bold text-white mb-1">
              Click to browse or drag & drop ZIP project
            </p>
            <p className="text-xs font-mono text-zinc-500">
              Supports .zip archives up to 25MB • Automatically unpacked & parsed
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-xs font-mono text-red-400">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        className="w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-white/5 transition-all hover:scale-[1.01]"
        disabled={!selectedFile || isLoading}
        isLoading={isLoading}
      >
        <FileArchive className="w-4 h-4 mr-2" />
        Analyze ZIP Archive <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>
    </form>
  );
};

