'use client';

import { useState, useEffect } from 'react';
import { ReviewStatus } from '@/types/review';
import { fetchApi } from '@/lib/api';

export function useReviewStatus(reviewId: string | null) {
  const [status, setStatus] = useState<ReviewStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reviewId) return;

    let isSubscribed = true;
    let timer: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        setLoading(true);
        const data = await fetchApi<ReviewStatus>(`/reviews/${reviewId}/status`);
        if (isSubscribed) {
          setStatus(data);
          setError(null);

          if (data.status !== 'Completed' && data.status !== 'Failed') {
            timer = setTimeout(checkStatus, 750);
          }
        }
      } catch (err: any) {
        if (isSubscribed) {
          setError(err.message || 'Failed to fetch status');
        }
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    checkStatus();

    return () => {
      isSubscribed = false;
      if (timer) clearTimeout(timer);
    };
  }, [reviewId]);

  return { status, loading, error };
}
