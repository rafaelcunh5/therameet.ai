"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Planos para cada estágio do seu negócio
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-16">
          Comece pequeno e escale conforme seus fluxos e times crescem. Sem taxa de setup.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-slate-400 text-sm mb-4">Plano Starter (3k msgs)</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">R$ 99,90</span>
                <span className="text-slate-400 ml-2">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">3.000 mensagens / mês</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Acesso a modelos prontos</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Automação básica</span>
              </li>
            </ul>

            <a 
              href="https://buy.stripe.com/aFa9AS0V3eYS2xifn60Ny02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full py-3 text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white">
                Começar agora
              </Button>
            </a>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-slate-900 rounded-2xl border-2 border-blue-400 shadow-2xl shadow-blue-400/20 p-8">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white px-4 py-1 text-sm">
                MAIS POPULAR
              </Badge>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-slate-400 text-sm mb-4">Pro (7k msgs)</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">R$ 199,90</span>
                <span className="text-slate-400 ml-2">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">7.000 mensagens / mês</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Fluxos avançados</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Suporte prioritário</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Treinamento de IA personalizado</span>
              </li>
            </ul>

            <a 
              href="https://buy.stripe.com/eVq5kCdHPcQKc7S0sc0Ny01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full py-3 text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white">
                Começar agora
              </Button>
            </a>
          </div>

          {/* Business Plan */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
              <p className="text-slate-400 text-sm mb-4">Plano Business (mensagens ilimitadas)</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">R$ 699,90</span>
                <span className="text-slate-400 ml-2">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Mensagens ilimitadas</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Todos os recursos avançados</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Agentes de IA ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Suporte premium</span>
              </li>
            </ul>

            <a 
              href="https://buy.stripe.com/eVq3cu6fn03Yc7S0sc0Ny00" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full py-3 text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white">
                Começar agora
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
