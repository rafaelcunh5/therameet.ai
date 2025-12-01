"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function AIActionDemo() {
  return (
    <section className="bg-slate-950 py-16 md:py-24">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-8">
          {/* Left Column - WhatsApp Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-3xl border-4 border-slate-800 bg-slate-900 shadow-2xl md:max-w-[320px]"
          >
            {/* Phone frame */}
            <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900"></div>
            
            {/* Chat header */}
            <div className="bg-emerald-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600"></div>
                <div>
                  <div className="font-medium">Atendimento</div>
                  <div className="text-xs opacity-80">online</div>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="space-y-3 bg-slate-800 p-4">
              {/* Message 1 */}
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-slate-700/80 p-3 text-sm text-white">
                  Oi, quero saber mais sobre o curso
                </div>
                <div className="ml-2 mt-auto text-[10px] text-slate-400">14:23</div>
              </div>
              
              {/* Message 2 */}
              <div className="flex justify-end">
                <div className="mr-2 mt-auto text-[10px] text-slate-400">14:23 ✓✓</div>
                <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-emerald-600 p-3 text-sm text-white">
                  Olá! 👋 Nosso curso de Marketing Digital tem 8 módulos completos com certificado. Você tem interesse em qual área?
                </div>
              </div>
              
              {/* Message 3 */}
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-slate-700/80 p-3 text-sm text-white">
                  Redes sociais
                </div>
                <div className="ml-2 mt-auto text-[10px] text-slate-400">14:24</div>
              </div>
              
              {/* Message 4 */}
              <div className="flex justify-end">
                <div className="mr-2 mt-auto text-[10px] text-slate-400">14:24 ✓✓</div>
                <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-emerald-600 p-3 text-sm text-white">
                  Perfeito! Temos um módulo exclusivo de Social Media com estratégias práticas. O investimento é R$297 em até 12x. Posso enviar o conteúdo completo?
                </div>
              </div>
              
              {/* Input area */}
              <div className="mt-4 flex items-center rounded-full bg-slate-700/50 p-2">
                <div className="ml-2 h-6 w-6 rounded-full bg-slate-600"></div>
                <div className="ml-2 h-3 w-3/4 rounded-full bg-slate-600/50"></div>
                <div className="ml-auto h-8 w-8 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Veja a IA em ação
              </h2>
              <p className="text-lg text-slate-300">
                A IA usa seu script de vendas e responde seus leads com precisão, mantendo o tom da sua marca e convertendo mais.
              </p>
            </div>
            
            <ul className="space-y-4">
              {[
                "Respostas contextualizadas",
                "Entende a intenção e responde adequadamente",
                "Qualifica leads automaticamente",
                "Identifica oportunidades reais de venda",
                "Tom de voz personalizado",
                "Mantém a identidade da sua marca"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <button className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-emerald-500/20">
                Quero um atendimento assim
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
