"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { OrigemBadge } from "@/components/ui/Badge";
import type { Lead } from "@/lib/db/leads.repository";

interface KanbanCardProps {
  lead: Lead;
  isDragging?: boolean;
  onClick: (lead: Lead) => void;
}

export function KanbanCard({ lead, isDragging = false, onClick }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onClick(lead)}
      className={`
        p-3 rounded-lg border cursor-pointer active:cursor-grabbing
        transition-shadow select-none
        ${isDragging
          ? "shadow-lg border-blue-300 dark:border-blue-600 opacity-80 rotate-1 bg-white dark:bg-slate-800"
          : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500"}
      `}
    >
      <p className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-2 truncate">
        {lead.nome}
      </p>
      <OrigemBadge origem={lead.origem} />
    </div>
  );
}