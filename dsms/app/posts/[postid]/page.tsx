"use client";

import Image from "next/image";
import ReviewWriteModal from "@/features/post/ReviewWriteModal";
import { useState } from "react";
import Review from "@/features/post/Review";
import { useRecipe } from "./hooks/useRecipe";
import { useParams, useRouter } from "next/navigation";

export default function PostPage() {
  const { postid } = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useRecipe(postid as string);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-[360px] mx-auto bg-[#121212] text-white min-h-screen flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-[360px] mx-auto bg-[#121212] text-white min-h-screen flex items-center justify-center">
        <p>오류: {error ?? "데이터를 불러올 수 없습니다."}</p>
      </div>
    );
  }

  // API 응답 필드 → Review 컴포넌트 형식으로 변환
  const ratings = {
    visual: data.reviewSummary.averageVisual,
    satisfaction: data.reviewSummary.averageSatisfaction,
    difficulty: data.reviewSummary.averageEasiness,
    cost: data.reviewSummary.averageAffordability,
    popularity: data.reviewSummary.averageRarity,
  };

  return (
    <div className="w-[360px] mx-auto bg-[#121212] text-white min-h-screen font-pretendard flex flex-col relative overflow-hidden">
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={data.imageUrl ?? "/oldFashioned.png"}
          alt={data.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/40 to-transparent">
          <span className="text-sm font-bold">9:41</span>
        </div>
        <button
          onClick={() => router.back()}
          className="absolute top-12 left-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-6">
        {/* Header Info */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-[#a0a0a0] text-sm">{data.description}</p>
        </div>

        <div className="w-full h-[1px] bg-[#2a2a2a]" />

        {/* Ingredients Section */}
        <div className="flex flex-col gap-4">
          <h2 className="typo-subtitle font-bold">재료 소개</h2>

          <div className="flex flex-col gap-2">
            <span className="text-[12px] text-[#606060]">- 주 재료</span>
            <span className="text-sm font-medium">
              {data.mainMaterials.map((m) => m.name).join(", ")}
            </span>

            {/* Percentage Bar */}
            <div className="w-full h-8 flex rounded-sm overflow-hidden mt-2">
              {data.mainMaterials.map((item, index) => {
                const colors = ["#00FF66", "#FFFFFF", "#894CFF", "#FF6B6B", "#FFD93D"];
                const total = data.mainMaterials.reduce(
                  (sum, m) => sum + Number(m.measure), 0
                );
                const ratio = Math.round((Number(item.measure) / total) * 100);
                return (
                  <div
                    key={item.name}
                    style={{
                      width: `${ratio}%`,
                      backgroundColor: colors[index % colors.length],
                    }}
                    className="flex flex-col items-center justify-center text-black"
                  >
                    <span className="text-[10px] font-bold leading-none">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold leading-none">
                      {ratio}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[12px] text-[#606060]">- 부 재료</span>
            <span className="text-sm font-medium">
              {data.subMaterials.map((m) => `${m.name} ${m.measure}`).join(", ")}
            </span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#2a2a2a]" />

        {/* Evaluation Section */}
        {data.reviewSummary.reviewCount > 0 ? (
          <Review ratings={ratings} />
        ) : (
          <p className="text-center text-[#a0a0a0] py-4">아직 리뷰가 없습니다.</p>
        )}

        {/* Review Action Button */}
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