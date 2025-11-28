import { supabaseAdmin } from '@/lib/supabase';

export async function listConversations(userId: string, agentId: string = 'default-assistant') {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function listMessagesForConversation(userId: string, conversationId: string) {
  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}
