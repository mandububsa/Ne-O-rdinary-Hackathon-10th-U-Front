
export interface Review {
  id: string;
  nickname: string;
  ratings: {
    easy: number;
    visual: number;
    rarity: number;
    cost: number;
    satisfaction: number;
  };
  content?: string;
  createdAt: string;
}
