import { pool } from "./client";
import { LeadStatus, LeadOrigem } from "@mini-crm/shared-types";

export interface LeadsByStatusRow {
  status: LeadStatus;
  total: number;
}

export interface LeadsByOrigemRow {
  origem: LeadOrigem;
  total: number;
}

export interface LeadsByAgeGroupRow {
  faixa: string;
  total: number;
}

export interface LeadsByStatusAndOrigemRow {
  origem: LeadOrigem;
  status: LeadStatus;
  total: number;
}

export interface DashboardStats {
  totalLeads: number;
  taxaConversao: number;
  leadsPerdidos: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const result = await pool.query<{
    total: string;
    fechados: string;
    perdidos: string;
  }>(`
    SELECT
      COUNT(*)                                            AS total,
      COUNT(*) FILTER (WHERE status = 'fechado')         AS fechados,
      COUNT(*) FILTER (WHERE status = 'perdido')         AS perdidos
    FROM leads
  `);

  const row = result.rows[0];
  const total = Number(row.total);
  const fechados = Number(row.fechados);
  const perdidos = Number(row.perdidos);

  return {
    totalLeads: total,
    taxaConversao: total > 0 ? Math.round((fechados / total) * 100) : 0,
    leadsPerdidos: perdidos,
  };
}

export async function getLeadsByStatus(): Promise<LeadsByStatusRow[]> {
  const result = await pool.query<LeadsByStatusRow>(`
    SELECT status, COUNT(*) AS total
    FROM leads
    GROUP BY status
    ORDER BY total DESC
  `);

  // Garante que todos os status aparecem mesmo com total 0
  const map = new Map(result.rows.map((r) => [r.status, Number(r.total)]));

  return Object.values(LeadStatus).map((status) => ({
    status,
    total: map.get(status) ?? 0,
  }));
}

export async function getLeadsByOrigem(): Promise<LeadsByOrigemRow[]> {
  const result = await pool.query<LeadsByOrigemRow>(`
    SELECT origem, COUNT(*) AS total
    FROM leads
    GROUP BY origem
    ORDER BY total DESC
  `);

  const map = new Map(result.rows.map((r) => [r.origem, Number(r.total)]));

  return Object.values(LeadOrigem).map((origem) => ({
    origem,
    total: map.get(origem) ?? 0,
  }));
}

export async function getLeadsByAgeGroup(): Promise<LeadsByAgeGroupRow[]> {
  const result = await pool.query<{ faixa: string; total: string }>(`
    SELECT
      CASE
        WHEN idade BETWEEN 0  AND 17 THEN 'Menor de 18'
        WHEN idade BETWEEN 18 AND 25 THEN '18–25'
        WHEN idade BETWEEN 26 AND 35 THEN '26–35'
        WHEN idade BETWEEN 36 AND 45 THEN '36–45'
        WHEN idade BETWEEN 46 AND 55 THEN '46–55'
        ELSE '55+'
      END AS faixa,
      COUNT(*) AS total
    FROM leads
    GROUP BY faixa
    ORDER BY MIN(idade)
  `);

  return result.rows.map((r) => ({
    faixa: r.faixa,
    total: Number(r.total),
  }));
}

export async function getLeadsByStatusAndOrigem(): Promise<LeadsByStatusAndOrigemRow[]> {
  const result = await pool.query<{
    origem: LeadOrigem;
    status: LeadStatus;
    total: string;
  }>(`
    SELECT origem, status, COUNT(*) AS total
    FROM leads
    GROUP BY origem, status
    ORDER BY origem, status
  `);

  return result.rows.map((r) => ({
    origem: r.origem,
    status: r.status,
    total: Number(r.total),
  }));
}