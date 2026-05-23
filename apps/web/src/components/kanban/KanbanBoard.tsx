"use client";

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { useKanban } from "@/features/kanban/hooks/useKanban";
import { FUNNEL_STAGES } from "@/lib/constants";
import type { Lead } from "@/lib/db/leads.repository";
import { LeadStatus } from "@mini-crm/shared-types";

interface KanbanBoardProps {
  initialLeads: Lead[];
}

export function KanbanBoard({ initialLeads }: KanbanBoardProps) {
  const { columns, draggingId, handleDragStart, handleDragEnd } =
    useKanban(initialLeads);

  // Encontra o lead sendo arrastado para renderizar no DragOverlay
  const draggingLead = draggingId
    ? Object.values(columns)
        .flat()
        .find((l) => l.id === draggingId) ?? null
    : null;

  // PointerSensor com distância mínima evita drag acidental em cliques
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => handleDragStart(e.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      {/* Scroll horizontal para quando as colunas não cabem na tela */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {FUNNEL_STAGES.map(({ status, label }) => (
            <KanbanColumn
              key={status}
              status={status as LeadStatus}
              label={label}
              leads={columns[status as LeadStatus]}
              draggingId={draggingId}
            />
          ))}
        </div>
      </div>

      {/* Card fantasma que segue o cursor durante o drag */}
      <DragOverlay dropAnimation={null}>
        {draggingLead ? (
          <KanbanCard lead={draggingLead} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}