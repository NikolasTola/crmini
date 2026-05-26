import { StatusBadge, OrigemBadge } from "@/components/ui/Badge";
import type { Lead } from "@/lib/db/leads.repository";

interface LeadDetailProps {
  lead: Lead;
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm text-gray-900 dark:text-slate-200">
        {value}
      </span>
    </div>
  );
}

export function LeadDetail({ lead }: LeadDetailProps) {
  return (
    <div className="flex flex-col gap-4">
      <DetailRow label="Nome completo" value={lead.nome} />
      <DetailRow label="Idade" value={`${lead.idade} anos`} />
      <DetailRow label="Contato" value={lead.contato} />
      <DetailRow
        label="Origem"
        value={<OrigemBadge origem={lead.origem} />}
      />
      <DetailRow
        label="Status"
        value={<StatusBadge status={lead.status} />}
      />
      <DetailRow
        label="Cadastrado em"
        value={new Date(lead.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      />
    </div>
  );
}