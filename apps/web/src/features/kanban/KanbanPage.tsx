"use client";

import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import type { Lead } from "@/lib/db/leads.repository";

interface KanbanPageProps {
  leads: Lead[];
}

export function KanbanPage({ leads }: KanbanPageProps) {
  return <KanbanBoard initialLeads={leads} />;
}