import { LeadStatus, LeadOrigem, LEAD_STATUS_LABELS } from "@mini-crm/shared-types";

export interface FunnelStage {
  status: LeadStatus;
  label: string;
  color: string;       // cor do segmento ativo
  colorMuted: string;  // cor do segmento inativo
  textColor: string;   // cor do texto sobre o segmento ativo
}

// A ordem importa — representa o funil de cima para baixo
export const FUNNEL_STAGES: FunnelStage[] = [
  {
    status: LeadStatus.Novo,
    label: LEAD_STATUS_LABELS[LeadStatus.Novo],
    color: "bg-blue-500",
    colorMuted: "bg-blue-100",
    textColor: "text-white",
  },
  {
    status: LeadStatus.ContatoFeito,
    label: LEAD_STATUS_LABELS[LeadStatus.ContatoFeito],
    color: "bg-violet-500",
    colorMuted: "bg-violet-100",
    textColor: "text-white",
  },
  {
    status: LeadStatus.Qualificado,
    label: LEAD_STATUS_LABELS[LeadStatus.Qualificado],
    color: "bg-yellow-500",
    colorMuted: "bg-yellow-100",
    textColor: "text-white",
  },
  {
    status: LeadStatus.Proposta,
    label: LEAD_STATUS_LABELS[LeadStatus.Proposta],
    color: "bg-orange-500",
    colorMuted: "bg-orange-100",
    textColor: "text-white",
  },
  {
    status: LeadStatus.Fechado,
    label: LEAD_STATUS_LABELS[LeadStatus.Fechado],
    color: "bg-green-500",
    colorMuted: "bg-green-100",
    textColor: "text-white",
  },
  {
    status: LeadStatus.Perdido,
    label: LEAD_STATUS_LABELS[LeadStatus.Perdido],
    color: "bg-red-400",
    colorMuted: "bg-red-100",
    textColor: "text-white",
  },
];

// Cores hex para uso nos gráficos (Recharts não aceita classes Tailwind)
export const FUNNEL_STAGE_HEX: Record<LeadStatus, string> = {
  [LeadStatus.Novo]:          "#3b82f6", // blue-500
  [LeadStatus.ContatoFeito]:  "#8b5cf6", // violet-500
  [LeadStatus.Qualificado]:   "#eab308", // yellow-500
  [LeadStatus.Proposta]:      "#f97316", // orange-500
  [LeadStatus.Fechado]:       "#22c55e", // green-500
  [LeadStatus.Perdido]:       "#f87171", // red-400
};

export const ORIGEM_HEX: Record<LeadOrigem, string> = {
  [LeadOrigem.Instagram]:  "#e1306c",
  [LeadOrigem.Indicacao]:  "#3b82f6",
  [LeadOrigem.Site]:       "#8b5cf6",
  [LeadOrigem.WhatsApp]:   "#22c55e",
  [LeadOrigem.Outro]:      "#94a3b8",
};