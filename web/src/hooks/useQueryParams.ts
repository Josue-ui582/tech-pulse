import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook personnalisé pour gérer les paramètres de requête URL
 * @returns Fonctions pour manipuler les query params
 */
export function useQueryParams() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const getParam = useCallback((key: string): string | null => {
    return params.get(key);
  }, [params]);

  const setParam = useCallback((key: string, value: string) => {
    const query = new URLSearchParams(params.toString());
    query.set(key, value);
    router.push(`${pathname}?${query.toString()}`);
  }, [params, router, pathname]);

  const deleteParam = useCallback((key: string) => {
    const query = new URLSearchParams(params.toString());
    query.delete(key);
    router.push(`${pathname}?${query.toString()}`);
  }, [params, router, pathname]);

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const query = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        query.delete(key);
      } else {
        query.set(key, value);
      }
    });

    router.push(`${pathname}?${query.toString()}`);
  }, [params, router, pathname]);

  const getAllParams = useCallback(() => {
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [params]);

  return {
    getParam,
    setParam,
    deleteParam,
    updateParams,
    getAllParams,
    params,
  };
}