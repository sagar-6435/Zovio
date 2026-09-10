import { useState, useEffect, useCallback } from 'react';

interface UseApiDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetching: boolean;
}

interface UseApiDataReturn<T> extends UseApiDataState<T> {
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data from API
 * Handles loading, error, and caching
 */
export function useApiData<T>(
  fetchFunction: () => Promise<any>,
  dependencies: any[] = []
): UseApiDataReturn<T> {
  const [state, setState] = useState<UseApiDataState<T>>({
    data: null,
    loading: true,
    error: null,
    refetching: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchFunction();
      if (response.success) {
        setState((prev) => ({
          ...prev,
          data: response.data as T,
          loading: false,
          error: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: response.error || 'Failed to fetch data',
          loading: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Unknown error',
        loading: false,
      }));
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      refetching: true,
    }));
    await fetchData();
    setState((prev) => ({
      ...prev,
      refetching: false,
    }));
  }, [fetchData]);

  return {
    ...state,
    refetch,
  };
}

/**
 * Custom hook for paginated API data
 */
export function usePaginatedApiData<T>(
  fetchFunction: (page: number, limit: number) => Promise<any>,
  initialPage: number = 1,
  pageSize: number = 10
) {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchFunction(page, pageSize);
      if (response.success) {
        setData(response.data as T[]);
        setTotal(response.total || 0);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const goToPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, Math.ceil(total / pageSize))));
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    goToPage,
    nextPage,
    prevPage,
    refetch: fetchData,
  };
}

/**
 * Custom hook for searching and filtering API data
 */
export function useSearchableApiData<T>(
  fetchAllFunction: () => Promise<any>
) {
  const [allData, setAllData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllFunction();
      if (response.success) {
        setAllData(response.data as T[]);
        setFilteredData(response.data as T[]);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [fetchAllFunction]);

  const search = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (!term) {
        setFilteredData(allData);
        return;
      }

      const lowerTerm = term.toLowerCase();
      const filtered = allData.filter((item: any) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerTerm)
        );
      });
      setFilteredData(filtered);
    },
    [allData]
  );

  const filter = useCallback(
    (filterObj: Record<string, any>) => {
      setFilters(filterObj);
      let filtered = allData;

      Object.entries(filterObj).forEach(([key, value]) => {
        if (value) {
          filtered = filtered.filter((item: any) => {
            if (Array.isArray(value)) {
              return value.includes(item[key]);
            }
            return item[key] === value;
          });
        }
      });

      setFilteredData(filtered);
    },
    [allData]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({});
    setFilteredData(allData);
  }, [allData]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    data: filteredData,
    allData,
    loading,
    error,
    searchTerm,
    filters,
    search,
    filter,
    clearFilters,
    total: filteredData.length,
    refetch: loadAllData,
  };
}
