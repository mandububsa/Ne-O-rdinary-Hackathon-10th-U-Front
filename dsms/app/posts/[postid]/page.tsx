"use client";

import { useState } from "react";
import Review from "@/components/ui/review";
import Image from "next/image";
import { Review as ReviewType } from "@/types/review";

const ALL_REVIEWS: ReviewType[] = [
  // 한줄평 있는 리뷰
  {
    id: "1",
    nickname: "웃기는 청바지",
    ratings: { easy: 5, visual: 4, rarity: 5, cost: 3, satisfaction: 5 },
    content:
      "진짜 너무 맛있어요! 다음에 또 시켜먹을게요. 배달도 빠르고 사장님도 친절하십니다. 강력 추천해요!",
    createdAt: "어제",
  },
  {
    id: "2",
    nickname: "미식가",
    ratings: { easy: 3, visual: 5, rarity: 4, cost: 4, satisfaction: 4 },
    content:
      "양도 많고 맛도 훌륭합니다. 다만 소스가 조금 더 많았으면 좋겠어요.",
    createdAt: "2일 전",
  },
  {
    id: "3",
    nickname: "자취생",
    ratings: { easy: 5, visual: 3, rarity: 2, cost: 5, satisfaction: 5 },
    content: "가성비 최고입니다. 이 가격에 이 퀄리티라니 믿기지 않네요.",
    createdAt: "3일 전",
  },
  // 한줄평 없는 리뷰
  {
    id: "s1",
    nickname: "익명1",
    ratings: { easy: 4, visual: 4, rarity: 3, cost: 4, satisfaction: 4 },
    createdAt: "4일 전",
  },
  {
    id: "s2",
    nickname: "익명2",
    ratings: { easy: 5, visual: 2, rarity: 1, cost: 5, satisfaction: 5 },
    createdAt: "5일 전",
  },
  {
    id: "s3",
    nickname: "익명3",
    ratings: { easy: 2, visual: 5, rarity: 5, cost: 2, satisfaction: 4 },
    createdAt: "1주일 전",
  },
  {
    id: "s4",
    nickname: "익명4",
    ratings: { easy: 3, visual: 3, rarity: 3, cost: 3, satisfaction: 3 },
    createdAt: "2주일 전",
  },
  {
    id: "s5",
    nickname: "익명5",
    ratings: { easy: 3, visual: 3, rarity: 3, cost: 3, satisfaction: 3 },
    createdAt: "2주일 전",
  },
  {
    id: "s6",
    nickname: "익명6",
    ratings: { easy: 3, visual: 3, rarity: 3, cost: 3, satisfaction: 3 },
    createdAt: "2주일 전",
  },
  {
    id: "s7",
    nickname: "익명7",
    ratings: { easy: 3, visual: 3, rarity: 3, cost: 3, satisfaction: 3 },
    createdAt: "2주일 전",
  },
];

export default function PostPage() {
  const [showMore, setShowMore] = useState(false);

  const initialReviews = ALL_REVIEWS.slice(0, 5);
  const remainingReviews = ALL_REVIEWS.slice(5);

  return (
    <div className="w-full max-w-[600px] bg-white mx-auto pb-10">
      {/* Post Image Section */}
      <div className="w-full aspect-square relative mb-6">
        <Image
          src="/oldFashioned.png"
          alt="oldFashioned"
          fill
          className="object-cover"
        />
      </div>

      {/* Reviews Section */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="typo-title font-bold text-gray-900">리뷰</h2>
          <span className="typo-subtitle text-primary-500 font-bold">
            {ALL_REVIEWS.length}
          </span>
        </div>

        {/* Initial 5 Reviews */}
        <div className="flex flex-col">
          {initialReviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>

        {/* Remaining Reviews Toggle */}
        {remainingReviews.length > 0 && (
          <div className="mt-2">
            {!showMore ? (
              <button
                onClick={() => setShowMore(true)}
                className="flex items-center justify-center gap-1 text-gray-500 py-4 w-full hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <span className="text-[14px] font-medium">
                  {"> 리뷰 더보기"}
                </span>
              </button>
            ) : (
              <>
                <div className="flex flex-col animate-in fade-in slide-in-from-top-2 duration-300">
                  {remainingReviews.map((review) => (
                    <Review key={review.id} review={review} />
                  ))}
                </div>
                <button
                  onClick={() => setShowMore(false)}
                  className="flex items-center justify-center gap-1 text-gray-500 py-4 w-full hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <span className="text-[14px] font-medium">{"접기"}</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
