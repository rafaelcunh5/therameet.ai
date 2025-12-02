import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SupabaseProvider } from "@/components/auth/SupabaseProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = { title: "TheraMeet AI — Dashboard" };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <SupabaseProvider>
          <div className="flex min-h-screen bg-black text-slate-100">
            <DashboardSidebar />
            <div className="flex flex-1 flex-col bg-[#050505]">
              <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 md:px-8">
                {children}
              </main>
            </div>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
