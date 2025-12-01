"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userEmail?: string;
  planLabel?: string;
}

export function DashboardHeader({ userEmail, planLabel = "Free" }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <p className="font-medium text-slate-100">Dashboard</p>
        <span className="h-3 w-px bg-slate-700" />
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
          Plano {planLabel}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden flex-col items-end text-right text-[11px] text-slate-400 sm:flex">
          <span className="font-medium text-slate-100">{userEmail ?? "Usuário"}</span>
          <span className="text-[10px] text-slate-500">Workspace padrão</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-slate-700 bg-slate-900 text-[11px] text-slate-200 hover:bg-slate-800"
          onClick={async () => {
            router.push("/settings");
          }}
        >
          Configurações
        </Button>
      </div>
    </header>
  );
}
