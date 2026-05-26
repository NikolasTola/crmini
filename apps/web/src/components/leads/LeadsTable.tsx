"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { StatusBadge, OrigemBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LeadDetail } from "@/components/leads/LeadDetail";
import { deleteLeadAction } from "@/features/leads/actions";
import type { Lead } from "@/lib/db/leads.repository";

interface LeadsTableProps {
  leads: Lead[];
}

function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    startTransition(() => { deleteLeadAction(id); });
  }

  return (
    <Button variant="danger" size="sm" isLoading={isPending} onClick={handleDelete}>
      Excluir
    </Button>
  );
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-slate-500 text-sm">
        Nenhum lead cadastrado ainda.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
              <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-slate-400">Nome</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-slate-400">Idade</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-slate-400">Contato</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-slate-400">Origem</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-slate-400">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-slate-200">{lead.nome}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{lead.idade}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{lead.contato}</td>
                <td className="px-4 py-3"><OrigemBadge origem={lead.origem} /></td>
                <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                <td className="px-4 py-3">
                  {/* Stopropagation evita abrir o modal ao clicar nos botões */}
                  <div
                    className="flex items-center gap-2 justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href={`/app/leads/${lead.id}/editar`}>
                      <Button variant="secondary" size="sm">Editar</Button>
                    </Link>
                    <DeleteButton id={lead.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <Modal
          isOpen={selectedLead !== null}
          onClose={() => setSelectedLead(null)}
          title={selectedLead.nome}
        >
          <LeadDetail lead={selectedLead} />
        </Modal>
      )}
    </>
  );
}