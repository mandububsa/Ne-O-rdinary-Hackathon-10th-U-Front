// hooks/useRecipe.ts
import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://zxcv9203.duckdns.org/api/v1";

export type RecipeMaterial = {
  name: string;
  measure: string;
};

export type ReviewSummary = {
  reviewCount: number;
  averageEasiness: number;
  averageVisual: number;
  averageRarity: number;
  averageAffordability: number;
  averageSatisfaction: number;
};

export type RecipeDetailData = {
  imageUrl: string;
  name: string;
  description: string;
  mainMaterials: RecipeMaterial[];
  subMaterials: RecipeMaterial[];
  reviewSummary: ReviewSummary;
};

type ApiResponse = {
  code: string;
  data: RecipeDetailData;
};

interface UseRecipeReturn {
  data: RecipeDetailData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useRecipe(recipeId: number | string | null): UseRecipeReturn {
  const [data, setData] = useState<RecipeDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecipe = useCallback(async () => {
    if (recipeId === null || recipeId === undefined) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/recipes/${recipeId}`);

      if (!response.ok) {
        throw new Error(`요청 실패: ${response.status} ${response.statusText}`);
      }

      const json: ApiResponse = await response.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("알 수 없는 오류"));
    } finally {
      setIsLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return { data, isLoading, error, refetch: fetchRecipe };
}