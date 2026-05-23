"use client";

import { LeadFilter } from "@/components/leads/LeadFilter";
import { LeadFunnel } from "@/components/leads/LeadFunnel";
import { useLeadFilter } from "./hooks/useLeadFilter";

interface LeadsFilterContainerProps {
    funnelOnly?: boolean;
}

export function LeadsFilterContainer({ funnelOnly = false }: LeadsFilterContainerProps) {
    const { activeStatuses, toggleStatus, clearFilter, isPending } = useLeadFilter();

    if (funnelOnly) {
        return (
            <LeadFunnel
                activeStatuses={activeStatuses}
                onToggle={toggleStatus}
                isPending={isPending}
            />
        );
    }

    return (
        <LeadFilter
            activeStatuses={activeStatuses}
            onToggle={toggleStatus}
            onClear={clearFilter}
            isPending={isPending}
        />
    );
}