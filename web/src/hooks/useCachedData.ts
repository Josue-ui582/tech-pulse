import { useEffect, useState, useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

/**
 * Hook personnalisé pour gérer des données avec cache
 * @param key - Clé unique pour le cache
 * @param fetcher - Fonction pour récupérer les données
 * @param ttl - Durée de vie du cache en millisecondes (défaut: 5 minutes)
 * @returns État des données avec cache { data, loading, error, refetch, invalidate }
 */
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutes par défaut
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache en mémoire (simple implementation)
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());

  const isExpired = useCallback((entry: CacheEntry<T>): boolean => {
    return Date.now() - entry.timestamp > entry.ttl;
  }, []);

  const getCachedData = useCallback((): T | null => {
    const entry = cacheRef.current.get(key);
    if (entry && !isExpired(entry)) {
      return entry.data;
    }
    return null;
  }, [key, isExpired]);

  const setCachedData = useCallback((data: T) => {
    cacheRef.current.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }, [key, ttl]);

  const fetchData = useCallback(async (force = false) => {
    // Vérifier le cache d'abord
    if (!force) {
      const cachedData = getCachedData();
      if (cachedData !== null) {
        setData(cachedData);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const freshData = await fetcher();
      setData(freshData);
      setCachedData(freshData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de chargement';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetcher, getCachedData, setCachedData]);

  const invalidate = useCallback(() => {
    cacheRef.current.delete(key);
  }, [key]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    invalidate,
  };
}