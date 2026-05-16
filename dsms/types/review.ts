// 리뷰
export type Review = {
  id: number;
  recipe_id: number;
  easiness: number;
  visual: number;
  rarity: number;
  affordability: number;
  satisfaction: number;
  content: string | null; // 선택 입력
  created_at: string;
  updated_at: string;
};