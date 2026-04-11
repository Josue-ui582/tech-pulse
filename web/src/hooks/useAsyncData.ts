import { useEffect, useState, useCallback } from 'react';

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook personnalisé pour gérer le chargement de données asynchrones
 * @param asyncFunction - La fonction asynchrone qui retourne les données
 * @param dependencies - Les dépendances pour déclencher le rechargement
 * @param options - Options supplémentaires
 * @returns État des données { data, loading, error, refetch }
 */
export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  options: {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  } = {}
) {
  const { immediate = true, onSuccess, onError } = options;

  const [state, setState] = useState<AsyncDataState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      onSuccess?.(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [asyncFunction, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    ...state,
    refetch: execute,
  };
}