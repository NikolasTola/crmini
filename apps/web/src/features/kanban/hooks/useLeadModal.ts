"use client";

import { useState, useCallback } from "react";
import type { Lead } from "@/lib/db/leads.repository";

export function useLeadModal() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const openModal = useCallback((lead: Lead) => {
    setSelectedLead(lead);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedLead(null);
  }, []);

  return {
    selectedLead,
    isOpen: selectedLead !== null,
    openModal,
    closeModal,
  };
}