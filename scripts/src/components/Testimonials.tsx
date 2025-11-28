"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Ana Costa",
    role: "Fundadora, Studio Leads",
    quote:
      "Em duas semanas, nosso bot da TheraMeet AI passou a qualificar mais leads do que nossa equipe fazia manualmente.",
  },
  {
    name: "Pedro Martins",
    role: "Consultor de automação",
    quote:
      "Consigo lançar um fluxo novo para meus clientes em questão de horas, não dias. O editor visual é decisivo.",
  },
  {
    name: "Clara Lima",
    role: "Head de CS, OmniCare",
    quote:
      "Reduzimos o tempo de resposta no WhatsApp em 70% mantendo a experiência extremamente humana.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-slate-950 pb-16 pt-10">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-indigo-300">
            Prova social
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Quem usa não volta atrás.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
            Profissionais de automação, agências e times de CS usam TheraMeet AI
            para dar conta de volumes que antes pareciam impossíveis.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 text-left shadow-lg shadow-slate-950/70"
            >
              <blockquote className="mb-4 text-sm text-slate-200">
                “{t.quote}”
              </blockquote>
              <figcaption className="text-xs text-slate-400">
                <div className="font-medium text-slate-100">{t.name}</div>
                <div>{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
