"use client";

import { motion } from "framer-motion";

const LOGOS = ["Nova Clinic", "Fluxo Digital", "Studio IA", "LeadBoost", "OmniCare"];

export function SocialProof() {
  return (
    <section className="bg-slate-950 pb-10 pt-4">
      <div className="container space-y-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400"
        >
          Confiado por criadores e negócios em crescimento
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500 md:text-xs"
        >
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="rounded-full border border-slate-800/80 bg-slate-950/60 px-4 py-1.5 text-slate-400"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
