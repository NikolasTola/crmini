"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createLead,
  updateLead,
  deleteLead,
} from "@/lib/db/leads.repository";
import { createLeadSchema } from "@/lib/validations/lead.schema";
import { LeadStatus } from "@mini-crm/shared-types";

export interface LeadActionResult {
  error?: string;
}

export async function createLeadAction(
  _prevState: LeadActionResult,
  formData: FormData
): Promise<LeadActionResult> {
  const parsed = createLeadSchema.safeParse({
    nome: formData.get("nome"),
    idade: Number(formData.get("idade")),
    contato: formData.get("contato"),
    origem: formData.get("origem"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await createLead(parsed.data);
  redirect("/app/leads");
}

export async function updateLeadAction(
  id: string,
  _prevState: LeadActionResult,
  formData: FormData
): Promise<LeadActionResult> {
  const parsed = createLeadSchema.safeParse({
    nome: formData.get("nome"),
    idade: Number(formData.get("idade")),
    contato: formData.get("contato"),
    origem: formData.get("origem"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await updateLead(id, parsed.data);
  redirect("/app/leads");
}

export async function deleteLeadAction(id: string): Promise<void> {
  await deleteLead(id);
  revalidatePath("/app/leads");
}

export async function updateLeadStatusAction(
  id: string,
  status: LeadStatus
): Promise<{ error?: string }> {
  try {
    await updateLead(id, { status });
    revalidatePath("/app/kanban");
    return {};
  } catch {
    return { error: "Erro ao atualizar status do lead" };
  }
}