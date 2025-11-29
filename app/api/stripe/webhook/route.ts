import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const config = {
  api: { bodyParser: false }
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const data = event.data.object as Stripe.Checkout.Session | Stripe.Subscription;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = data as Stripe.Checkout.Session;
      const subscriptionId = session.subscription as string;
      const customerEmail = session.customer_details?.email;

      console.log(`Payment completed for ${customerEmail}, subscription: ${subscriptionId}`);
      
      // Here you would typically update your database
      // Since this project doesn't use Prisma, you might:
      // 1. Update Supabase user metadata
      // 2. Update a custom database
      // 3. Store in Redis/session
      
      break;
    }

    case "customer.subscription.updated": {
      const subscription = data as Stripe.Subscription;
      console.log(`Subscription ${subscription.id} updated to status: ${subscription.status}`);
      
      // Update subscription status in your database
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = data as Stripe.Subscription;
      console.log(`Subscription ${subscription.id} deleted/canceled`);
      
      // Update subscription status to canceled in your database
      break;
    }
  }

  return NextResponse.json({ received: true });
}
