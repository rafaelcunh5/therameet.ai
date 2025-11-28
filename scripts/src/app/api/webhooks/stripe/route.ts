import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe, registerStripeEventId, upsertBillingSubscriptionFromEvent } from '@/lib/services/stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json(
      { error: { code: 'stripe_config_error', message: 'Stripe webhook not configured' } },
      { status: 500 }
    );
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    return NextResponse.json(
      { error: { code: 'stripe_signature_invalid', message: err.message } },
      { status: 400 }
    );
  }

  try {
    await registerStripeEventId(event.id, 'stripe');
  } catch {
    return NextResponse.json({ ok: true, idempotent: true }, { status: 200 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await upsertBillingSubscriptionFromEvent(event);
      break;
    default:
      break;
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
