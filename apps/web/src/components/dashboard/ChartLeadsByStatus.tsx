"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { LEAD_STATUS_LABELS, LeadStatus } from "@mini-crm/shared-types";
import { FUNNEL_STAGE_HEX } from "@/lib/constants";
import type { LeadsByStatusRow } from "@/lib/db/dashboard.repository";

interface ChartLeadsByStatusProps {
  data: LeadsByStatusRow[];
}

export function ChartLeadsByStatus({ data }: ChartLeadsByStatusProps) {
  const chartData = data.map((row) => ({
    name: LEAD_STATUS_LABELS[row.status],
    total: row.total,
    status: row.status,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Leads por status</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
            formatter={(value: number) => [value, "Leads"]}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {chartData.map((entry) => (
              <Cell
                key={entry.status}
                fill={FUNNEL_STAGE_HEX[entry.status as LeadStatus]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}