"use client";

import { motion } from "framer-motion";
import { Brain, MessageCircle, Workflow } from "lucide-react";

const items = [
  {
    icon: Brain,
    title: "Gere automações com IA",
    description:
      "Descreva o que você precisa e deixe a TheraMeet AI sugerir fluxos completos de mensagens.",
  },
  {
    icon: MessageCircle,
    title: "Bots conectados ao seu WhatsApp",
    description:
      "Integração direta com WhatsApp para atendimento, vendas e suporte em tempo real.",
  },
  {
    icon: Workflow,
    title: "Editor visual simples e poderoso",
    description:
      "Arraste e conecte blocos para desenhar jornadas complexas sem escrever uma linha de código.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-slate-950 py-14">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
            Pensado para criadores de automação
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Construído para times que respiram automação.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
            Combine o poder da IA com fluxos visuais para criar experiências conversacionais
            que convertem, atendem e encantam seus clientes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/60 ring-1 ring-transparent transition hover:-translate-y-1 hover:border-indigo-500/60 hover:ring-indigo-500/40"
              >
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 md:text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
