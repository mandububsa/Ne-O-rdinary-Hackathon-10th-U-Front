"use client";

import { useState } from "react";

interface ReviewWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ratings: any) => void;
}

const CATEGORIES = [
  { key: "easy", label: "쉬움도" },
  { key: "visual", label: "비주얼" },
  { key: "rarity", label: "희소성" },
  { key: "cost", label: "비용 접근성" },
  { key: "satisfaction", label: "만족도" },
];

export default function ReviewWriteModal({
  isOpen,
  onClose,
  onSubmit,
}: ReviewWriteModalProps) {
  const [ratings, setRatings] = useState({
    easy: 0,
    visual: 0,
    rarity: 0,
    cost: 0,
    satisfaction: 0,
  });

  const handleRatingChange = (key: string, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(ratings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="w-full max-w-[500px] bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="typo-title font-bold text-gray-900">리뷰 작성하기</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 mb-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="flex flex-col items-center gap-2">
              <span className="typo-subtitle-nexon text-gray-700 font-medium">
                {cat.label}
              </span>

              <div className="flex items-center justify-center gap-2">
                <StarRating
                  value={ratings[cat.key as keyof typeof ratings]}
                  onChange={(val) => handleRatingChange(cat.key, val)}
                />
                <span className="w-4 text-center font-bold text-primary-500">
                  {ratings[cat.key as keyof typeof ratings]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-primary-500 text-black py-4 rounded-xl typo-subtitle border font-bold hover:bg-primary-600 transition-colors"
        >
          완료
        </button>
      </div>
    </div>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-colors ${
            star <= value ? "text-yellow-400" : "text-gray-200"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 pointer-events-none"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
