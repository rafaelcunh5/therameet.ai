"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { hasActiveSubscription } from "@/lib/stripe";

interface SubscriptionGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  action?: string;
}

export function SubscriptionGuard({ 
  children, 
  fallback, 
  action = "realizar esta ação" 
}: SubscriptionGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user?.email) {
          setHasSubscription(false);
          return;
        }

        const subscription = await hasActiveSubscription(user.email);
        setHasSubscription(subscription);
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
    router.push("/pricing?blocked=true");
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <Button disabled className="w-full">
          Carregando...
        </Button>
      </div>
    );
  }

  if (!hasSubscription) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="space-y-4">
        <div className="text-center p-4 border border-slate-700 rounded-lg bg-slate-800/50">
          <p className="text-sm text-slate-300 mb-3">
            🔒 Esta função requer uma assinatura ativa
          </p>
          <Button onClick={handleUpgradeClick} className="w-full">
            Assinar agora para {action}
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook para botões específicos
export function useSubscriptionButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user?.email) {
          setHasSubscription(false);
          return;
        }

        const subscription = await hasActiveSubscription(user.email);
        setHasSubscription(subscription);
      } catch (error) {
        console.error("Error checking subscription:", error);
        setHasSubscription(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  const handleClick = (callback?: () => void) => {
    if (isLoading) return false;
    
    if (!hasSubscription) {
      router.push("/pricing?blocked=true");
      return false;
    }
    
    callback?.();
    return true;
  };

  return {
    isLoading,
    hasSubscription,
    handleClick
  };
}
