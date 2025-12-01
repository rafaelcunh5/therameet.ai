import { supabaseAdmin } from '@/lib/supabase';
import { runLLM, type LLMMessage } from '@/lib/llm';

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system' | 'meta' | 'meta_status';
  content: string;
  external_id?: string | null;
  created_at: string;
}

export async function createInternalConversationMessage(params: {
  userId: string;
  agentId: string;
  content: string;
}) {
  console.log('[messageService] createInternalConversationMessage', params);
  const { data: agent, error: agentError } = await supabaseAdmin
    .from('agents')
    .select('*')
    .eq('id', params.agentId)
    .eq('owner_id', params.userId)
    .single();

  if (agentError || !agent) {
    console.error('[messageService] agent not found', agentError);
    throw new Error('Agent not found');
  }

  const { data: conv, error: convError } = await supabaseAdmin
    .from('conversations')
    .insert({
      agent_id: agent.id,
      external_user_id: params.userId,
      provider: 'internal',
    })
    .select('*')
    .single();

  if (convError || !conv) {
    console.error('[messageService] conversation create error', convError);
    throw convError;
  }

  const userMessage: LLMMessage = { role: 'user', content: params.content };
  const assistantReply = await runLLM(agent, [userMessage]);

  const { error: insertError } = await supabaseAdmin.from('messages').insert([
    {
      conversation_id: conv.id,
      role: 'user',
      content: params.content,
    },
    {
      conversation_id: conv.id,
      role: 'assistant',
      content: assistantReply,
    },
  ]);

  if (insertError) {
    console.error('[messageService] messages insert error', insertError);
    throw insertError;
  }

  return { conversation: conv, reply: assistantReply };
}

export async function createMetaIncomingMessage(params: {
  conversationId: string;
  content: string;
  externalId: string;
  from: string;
}) {
  console.log('[messageService] createMetaIncomingMessage', params);
  const { data, error } = await supabaseAdmin
    .from('messages')
    .insert({
      conversation_id: params.conversationId,
      role: 'user',
      content: params.content,
      external_id: params.externalId,
    })
    .select('*')
    .single();

  if (error) {
    console.error('[messageService] createMetaIncomingMessage error', error);
    throw error;
  }

  return data as Message;
}

export async function createMetaStatusMessage(params: {
  conversationId: string;
  externalId: string;
  status: string;
}) {
  console.log('[messageService] createMetaStatusMessage', params);
  const { error } = await supabaseAdmin.from('messages').insert({
    conversation_id: params.conversationId,
    role: 'meta_status',
    content: params.status,
    external_id: params.externalId,
  });

  if (error) {
    console.error('[messageService] createMetaStatusMessage error', error);
    throw error;
  }
}
