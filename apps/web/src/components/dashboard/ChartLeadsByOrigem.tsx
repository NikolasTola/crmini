"use client";

import {
    PieChart, Pie, Cell, Tooltip,
    ResponsiveContainer, Legend,
} from "recharts";
import { LEAD_ORIGEM_LABELS, LeadOrigem } from "@mini-crm/shared-types";
import { ORIGEM_HEX } from "@/lib/constants";
import type { LeadsByOrigemRow } from "@/lib/db/dashboard.repository";

interface ChartLeadsByOrigemProps {
    data: LeadsByOrigemRow[];
}

export function ChartLeadsByOrigem({ data }: ChartLeadsByOrigemProps) {
    const chartData = data
        .filter((row) => row.total > 0)
        .map((row) => ({
            name: LEAD_ORIGEM_LABELS[row.origem],
            value: row.total,
            origem: row.origem,
        }));

    if (chartData.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 p-5 flex items-center justify-center h-48">
                <p className="text-sm text-gray-400">Sem dados</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">Leads por origem</h2>
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
                    <Tooltip
                        contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            fontSize: "12px",
                            backgroundColor: "var(--background)",
                            color: "var(--foreground)",
                        }}
                        formatter={(value: number) => [value, "Leads"]}
                    />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "12px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}