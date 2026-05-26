"use client";

import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import type { Lead } from "@/lib/db/leads.repository";
import { LeadStatus } from "@mini-crm/shared-types";

const COLUMN_COLORS: Record<LeadStatus, string> = {
  novo:          "border-t-blue-500",
  contato_feito: "border-t-violet-500",
  qualificado:   "border-t-yellow-500",
  proposta:      "border-t-orange-500",
  fechado:       "border-t-green-500",
  perdido:       "border-t-red-400",
};

const COLUMN_COUNT_COLORS: Record<LeadStatus, string> = {
  novo:          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  contato_feito: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  qualificado:   "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  proposta:      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  fechado:       "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  perdido:       "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

interface KanbanColumnProps {
  status: LeadStatus;
  label: string;
  leads: Lead[];
  draggingId: string | null;
  onCardClick: (lead: Lead) => void;
}

export function KanbanColumn({
  status,
  label,
  leads,
  draggingId,
  onCardClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col min-w-0 w-48 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wide truncate">
          {label}
        </span>
        <span className={`
          text-xs font-medium px-2 py-0.5 rounded-full ml-2 shrink-0
          ${COLUMN_COUNT_COLORS[status]}
        `}>
          {leads.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`
          flex-1 min-h-32 rounded-xl p-2 space-y-2
          border-2 border-t-4 transition-colors
          ${COLUMN_COLORS[status]}
          ${isOver
            ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700"
            : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50"}
        `}
      >
        {leads.map((lead) => (
          <KanbanCard
            key={lead.id}
            lead={lead}
            isDragging={draggingId === lead.id}
            onClick={onCardClick}
          />
        ))}

        {leads.length === 0 && (
          <div className="flex items-center justify-center h-20">
            <p className="text-xs text-gray-400 dark:text-slate-600">Solte aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}