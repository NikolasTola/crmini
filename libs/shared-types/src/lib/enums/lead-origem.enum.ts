export enum LeadOrigem {
  Instagram = "instagram",
  Indicacao = "indicacao",
  Site = "site",
  WhatsApp = "whatsapp",
  Outro = "outro",
}

export const LEAD_ORIGEM_LABELS: Record<LeadOrigem, string> = {
  [LeadOrigem.Instagram]: "Instagram",
  [LeadOrigem.Indicacao]: "Indicação",
  [LeadOrigem.Site]: "Site",
  [LeadOrigem.WhatsApp]: "WhatsApp",
  [LeadOrigem.Outro]: "Outro",
};