"use client";

import { motion } from "framer-motion";
import { MessageCircle, Bot, Zap } from "lucide-react";

export function FlowDemo() {
  return (
    <section className="bg-slate-950 py-14">
      <div className="container grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Automação visual clara e poderosa.
          </h2>
          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            Desenhe jornadas conversacionais com blocos visuais. Arraste, conecte e
            publique fluxos em minutos — sem se preocupar com infraestrutura.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Conectores prontos para WhatsApp.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Nós de decisão baseados em intenções e contexto.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Versões e testes A/B dos seus agentes de IA.
            </li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 shadow-2xl shadow-slate-950/70">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span>Fluxo &quot;Onboarding de Lead&quot;</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">
                Em produção
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-4">
                <FlowNode icon={MessageCircle} label="Mensagem recebida" color="bg-sky-500/20" />
                <FlowNode icon={Bot} label="Entender intenção" color="bg-indigo-500/20" />
              </div>
              <div className="space-y-4">
                <FlowNode icon={Zap} label="Enviar proposta" color="bg-emerald-500/20" />
                <FlowNode icon={MessageCircle} label="Perguntas frequentes" color="bg-slate-700/60" />
              </div>
              <div className="space-y-4">
                <FlowNode icon={Bot} label="Agendar reunião" color="bg-purple-500/20" />
                <FlowNode icon={Zap} label="Notificar time" color="bg-amber-500/20" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface FlowNodeProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

function FlowNode({ icon: Icon, label, color }: FlowNodeProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border border-slate-800/80 bg-slate-900/80 p-3 text-[11px] text-slate-200 ${color}`}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-950/60">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span>{label}</span>
      </div>
    </div>
  );
}
