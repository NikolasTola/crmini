"use client";

import { useState, useCallback } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { LeadStatus } from "@mini-crm/shared-types";
import { updateLeadStatusAction } from "@/features/leads/actions";
import type { Lead } from "@/lib/db/leads.repository";

export type KanbanColumns = Record<LeadStatus, Lead[]>;

function groupByStatus(leads: Lead[]): KanbanColumns {
  const initial = Object.values(LeadStatus).reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {} as KanbanColumns);

  return leads.reduce((acc, lead) => {
    acc[lead.status].push(lead);
    return acc;
  }, initial);
}

export function useKanban(initialLeads: Lead[]) {
  const [columns, setColumns] = useState<KanbanColumns>(
    () => groupByStatus(initialLeads)
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = useCallback((id: string) => {
    setDraggingId(id);
  }, []);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    setDraggingId(null);

    const { active, over } = event;
    if (!over) return;

    const leadId = active.id as string;
    const newStatus = over.id as LeadStatus;

    // Encontra o status atual do lead
    const currentStatus = Object.keys(columns).find((status) =>
      columns[status as LeadStatus].some((l) => l.id === leadId)
    ) as LeadStatus | undefined;

    if (!currentStatus || currentStatus === newStatus) return;

    // Atualiza visualmente de forma otimista antes da resposta do servidor
    setColumns((prev) => {
      const lead = prev[currentStatus].find((l) => l.id === leadId)!;
      return {
        ...prev,
        [currentStatus]: prev[currentStatus].filter((l) => l.id !== leadId),
        [newStatus]: [...prev[newStatus], { ...lead, status: newStatus }],
      };
    });

    // Persiste no banco
    const result = await updateLeadStatusAction(leadId, newStatus);

    // Reverte se houver erro
    if (result.error) {
      setColumns((prev) => {
        const lead = prev[newStatus].find((l) => l.id === leadId)!;
        return {
          ...prev,
          [newStatus]: prev[newStatus].filter((l) => l.id !== leadId),
          [currentStatus]: [...prev[currentStatus], { ...lead, status: currentStatus }],
        };
      });
    }
  }, [columns]);

  return {
    columns,
    draggingId,
    handleDragStart,
    handleDragEnd,
  };
}