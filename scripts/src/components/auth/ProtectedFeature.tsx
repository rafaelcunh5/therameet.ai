"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireSubscription } from "@/lib/subscription";

interface ProtectedFeatureProps {
  children: React.ReactNode;
  featureName: string;
  description?: string;
  fallback?: React.ReactNode;
  showUpgradeModal?: boolean;
  className?: string;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
  priceId: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "R$ 97/mês",
    features: [
      "Até 100 conversas/mês",
      "1 agente de IA",
      "Integração com WhatsApp",
      "Suporte por email"
    ],
    priceId: "price_basic_placeholder"
  },
  {
    name: "Pro", 
    price: "R$ 197/mês",
    features: [
      "Até 500 conversas/mês",
      "3 agentes de IA",
      "Integração com WhatsApp",
      "Analytics avançado",
      "Suporte prioritário"
    ],
    priceId: "price_pro_placeholder",
    popular: true
  },
  {
    name: "Enterprise",
    price: "R$ 497/mês", 
    features: [
      "Conversas ilimitadas",
      "Agentes ilimitados",
      "Multiplas integrações",
      "API completa",
      "Suporte dedicado",
      "SLA garantido"
    ],
    priceId: "price_enterprise_placeholder"
  }
];

export function ProtectedFeature({ 
  children, 
  featureName, 
  description,
  fallback,
  showUpgradeModal = true,
  className = ""
}: ProtectedFeatureProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { hasSubscription } = await requireSubscription();
        setHasSubscription(hasSubscription);
      } catch (error) {
        console.error("Error checking subscription:", error);
        setHasSubscription(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  const handleUpgradeClick = () => {
    if (showUpgradeModal) {
      setShowModal(true);
    } else {
      router.push("/pricing?blocked=true&feature=" + encodeURIComponent(featureName));
    }
  };

  const handlePlanSelect = async (priceId: string) => {
    try {
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      if (typeof window !== "undefined") {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      // Fallback para página de pricing
      router.push("/pricing?error=true");
    }
  };

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-10 bg-slate-800 rounded-lg"></div>
      </div>
    );
  }

  if (!hasSubscription) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <>
        <div className={`space-y-4 ${className}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-50 mb-2">
                  {featureName}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {description || "Esta funcionalidade requer uma assinatura ativa."}
                </p>
                <Button onClick={handleUpgradeClick} className="w-full">
                  🚀 Desbloquear Agora
                </Button>
              </div>
            </div>
            <div className="opacity-30">
              {children}
            </div>
          </div>
        </div>

        {showModal && (
          <UpgradeModal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onPlanSelect={handlePlanSelect}
            featureName={featureName}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
}

function UpgradeModal({ 
  isOpen, 
  onClose, 
  onPlanSelect, 
  featureName 
}: {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (priceId: string) => void;
  featureName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-50">Desbloquear {featureName}</h2>
              <p className="text-slate-400 mt-1">Escolha um plano para acessar todas as funcionalidades premium</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border ${
                  plan.popular 
                    ? 'border-indigo-500 bg-indigo-500/5' 
                    : 'border-slate-700 bg-slate-800/50'
                } p-6 hover:scale-105 transition-transform`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Mais Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-50 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-slate-50">{plan.price}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-slate-300">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onPlanSelect(plan.priceId)}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Assinar {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
