import type { NextApiRequest, NextApiResponse } from 'next';

// TODO: Initialize Stripe with STRIPE_KEY
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // TODO: Create Stripe Checkout Session for subscription + 7-day trial
  return res.status(200).json({ url: 'https://example.com/checkout-mock' });
}
