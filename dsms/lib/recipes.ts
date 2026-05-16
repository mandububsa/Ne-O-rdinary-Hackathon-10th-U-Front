// lib/recipes.ts
// 레시피 관련 API 호출 모음.
import { api, Page } from '@/lib/api';

const RECIPE_SEARCH_PATH = '/recipes/search';

// /recipes/search 응답의 content 항목 (실제 응답 기준)
export type RecipeSearchItem = {
  imageUrl: string | null;
  name: string;
  description: string | null;
};

export type RecipeSearchParams = {
  keyword?: string;
  categoryIds?: number[];
  page?: number; // 0-based
  size?: number;
};

// 레시피 검색 (keyword + categoryIds + 페이지네이션)
export function searchRecipes(params: RecipeSearchParams = {}) {
  const { keyword, categoryIds, page = 0, size = 10 } = params;
  return api.get<Page<RecipeSearchItem>>(RECIPE_SEARCH_PATH, {
    keyword,
    categoryIds,
    page,
    size,
  });
}
