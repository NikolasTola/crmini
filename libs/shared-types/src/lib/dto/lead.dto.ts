import { LeadOrigem, LeadStatus } from "../enums";

export interface LeadDto {
  id: string;
  nome: string;
  idade: number;
  contato: string;
  origem: LeadOrigem;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadDto {
  nome: string;
  idade: number;
  contato: string;
  origem: LeadOrigem;
  status: LeadStatus;
}

export type UpdateLeadDto = Partial<CreateLeadDto>;