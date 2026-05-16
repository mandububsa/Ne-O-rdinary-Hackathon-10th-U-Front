export type IngredientInput = {
  category_id: number | null;
  name: string;
  role: MaterialRole;
  measure: string;
  display_order: number;
};

// 재료 카테고리
export type MaterialCategory = {
  id: number;
  parent_id: number | null; // 대분류면 null
  depth: 0 | 1 | 2;        // 0=대분류, 1=중분류, 2=소분류
  name: string;
  created_at: string;
  updated_at: string;
};

// 레시피
export type Recipe = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  easiness: number; 
  visual: number;
  rarity: number;
  affordability: number;
  created_at: string;
  updated_at: string;
};

// 재료 역할
export type MaterialRole = 'MAIN' | 'SUB';

// 레시피 재료
export type RecipeMaterial = {
  id: number;
  recipe_id: number;
  category_id: number;
  name: string;
  role: MaterialRole;
  measure: string;      // 자유 문자열 (예: "1", "30ml", "3개")
  display_order: number;
  created_at: string;
  updated_at: string;
};

// 레시피 태그
export type RecipeTag = {
  id: number;
  recipe_id: number;
  name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};