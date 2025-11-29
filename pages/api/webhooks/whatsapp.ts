import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory idempotency for tests. TODO: Replace with persistent store (Supabase) in prod
const seen = new Set<string>();

function extractEventId(req: NextApiRequest): string | null {
  const ct = (req.headers['content-type'] || '').toString();
  if (ct.includes('application/json')) {
    const body = req.body as any;
    const msg = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    return msg?.id || null;
  }
  // Assume Twilio form params
  const sid = (req.body as any)?.SmsMessageSid;
  return sid || null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const testMode = req.headers['x-test-mode'] === '1';
  const eventId = extractEventId(req);
  if (eventId) {
    if (seen.has(eventId)) {
      return res.status(200).json({ ok: true, idempotent: true });
    }
    seen.add(eventId);
  }

  if (testMode) {
    // In test mode, do not call external providers. Just acknowledge.
    return res.status(200).json({ ok: true });
  }

  // TODO: Verify signatures (Meta or Twilio), parse inbound, fetch agent by phone, enforce billing, call LLM, persist, send reply
  return res.status(200).json({ ok: true });
}
