import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-slate-100">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col bg-[#050505]">
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
