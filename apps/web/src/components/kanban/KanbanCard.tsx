"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { OrigemBadge } from "@/components/ui/Badge";
import type { Lead } from "@/lib/db/leads.repository";

interface KanbanCardProps {
  lead: Lead;
  isDragging?: boolean;
}

export function KanbanCard({ lead, isDragging = false }: KanbanCardProps) {
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
      className={`
        bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500
        transition-shadow select-none
        ${isDragging
          ? "shadow-lg border-blue-300 dark:border-blue-600 opacity-80 rotate-1"
          : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"}
      `}
    >
      <p className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-2 truncate">
        {lead.nome}
      </p>
      <OrigemBadge origem={lead.origem} />
    </div>
  );
}