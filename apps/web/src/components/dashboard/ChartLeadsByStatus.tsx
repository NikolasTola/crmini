"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { LEAD_STATUS_LABELS, LeadStatus } from "@mini-crm/shared-types";
import { FUNNEL_STAGE_HEX } from "@/lib/constants";
import { useTheme } from "@/core/providers/ThemeProvider";
import type { LeadsByStatusRow } from "@/lib/db/dashboard.repository";

interface ChartLeadsByStatusProps {
  data: LeadsByStatusRow[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; payload: { name: string; status: LeadStatus } }[];
  isDark: boolean;
}

function CustomTooltip({ active, payload, isDark }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const { value, payload: { name, status } } = payload[0];
  const color = FUNNEL_STAGE_HEX[status];

  return (
    <div style={{
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      padding: "8px 12px",
      fontSize: "12px",
    }}>
      <p style={{ color, fontWeight: 600, marginBottom: 2 }}>{name}</p>
      <p style={{ color: isDark ? "#f1f5f9" : "#171717" }}>
        Leads: {value}
      </p>
    </div>
  );
}

export function ChartLeadsByStatus({ data }: ChartLeadsByStatusProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = data.map((row) => ({
    name: LEAD_STATUS_LABELS[row.status],
    total: row.total,
    status: row.status,
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
        Leads por status
      </h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} barSize={32}>
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
            content={<CustomTooltip isDark={isDark} />}
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