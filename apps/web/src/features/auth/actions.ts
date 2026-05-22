"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { findUserByEmail } from "@/lib/db/users.repository";
import { verifyPassword } from "@/lib/auth/password.service";
import { createUserSession, destroySession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validations/auth.schema";

export interface ActionResult {
  error?: string;
}

export async function loginAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { email, password } = parsed.data;
  const user = await findUserByEmail(email);

  // Mensagem genérica: não revela se o email existe
  if (!user) return { error: "Email ou senha incorretos" };

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) return { error: "Email ou senha incorretos" };

  const headerStore = await headers();
  const ipAddress =
    headerStore.get("x-forwarded-for")?.split(",")[0].trim() ??
    headerStore.get("x-real-ip") ??
    undefined;
  const userAgent = headerStore.get("user-agent") ?? undefined;

  await createUserSession(user.id, ipAddress, userAgent);
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}