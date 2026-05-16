"use client";

import Image from "next/image";
import ReviewWriteModal from "@/features/post/ReviewWriteModal";
import Review from "@/features/post/Review";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRecipe } from "../hooks/useRecipe";

const INGREDIENT_COLORS = ["#00FF66", "#FFFFFF", "#894CFF", "#FF6B6B", "#FFD93D"];

const BASE_IMAGE_URL = "https://zxcv9203.duckdns.org";

export default function PostPage() {
  const { postid } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useRecipe(postid as string);

  // measure 합산으로 비율 계산
  const mainIngredients = (data?.mainMaterials ?? []).map((m, i) => {
    const total = (data?.mainMaterials ?? []).reduce(
      (sum, mat) => sum + Number(mat.measure), 0
    );
    return {
      name: m.name,
      ratio: Math.round((Number(m.measure) / total) * 100),
      color: INGREDIENT_COLORS[i % INGREDIENT_COLORS.length],
    };
  });

  const subIngredients = (data?.subMaterials ?? [])
    .map((m) => `${m.name} ${m.measure}`)
    .join(", ");

  const ratings = {
    visual: data?.reviewSummary.averageVisual ?? 0,
    satisfaction: data?.reviewSummary.averageSatisfaction ?? 0,
    difficulty: data?.reviewSummary.averageEasiness ?? 0,
    cost: data?.reviewSummary.averageAffordability ?? 0,
    popularity: data?.reviewSummary.averageRarity ?? 0,
  };

  if (isLoading) return (
    <div className="w-[360px] mx-auto bg-[#121212] text-white min-h-screen flex items-center justify-center">
      <p className="text-[#606060]">불러오는 중...</p>
    </div>
  );

  if (error) return (
    <div className="w-[360px] mx-auto bg-[#121212] text-white min-h-screen flex items-center justify-center">
      <p className="text-[#606060]">오류가 발생했어요</p>
    </div>
  );

  return (
    <div className="w-[360px] mx-auto bg-[#121212] text-white min-h-screen font-pretendard flex flex-col relative overflow-hidden">
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={data?.imageUrl ? `${BASE_IMAGE_URL}${data.imageUrl}` : "/oldFashioned.png"}
          alt={data?.name ?? "레시피 이미지"}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/40 to-transparent">
          <span className="text-sm font-bold">9:41</span>
          <div className="flex gap-1 items-center">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
            </svg>
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
          </div>
        </div>
        <button className="absolute top-12 left-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-6">
        {/* Header Info */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <p className="text-[#a0a0a0] text-sm">{data?.description}</p>
        </div>

        <div className="w-full h-[1px] bg-[#2a2a2a]" />

        {/* Ingredients Section */}
        <div className="flex flex-col gap-4">
          <h2 className="typo-subtitle font-bold">재료 소개</h2>

          <div className="flex flex-col gap-2">
            <span className="text-[12px] text-[#606060]">- 주 재료</span>
            <span className="text-sm font-medium">
              {(data?.mainMaterials ?? []).map((m) => m.name).join(", ")}
            </span>

            <div className="w-full h-8 flex rounded-sm overflow-hidden mt-2">
              {mainIngredients.map((item, index) => (
                <div
                  key={index}
                  style={{ width: `${item.ratio}%`, backgroundColor: item.color }}
                  className="flex flex-col items-center justify-center text-black"
                >
                  <span className="text-[10px] font-bold leading-none">{item.name}</span>
                  <span className="text-[11px] font-bold leading-none">{item.ratio}%</span>
                </div>
              ))}
            </div>
          </div>

          {subIngredients && (
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[12px] text-[#606060]">- 부 재료</span>
              <span className="text-sm font-medium">{subIngredients}</span>
            </div>
          )}
        </div>

        <div className="w-full h-[1px] bg-[#2a2a2a]" />

        <Review ratings={ratings} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-primary-500 text-white py-4 rounded-xl typo-subtitle font-bold mt-4 hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
        >
          리뷰 작성하기
        </button>
      </div>

      <ReviewWriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(ratings) => {
          console.log(ratings);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}