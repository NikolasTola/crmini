interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  highlight?: "default" | "green" | "red";
}

const HIGHLIGHT_STYLES = {
  default: "text-gray-900 dark:text-slate-100",
  green:   "text-green-600 dark:text-green-400",
  red:     "text-red-500 dark:text-red-400",
};

function StatCard({ label, value, description, highlight = "default" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">{label}</p>
      <p className={`text-3xl font-semibold ${HIGHLIGHT_STYLES[highlight]}`}>
        {value}
      </p>
      {description && (
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{description}</p>
      )}
    </div>
  );
}

interface StatsCardsProps {
  totalLeads: number;
  taxaConversao: number;
  leadsPerdidos: number;
}

export function StatsCards({ totalLeads, taxaConversao, leadsPerdidos }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        label="Total de leads"
        value={totalLeads}
        description="Todos os leads cadastrados"
      />
      <StatCard
        label="Taxa de conversão"
        value={`${taxaConversao}%`}
        description="Leads com status Fechado"
        highlight="green"
      />
      <StatCard
        label="Leads perdidos"
        value={leadsPerdidos}
        description="Leads com status Perdido"
        highlight={leadsPerdidos > 0 ? "red" : "default"}
      />
    </div>
  );
}