"use client";

import { StatsCards } from "@/components/dashboard/StatsCards";
import { ChartLeadsByStatus } from "@/components/dashboard/ChartLeadsByStatus";
import { ChartLeadsByOrigem } from "@/components/dashboard/ChartLeadsByOrigem";
import { ChartLeadsByAge } from "@/components/dashboard/ChartLeadsByAge";
import { ChartFunnel } from "@/components/dashboard/ChartFunnel";
import { ChartLeadsByOrigemAndStatus } from "@/components/dashboard/ChartLeadsByOrigemAndStatus";
import type { DashboardStats, LeadsByStatusRow, LeadsByOrigemRow, LeadsByAgeGroupRow, LeadsByStatusAndOrigemRow } from "@/lib/db/dashboard.repository";

interface DashboardPageProps {
  stats: DashboardStats;
  byStatus: LeadsByStatusRow[];
  byOrigem: LeadsByOrigemRow[];
  byAge: LeadsByAgeGroupRow[];
  byStatusAndOrigem: LeadsByStatusAndOrigemRow[];
}

export function DashboardPage({
  stats,
  byStatus,
  byOrigem,
  byAge,
  byStatusAndOrigem,
}: DashboardPageProps) {
  return (
    <div className="space-y-6">
      {/* Cards de visão geral */}
      <StatsCards
        totalLeads={stats.totalLeads}
        taxaConversao={stats.taxaConversao}
        leadsPerdidos={stats.leadsPerdidos}
      />

      {/* Linha 1: G1 + G2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartLeadsByStatus data={byStatus} />
        <ChartLeadsByOrigem data={byOrigem} />
      </div>

      {/* Linha 2: G4 + G5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartLeadsByAge data={byAge} />
        <ChartFunnel data={byStatus} />
      </div>

      {/* Linha 3: G6 ocupa a largura toda */}
      <ChartLeadsByOrigemAndStatus data={byStatusAndOrigem} />
    </div>
  );
}