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
  novo:          "bg-blue-100 text-blue-700",
  contato_feito: "bg-violet-100 text-violet-700",
  qualificado:   "bg-yellow-100 text-yellow-700",
  proposta:      "bg-orange-100 text-orange-700",
  fechado:       "bg-green-100 text-green-700",
  perdido:       "bg-red-100 text-red-600",
};

interface KanbanColumnProps {
  status: LeadStatus;
  label: string;
  leads: Lead[];
  draggingId: string | null;
}

export function KanbanColumn({
  status,
  label,
  leads,
  draggingId,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col min-w-0 w-48 shrink-0">
      {/* Cabeçalho da coluna */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide truncate">
          {label}
        </span>
        <span className={`
          text-xs font-medium px-2 py-0.5 rounded-full ml-2 shrink-0
          ${COLUMN_COUNT_COLORS[status]}
        `}>
          {leads.length}
        </span>
      </div>

      {/* Área de drop */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 min-h-32 rounded-xl p-2 space-y-2
          border-2 border-t-4 transition-colors
          ${COLUMN_COLORS[status]}
          ${isOver
            ? "border-blue-300 bg-blue-50"
            : "border-gray-200 bg-gray-50"}
        `}
      >
        {leads.map((lead) => (
          <KanbanCard
            key={lead.id}
            lead={lead}
            isDragging={draggingId === lead.id}
          />
        ))}

        {leads.length === 0 && (
          <div className="flex items-center justify-center h-20">
            <p className="text-xs text-gray-400">Solte aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}