"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  LeadStatus, LeadOrigem,
  LEAD_STATUS_LABELS, LEAD_ORIGEM_LABELS,
} from "@mini-crm/shared-types";
import { FUNNEL_STAGE_HEX } from "@/lib/constants";
import { useTheme } from "@/core/providers/ThemeProvider";
import type { LeadsByStatusAndOrigemRow } from "@/lib/db/dashboard.repository";

interface ChartLeadsByOrigemAndStatusProps {
  data: LeadsByStatusAndOrigemRow[];
}

export function ChartLeadsByOrigemAndStatus({ data }: ChartLeadsByOrigemAndStatusProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const origens = Object.values(LeadOrigem);
  const statuses = Object.values(LeadStatus);

  const chartData = origens.map((origem) => {
    const row: Record<string, string | number> = {
      name: LEAD_ORIGEM_LABELS[origem],
    };
    statuses.forEach((status) => {
      const found = data.find((d) => d.origem === origem && d.status === status);
      row[status] = found?.total ?? 0;
    });
    return row;
  });

  const tooltipStyle = {
    borderRadius: "8px",
    border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
    fontSize: "12px",
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    color: isDark ? "#f1f5f9" : "#171717",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
        Leads por origem e status
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barSize={20}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#334155" : "#f1f5f9"}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <Tooltip
            cursor={{ fill: isDark ? "#334155" : "#f8fafc" }}
            contentStyle={tooltipStyle}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: "11px",
              color: isDark ? "#94a3b8" : "#64748b",
            }}
            formatter={(value) => LEAD_STATUS_LABELS[value as LeadStatus]}
          />
          {statuses.map((status) => (
            <Bar
              key={status}
              dataKey={status}
              stackId="a"
              fill={FUNNEL_STAGE_HEX[status]}
              radius={
                status === LeadStatus.Perdido ? [4, 4, 0, 0] : [0, 0, 0, 0]
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}