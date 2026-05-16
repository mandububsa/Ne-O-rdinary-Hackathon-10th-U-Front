import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://zxcv9203.duckdns.org/api/v1";

export type RecipeItem = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
};

type PageData = {
  content: RecipeItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

type ApiResponse = {
  code: string;
  data: PageData;
};

interface UseRecipesReturn {
  data: RecipeItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useRecipes(page = 0, size = 20): UseRecipesReturn {
  const [data, setData] = useState<RecipeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/recipes?page=${page}&size=${size}`
      );

      if (!response.ok) {
        throw new Error(`요청 실패: ${response.status} ${response.statusText}`);
      }

      const json: ApiResponse = await response.json();
      setData(json.data.content);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("알 수 없는 오류"));
    } finally {
      setIsLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return { data, isLoading, error, refetch: fetchRecipes };
}