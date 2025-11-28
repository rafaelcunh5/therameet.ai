import { NextRequest } from 'next/server';
import { POST as postMessageHandler } from '@/app/api/messages/route';

jest.mock('@/lib/supabase', () => {
  const now = new Date().toISOString();

  const agentsTable = {
    select: () => agentsTable,
    eq: () => agentsTable,
    single: async () => ({ data: { id: 'agent-1', owner_id: 'user-1' }, error: null }),
  } as any;

  const createdMessage = {
    id: 'msg-1',
    conversation_id: 'conv-1',
    role: 'assistant',
    content: 'Olá do teste',
    external_id: 'wamid.TEST',
    created_at: now,
  };

  const messagesInsert = jest.fn(() => ({
    select: () => ({
      single: async () => ({ data: createdMessage, error: null }),
    }),
  }));

  const conversationsTable = {
    select: () => ({
      eq: () => ({
        eq: () => ({
          eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
        }),
      }),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({
          data: {
            id: 'conv-1',
            agent_id: 'agent-1',
            external_user_id: '5511999999999',
            provider: 'meta',
            created_at: now,
          },
          error: null,
        }),
      }),
    }),
  } as any;

  const from = (table: string) => {
    switch (table) {
      case 'agents':
        return agentsTable;
      case 'conversations':
        return conversationsTable;
      case 'messages':
        return { insert: messagesInsert } as any;
      default:
        return {} as any;
    }
  };

  return {
    supabaseAdmin: { from },
    getAuthUserFromAccessToken: jest.fn(async () => ({ id: 'user-1' })),
  };
});

jest.mock('@/services/metaService', () => ({
  sendMetaWhatsAppMessage: jest.fn(async () => ({
    messages: [{ id: 'wamid.TEST' }],
  })),
}));

jest.mock('@/services/conversationService', () => ({
  findOrCreateMetaConversation: jest.fn(async () => ({
    id: 'conv-1',
    agent_id: 'agent-1',
    external_user_id: '5511999999999',
    provider: 'meta',
    created_at: new Date().toISOString(),
  })),
}));

describe('POST /api/messages (App Router)', () => {
  it('envia mensagem via Meta e persiste no Supabase', async () => {
    const body = {
      agentId: 'agent-1',
      to: '5511999999999',
      content: 'Olá do teste',
    };

    const req = new NextRequest(
      new Request('http://localhost/api/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer test-token',
        },
        body: JSON.stringify(body),
      }) as any,
    );

    const res = await postMessageHandler(req);
    expect(res.status).toBe(201);

    const json = (await res.json()) as any;
    expect(json.data).toBeDefined();
    expect(json.data.message).toMatchObject({
      role: 'assistant',
      content: 'Olá do teste',
      external_id: 'wamid.TEST',
    });
  });
});
