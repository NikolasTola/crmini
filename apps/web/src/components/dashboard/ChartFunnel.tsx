"use client";

import { LEAD_STATUS_LABELS, LeadStatus } from "@mini-crm/shared-types";
import { FUNNEL_STAGE_HEX, FUNNEL_STAGES } from "@/lib/constants";
import type { LeadsByStatusRow } from "@/lib/db/dashboard.repository";

interface ChartFunnelProps {
  data: LeadsByStatusRow[];
}

export function ChartFunnel({ data }: ChartFunnelProps) {
  const map = new Map(data.map((r) => [r.status, r.total]));
  const max = Math.max(...data.map((r) => r.total), 1);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">Funil de conversão</h2>
      <div className="flex flex-col items-center gap-1 py-2">
        {FUNNEL_STAGES.map(({ status, label }, index) => {
          const total = map.get(status as LeadStatus) ?? 0;
          // Largura proporcional ao total, mínimo 20% para visibilidade
          const widthPct = max > 0 ? Math.max((total / max) * 100, total > 0 ? 20 : 8) : 8;
          const color = FUNNEL_STAGE_HEX[status as LeadStatus];

          return (
            <div key={status} className="w-full flex items-center gap-3">
              {/* Barra do funil centralizada */}
              <div className="flex-1 flex justify-center">
                <div
                  className="h-9 flex items-center justify-center rounded text-xs font-medium text-white transition-all"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: color,
                    opacity: total === 0 ? 0.25 : 1,
                  }}
                >
                  {total > 0 ? total : ""}
                </div>
              </div>
              {/* Label à direita */}
              <span className="text-xs text-gray-500 dark:text-slate-400 w-24 shrink-0">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}