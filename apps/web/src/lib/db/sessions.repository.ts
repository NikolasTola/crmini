import { pool } from "./client";

export interface Session {
  id: string;
  user_id: string;
  token: string;
  ip_address: string | null;
  user_agent: string | null;
  expires_at: Date;
  created_at: Date;
}

const SESSION_DURATION_DAYS = 7;

export async function createSession(
  userId: string,
  token: string,
  ipAddress?: string,
  userAgent?: string
): Promise<Session> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  const result = await pool.query<Session>(
    `INSERT INTO sessions (user_id, token, ip_address, user_agent, expires_at)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, token, ipAddress ?? null, userAgent ?? null, expiresAt]
  );
  return result.rows[0];
}

export async function findSessionByToken(token: string): Promise<Session | null> {
  const result = await pool.query<Session>(
    "SELECT * FROM sessions WHERE token = $1 AND expires_at > NOW() LIMIT 1",
    [token]
  );
  return result.rows[0] ?? null;
}

export async function deleteSessionByToken(token: string): Promise<void> {
  await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
}