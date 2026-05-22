"use client";

import { useTransition } from "react";
import { logoutAction } from "@/features/auth/actions";
import type { PublicUser } from "@/lib/db/users.repository";

interface DashboardPageProps {
  user: PublicUser;
}

export function DashboardPage({ user }: DashboardPageProps) {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(() => { logoutAction(); });
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6 px-4">
      <div className="text-center">
        {/* TODO: Substituir por dashboard real quando as features forem implementadas */}
        <h1 className="text-3xl font-semibold text-gray-800">Em desenvolvimento...</h1>
        <p className="mt-2 text-sm text-gray-500">
          Logado como <span className="font-medium text-gray-700">{user.email}</span>
        </p>
      </div>
      <button
        onClick={handleLogout}
        disabled={isPending}
        className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50
                   text-sm font-medium text-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                   transition-colors"
      >
        {isPending ? "Saindo..." : "Sair"}
      </button>
    </main>
  );
}