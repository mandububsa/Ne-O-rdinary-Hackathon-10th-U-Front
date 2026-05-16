// hooks/useRecipe.ts
import { useEffect, useState } from "react";

interface Material {
  name: string;
  measure: string;
}

interface ReviewSummary {
  reviewCount: number;
  averageEasiness: number;
  averageVisual: number;
  averageRarity: number;
  averageAffordability: number;
  averageSatisfaction: number;
}

interface Recipe {
  imageUrl: string | null;
  name: string;
  description: string;
  mainMaterials: Material[];
  subMaterials: Material[];
  reviewSummary: ReviewSummary;
}

interface UseRecipeResult {
  data: Recipe | null;
  isLoading: boolean;
  error: string | null;
}

export function useRecipe(recipeId: number | string): UseRecipeResult {
  const [data, setData] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://zxcv9203.duckdns.org/api/v1/recipes/${recipeId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.status}`);
        }

        const json = await response.json();
        setData(json.data); // ← json.data 로 변경
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return { data, isLoading, error };
}