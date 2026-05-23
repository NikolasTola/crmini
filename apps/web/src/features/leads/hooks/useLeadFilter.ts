"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useTransition } from "react";
import { LeadStatus } from "@mini-crm/shared-types";

const FILTER_PARAM = "status";

export function useLeadFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Fonte da verdade imediata — não depende da URL ter atualizado
  const pendingStatuses = useRef<LeadStatus[]>(
    searchParams.getAll(FILTER_PARAM) as LeadStatus[]
  );

  // Mantém o ref sincronizado quando a URL muda externamente
  // (ex: botão voltar do browser, link direto)
  useEffect(() => {
    pendingStatuses.current = searchParams.getAll(FILTER_PARAM) as LeadStatus[];
  }, [searchParams]);

  // Lê os status ativos da URL (para renderização dos componentes)
  const activeStatuses = searchParams.getAll(FILTER_PARAM) as LeadStatus[];

  const isActive = useCallback(
    (status: LeadStatus) => activeStatuses.includes(status),
    [activeStatuses]
  );

  function buildUrl(statuses: LeadStatus[]): string {
    const params = new URLSearchParams();
    statuses.forEach((s) => params.append(FILTER_PARAM, s));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  function toggleStatus(status: LeadStatus) {
    // Lê do ref — sempre o valor mais recente, mesmo com cliques rápidos
    const current = pendingStatuses.current;
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];

    // Atualiza o ref imediatamente antes da transição
    pendingStatuses.current = next;

    startTransition(() => {
      router.push(buildUrl(next), { scroll: false });
    });
  }

  function clearFilter() {
    pendingStatuses.current = [];
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }

  return {
    activeStatuses,
    isActive,
    toggleStatus,
    clearFilter,
    isPending,
  };
}