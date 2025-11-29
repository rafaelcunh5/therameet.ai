import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromAccessToken } from '@/lib/supabase';
import { listConversations } from '@/lib/services/conversations';
import { requireSubscriptionServer } from '@/lib/subscription';

async function getUserId(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice('Bearer '.length);
  const user = await getAuthUserFromAccessToken(token);
  return user?.id ?? null;
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: { code: 'unauthorized' } }, { status: 401 });
  }

  // Verificar assinatura para listar conversas WhatsApp
  const { needsUpgrade } = await requireSubscriptionServer(req);
  if (needsUpgrade) {
    return NextResponse.json({ 
      error: 'Premium feature',
      message: 'Esta funcionalidade requer uma assinatura ativa.',
      requiresUpgrade: true 
    }, { status: 403 });
  }

  console.log('[api/conversations] GET', { userId });

  try {
    // Usar ID fixo para o assistente automático
    const conversations = await listConversations(userId, 'default-assistant');
    return NextResponse.json({ data: conversations });
  } catch (error) {
    console.error('[api/conversations] GET error', error);
    return NextResponse.json({ error: { code: 'internal_error' } }, { status: 500 });
  }
}
