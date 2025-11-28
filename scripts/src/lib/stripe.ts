import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  try {
    // Buscar customer pelo userId no metadata
    const customers = await stripe.customers.list({
      limit: 1,
      email: userId, // ou usar metadata se você armazenar userId lá
    });

    if (customers.data.length === 0) {
      return false;
    }

    const customer = customers.data[0];

    // Verificar assinaturas ativas
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    return subscriptions.data.length > 0;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}

export async function createCheckoutSession(priceId: string, customerEmail: string) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
  });

  return session;
}
