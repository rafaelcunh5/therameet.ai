import { supabaseAdmin } from '@/lib/supabase';

export interface Conversation {
  id: string;
  agent_id: string;
  external_user_id: string;
  provider: 'internal' | 'meta' | 'twilio';
  created_at: string;
}

export async function listUserConversations(userId: string, agentId: string = 'default-assistant') {
  console.log('[conversationService] listUserConversations', { userId, agentId });
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[conversationService] listUserConversations error', error);
    throw error;
  }
  return data as Conversation[];
}

export async function listUserMessagesForConversation(userId: string, conversationId: string) {
  console.log('[conversationService] listUserMessagesForConversation', { userId, conversationId });
  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) {
    console.error('[conversationService] listUserMessagesForConversation error', error);
    throw error;
  }
  return data;
}

export async function findOrCreateMetaConversation(params: {
  agentId: string;
  externalUserId: string;
}) {
  console.log('[conversationService] findOrCreateMetaConversation', params);
  const { data: existing, error: existingError } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('agent_id', params.agentId)
    .eq('external_user_id', params.externalUserId)
    .eq('provider', 'meta')
    .maybeSingle();

  if (existingError) {
    console.error('[conversationService] findOrCreateMetaConversation existingError', existingError);
    throw existingError;
  }

  if (existing) return existing as Conversation;

  const { data: created, error: createError } = await supabaseAdmin
    .from('conversations')
    .insert({
      agent_id: params.agentId,
      external_user_id: params.externalUserId,
      provider: 'meta',
    })
    .select('*')
    .single();

  if (createError) {
    console.error('[conversationService] findOrCreateMetaConversation createError', createError);
    throw createError;
  }

  return created as Conversation;
}
