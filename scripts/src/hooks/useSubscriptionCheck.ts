"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { hasActiveSubscription } from "@/lib/stripe";

export function useSubscriptionCheck() {
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

  const requireSubscription = (action?: string) => {
    if (isLoading) return false;
    
    if (!hasSubscription) {
      router.push("/pricing?blocked=true");
      return false;
    }
    
    return true;
  };

  return {
    isLoading,
    hasSubscription,
    requireSubscription
  };
}
