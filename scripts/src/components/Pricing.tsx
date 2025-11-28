"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const PLANS = [
  {
    name: "Starter",
    price: "R$ 99,90/mês",
    description: "Plano Starter (3k msgs)",
    features: [
      "3.000 mensagens / mês",
      "Acesso a modelos prontos",
      "Automação básica",
    ],
    planId: "starter",
  },
  {
    name: "Pro",
    price: "R$ 199,90/mês",
    description: "Plano Pro (7k msgs)",
    features: [
      "7.000 mensagens / mês",
      "Fluxos avançados",
      "Suporte prioritário",
      "Treinamento de IA personalizado",
    ],
    planId: "pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "R$ 699,90/mês",
    description: "Plano Business (mensagens ilimitadas)",
    features: [
      "Mensagens ilimitadas",
      "Todos os recursos avançados",
      "Agentes de IA ilimitados",
      "Suporte premium",
    ],
    planId: "business",
  },
];

// Links diretos da Stripe - SEM API
const checkoutLinks = {
  starter: "https://buy.stripe.com/aFa9AS0V3eYS2xifn60Ny02",
  pro: "https://buy.stripe.com/eVq5kCdHPcQKc7S0sc0Ny01",
  business: "https://buy.stripe.com/eVq3cu6fn03Yc7S0sc0Ny00",
} as const;

// Função universal handleCheckout
const handleCheckout = (plan: "starter" | "pro" | "business") => {
  if (typeof window !== "undefined") {
    window.location.href = checkoutLinks[plan];
  }
};

interface PricingProps {
  selectedPlan?: string | null;
}

export function Pricing({ selectedPlan }: PricingProps) {
  // Auto-acionar checkout se vier do signup com plano selecionado
  useEffect(() => {
    if (selectedPlan && PLANS.some(plan => plan.planId === selectedPlan)) {
      // Dar tempo para a página carregar e fazer scroll
      const timer = setTimeout(() => {
        // Opcional: auto-acionar checkout após 2 segundos
        // handleCheckout(selectedPlan as "starter" | "pro" | "business");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedPlan]);

  return (
    <section id="pricing" className="bg-slate-950 pb-16 pt-12">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Planos para cada estágio do seu negócio.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
            Comece pequeno e escale conforme seus fluxos e times crescem. Sem taxa de setup.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              id={`plan-${plan.planId}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/70 ${
                plan.highlight ? "ring-2 ring-indigo-500/70" : ""
              } ${
                selectedPlan === plan.planId ? "ring-2 ring-indigo-400 animate-pulse" : ""
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400">{plan.description}</p>
                </div>
                {plan.highlight && (
                  <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-indigo-300">
                    Mais popular
                  </span>
                )}
                {selectedPlan === plan.planId && (
                  <span className="rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-green-300">
                    Selecionado
                  </span>
                )}
              </div>

              <p className="mb-4 text-xl font-semibold text-slate-50">
                {plan.price}
              </p>

              <ul className="mb-6 flex-1 space-y-2 text-xs text-slate-300 md:text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Botão Starter */}
              {plan.planId === "starter" && (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => handleCheckout("starter")}
                >
                  Começar agora
                </Button>
              )}

              {/* Botão Pro */}
              {plan.planId === "pro" && (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => handleCheckout("pro")}
                >
                  Começar agora
                </Button>
              )}

              {/* Botão Business */}
              {plan.planId === "business" && (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => handleCheckout("business")}
                >
                  Começar agora
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
