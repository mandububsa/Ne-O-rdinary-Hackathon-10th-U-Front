import { Review as ReviewType } from "@/types/review";

interface ReviewProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
  const ratingLabels = [
    { key: "easy", label: "쉬움도" },
    { key: "visual", label: "비주얼" },
    { key: "rarity", label: "희소성" },
    { key: "cost", label: "비용 접근성" },
    { key: "satisfaction", label: "만족도" },
  ];

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="typo-subtitle-nexon text-gray-900 font-bold">
            {review.nickname}
          </span>
          <span className="typo-caption text-gray-400">{review.createdAt}</span>
        </div>

        {/* Numerical Ratings */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {ratingLabels.map((item) => (
            <div key={item.key} className="flex items-center gap-1">
              <span className="text-[12px] text-gray-500 font-medium">
                {item.label}
              </span>
              <span className="text-[12px] text-primary-500 font-bold">
                {review.ratings[item.key as keyof typeof review.ratings]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Content */}
      {review.content && (
        <p className="typo-text text-gray-800 leading-relaxed font-medium">
          {review.content}
        </p>
      )}
    </div>
  );
}
