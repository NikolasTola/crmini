"use client";

import { useLeadForm } from "@/features/leads/hooks/useLeadForm";
import { createLeadAction } from "@/features/leads/actions";
import { LeadForm } from "@/components/leads/LeadForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NovoLeadPage() {
  const { state, formAction } = useLeadForm(createLeadAction);

  return (
    <div className="max-w-lg">
      <PageHeader title="Novo lead" description="Preencha os dados do lead" />
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <LeadForm formAction={formAction} error={state.error} />
      </div>
    </div>
  );
}