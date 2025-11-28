import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

// Mapeamento de planos para price IDs do Stripe
const PRICES = {
  starter: "price_xxxxxxxxxxxxx", // R$ 99,90/mês - SUBSTITUA COM ID REAL
  pro: "price_xxxxxxxxxxxxx",     // R$ 199,90/mês - SUBSTITUA COM ID REAL  
  business: "price_xxxxxxxxxxxxx" // R$ 699,90/mês - SUBSTITUA COM ID REAL
} as const;

type Plan = keyof typeof PRICES;

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    // Validação do plano
    if (!plan || !PRICES[plan as Plan]) {
      return NextResponse.json(
        { error: "Plano inválido. Planos disponíveis: starter, pro, business" },
        { status: 400 }
      );
    }

    // Verificar se o usuário está autenticado
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user?.email) {
      return NextResponse.json(
        { 
          error: "Usuário não autenticado",
          redirectUrl: `/signup?plan=${plan}`
        },
        { status: 401 }
      );
    }

    // Obter o price ID correspondente
    const priceId = PRICES[plan as Plan];

    // Criar sessão de checkout
    const session = await createCheckoutSession(priceId, user.email);

    return NextResponse.json({ 
      url: session.url,
      plan: plan
    });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao criar sessão de checkout" },
      { status: 500 }
    );
  }
}
