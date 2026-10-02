'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { ReviewReport as ReviewReportType } from '@/types/review';
import { ReviewReport } from '@/components/report/ReviewReport';
import { Loading } from '@/components/ui/Loading';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';

export default function ReviewReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [report, setReport] = useState<ReviewReportType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchApi<ReviewReportType>(`/reviews/${id}`)
      .then(setReport)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b]">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <Loading message="Loading code review report & verification data..." />
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b]">
        <AnimatedBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center font-mono">
          <p className="text-red-400 text-sm mb-4">{error || 'Review report not found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#09090b] overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewReport report={report} />
      </div>
    </div>
  );
}

