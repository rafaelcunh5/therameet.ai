"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="border-t border-slate-800/80 bg-gradient-to-tr from-indigo-600/20 via-sky-500/10 to-emerald-400/10 py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="max-w-2xl text-balance text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Pronto para criar seu primeiro agente de IA para WhatsApp?
          </h2>
          <p className="max-w-xl text-sm text-slate-200 md:text-base">
            Comece em poucos minutos, teste fluxos com seus clientes reais e descubra
            o que a automação conversacional pode fazer pelo seu negócio.
          </p>
          <Button size="lg" className="mt-2" asChild>
            <Link href="/signup">Criar conta grátis</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
