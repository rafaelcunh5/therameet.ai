import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SupabaseProvider } from "@/components/auth/SupabaseProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TheraMeet AI — Automação com IA para WhatsApp",
  description:
    "Crie agentes inteligentes que vendem, atendem e automatizam seu negócio no WhatsApp.",
  openGraph: {
    title: "TheraMeet AI",
    description: "Automação inteligente para WhatsApp",
    url: "https://seu-dominio.com",
    siteName: "TheraMeet AI",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <SupabaseProvider>
          <Navbar />
          <main className="pb-20 pt-6">{children}</main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
