'use client'

import { useState, useEffect } from 'react';
import { searchRecipes, RecipeSearchItem } from '@/lib/recipes';

type UseRecipeSearchParams = {
  keyword?: string;
  categoryIds?: number[];
  size?: number;
};

// keyword / categoryIds 가 바뀌면 자동으로 /recipes/search 호출.
export function useRecipeSearch({ keyword, categoryIds, size = 10 }: UseRecipeSearchParams) {
  const [results, setResults] = useState<RecipeSearchItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // 배열은 매 렌더마다 새 참조라 deps용 문자열 키로 변환
  const categoryIdsKey = (categoryIds ?? []).join(',');

  useEffect(() => {
    // 검색 조건이 하나도 없으면 호출하지 않음
    if (!keyword && categoryIdsKey === '') {
      setResults([]);
      setTotalPages(0);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    searchRecipes({ keyword, categoryIds, page, size })
      .then((data) => {
        if (cancelled) return;
        setResults(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(() => {
        if (!cancelled) setIsError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, categoryIdsKey, page, size]);

  return { results, page, setPage, totalPages, isLoading, isError };
}
