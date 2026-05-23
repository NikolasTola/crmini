import { redirect } from "next/navigation";

// Redireciona /dashboard para /dashboard/leads por padrão
export default function DashboardPage() {
  redirect("/dashboard/leads");
}