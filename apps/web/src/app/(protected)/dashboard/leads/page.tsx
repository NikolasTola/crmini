import Link from "next/link";
import { Suspense } from "react";
import { findAllLeads } from "@/lib/db/leads.repository";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { LeadsFilterContainer } from "@/features/leads/LeadsFilterContainer";
import { LeadStatus } from "@mini-crm/shared-types";

interface LeadsPageProps {
    searchParams: { status?: string | string[] };
}

export const metadata = { title: "Leads — Mini CRM" };

function parseStatuses(raw: string | string[] | undefined): LeadStatus[] {
    if (!raw) return [];
    const values = Array.isArray(raw) ? raw : [raw];
    const valid = Object.values(LeadStatus) as string[];
    return values.filter((v) => valid.includes(v)) as LeadStatus[];
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
    const activeStatuses = parseStatuses(searchParams.status);
    const leads = await findAllLeads(activeStatuses.length > 0 ? activeStatuses : undefined);

    return (
        <Suspense>
            <PageHeader
                title="Leads"
                description={`${leads.length} lead${leads.length !== 1 ? "s" : ""} encontrado${leads.length !== 1 ? "s" : ""}`}
                action={
                    <Link href="/dashboard/leads/novo">
                        <Button>+ Novo lead</Button>
                    </Link>
                }
            />

            {/* Layout de duas colunas: tabela + funil */}
            <div className="flex gap-6 items-start">

                {/* Coluna principal — filtro + tabela */}
                <div className="flex-1 min-w-0 space-y-4">
                    <LeadsFilterContainer />
                    <LeadsTable leads={leads} />
                </div>

                {/* Coluna do funil — sticky acompanha o scroll */}
                <div className="w-44 shrink-0 self-start sticky top-6">
                    <LeadsFilterContainer funnelOnly />
                </div>

            </div>
        </Suspense>
    );
}