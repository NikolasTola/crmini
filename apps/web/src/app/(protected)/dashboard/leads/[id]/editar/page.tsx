import { notFound } from "next/navigation";
import { findLeadById } from "@/lib/db/leads.repository";
import { EditLeadClient } from "./EditLeadClient";

interface EditLeadPageProps {
  params: { id: string };
}

export const metadata = { title: "Editar lead — Mini CRM" };

export default async function EditLeadPage({ params }: EditLeadPageProps) {
  const lead = await findLeadById(params.id);
  if (!lead) notFound();
  return <EditLeadClient lead={lead} />;
}