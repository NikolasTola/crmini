import { PageHeader } from "@/components/ui/PageHeader";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import {
  getDashboardStats,
  getLeadsByStatus,
  getLeadsByOrigem,
  getLeadsByAgeGroup,
  getLeadsByStatusAndOrigem,
} from "@/lib/db/dashboard.repository";

export const metadata = { title: "Dashboard — Mini CRM" };

export default async function DashboardRoute() {
  const [stats, byStatus, byOrigem, byAge, byStatusAndOrigem] =
    await Promise.all([
      getDashboardStats(),
      getLeadsByStatus(),
      getLeadsByOrigem(),
      getLeadsByAgeGroup(),
      getLeadsByStatusAndOrigem(),
    ]);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão geral dos seus leads"
      />
      <DashboardPage
        stats={stats}
        byStatus={byStatus}
        byOrigem={byOrigem}
        byAge={byAge}
        byStatusAndOrigem={byStatusAndOrigem}
      />
    </div>
  );
}