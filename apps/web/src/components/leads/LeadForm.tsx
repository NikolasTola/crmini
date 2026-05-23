"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLeadFormPending } from "@/features/leads/hooks/useLeadForm";
import {
  LeadStatus,
  LeadOrigem,
  LEAD_STATUS_LABELS,
  LEAD_ORIGEM_LABELS,
} from "@mini-crm/shared-types";
import type { Lead } from "@/lib/db/leads.repository";

const INPUT_CLASS = `
  w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900
  placeholder-gray-400 text-sm bg-white
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  disabled:opacity-50 disabled:cursor-not-allowed transition-colors
  dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200
  dark:placeholder-slate-500
`;

interface LeadFormProps {
  formAction: (payload: FormData) => void;
  error?: string;
  defaultValues?: Partial<Lead>;
}

function SubmitButton() {
  const isPending = useLeadFormPending();
  return (
    <Button type="submit" isLoading={isPending}>
      Salvar lead
    </Button>
  );
}

export function LeadForm({ formAction, error, defaultValues }: LeadFormProps) {
  return (
    <form action={formAction} noValidate className="space-y-5">
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nome completo
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          defaultValue={defaultValues?.nome}
          placeholder="Ex: João da Silva"
          className={INPUT_CLASS}
        />
      </div>

      {/* Idade */}
      <div>
        <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-1.5">
          Idade
        </label>
        <input
          id="idade"
          name="idade"
          type="number"
          required
          min={0}
          max={150}
          defaultValue={defaultValues?.idade}
          placeholder="Ex: 32"
          className={INPUT_CLASS}
        />
      </div>

      {/* Contato */}
      <div>
        <label htmlFor="contato" className="block text-sm font-medium text-gray-700 mb-1.5">
          Contato
        </label>
        <input
          id="contato"
          name="contato"
          type="text"
          required
          defaultValue={defaultValues?.contato}
          placeholder="Ex: (31) 99999-0000 ou email@exemplo.com"
          className={INPUT_CLASS}
        />
      </div>

      {/* Origem */}
      <div>
        <label htmlFor="origem" className="block text-sm font-medium text-gray-700 mb-1.5">
          Origem
        </label>
        <select
          id="origem"
          name="origem"
          required
          defaultValue={defaultValues?.origem ?? ""}
          className={INPUT_CLASS}
        >
          <option value="" disabled>Selecione a origem</option>
          {Object.values(LeadOrigem).map((o) => (
            <option key={o} value={o}>{LEAD_ORIGEM_LABELS[o]}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1.5">
          Status
        </label>
        <select
          id="status"
          name="status"
          required
          defaultValue={defaultValues?.status ?? LeadStatus.Novo}
          className={INPUT_CLASS}
        >
          {Object.values(LeadStatus).map((s) => (
            <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {/* Erro */}
      {error && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center gap-3 pt-1">
        <SubmitButton />
        <Link href="/app/leads">
          <Button type="button" variant="secondary">Cancelar</Button>
        </Link>
      </div>
    </form>
  );
}