"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

const COLORS = {
  Applied: "#3B82F6",
  OA: "#A855F7",
  Interview: "#EAB308",
  Offer: "#22C55E",
  Rejected: "#EF4444",
};

export default function StatusChart({ data }: Props) {
  return (
    <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-6">
        Application Status
      </h3>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}
          barCategoryGap="35%">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#CBD5E1" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fill: "#CBD5E1" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
  {data.map((entry, index) => (
    <Cell
      key={index}
      fill={
        COLORS[entry.name as keyof typeof COLORS] || "#64748B"
      }
    />
  ))}
</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}