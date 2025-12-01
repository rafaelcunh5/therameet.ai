"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/messages", label: "Mensagens", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname() || "";

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-[#181818] bg-[#0D0D0D] px-4 py-5 text-sm text-slate-100 md:flex">
      <div className="mb-8 flex items-center gap-2 px-1">
        <div className="leading-tight">
          <p className="text-sm font-semibold">TheraMeet AI</p>
          <p className="text-[11px] text-slate-400">Agentes de WhatsApp</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-[#1C1C1C] text-slate-50"
                  : "text-slate-400 hover:bg-[#181818] hover:text-slate-100",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-black to-black px-3 py-3 text-[11px]">
          <p className="font-semibold text-indigo-100">Plano gratuito</p>
          <p className="mt-1 text-slate-300">
            Faça upgrade para liberar criação de agentes e conexão com WhatsApp.
          </p>
          <Link
            href="/dashboard/billing"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-indigo-400"
          >
            Fazer upgrade
          </Link>
        </div>
      </div>
    </aside>
  );
}
