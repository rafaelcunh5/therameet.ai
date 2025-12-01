"use client";

import { motion } from "framer-motion";
import { MessageCircle, Bot, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Conecte seu WhatsApp",
    description: "Integre em poucos cliques usando provedores oficiais e seguros.",
  },
  {
    icon: Bot,
    title: "Crie ou escolha um agente",
    description: "Use templates prontos ou treine um agente com os dados do seu negócio.",
  },
  {
    icon: Rocket,
    title: "Comece a vender automaticamente",
    description: "Ative o fluxo e deixe a IA fazer o trabalho pesado enquanto você acompanha os resultados.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-950 pb-14 pt-10">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Como funciona.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
            Da conexão ao primeiro lead atendido, você precisa de minutos — não semanas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 text-center shadow-lg shadow-slate-950/70"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-50">{step.title}</h3>
                <p className="text-xs text-slate-300 md:text-sm">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
