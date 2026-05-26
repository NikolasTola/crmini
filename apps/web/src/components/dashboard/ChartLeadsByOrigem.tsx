"use client";

import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { LEAD_ORIGEM_LABELS, LeadOrigem } from "@mini-crm/shared-types";
import { ORIGEM_HEX } from "@/lib/constants";
import { useTheme } from "@/core/providers/ThemeProvider";
import type { LeadsByOrigemRow } from "@/lib/db/dashboard.repository";

interface ChartLeadsByOrigemProps {
  data: LeadsByOrigemRow[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; name: string; payload: { origem: LeadOrigem } }[];
  isDark: boolean;
}

function CustomTooltip({ active, payload, isDark }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const { value, name, payload: { origem } } = payload[0];
  const color = ORIGEM_HEX[origem];

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

export function ChartLeadsByOrigem({ data }: ChartLeadsByOrigemProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = data
    .filter((row) => row.total > 0)
    .map((row) => ({
      name: LEAD_ORIGEM_LABELS[row.origem],
      value: row.total,
      origem: row.origem,
    }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 flex items-center justify-center h-48">
        <p className="text-sm text-gray-400 dark:text-slate-500">Sem dados</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
        Leads por origem
      </h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.origem}
                fill={ORIGEM_HEX[entry.origem as LeadOrigem]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: "12px",
              color: isDark ? "#94a3b8" : "#64748b",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}