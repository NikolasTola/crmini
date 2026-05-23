import { LeadStatus, LeadOrigem, LEAD_STATUS_LABELS, LEAD_ORIGEM_LABELS } from "@mini-crm/shared-types";

const STATUS_STYLES: Record<LeadStatus, string> = {
  novo:          "bg-blue-50 text-blue-700 border-blue-200",
  contato_feito: "bg-yellow-50 text-yellow-700 border-yellow-200",
  qualificado:   "bg-purple-50 text-purple-700 border-purple-200",
  proposta:      "bg-orange-50 text-orange-700 border-orange-200",
  fechado:       "bg-green-50 text-green-700 border-green-200",
  perdido:       "bg-red-50 text-red-700 border-red-200",
};

interface StatusBadgeProps {
  status: LeadStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[status]}`}>
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}

interface OrigemBadgeProps {
  origem: LeadOrigem;
}

export function OrigemBadge({ origem }: OrigemBadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
      {LEAD_ORIGEM_LABELS[origem]}
    </span>
  );
}