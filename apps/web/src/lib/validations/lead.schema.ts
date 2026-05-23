import { z } from "zod";
import { LeadOrigem, LeadStatus } from "@mini-crm/shared-types";

export const createLeadSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(100),
  idade: z
    .number({ invalid_type_error: "Idade deve ser um número" })
    .int("Idade deve ser um número inteiro")
    .min(0, "Idade inválida")
    .max(150, "Idade inválida"),
  contato: z.string().min(1, "Contato é obrigatório").max(100),
  origem: z.nativeEnum(LeadOrigem, { errorMap: () => ({ message: "Origem inválida" }) }),
  status: z.nativeEnum(LeadStatus, { errorMap: () => ({ message: "Status inválido" }) }),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;