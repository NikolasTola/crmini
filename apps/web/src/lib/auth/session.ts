import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { createSession, findSessionByToken, deleteSessionByToken } from "@/lib/db/sessions.repository";
import { findUserById, type PublicUser } from "@/lib/db/users.repository";

const SESSION_COOKIE_NAME = "crm_session";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

function generateSessionToken(): string {
  return randomBytes(48).toString("hex");
}

export async function createUserSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  const token = generateSessionToken();
  await createSession(userId, token, ipAddress, userAgent);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, COOKIE_OPTIONS);
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await findSessionByToken(token);
  if (!session) return null;

  return findUserById(session.user_id);
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) await deleteSessionByToken(token);
  cookieStore.delete(SESSION_COOKIE_NAME);
}