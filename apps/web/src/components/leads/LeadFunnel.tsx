"use client";

import { FUNNEL_STAGES } from "@/lib/constants";
import { LeadStatus } from "@mini-crm/shared-types";

const SEGMENT_WIDTHS = ["100%", "88%", "76%", "64%", "50%", "38%"];

const ACTIVE_COLORS: Record<LeadStatus, string> = {
  novo:          "bg-blue-500 hover:bg-blue-600",
  contato_feito: "bg-violet-500 hover:bg-violet-600",
  qualificado:   "bg-yellow-500 hover:bg-yellow-600",
  proposta:      "bg-orange-500 hover:bg-orange-600",
  fechado:       "bg-green-500 hover:bg-green-600",
  perdido:       "bg-red-400 hover:bg-red-500",
};

interface LeadFunnelProps {
  activeStatuses: LeadStatus[];
  onToggle: (status: LeadStatus) => void;
  isPending: boolean;
}

export function LeadFunnel({ activeStatuses, onToggle, isPending }: LeadFunnelProps) {
  const noFilter = activeStatuses.length === 0;

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3 text-center">
            Funil
            </p>

            <div className="flex flex-col items-center gap-0.5">
            {FUNNEL_STAGES.map(({ status, label }, index) => {
                const isActive = noFilter || activeStatuses.includes(status);
                const isFirst = index === 0;
                const isLast = index === FUNNEL_STAGES.length - 1;

                return (
                <button
                    key={status}
                    onClick={() => onToggle(status)}
                    disabled={isPending}
                    title={label}
                    style={{ width: SEGMENT_WIDTHS[index] }}
                    className={`
                    h-9 flex items-center justify-center
                    text-xs font-medium
                    transition-all duration-150
                    disabled:pointer-events-none
                    ${isFirst ? "rounded-t-lg" : ""}
                    ${isLast ? "rounded-b-lg" : ""}
                    ${isActive
                        ? `${ACTIVE_COLORS[status]} text-white`
                        : "bg-gray-200 hover:bg-gray-300 text-gray-400 grayscale"}
                    `}
                >
                    {label}
                </button>
                );
            })}
            </div>

            <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
            Clique para filtrar
            </p>
        </div>
    );
}