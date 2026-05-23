import { pool } from "./client";
import { LeadOrigem, LeadStatus } from "@mini-crm/shared-types";

export interface Lead {
  id: string;
  nome: string;
  idade: number;
  contato: string;
  origem: LeadOrigem;
  status: LeadStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLeadData {
  nome: string;
  idade: number;
  contato: string;
  origem: LeadOrigem;
  status: LeadStatus;
}

export type UpdateLeadData = Partial<CreateLeadData>;

export async function findAllLeads(statuses?: LeadStatus[]): Promise<Lead[]> {
  if (!statuses || statuses.length === 0) {
    const result = await pool.query<Lead>(
      "SELECT * FROM leads ORDER BY created_at DESC"
    );
    return result.rows;
  }

  // Monta placeholders dinâmicos: $1, $2, $3...
  const placeholders = statuses.map((_, i) => `$${i + 1}`).join(", ");

  const result = await pool.query<Lead>(
    `SELECT * FROM leads WHERE status IN (${placeholders}) ORDER BY created_at DESC`,
    statuses
  );
  return result.rows;
}

export async function findLeadById(id: string): Promise<Lead | null> {
  const result = await pool.query<Lead>(
    "SELECT * FROM leads WHERE id = $1 LIMIT 1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function createLead(data: CreateLeadData): Promise<Lead> {
  const result = await pool.query<Lead>(
    `INSERT INTO leads (nome, idade, contato, origem, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.nome, data.idade, data.contato, data.origem, data.status]
  );
  return result.rows[0];
}

export async function updateLead(
  id: string,
  data: UpdateLeadData
): Promise<Lead | null> {
  // Monta o SET dinamicamente com apenas os campos enviados
  const fields = Object.keys(data) as (keyof UpdateLeadData)[];
  if (fields.length === 0) return findLeadById(id);

  const setClauses = fields.map((field, i) => `${field} = $${i + 2}`).join(", ");
  const values = fields.map((field) => data[field]);

  const result = await pool.query<Lead>(
    `UPDATE leads SET ${setClauses} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0] ?? null;
}

export async function deleteLead(id: string): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM leads WHERE id = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}