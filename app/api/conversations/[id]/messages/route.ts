import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromAccessToken } from '@/lib/supabase';
import { listMessagesForConversation } from '@/lib/services/conversations';

async function getUserId(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice('Bearer '.length);
  const user = await getAuthUserFromAccessToken(token);
  return user?.id ?? null;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: { code: 'unauthorized' } }, { status: 401 });
  }

  const conversationId = params.id;
  console.log('[api/conversations/[id]/messages] GET', { userId, conversationId });

  try {
    const messages = await listMessagesForConversation(userId, conversationId);
    return NextResponse.json({ data: messages });
  } catch (error) {
    console.error('[api/conversations/[id]/messages] GET error', error);
    return NextResponse.json({ error: { code: 'internal_error' } }, { status: 500 });
  }
}
