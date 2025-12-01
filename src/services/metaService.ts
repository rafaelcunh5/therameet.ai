import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { findOrCreateMetaConversation } from './conversationService';
import { createMetaIncomingMessage, createMetaStatusMessage } from './messageService';

const META_WHATSAPP_TOKEN = process.env.META_WHATSAPP_TOKEN || process.env.META_TOKEN || '';
const META_PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID || '';
const META_WABA_ID = process.env.META_WABA_ID || '';

if (!META_WHATSAPP_TOKEN) {
  console.warn('[metaService] META_WHATSAPP_TOKEN/META_TOKEN not set');
}

export async function sendMetaWhatsAppMessage(to: string, body: string) {
  console.log('[metaService] sendMetaWhatsAppMessage', { to, bodyLength: body.length });
  const url = `https://graph.facebook.com/v22.0/${META_PHONE_NUMBER_ID}/messages`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${META_WHATSAPP_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  });

  const json = await res.json().catch(() => ({}));
  console.log('[metaService] sendMetaWhatsAppMessage response', { status: res.status, json });

  if (!res.ok) {
    throw new Error(`Meta WhatsApp API error: ${res.status}`);
  }

  return json;
}

export function validateMetaWebhookVerification(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || 'verify_token';

  console.log('[metaService] validateMetaWebhookVerification', { mode, tokenProvided: !!token });

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    return { ok: true as const, challenge };
  }

  return { ok: false as const };
}

export async function handleMetaWebhookPayload(body: any) {
  console.log('[metaService] handleMetaWebhookPayload raw', JSON.stringify(body));

  const entry = body?.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;

  const messages = value?.messages as any[] | undefined;
  const statuses = value?.statuses as any[] | undefined;

  const waId = value?.contacts?.[0]?.wa_id as string | undefined;

  if (messages && messages.length > 0 && waId) {
    const msg = messages[0];
    const text = msg.text?.body as string | undefined;
    const externalId = msg.id as string;

    console.log('[metaService] inbound message', { waId, externalId, text });

    const { data: agent, error: agentError } = await supabaseAdmin
      .from('agents')
      .select('*')
      .eq('phone', value.metadata?.display_phone_number || '')
      .maybeSingle();

    if (agentError || !agent) {
      console.warn('[metaService] agent not found for inbound message', { waId });
      return;
    }

    const conversation = await findOrCreateMetaConversation({
      agentId: agent.id,
      externalUserId: waId,
    });

    await createMetaIncomingMessage({
      conversationId: conversation.id,
      content: text || '',
      externalId,
      from: waId,
    });
  }

  if (statuses && statuses.length > 0 && waId) {
    for (const status of statuses) {
      const externalId = status.id as string;
      const statusValue = status.status as string;

      console.log('[metaService] status update', { waId, externalId, statusValue });

      const { data: message, error: msgError } = await supabaseAdmin
        .from('messages')
        .select('conversation_id')
        .eq('external_id', externalId)
        .maybeSingle();

      if (msgError || !message) {
        console.warn('[metaService] original message not found for status', { externalId });
        continue;
      }

      await createMetaStatusMessage({
        conversationId: message.conversation_id,
        externalId,
        status: statusValue,
      });
    }
  }
}
