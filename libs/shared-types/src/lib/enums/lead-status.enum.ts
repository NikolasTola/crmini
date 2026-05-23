export enum LeadStatus {
  Novo = "novo",
  ContatoFeito = "contato_feito",
  Qualificado = "qualificado",
  Proposta = "proposta",
  Fechado = "fechado",
  Perdido = "perdido",
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  [LeadStatus.Novo]: "Novo",
  [LeadStatus.ContatoFeito]: "Contato feito",
  [LeadStatus.Qualificado]: "Qualificado",
  [LeadStatus.Proposta]: "Proposta",
  [LeadStatus.Fechado]: "Fechado",
  [LeadStatus.Perdido]: "Perdido",
};