'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileArchive, CheckCircle2, X, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ZipUploaderProps {
  onSubmit: (file: File) => void;
  isLoading: boolean;
}

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export const ZipUploader: React.FC<ZipUploaderProps> = ({ onSubmit, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSelectFile = (file: File) => {
    setError('');
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setError('Only .zip files are supported.');
      setSelectedFile(null);
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setError(`File size (${sizeMB} MB) exceeds maximum allowed upload size (${MAX_SIZE_MB} MB). Please remove node_modules, build folders, or select a smaller ZIP archive.`);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    setSelectedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select or drop a valid ZIP archive.');
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

  const fileSizeMB = selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) : '0';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 relative ${
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
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 mb-3 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm font-mono font-bold text-white mb-1 break-all max-w-full px-2">{selectedFile.name}</p>
            <p className="text-xs font-mono text-emerald-400/90">
              {fileSizeMB} MB • ZIP Archive Ready for Static Analysis
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
              Supports .zip archives up to {MAX_SIZE_MB}MB • Automatically unpacked & parsed
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-400 flex items-start gap-2.5 shadow-lg">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-white/5 transition-all hover:scale-[1.01]"
        disabled={!selectedFile || isLoading}
        isLoading={isLoading}
      >
        <FileArchive className="w-4 h-4 mr-2" />
        {isLoading ? `Uploading & Processing (${fileSizeMB} MB)...` : 'Analyze ZIP Archive'}
        {!isLoading && <ArrowRight className="w-4 h-4 ml-1.5" />}
      </Button>
    </form>
  );
};

