import { findAllLeads } from "@/lib/db/leads.repository";
import { KanbanPage } from "@/features/kanban/KanbanPage";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Kanban — Mini CRM" };

export default async function KanbanRoute() {
  const leads = await findAllLeads();

  return (
    <div>
      <PageHeader
        title="Kanban"
        description="Arraste os cards para atualizar o status dos leads"
      />
      <KanbanPage leads={leads} />
    </div>
  );
}