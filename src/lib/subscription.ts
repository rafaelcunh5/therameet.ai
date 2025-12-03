import { createClient } from "@/lib/supabase/browser";
import { hasActiveSubscription as stripeHasActiveSubscription } from "@/lib/stripe";

// Interface para dados do usuário
export interface UserProfile {
  id: string;
  email: string;
  is_subscribed: boolean;
  plan?: 'free' | 'basic' | 'pro' | 'enterprise';
  stripe_customer_id?: string;
  subscription_status?: string;
}

// Helper global para verificar assinatura
export async function requireSubscription(): Promise<{
  hasSubscription: boolean;
  userProfile: UserProfile | null;
  needsUpgrade: boolean;
}> {
  const supabase = createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) {
      return {
        hasSubscription: false,
        userProfile: null,
        needsUpgrade: true
      };
    }

    // Verificar assinatura via Stripe
    const stripeSubscription = await stripeHasActiveSubscription(user.email);
    
    // Buscar perfil do usuário no Supabase (se existir tabela profiles)
    let userProfile: UserProfile | null = null;
    
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        userProfile = {
          ...profile,
          is_subscribed: profile.is_subscribed || stripeSubscription
        };
      } else {
        // Criar perfil básico se não existir
        const newUserProfile: UserProfile = {
          id: user.id,
          email: user.email || '',
          is_subscribed: stripeSubscription,
          plan: stripeSubscription ? 'basic' : 'free'
        };
        
        userProfile = newUserProfile;
        
        await supabase
          .from('profiles')
          .insert(newUserProfile);
      }
    } catch (error) {
      // Se tabela profiles não existir, usar apenas Stripe
      userProfile = {
        id: user.id,
        email: user.email || '',
        is_subscribed: stripeSubscription,
        plan: stripeSubscription ? 'basic' : 'free'
      };
    }

    return {
      hasSubscription: userProfile?.is_subscribed ?? false,
      userProfile,
      needsUpgrade: !(userProfile?.is_subscribed ?? false),
    };
    
  } catch (error) {
    console.error('Error in requireSubscription:', error);
    return {
      hasSubscription: false,
      userProfile: null,
      needsUpgrade: true
    };
  }
}

// Verificar no lado do servidor (API routes)
export async function requireSubscriptionServer(req: Request): Promise<{
  hasSubscription: boolean;
  userEmail: string | null;
  needsUpgrade: boolean;
}> {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return {
        hasSubscription: false,
        userEmail: null,
        needsUpgrade: true
      };
    }

    const token = authHeader.slice('Bearer '.length);
    const supabase = createClient();
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user?.email) {
      return {
        hasSubscription: false,
        userEmail: null,
        needsUpgrade: true
      };
    }

    const hasSubscription = await stripeHasActiveSubscription(user.email);
    
    return {
      hasSubscription,
      userEmail: user.email,
      needsUpgrade: !hasSubscription
    };
    
  } catch (error) {
    console.error('Error in requireSubscriptionServer:', error);
    return {
      hasSubscription: false,
      userEmail: null,
      needsUpgrade: true
    };
  }
}

// Middleware para API routes
export function withSubscriptionCheck(handler: (req: Request, ...args: any[]) => Promise<Response>) {
  return async (req: Request, ...args: any[]) => {
    const { hasSubscription, needsUpgrade } = await requireSubscriptionServer(req);
    
    if (needsUpgrade) {
      return new Response(
        JSON.stringify({ 
          error: 'Premium feature',
          message: 'Esta funcionalidade requer uma assinatura ativa.',
          requiresUpgrade: true 
        }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return handler(req, ...args);
  };
}
