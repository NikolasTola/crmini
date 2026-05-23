"use client";

import { useLeadForm } from "@/features/leads/hooks/useLeadForm";
import { updateLeadAction } from "@/features/leads/actions";
import { LeadForm } from "@/components/leads/LeadForm";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Lead } from "@/lib/db/leads.repository";

interface EditLeadClientProps {
  lead: Lead;
}

export function EditLeadClient({ lead }: EditLeadClientProps) {
  // Faz o bind do id no action para não precisar de campo hidden no form
  const boundAction = updateLeadAction.bind(null, lead.id);
  const { state, formAction } = useLeadForm(boundAction);

  return (
    <div className="max-w-lg">
      <PageHeader title="Editar lead" description={`Editando: ${lead.nome}`} />
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <LeadForm formAction={formAction} error={state.error} defaultValues={lead} />
      </div>
    </div>
  );
}