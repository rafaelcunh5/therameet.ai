"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 md:pt-16">
      <div className="container grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 text-xs text-slate-300 shadow-sm"
          >
            <span className="hidden h-5 w-px bg-slate-700/80 sm:inline-block" />
            <span>Automação inteligente no WhatsApp</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-5xl"
          >
            Aumente suas vendas no WhatsApp com Automação Inteligente
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-sm text-slate-300 md:text-base"
          >
            Crie bots, funis e respostas inteligentes usando IA. Simples, rápido e feito
            para quem quer converter mais no WhatsApp.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild>
              <Link href="/signup">Começar agora</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/signup">Ver demo</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-2xl shadow-slate-950/70">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                WhatsApp Bot • Online
              </span>
              <span>TheraMeet AI</span>
            </div>
            <div className="space-y-2 text-[11px] leading-relaxed text-slate-200">
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl bg-slate-800/80 px-3 py-2">
                  Olá! Como posso ajudar o seu negócio hoje?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-xl bg-indigo-600 px-3 py-2">
                  Quero automatizar o atendimento e as vendas no WhatsApp.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl bg-slate-800/80 px-3 py-2">
                  Perfeito. Vou criar um fluxo que responde leads, envia propostas
                  e agenda reuniões automaticamente.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
