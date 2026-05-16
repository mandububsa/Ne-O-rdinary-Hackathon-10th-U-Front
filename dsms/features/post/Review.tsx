"use client";

import Chart from "@/components/ui/chart";

interface ReviewProps {
  ratings: {
    visual: number;
    satisfaction: number;
    difficulty: number;
    cost: number;
    popularity: number;
  };
}

export default function Review({ ratings }: ReviewProps) {
  const chartData = [
    { subject: "비주얼", value: ratings.visual },
    { subject: "만족도", value: ratings.satisfaction },
    { subject: "구현 난이도", value: ratings.difficulty },
    { subject: "비용 접근성", value: ratings.cost },
    { subject: "대중성", value: ratings.popularity },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="typo-title font-bold">평가</h3>
      <div className="bg-black rounded-xl p-4 flex justify-center items-center">
        <Chart data={chartData} />
      </div>
    </div>
  );
}
