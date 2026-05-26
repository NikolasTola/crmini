"use client";

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { Modal } from "@/components/ui/Modal";
import { LeadDetail } from "@/components/leads/LeadDetail";
import { useKanban } from "@/features/kanban/hooks/useKanban";
import { useLeadModal } from "@/features/kanban/hooks/useLeadModal";
import { FUNNEL_STAGES } from "@/lib/constants";
import type { Lead } from "@/lib/db/leads.repository";
import { LeadStatus } from "@mini-crm/shared-types";

interface KanbanBoardProps {
  initialLeads: Lead[];
}

export function KanbanBoard({ initialLeads }: KanbanBoardProps) {
  const { columns, draggingId, handleDragStart, handleDragEnd } =
    useKanban(initialLeads);

  const { selectedLead, isOpen, openModal, closeModal } = useLeadModal();

  const draggingLead = draggingId
    ? Object.values(columns).flat().find((l) => l.id === draggingId) ?? null
    : null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={(e) => handleDragStart(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {FUNNEL_STAGES.map(({ status, label }) => (
              <KanbanColumn
                key={status}
                status={status as LeadStatus}
                label={label}
                leads={columns[status as LeadStatus]}
                draggingId={draggingId}
                onCardClick={openModal}
              />
            ))}
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {draggingLead ? (
            <KanbanCard
              lead={draggingLead}
              isDragging
              onClick={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Modal de detalhes do lead */}
      {selectedLead && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={selectedLead.nome}
        >
          <LeadDetail lead={selectedLead} />
        </Modal>
      )}
    </>
  );
}