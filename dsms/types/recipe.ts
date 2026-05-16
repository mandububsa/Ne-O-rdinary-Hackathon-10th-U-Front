/**
 * 레시피 (`recipe` 테이블 기준).
 * easiness/visual/rarity/affordability는 작성자 자체 평가이며 0.5 단위 값이다.
 * 만족도(satisfaction)는 `recipe`에 없고 `review`에만 존재한다.
 * `tags`는 `recipe_tag`에서 조인해 온 값이다.
 */
export interface Recipe {
  id: number; // 레시피 PK
  name: string; // 레시피 이름
  description: string | null; // 설명/메모
  imageUrl: string | null; // 대표 이미지 URL
  easiness: number; // 작성자 평가 - 쉬움도 (0.5 단위)
  visual: number; // 작성자 평가 - 비주얼
  rarity: number; // 작성자 평가 - 희소성
  affordability: number; // 작성자 평가 - 비용 접근성
  tags: string[]; // 태그 (recipe_tag.name, 최대 3개)
  createdAt: string; // 생성 시각 (ISO datetime)
  updatedAt: string; // 수정 시각 (ISO datetime)
}
