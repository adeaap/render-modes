import { notFound } from "next/navigation";
import { PHASES, getPhase } from "@/app/_lib/phases";
import { PhaseShell } from "./_components/PhaseShell";

export async function generateStaticParams() {
  return PHASES.map((p) => ({ phase: p.id }));
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase } = await params;
  const data = getPhase(phase);
  if (!data) notFound();
  return <PhaseShell phase={data} />;
}
