export type FeedRecipe = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  easiness: number;
  visual: number;
  rarity: number;
  affordability: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

/**
 * 피드 화면용 더미 레시피 데이터.
 * 이미지가 아직 없는 항목은 피드 카드에서 회색 placeholder로 보여준다.
 */
export const FEED_RECIPES: FeedRecipe[] = [
  {
    id: 1,
    name: "레드키위 피즈",
    description: "이번 달 문제의 그 재료!",
    imageUrl: "/images/red-kiwi-fizz.png",
    easiness: 5.0,
    visual: 5.0,
    rarity: 4.0,
    affordability: 3.0,
    tags: ["청량", "가벼움"],
    createdAt: "2026-05-17T09:41:00",
    updatedAt: "2026-05-17T09:41:00",
  },
  {
    id: 2,
    name: "김치 하이볼",
    description: "생각보다 시원한데?",
    imageUrl: "/images/kimchi-highball.png",
    easiness: 4.0,
    visual: 2.5,
    rarity: 5.0,
    affordability: 4.5,
    tags: ["퓨전", "탄산"],
    createdAt: "2026-05-16T20:12:00",
    updatedAt: "2026-05-16T20:12:00",
  },
  {
    id: 3,
    name: "수박껍질 모히또",
    description: "엄마가 버리려던 재료의 반란",
    imageUrl: "/images/watermelon-rind-mojito.png",
    easiness: 3.0,
    visual: 4.5,
    rarity: 5.0,
    affordability: 5.0,
    tags: ["수박", "민트"],
    createdAt: "2026-05-15T13:30:00",
    updatedAt: "2026-05-15T13:30:00",
  },
  {
    id: 4,
    name: "죠리퐁 마티니",
    description: "어른의 시리얼 한 잔",
    imageUrl: null,
    easiness: 4.0,
    visual: 4.0,
    rarity: 4.0,
    affordability: 3.5,
    tags: ["크리미", "우유"],
    createdAt: "2026-05-14T18:05:00",
    updatedAt: "2026-05-14T18:05:00",
  },
  {
    id: 5,
    name: "청양토닉",
    description: "목이 아픈데 계속 마시게 됨",
    imageUrl: null,
    easiness: 5.0,
    visual: 3.0,
    rarity: 4.5,
    affordability: 4.0,
    tags: ["스파이시", "특이함"],
    createdAt: "2026-05-13T21:47:00",
    updatedAt: "2026-05-13T21:47:00",
  },
  {
    id: 6,
    name: "아샷추 하이볼",
    description: "카페인과 알콜의 위험한 협업",
    imageUrl: null,
    easiness: 5.0,
    visual: 3.5,
    rarity: 3.0,
    affordability: 5.0,
    tags: ["복숭아", "커피"],
    createdAt: "2026-05-12T11:20:00",
    updatedAt: "2026-05-12T11:20:00",
  },
  {
    id: 7,
    name: "민트초코 사워",
    description: "치약파 환영합니다",
    imageUrl: null,
    easiness: 3.0,
    visual: 5.0,
    rarity: 4.0,
    affordability: 2.5,
    tags: ["치약 그 자체"],
    createdAt: "2026-05-10T15:00:00",
    updatedAt: "2026-05-10T15:00:00",
  },
  {
    id: 8,
    name: "불닭 블러디메리",
    description: "이건 술인가 도전인가",
    imageUrl: null,
    easiness: 2.0,
    visual: 3.0,
    rarity: 5.0,
    affordability: 4.0,
    tags: ["맵부심", "눈물남"],
    createdAt: "2026-05-09T22:33:00",
    updatedAt: "2026-05-09T22:33:00",
  },
  {
    id: 9,
    name: "메로나 소주",
    description: "편의점이 만든 안정적인 배신",
    imageUrl: null,
    easiness: 5.0,
    visual: 4.0,
    rarity: 2.0,
    affordability: 5.0,
    tags: ["Sweety"],
    createdAt: "2026-05-03T19:15:00",
    updatedAt: "2026-05-03T19:15:00",
  },
  {
    id: 10,
    name: "바질 막걸리 스파클",
    description: "할머니와 바텐더의 만남",
    imageUrl: null,
    easiness: 4.0,
    visual: 5.0,
    rarity: 4.5,
    affordability: 3.0,
    tags: ["전통주"],
    createdAt: "2026-04-26T17:50:00",
    updatedAt: "2026-04-26T17:50:00",
  },
];
