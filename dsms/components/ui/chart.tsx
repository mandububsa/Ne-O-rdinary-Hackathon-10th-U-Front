"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: any[];
}

export default function Chart({ data }: ChartProps) {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#2a2a2a" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#a0a0a0", fontSize: 10, fontWeight: 500 }}
          />
          <PolarRadiusAxis domain={[0, 5]} axisLine={false} tick={false} />

          <Radar
            name="평점"
            dataKey="value"
            stroke="var(--primary-500)"
            fill="var(--primary-500)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
