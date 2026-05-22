import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { DashboardPage } from "@/features/dashboard/DashboardPage";

export const metadata = { title: "Dashboard — Mini CRM" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <DashboardPage user={user} />;
}