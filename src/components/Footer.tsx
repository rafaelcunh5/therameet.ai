"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState(2024);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/90">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-200">TheraMeet AI</p>
          <p className="text-xs text-slate-500">
            Automatize conversas, vendas e atendimento com IA no WhatsApp.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <a href="#contact" className="hover:text-slate-200">
            Contato
          </a>
          <Link href="/about" className="hover:text-slate-200">
            Sobre
          </Link>
          <span className="text-slate-600">© {year} TheraMeet AI</span>
        </div>
      </div>
    </footer>
  );
}
