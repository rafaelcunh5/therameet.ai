import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

export function getStripe() {
  return stripe;
}

export async function registerStripeEventId(id: string, source: string) {
  const { error } = await supabaseAdmin
    .from('webhook_events')
    .insert({ id, source });
  if (error && error.code !== '23505') {
    // 23505 = unique_violation (idempotência)
    throw error;
  }
}

export async function upsertBillingSubscriptionFromEvent(event: Stripe.Event) {
  const data = event.data.object as any;

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    const customerId = data.customer as string;
    const subscriptionId = data.id as string;
    const status = data.status as string;
    const currentPeriodEnd = data.current_period_end
      ? new Date((data.current_period_end as number) * 1000).toISOString()
      : null;

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .maybeSingle();

    if (profileError || !profile) return;

    await supabaseAdmin
      .from('billing_subscriptions')
      .upsert(
        {
          user_id: profile.id,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status,
          current_period_end: currentPeriodEnd,
        },
        { onConflict: 'stripe_subscription_id' }
      );
  }

  if (event.type === 'customer.subscription.deleted') {
    const customerId = data.customer as string;
    const subscriptionId = data.id as string;

    await supabaseAdmin
      .from('billing_subscriptions')
      .delete()
      .eq('stripe_customer_id', customerId)
      .eq('stripe_subscription_id', subscriptionId);
  }
}
