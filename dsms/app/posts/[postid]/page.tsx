"use client";

import Image from "next/image";
import ReviewWriteModal from "@/features/post/ReviewWriteModal";
import { useState } from "react";
import Review from "@/features/post/Review";
import BackButton from "@/components/BackButton";

export default function PostPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data matching the image
  const postData = {
    title: "레드키위 피즈",
    subtitle: "이번 달, 문제의 그 재료",
    tags: ["#맵부심", "#눈물남"],
    mainIngredients: [
      { name: "진", ratio: 25, color: "#00FF66" },
      { name: "레드키위", ratio: 25, color: "#FFFFFF" },
      { name: "탄산수", ratio: 50, color: "#894CFF" },
    ],
    subIngredients: "민트1g, 레몬즙 1t",
    ratings: {
      visual: 4,
      satisfaction: 4.5,
      difficulty: 3,
      cost: 4,
      popularity: 3.5,
    },
  };

  return (
    <div className="w-[360px] mx-auto bg-[#121212] text-white min-h-screen font-pretendard flex flex-col relative overflow-hidden">
      {/* Top Image Section with Status Bar Mockup */}
      <div className="relative w-full aspect-[4/5]">
        <Image
          src="/oldFashioned.png" // Using the existing image as placeholder
          alt="Post detail"
          fill
          className="object-cover"
        />
        {/* Status Bar Mockup Overlay */}
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
        {/* Back Button: 공용 버튼에 블러 배경만 덧입힌다. */}
        <BackButton className="absolute top-12 left-4 z-10 rounded-full bg-black/20 backdrop-blur-sm" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-6">
        {/* Header Info */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{postData.title}</h1>
            <div className="flex gap-1">
              {postData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#2a2a2a] text-[#a0a0a0] text-[10px] px-2 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[#a0a0a0] text-sm">{postData.subtitle}</p>
        </div>

        <div className="w-full h-[1px] bg-[#2a2a2a]" />

        {/* Ingredients Section */}
        <div className="flex flex-col gap-4">
          <h2 className="typo-subtitle font-bold">재료 소개</h2>

          <div className="flex flex-col gap-2">
            <span className="text-[12px] text-[#606060]">- 주 재료</span>
            <span className="text-sm font-medium">레드키위, 진, 탄산수</span>

            {/* Percentage Bar */}
            <div className="w-full h-8 flex rounded-sm overflow-hidden mt-2">
              {postData.mainIngredients.map((item) => (
                <div
                  key={item.name}
                  style={{
                    width: `${item.ratio}%`,
                    backgroundColor: item.color,
                  }}
                  className="flex flex-col items-center justify-center text-black"
                >
                  <span className="text-[10px] font-bold leading-none">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-bold leading-none">
                    {item.ratio}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[12px] text-[#606060]">- 부 재료</span>
            <span className="text-sm font-medium">
              {postData.subIngredients}
            </span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#2a2a2a]" />

        {/* Evaluation Section */}
        <Review ratings={postData.ratings} />

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
