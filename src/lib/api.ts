export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://codemind-backend-sb3h.onrender.com/api';
  }
  return 'http://localhost:8000/api';
}

interface CacheItem {
  data: any;
  timestamp: number;
}

const apiCache = new Map<string, CacheItem>();
const CACHE_TTL_MS = 30000; // 30 seconds cache for instant page switching

export function clearApiCache() {
  apiCache.clear();
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();

  // Clear cache when performing write operations (POST, PUT, DELETE)
  if (method !== 'GET') {
    clearApiCache();
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('codemind_token') : null;
  const cacheKey = `${token || 'guest'}:${endpoint}`;

  // Serve instantly from cache if available and fresh (exclude auth and profile endpoints)
  const isAuthOrProfile = endpoint.includes('/auth/') || endpoint.includes('/users/');
  if (method === 'GET' && !isAuthOrProfile) {
    const cached = apiCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      return cached.data as T;
    }
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const apiBase = getApiBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });
  } catch (err: any) {
    throw new Error('Backend server is unreachable. If deployed on Render, the free instance may be waking up (please wait ~30s and retry) or check your NEXT_PUBLIC_API_URL.');
  }

  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.detail || errorData.message || errorMsg;
    } catch (e) {
      // ignore JSON parse error
    }
    throw new Error(errorMsg);
  }


  const data = await res.json();

  if (method === 'GET') {
    apiCache.set(cacheKey, { data, timestamp: Date.now() });
  }

  return data as T;
}

