import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuthUserFromAccessToken, supabaseAdmin } from '@/lib/supabase';
import { sendMetaWhatsAppMessage } from '@/services/metaService';
import { findOrCreateMetaConversation } from '@/services/conversationService';
import { requireSubscriptionServer } from '@/lib/subscription';

const sendMessageSchema = z.object({
  to: z.string().min(1),
  content: z.string().min(1),
});

async function getUserId(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice('Bearer '.length);
  const user = await getAuthUserFromAccessToken(token);
  return user?.id ?? null;
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: { code: 'unauthorized' } }, { status: 401 });
  }

  // Verificar assinatura para enviar mensagens WhatsApp
  const { needsUpgrade } = await requireSubscriptionServer(req);
  if (needsUpgrade) {
    return NextResponse.json({ 
      error: 'Premium feature',
      message: 'Esta funcionalidade requer uma assinatura ativa.',
      requiresUpgrade: true 
    }, { status: 403 });
  }

  const json = await req.json();
  const parseResult = sendMessageSchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: { code: 'validation_error', details: parseResult.error.flatten() } },
      { status: 400 },
    );
  }

  const { to, content } = parseResult.data;
  console.log('[api/messages] POST', { userId, to });

  try {
    // Buscar informações do negócio para usar como contexto
    const { data: businessInfo, error: businessError } = await supabaseAdmin
      .from('business_info')
      .select('content')
      .eq('user_id', userId)
      .single();

    if (businessError && businessError.code !== 'PGRST116') {
      console.warn('[api/messages] Error fetching business info', businessError);
    }

    // Usar ID fixo para o assistente automático
    const agentId = 'default-assistant';

    const conversation = await findOrCreateMetaConversation({
      agentId,
      externalUserId: to,
    });

    const metaResponse = await sendMetaWhatsAppMessage(to, content);

    const externalMessageId = metaResponse?.messages?.[0]?.id ?? null;

    const { data: message, error: insertError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        role: 'assistant',
        content,
        external_id: externalMessageId,
      })
      .select('*')
      .single();

    if (insertError) {
      console.error('[api/messages] insert message error', insertError);
      return NextResponse.json({ error: { code: 'internal_error' } }, { status: 500 });
    }

    return NextResponse.json({ data: { conversation, message, meta: metaResponse } }, { status: 201 });
  } catch (error) {
    console.error('[api/messages] POST error', error);
    return NextResponse.json({ error: { code: 'internal_error' } }, { status: 500 });
  }
}
