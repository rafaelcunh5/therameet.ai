import { supabaseAdmin } from '@/lib/supabase';
import { runLLM, type LLMMessage } from '@/lib/llm';

export async function sendInternalMessage(params: {
  userId: string;
  agentId: string;
  content: string;
}) {
  const { data: agent, error: agentError } = await supabaseAdmin
    .from('agents')
    .select('*')
    .eq('id', params.agentId)
    .eq('owner_id', params.userId)
    .single();

  if (agentError || !agent) {
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

  if (convError || !conv) throw convError;

  const userMessage: LLMMessage = { role: 'user', content: params.content };

  const assistantReply = await runLLM(agent, [userMessage]);

  await supabaseAdmin.from('messages').insert([
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

  return { conversation: conv, reply: assistantReply };
}
