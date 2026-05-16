import { useState, useCallback } from "react";

const BASE_URL = "https://zxcv9203.duckdns.org/api/v1";

export type ReviewPayload = {
  easiness: number;
  visual: number;
  rarity: number;
  affordability: number;
  satisfaction: number;
};

interface UseSubmitReviewReturn {
  submitReview: (recipeId: number | string, payload: ReviewPayload) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export function useSubmitReview(): UseSubmitReviewReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitReview = useCallback(async (
    recipeId: number | string,
    payload: ReviewPayload
  ) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(`${BASE_URL}/recipes/${recipeId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`요청 실패: ${response.status} ${response.statusText}`);
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("알 수 없는 오류"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { submitReview, isLoading, error, isSuccess };
}