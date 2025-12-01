"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  {
    q: "Preciso saber programar para usar a TheraMeet AI?",
    a: "Não. Todo o fluxo é criado em um editor visual de arrastar e soltar, com blocos prontos e recomendações de IA.",
  },
  {
    q: "Como funciona a conexão com WhatsApp?",
    a: "A conexão é feita via API oficial do WhatsApp. Cada plano inclui 1 número para conectar e gerenciar suas conversas.",
  },
  {
    q: "E se meu time quiser intervir na conversa?",
    a: "Você pode configurar transferências para atendentes humanos em qualquer ponto do fluxo.",
  },
  {
    q: "Quais integrações existem?",
    a: "Integrações com ferramentas internas, planilhas e CRM conectados ao seu WhatsApp.",
  },
  {
    q: "Posso testar antes de contratar?",
    a: "Sim. Oferecemos um período de teste para você validar a ferramenta no seu dia a dia.",
  },
  {
    q: "Como é feita a cobrança?",
    a: "A cobrança é recorrente, mensal, via cartão de crédito, com possibilidade de upgrade a qualquer momento.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-950 pb-20 pt-10">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Perguntas frequentes.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
            Tudo o que você precisa saber antes de criar seu primeiro agente de IA.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-2">
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-slate-800/80 bg-slate-950/80"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-100"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="px-4 pb-3 text-xs text-slate-300 md:text-sm">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
