import type { ReactNode } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SupabaseProvider } from "@/components/auth/SupabaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TheraMeet AI",
  description: "Criação de agentes de IA para WhatsApp.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " bg-gray-50 text-gray-900"}>
        <SupabaseProvider>
          <main className="min-h-screen w-full">
            {children}
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
