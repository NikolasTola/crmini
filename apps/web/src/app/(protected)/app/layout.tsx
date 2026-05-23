import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <AuthenticatedLayout userEmail={user.email}>
      {children}
    </AuthenticatedLayout>
  );
}