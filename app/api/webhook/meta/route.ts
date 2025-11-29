import { NextRequest, NextResponse } from 'next/server';
import { validateMetaWebhookVerification, handleMetaWebhookPayload } from '@/services/metaService';

export async function GET(req: NextRequest) {
  const result = validateMetaWebhookVerification(req);
  if (result.ok) {
    console.log('[api/webhook/meta] GET verified');
    return new Response(result.challenge, { status: 200 });
  }

  console.warn('[api/webhook/meta] GET verification failed');
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  console.log('[api/webhook/meta] POST received', { hasBody: !!body });

  if (!body) {
    return NextResponse.json({ error: { code: 'bad_request' } }, { status: 400 });
  }

  try {
    await handleMetaWebhookPayload(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/webhook/meta] POST error', error);
    return NextResponse.json({ error: { code: 'internal_error' } }, { status: 500 });
  }
}
