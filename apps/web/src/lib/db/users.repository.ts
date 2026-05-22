import { pool } from "./client";

export interface User {
  id: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type PublicUser = Omit<User, "password_hash">;

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE email = $1 AND is_active = TRUE LIMIT 1",
    [email.toLowerCase().trim()]
  );
  return result.rows[0] ?? null;
}

export async function findUserById(id: string): Promise<PublicUser | null> {
  const result = await pool.query<PublicUser>(
    `SELECT id, email, is_active, created_at, updated_at
     FROM users WHERE id = $1 AND is_active = TRUE LIMIT 1`,
    [id]
  );
  return result.rows[0] ?? null;
}