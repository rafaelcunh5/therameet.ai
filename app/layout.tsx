import type { ReactNode } from "react";
<<<<<<< HEAD
import "./globals.css";
=======
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import "../globals.css";
>>>>>>> 9396767e2ae83e5e9d30d620c60a8d6cb39a1d04
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SupabaseProvider } from "@/components/auth/SupabaseProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = { 
  title: "TheraMeet AI — Agentes Inteligentes para WhatsApp",
  description: "Crie agentes de IA para automatizar seu atendimento no WhatsApp"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
