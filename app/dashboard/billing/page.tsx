"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/browser";
import { hasActiveSubscription } from "@/lib/stripe";

export default function BillingPage() {
  const [user, setUser] = useState<any>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const supabase = createClient();
        const { data: { user: userData } } = await supabase.auth.getUser();
        
        if (userData?.email) {
          setUser(userData);
          const hasActive = await hasActiveSubscription(userData.email);
          setSubscriptionStatus(hasActive ? "active" : "inactive");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-800 rounded w-64 mb-4"></div>
          <div className="h-4 bg-slate-800 rounded w-96"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Assinatura & Billing</h1>
        <p className="text-slate-400">Gerencie sua assinatura e veja os detalhes do plano.</p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Status da Assinatura</h2>
            <p className="text-sm text-slate-400">
              {subscriptionStatus === "active" 
                ? "Sua assinatura está ativa" 
                : "Você não possui uma assinatura ativa"}
            </p>
          </div>
          <Badge className={subscriptionStatus === "active" 
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            : "bg-red-500/10 text-red-400 border-red-500/20"
          }>
            {subscriptionStatus === "active" ? "Ativa" : "Inativa"}
          </Badge>
        </div>

        {subscriptionStatus !== "active" && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm mb-3">
              Você precisa de uma assinatura ativa para acessar todos os recursos.
            </p>
            <Button 
              onClick={() => window.location.href = "/pricing"}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Ver Planos
            </Button>
          </div>
        )}

        {subscriptionStatus === "active" && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-300">Próxima cobrança</span>
              <span className="text-white">Em breve</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-300">Método de pagamento</span>
              <span className="text-white">Cartão de crédito</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-300">Email da conta</span>
              <span className="text-white text-sm">{user?.email}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Recursos do Plano</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${
              subscriptionStatus === "active" ? "bg-emerald-500" : "bg-slate-600"
            }`} />
            <span className="text-sm text-slate-300">
              Agentes de WhatsApp {subscriptionStatus === "active" ? "ilimitados" : "bloqueados"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${
              subscriptionStatus === "active" ? "bg-emerald-500" : "bg-slate-600"
            }`} />
            <span className="text-sm text-slate-300">
              Conexão com WhatsApp {subscriptionStatus === "active" ? "ativa" : "bloqueada"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${
              subscriptionStatus === "active" ? "bg-emerald-500" : "bg-slate-600"
            }`} />
            <span className="text-sm text-slate-300">
              Mensagens {subscriptionStatus === "active" ? "ilimitadas" : "limitadas"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
